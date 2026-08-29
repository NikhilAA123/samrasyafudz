CREATE TABLE otp_verifications (
    id BIGSERIAL PRIMARY KEY,
    phone VARCHAR(10) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    consumed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE INDEX idx_otp_verifications_phone ON otp_verifications(phone);
