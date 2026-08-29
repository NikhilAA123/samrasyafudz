# Samrasya FUDZ

A full-stack dry fruits e-commerce platform built as a learning/reference
project — Spring Boot microservices + React + JWT auth + UPI payments (Razorpay).

## Architecture

[diagram or ASCII showing: frontend → api-gateway → 4 services → Postgres]

## Tech Stack

- Backend: Spring Boot 3.2, Spring Cloud Gateway, Spring Security, JWT
- Frontend: React + TypeScript + Vite
- Database: PostgreSQL (one per service)
- Payments: Razorpay (UPI)
- Deployment: Google Cloud Run + Firebase Hosting

## Quick Start (Docker Compose)

\`\`\`bash
git clone https://github.com/yourusername/samrasyafudz.git
cd samrasyafudz
cp */application-local.properties.example */application-local.properties

# fill in your own local values

docker-compose up --build
\`\`\`

## Services

| Service         | Port | Responsibility                |
|-----------------|------|-------------------------------|
| api-gateway     | 8080 | Routing, CORS                 |
| user-service    | 8081 | OTP auth, profiles, addresses |
| product-service | 8082 | Catalog, variants             |
| order-service   | 8083 | Cart, checkout, orders        |
| payment-service | 8084 | Razorpay UPI integration      |

## Contributing

See CONTRIBUTING.md

## License

MIT