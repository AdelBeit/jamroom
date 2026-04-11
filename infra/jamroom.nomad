job "jamroom" {
  datacenters = ["dc1"]
  type        = "service"
  priority    = 80

  group "redis" {
    count = 1

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
      mode = "bridge"
      port "redis" {
        static = 6379
      }
    }
  }

  group "app" {
    count = 1

    task "jamroom" {
      driver = "docker"

      config {
        image = "ghcr.io/adelbeit/jamroom:${var.image_tag}"
        ports = ["http"]
      }

      env {
        PORT              = "8080"
        SERVICE_ADDRESS   = "jamroom-app"
        CONSUL_HTTP_ADDR  = "consul.service.consul:8500"
        REDIS_URL         = "redis://jamroom-redis.service.consul:6379"
        REDIS_PASSWORD    = var.redis_password
      }

      resources {
        cpu    = 500
        memory = 512
      }

      service {
        name = "jamroom-app"
        port = "http"

        check {
          type     = "http"
          path     = "/api/health"
          interval = "5s"
          timeout  = "2s"
        }

        check {
          type     = "tcp"
          interval = "10s"
          timeout  = "2s"
        }

        tags = [
          "app",
          "jamroom"
        ]
      }
    }

    network {
      mode = "bridge"
      port "http" {
        static = 8080
      }
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
}

variable "redis_password" {
  type        = string
  description = "Redis password"
  sensitive   = true
}
