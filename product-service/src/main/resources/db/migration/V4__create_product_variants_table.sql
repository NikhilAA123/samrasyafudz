CREATE TABLE product_variants (
                                  id BIGSERIAL PRIMARY KEY,
                                  product_id BIGINT NOT NULL REFERENCES products(id),
                                  weight_grams INTEGER NOT NULL,
                                  price NUMERIC(10,2) NOT NULL,
                                  stock_quantity INTEGER NOT NULL DEFAULT 0,
                                  created_at TIMESTAMP NOT NULL DEFAULT now(),
                                  UNIQUE (product_id, weight_grams)
);