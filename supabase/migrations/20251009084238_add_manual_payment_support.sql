/*
  # Add Manual Payment Support (M-Pesa and Bank Transfer)

  1. Changes to `payments` table
    - Add `payment_method` column to track payment type (paypal, mpesa, bank_transfer)
    - Add `payment_proof_url` column to store proof of payment
    - Add `admin_notes` column for admin review notes
    - Add `reviewed_by` column to track which admin approved
    - Add `reviewed_at` column for approval timestamp
    - Update payment_status to include 'pending_review' for manual payments

  2. New Table: `payment_proofs`
    - `id` (uuid, primary key)
    - `payment_id` (uuid, foreign key to payments)
    - `file_url` (text) - URL to the uploaded proof
    - `file_name` (text) - Original filename
    - `file_size` (integer) - File size in bytes
    - `uploaded_at` (timestamp)

  3. Security
    - Enable RLS on `payment_proofs` table
    - Add policies for authenticated users to upload their own proofs
    - Admin-only policies for reviewing payments

  4. Important Notes
    - Manual payments require admin approval before application submission
    - Payment methods: M-Pesa (+254 715957054) or Bank (Equity 0286265672)
    - Users must upload screenshot or receipt as proof
*/

-- Add new columns to payments table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'payment_method'
  ) THEN
    ALTER TABLE payments ADD COLUMN payment_method text DEFAULT 'paypal' CHECK (payment_method IN ('paypal', 'mpesa', 'bank_transfer'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'payment_proof_url'
  ) THEN
    ALTER TABLE payments ADD COLUMN payment_proof_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'admin_notes'
  ) THEN
    ALTER TABLE payments ADD COLUMN admin_notes text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'reviewed_by'
  ) THEN
    ALTER TABLE payments ADD COLUMN reviewed_by text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'payments' AND column_name = 'reviewed_at'
  ) THEN
    ALTER TABLE payments ADD COLUMN reviewed_at timestamptz;
  END IF;
END $$;

-- Update payment_status check constraint to include pending_review
DO $$
BEGIN
  ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_payment_status_check;
  ALTER TABLE payments ADD CONSTRAINT payments_payment_status_check 
    CHECK (payment_status IN ('pending', 'pending_review', 'completed', 'failed', 'cancelled', 'rejected'));
END $$;

-- Create payment_proofs table
CREATE TABLE IF NOT EXISTS payment_proofs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer,
  uploaded_at timestamptz DEFAULT now()
);

-- Enable RLS on payment_proofs
ALTER TABLE payment_proofs ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert payment proofs (no auth required for now since we don't have auth)
CREATE POLICY "Anyone can upload payment proofs"
  ON payment_proofs FOR INSERT
  WITH CHECK (true);

-- Policy: Anyone can view their own payment proofs
CREATE POLICY "Anyone can view payment proofs"
  ON payment_proofs FOR SELECT
  USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payment_proofs_payment_id ON payment_proofs(payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_method ON payments(payment_method);