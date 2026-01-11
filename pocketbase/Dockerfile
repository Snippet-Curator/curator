# === Builder stage ===
FROM golang:1.24-alpine AS builder

# Install dependencies
RUN apk add --no-cache \
    git \
    build-base \
    ca-certificates

# Set working directory
WORKDIR /app
# COPY xpb.json .

# Install XPB
RUN go install github.com/pocketbuilds/xpb/cmd/xpb@latest

# Build Pocketbase
RUN xpb build --with github.com/pocketbuilds/fts@latest


# === Runner stage ===
FROM alpine:latest
RUN apk add --no-cache ca-certificates
WORKDIR /app/db

# Copy migration and hooks folders
COPY pb_migrations ./pb_migrations
COPY pb_hooks ./pb_hooks
COPY --from=builder /app/pocketbase ./pocketbase

# Make binary executable
RUN chmod +x ./pocketbase

# Expose app port
EXPOSE 8090

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]

