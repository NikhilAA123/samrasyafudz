CREATE TABLE cart_items
(
    id           BIGSERIAL PRIMARY KEY,
    user_id      BIGINT         NOT NULL,
    product_id   BIGINT         NOT NULL,
    variant_id   BIGINT         NOT NULL,
    product_name VARCHAR(150)   NOT NULL,
    weight_grams INTEGER        NOT NULL,
    unit_price   NUMERIC(10, 2) NOT NULL,
    quantity     INTEGER        NOT NULL,
    created_at   TIMESTAMP      NOT NULL DEFAULT now(),
    UNIQUE (user_id, variant_id)
);

CREATE INDEX idx_cart_items_user_id ON cart_items (user_id);