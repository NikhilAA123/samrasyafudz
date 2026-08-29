CREATE TABLE order_items
(
    id           BIGSERIAL PRIMARY KEY,
    order_id     BIGINT         NOT NULL REFERENCES orders (id),
    product_id   BIGINT         NOT NULL,
    variant_id   BIGINT         NOT NULL,
    product_name VARCHAR(150)   NOT NULL,
    weight_grams INTEGER        NOT NULL,
    unit_price   NUMERIC(10, 2) NOT NULL,
    quantity     INTEGER        NOT NULL,
    subtotal     NUMERIC(10, 2) NOT NULL
);

CREATE INDEX idx_order_items_order_id ON order_items (order_id);