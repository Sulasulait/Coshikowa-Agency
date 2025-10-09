/*
  # Add Approval Token for Email-based Payment Approval

  1. Changes to `payments` table
    - Add `approval_token` column to store unique token for email approval
    - Token will be sent in email for one-click approval

  2. Security
    - Token should be unique and hard to guess
    - Once used, payment status changes to completed
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'approval_token'
  ) THEN
    ALTER TABLE payments ADD COLUMN approval_token text UNIQUE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_payments_approval_token ON payments(approval_token);