package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"os/signal"
	"sort"
	"strings"
	"syscall"
	"time"
)

type ConsulService struct {
	ID      string `json:"ServiceID"`
	Service string `json:"ServiceName"`
	Address string `json:"ServiceAddress"`
	Port    int    `json:"ServicePort"`
	Checks  []struct {
		Status string
	}
}

type CaddyUpdater struct {
	consulAddr      string
	serviceName     string
	templatePath    string
	caddyfilePath   string
	pollInterval    time.Duration
	lastUpstreams   string
}

func main() {
	consulAddr := getEnv("CONSUL_HTTP_ADDR", "localhost:8500")
	serviceName := getEnv("SERVICE_NAME", "jamroom-app")
	templatePath := getEnv("CADDYFILE_TEMPLATE", "/etc/caddy/Caddyfile.template")
	caddyfilePath := getEnv("CADDYFILE_PATH", "/etc/caddy/Caddyfile")
	pollInterval := time.Duration(5) * time.Second

	updater := &CaddyUpdater{
		consulAddr:    consulAddr,
		serviceName:   serviceName,
		templatePath:  templatePath,
		caddyfilePath: caddyfilePath,
		pollInterval:  pollInterval,
	}

	fmt.Printf("[Caddy Updater] Starting (Consul: %s, Service: %s)\n", consulAddr, serviceName)

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	ticker := time.NewTicker(pollInterval)
	defer ticker.Stop()

	// Run immediately on startup
	updater.update()

	// Then run on interval
	for {
		select {
		case <-ticker.C:
			updater.update()
		case <-sigChan:
			fmt.Println("[Caddy Updater] Shutting down")
			os.Exit(0)
		}
	}
}

func (u *CaddyUpdater) update() {
	services, err := u.getHealthyServices()
	if err != nil {
		fmt.Printf("[Caddy Updater] Error fetching services: %v\n", err)
		return
	}

	upstreams := u.formatUpstreams(services)

	// Only reload if upstreams changed
	if upstreams == u.lastUpstreams {
		return
	}

	fmt.Printf("[Caddy Updater] Upstreams changed (%d services)\n", len(services))
	u.lastUpstreams = upstreams

	// Render template with new upstreams
	caddyfile, err := u.renderTemplate(upstreams)
	if err != nil {
		fmt.Printf("[Caddy Updater] Error rendering template: %v\n", err)
		return
	}

	// Write new Caddyfile
	if err := ioutil.WriteFile(u.caddyfilePath, []byte(caddyfile), 0644); err != nil {
		fmt.Printf("[Caddy Updater] Error writing Caddyfile: %v\n", err)
		return
	}

	fmt.Printf("[Caddy Updater] Wrote %s\n", u.caddyfilePath)

	// Reload Caddy
	if err := u.reloadCaddy(); err != nil {
		fmt.Printf("[Caddy Updater] Error reloading Caddy: %v\n", err)
		return
	}

	fmt.Println("[Caddy Updater] Caddy reloaded successfully")
}

func (u *CaddyUpdater) getHealthyServices() ([]ConsulService, error) {
	url := fmt.Sprintf("http://%s/v1/catalog/service/%s", u.consulAddr, u.serviceName)
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("consul returned %d: %s", resp.StatusCode, string(body))
	}

	var services []ConsulService
	err = json.Unmarshal(body, &services)
	if err != nil {
		return nil, err
	}

	return services, nil
}

func (u *CaddyUpdater) formatUpstreams(services []ConsulService) string {
	if len(services) == 0 {
		// Bootstrap fallback: use app container if no Consul services found yet
		return "app:8080"
	}

	// Sort for consistent output
	sort.Slice(services, func(i, j int) bool {
		if services[i].Address != services[j].Address {
			return services[i].Address < services[j].Address
		}
		return services[i].Port < services[j].Port
	})

	var upstreams []string
	for _, svc := range services {
		upstreams = append(upstreams, fmt.Sprintf("%s:%d", svc.Address, svc.Port))
	}

	return strings.Join(upstreams, " ")
}

func (u *CaddyUpdater) renderTemplate(upstreams string) (string, error) {
	templateContent, err := ioutil.ReadFile(u.templatePath)
	if err != nil {
		return "", err
	}

	// Replace {{UPSTREAMS}} placeholder
	caddyfile := strings.ReplaceAll(string(templateContent), "{{UPSTREAMS}}", upstreams)

	return caddyfile, nil
}

func (u *CaddyUpdater) reloadCaddy() error {
	cmd := exec.Command("caddy", "reload", "-c", u.caddyfilePath)
	var out bytes.Buffer
	cmd.Stdout = &out
	cmd.Stderr = &out

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("caddy reload failed: %w (output: %s)", err, out.String())
	}

	return nil
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
