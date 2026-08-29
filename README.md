# Samrasya FUDZ

A full-stack dry fruits & nuts e-commerce platform, built as a reference project for
learning Spring Boot microservices, JWT authentication, and payment integration.

**Live site:** [www.samrasyafudz.in](https://www.samrasyafudz.in)

---

## Architecture

```
                        ┌──────────────────────┐
   Browser  ───────────▶│  React (Vite + TS)    │  Firebase Hosting
                        └──────────┬────────────┘
                                   │ HTTPS
                        ┌──────────▼────────────┐
                        │     api-gateway        │  Spring Cloud Gateway
                        └──────────┬────────────┘
                    ┌──────────────┼──────────────┬─────────────────┐
                    │              │              │                 │
             ┌──────▼─────┐ ┌──────▼──────┐┌──────▼──────┐  ┌───────▼───────┐
             │user-service│ │product-serv.││order-service│  │payment-service│
             │  (auth)    │ │  (catalog)  ││(cart/orders)│  │  (Razorpay)   │
             └──────┬─────┘ └──────┬──────┘└──────┬──────┘  └───────┬───────┘
                    │              │              │                 │
               ┌────▼────┐   ┌─────▼────┐   ┌─────▼────┐    ┌───────▼────┐
               │ usersdb │   │productdb │   │ ordersdb │    │ paymentsdb │
               └─────────┘   └──────────┘   └──────────┘    └────────────┘
                        (each service owns its own PostgreSQL database)
```

Each microservice is independently deployable, owns its own database, and validates
JWTs issued by `user-service` using a shared signing secret. Services never share a
database or call each other's internal code directly — all cross-service communication
happens over HTTP.

---

## Tech Stack

**Backend**

- Java 17, Spring Boot 3.2
- Spring Cloud Gateway (routing, CORS)
- Spring Security + JWT (mobile OTP-based auth, no passwords)
- Spring Data JPA + PostgreSQL, one database per service
- Flyway for schema migrations
- Razorpay Java SDK (UPI payments)

**Frontend**

- React + TypeScript + Vite
- React Router
- Google Places Autocomplete (address entry)

**Infrastructure**

- Google Cloud Run (backend services, scale-to-zero)
- Cloud SQL (PostgreSQL)
- Firebase Hosting (frontend)
- Artifact Registry + Secret Manager

---

## Services

| Service           | Port (local) | Responsibility                                     |
|-------------------|--------------|----------------------------------------------------|
| `api-gateway`     | 8080         | Single entry point, request routing, CORS          |
| `user-service`    | 8081         | OTP login, JWT issuance, profiles, saved addresses |
| `product-service` | 8082         | Product catalog, categories, weight-based variants |
| `order-service`   | 8083         | Cart, checkout, order lifecycle                    |
| `payment-service` | 8084         | Razorpay UPI payment creation & verification       |

---

## Quick Start

### Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL

### Setup

```bash
git clone https://github.com/divyajnu08/samrasyafudz.git
cd samrasyafudz
```

Create the databases:

```bash
psql -U postgres -c "CREATE DATABASE usersdb;"
psql -U postgres -c "CREATE DATABASE productdb;"
psql -U postgres -c "CREATE DATABASE ordersdb;"
psql -U postgres -c "CREATE DATABASE paymentsdb;"
```

Copy the example configs and fill in your own values (see [CONTRIBUTING.md](CONTRIBUTING.md)
for the full list and important notes on the shared JWT secret):

```bash
cp user-service/src/main/resources/application-local.properties.example \
   user-service/src/main/resources/application-local.properties
# repeat for product-service, order-service, payment-service, api-gateway
cp dryfruits-frontend/.env.example dryfruits-frontend/.env.development
```

Run each service in its own terminal:

```bash
./gradlew :user-service:bootRun --args='--spring.profiles.active=local'
./gradlew :product-service:bootRun --args='--spring.profiles.active=local'
./gradlew :order-service:bootRun --args='--spring.profiles.active=local'
./gradlew :payment-service:bootRun --args='--spring.profiles.active=local'
./gradlew :api-gateway:bootRun --args='--spring.profiles.active=local'
```

Run the frontend:

```bash
cd dryfruits-frontend
npm install
npm run dev
```

Verify everything is connected:

```bash
curl http://localhost:8080/api/categories
```

Full setup details and a troubleshooting table for common first-run issues are in
[CONTRIBUTING.md](CONTRIBUTING.md).

---

## Features

- 📱 Mobile OTP login (no passwords)
- 🛍️ Product catalog with weight-based variants (200g/400g/500g pricing)
- 📍 Address entry with Google Places Autocomplete
- 🛒 Persistent server-side cart
- 📦 Order lifecycle (Pending → Confirmed → Shipped → Delivered, with cancellation)
- 💳 UPI payments via Razorpay, with webhook-based confirmation
- 🔐 Role-based access (Customer / Admin)

---

## Known Limitations / Roadmap

- **Stock deduction is not concurrency-safe.** `ProductVariantService.deductStock`
  is a plain read-then-write; under simultaneous last-unit purchases, overselling is
  possible. See the code comment for the two suggested fixes (pessimistic lock or
  atomic conditional update).
- **No automated tests yet.** Unit tests for services and integration tests for the
  checkout flow would both be valuable contributions.
- **SMS is mocked.** `user-service` currently logs OTPs to the console instead of
  sending real SMS — see `LoggingSmsSender`. Wiring up a real provider (MSG91,
  Twilio) is documented as a drop-in replacement via the `SmsSender` interface.
- **Orders show a bare address ID**, not the formatted address — `payment-service`
  already has the client code to fetch it; `order-service`'s response just needs
  to include it.
- **No CI pipeline** yet.

See [CONTRIBUTING.md](CONTRIBUTING.md#areas-that-need-help) for the full list of
good first contributions.

---

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for setup
instructions, code conventions, and a list of areas that need help.

## License

MIT — see [LICENSE](LICENSE).