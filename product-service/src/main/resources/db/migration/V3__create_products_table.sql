CREATE TABLE products (
                          id BIGSERIAL PRIMARY KEY,
                          name VARCHAR(150) NOT NULL,
                          description TEXT,
                          image_url VARCHAR(500),
                          category_id BIGINT NOT NULL REFERENCES categories(id),
                          created_at TIMESTAMP NOT NULL DEFAULT now(),
                          updated_at TIMESTAMP
);