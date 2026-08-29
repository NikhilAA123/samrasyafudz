-- Replace 9999999999 with your actual admin mobile number before running.
-- This is the ONLY way an ADMIN user gets created — the OTP auto-registration
-- path (AuthService.createNewCustomer) always assigns CUSTOMER, by design.
INSERT INTO users (phone, full_name, role, created_at)
VALUES ('9999999999', 'Admin', 'ADMIN', now());
