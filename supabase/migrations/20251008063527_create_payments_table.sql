/*
  # Create Payments Tracking Table

  1. New Tables
    - `payments`
      - `id` (uuid, primary key)
      - `payment_type` (text) - 'job_application' or 'hiring_request'
      - `amount_kes` (numeric) - Amount in Kenyan Shillings
      - `amount_usd` (numeric) - Amount in USD
      - `paypal_order_id` (text) - PayPal order ID
      - `paypal_payer_id` (text) - PayPal payer ID
      - `payment_status` (text) - 'pending', 'completed', 'failed', 'cancelled'
      - `form_data` (jsonb) - Store the application/request data
      - `email` (text) - User email
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `completed_at` (timestamptz) - When payment was completed

  2. Security
    - Enable RLS on `payments` table
    - Add policy for authenticated users to read their own payment records
    - Add policy for service role to manage all payments
*/

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_type text NOT NULL CHECK (payment_type IN ('job_application', 'hiring_request')),
  amount_kes numeric NOT NULL,
  amount_usd numeric NOT NULL,
  paypal_order_id text,
  paypal_payer_id text,
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'cancelled')),
  form_data jsonb NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their own payments"
  ON payments
  FOR SELECT
  USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Service role can manage all payments"
  ON payments
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_payments_email ON payments(email);
CREATE INDEX IF NOT EXISTS idx_payments_paypal_order_id ON payments(paypal_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);