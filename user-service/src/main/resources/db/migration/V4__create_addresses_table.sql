CREATE TABLE addresses
(
    id              BIGSERIAL PRIMARY KEY,
    user_id         BIGINT       NOT NULL REFERENCES users (id),
    label           VARCHAR(30),
    address_line1   VARCHAR(255) NOT NULL,
    address_line2   VARCHAR(255),
    area            VARCHAR(100),
    city            VARCHAR(100),
    state           VARCHAR(100),
    pincode         VARCHAR(10),
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,
    google_place_id VARCHAR(255),
    is_default      BOOLEAN      NOT NULL DEFAULT false,
    created_at      TIMESTAMP    NOT NULL DEFAULT now()
);

CREATE INDEX idx_addresses_user_id ON addresses (user_id);