/*
  # Create Storage Policies for Payment Proofs

  1. Storage Policies
    - Allow public uploads to payment-proofs folder
    - Allow public read access to payment proofs
    - Allow deletion of payment proofs

  2. Security
    - Public access for uploads (no auth required since we don't have auth)
    - Files stored in payment-proofs folder
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can upload payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view payment proofs" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete payment proofs" ON storage.objects;

-- Allow anyone to upload payment proofs
CREATE POLICY "Anyone can upload payment proofs"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'payments' AND (storage.foldername(name))[1] = 'payment-proofs');

-- Allow anyone to read payment proofs
CREATE POLICY "Anyone can view payment proofs"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'payments');

-- Allow deletion of payment proofs
CREATE POLICY "Users can delete payment proofs"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'payments' AND (storage.foldername(name))[1] = 'payment-proofs');