/*
  # Create job openings table

  1. New Tables
    - `job_openings`
      - `id` (uuid, primary key) - Unique identifier for each job
      - `title` (text) - Job title
      - `company` (text) - Company name
      - `location` (text) - Job location
      - `salary_range` (text) - Salary range in KSH
      - `job_type` (text) - Employment type (Full-time, Part-time, Contract, etc.)
      - `description` (text) - Job description
      - `requirements` (text) - Job requirements
      - `is_active` (boolean) - Whether the job is currently active
      - `created_at` (timestamptz) - When the job was posted
      - `updated_at` (timestamptz) - When the job was last updated

  2. Security
    - Enable RLS on `job_openings` table
    - Add policy for public read access to active jobs
    - Add policy for authenticated users to read all jobs

  3. Initial Data
    - Populates table with diverse job openings across various industries and locations
*/

CREATE TABLE IF NOT EXISTS job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary_range text NOT NULL,
  job_type text NOT NULL DEFAULT 'Full-time',
  description text NOT NULL,
  requirements text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_openings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active job openings"
  ON job_openings
  FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Authenticated users can view all jobs"
  ON job_openings
  FOR SELECT
  TO authenticated
  USING (true);

INSERT INTO job_openings (title, company, location, salary_range, job_type, description, requirements) VALUES
('Software Developer', 'Tech Solutions Ltd', 'Nairobi', '80,000 - 120,000', 'Full-time', 'We''re looking for a skilled software developer with experience in React and Node.js.', 'Bachelor''s degree in Computer Science, 3+ years experience'),
('Sales Executive', 'Retail Innovators', 'Mombasa', '50,000 - 70,000', 'Full-time', 'Join our dynamic sales team to drive business growth across the coastal region.', 'Sales experience required, excellent communication skills'),
('Accountant', 'Finance Pro Kenya', 'Nakuru', '60,000 - 90,000', 'Full-time', 'Experienced accountant needed for a growing financial services firm.', 'CPA certification, 4+ years experience'),
('Marketing Manager', 'Brand Builders', 'Nairobi', '90,000 - 130,000', 'Full-time', 'Lead our marketing initiatives and drive brand awareness across Kenya.', 'Marketing degree, 5+ years experience in brand management'),
('Customer Service Representative', 'Support Hub', 'Kisumu', '35,000 - 50,000', 'Full-time', 'Provide excellent customer service and support to our growing client base.', 'High school diploma, strong communication skills'),
('Graphic Designer', 'Creative Studios', 'Nairobi', '45,000 - 75,000', 'Contract', 'Create stunning visual designs for diverse clients across various industries.', 'Portfolio required, proficiency in Adobe Creative Suite'),
('Human Resources Manager', 'People First Consulting', 'Nairobi', '85,000 - 115,000', 'Full-time', 'Oversee HR operations and develop talent management strategies for our clients.', 'HR degree or certification, 5+ years experience'),
('Data Analyst', 'Insights Kenya', 'Nairobi', '70,000 - 100,000', 'Full-time', 'Analyze complex datasets and provide actionable insights to drive business decisions.', 'Statistics or related degree, SQL and Python skills'),
('Civil Engineer', 'BuildTech Construction', 'Eldoret', '95,000 - 140,000', 'Full-time', 'Lead infrastructure projects and ensure quality construction standards.', 'Engineering degree, registration with Engineers Board of Kenya'),
('Nurse', 'HealthCare Plus', 'Nairobi', '55,000 - 80,000', 'Full-time', 'Provide quality patient care in our modern healthcare facility.', 'Nursing degree, valid practicing license'),
('Content Writer', 'Digital Media Co', 'Remote', '40,000 - 65,000', 'Contract', 'Create engaging content for websites, blogs, and social media platforms.', 'Excellent writing skills, SEO knowledge'),
('Supply Chain Coordinator', 'Logistics Masters', 'Mombasa', '60,000 - 85,000', 'Full-time', 'Coordinate supply chain operations and optimize logistics processes.', 'Supply chain or business degree, 3+ years experience'),
('Teacher - Mathematics', 'Excellence Academy', 'Nakuru', '45,000 - 65,000', 'Full-time', 'Teach mathematics to secondary school students in a progressive learning environment.', 'TSC registration, Bachelor of Education'),
('Mobile App Developer', 'AppWorks Kenya', 'Nairobi', '90,000 - 130,000', 'Full-time', 'Develop innovative mobile applications for iOS and Android platforms.', 'Experience with React Native or Flutter, portfolio required'),
('Restaurant Manager', 'Tasty Bites', 'Mombasa', '50,000 - 75,000', 'Full-time', 'Manage daily restaurant operations and ensure excellent customer experiences.', 'Hospitality management experience, food safety certification'),
('Electrical Engineer', 'Power Solutions Ltd', 'Nairobi', '85,000 - 120,000', 'Full-time', 'Design and implement electrical systems for commercial and residential projects.', 'Electrical engineering degree, professional registration'),
('Social Media Manager', 'Buzz Marketing', 'Nairobi', '55,000 - 85,000', 'Full-time', 'Manage social media presence and create engaging campaigns for multiple brands.', 'Digital marketing experience, analytics skills'),
('Legal Assistant', 'Law Partners Kenya', 'Nairobi', '50,000 - 70,000', 'Full-time', 'Provide administrative and research support to our legal team.', 'Diploma in Law, attention to detail'),
('Mechanical Technician', 'Industrial Services', 'Thika', '45,000 - 65,000', 'Full-time', 'Maintain and repair mechanical equipment in manufacturing facility.', 'Technical diploma, hands-on mechanical experience'),
('Financial Analyst', 'Investment Group', 'Nairobi', '75,000 - 110,000', 'Full-time', 'Conduct financial analysis and support investment decision-making.', 'Finance degree, CFA progress preferred');
