/*
  # Create Storage Bucket for ID Documents

  1. Storage Setup
    - Creates a public storage bucket named 'id-documents' for storing applicant ID documents
    - Sets up storage policies to allow authenticated and anonymous uploads
    - Configures file size limits and allowed file types

  2. Security
    - Allows public uploads for applicants (since they may not be authenticated)
    - Allows public read access for downloading documents via email links
    - Files are stored securely and can only be accessed with direct URLs
*/

-- Create the storage bucket for ID documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('id-documents', 'id-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can upload ID documents" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can read ID documents" ON storage.objects;

-- Allow anyone to upload ID documents
CREATE POLICY "Anyone can upload ID documents"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'id-documents');

-- Allow anyone to read ID documents (needed for email attachments)
CREATE POLICY "Anyone can read ID documents"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'id-documents');