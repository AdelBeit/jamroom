job "jamroom" {
  datacenters = ["dc1"]
  type        = "service"

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
        SERVICE_ADDRESS   = "app"
        CONSUL_HTTP_ADDR  = "consul:8500"
        REDIS_URL         = var.redis_url
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
