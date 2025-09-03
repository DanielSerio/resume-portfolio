-- Create skill_category table
CREATE TABLE IF NOT EXISTS skill_category (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Insert category data
INSERT INTO skill_category (id, name) VALUES
  ('database', 'Database'),
  ('cloud%20computing', 'Cloud Computing'),
  ('devops', 'DevOps'),
  ('testing', 'Testing'),
  ('design%2Fux', 'Design/UX'),
  ('security', 'Security'),
  ('version%20control', 'Version Control'),
  ('mobile%20development', 'Mobile Development'),
  ('ai%2Fml', 'AI/ML'),
  ('networking', 'Networking'),
  ('api%20development', 'API Development'),
  ('performance', 'Performance'),
  ('accessibility', 'Accessibility'),
  ('front-end', 'Front-end'),
  ('backend', 'Backend'),
  ('project%20management', 'Project Management')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name;