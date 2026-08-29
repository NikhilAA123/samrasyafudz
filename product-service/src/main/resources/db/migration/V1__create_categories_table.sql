CREATE TABLE categories (
                            id BIGSERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL UNIQUE,
                            image_url VARCHAR(500),
                            created_at TIMESTAMP NOT NULL DEFAULT now(),
                            updated_at TIMESTAMP
);