job "jamroom" {
  datacenters = ["dc1"]
  type        = "service"
  priority    = 80

  update {
    max_parallel     = 1
    min_healthy_time = "10s"
    healthy_deadline = "5m"
    auto_revert      = true
    canary           = 0
  }

  group "redis" {
    count = 1

    volume "redis_data" {
      type      = "host"
      read_only = false
      source    = "redis_data"
    }

    # Explicitly fix permissions before Redis starts
    task "fix-permissions" {
      driver = "docker"
      lifecycle {
        hook    = "prestart"
        sidecar = false
      }
      config {
        image = "alpine:latest"
        command = "sh"
        args = ["-c", "chown -R 999:999 /data"]
      }
      volume_mount {
        volume      = "redis_data"
        destination = "/data"
        read_only   = false
      }
    }

    task "redis" {
      driver = "docker"

      config {
        image = "redis:7.2-alpine"
        ports = ["redis"]
        command = "redis-server"
        args = [
          "--requirepass", var.redis_password,
          "--appendonly", "yes"
        ]
      }

      volume_mount {
        volume      = "redis_data"
        destination = "/data"
        read_only   = false
      }

      resources {
        cpu    = 250
        memory = 256
      }

      service {
        name = "jamroom-redis"
        port = "redis"

        check {
          type     = "tcp"
          interval = "5s"
          timeout  = "2s"
        }
      }
    }

    network {
      port "redis" {
        static = 6379
      }
    }
  }

  group "app" {
    count = 1

    network {
      port "http" {
        static = 8080
      }
    }

    task "jamroom" {
      driver = "docker"

      config {
        image = "ghcr.io/adelbeit/jamroom-app:${var.image_tag}"
        ports = ["http"]
      }

      service {
        name = "jamroom-app"
        port = "http"

        check {
          name     = "http-health"
          type     = "http"
          path     = "/api/health"
          interval = "10s"
          timeout  = "2s"
        }

        check {
          name     = "tcp-liveness"
          type     = "tcp"
          interval = "15s"
          timeout  = "2s"
        }

        tags = [
          "app",
          "jamroom"
        ]

        check_restart {
          limit       = 3
          grace       = "60s"
        }
      }

      env {
        PORT              = "8080"
        SERVICE_ADDRESS   = "jamroom-app"
        CONSUL_HTTP_ADDR  = "consul.service.consul:8500"
        REDIS_URL         = var.redis_url
        REDIS_PASSWORD    = var.redis_password
      }

      resources {
        cpu    = 500
        memory = 512
      }

      # Graceful shutdown: stop accepting connections, wait for existing sockets to close
      shutdown_delay = "30s"
      kill_timeout   = "10s"
    }
  }
}

variable "image_tag" {
  type        = string
  description = "Docker image tag for the jamroom app"
}

variable "redis_url" {
  type        = string
  description = "Redis connection URL"
  default     = "redis://jamroom-redis.service.consul:6379"
}

variable "redis_password" {
  type        = string
  description = "Redis password"
}
