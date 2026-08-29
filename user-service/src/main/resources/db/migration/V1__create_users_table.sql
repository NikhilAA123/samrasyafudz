CREATE TABLE users
(
    id         BIGSERIAL PRIMARY KEY,
    phone      VARCHAR(10) NOT NULL UNIQUE,
    email      VARCHAR(150) UNIQUE,
    full_name  VARCHAR(100),
    role       VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
    active     BOOLEAN     NOT NULL DEFAULT true,
    created_at TIMESTAMP   NOT NULL DEFAULT now()
);
