CREATE TABLE orders
(
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT         NOT NULL,
    address_id   BIGINT         NOT NULL,
    status       VARCHAR(20)    NOT NULL DEFAULT 'PENDING',
    total_amount NUMERIC(10, 2) NOT NULL,
    created_at   TIMESTAMP      NOT NULL DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON orders (user_id);