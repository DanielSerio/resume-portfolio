-- Create skill_subcategory table
CREATE TABLE IF NOT EXISTS skill_subcategory (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Insert subcategory data
INSERT INTO skill_subcategory (id, name) VALUES
  ('css%20framework', 'CSS Framework'),
  ('build%20tool', 'Build Tool'),
  ('package%20manager', 'Package Manager'),
  ('testing%20framework', 'Testing Framework'),
  ('database%20system', 'Database System'),
  ('cloud%20service', 'Cloud Service'),
  ('ui%20library', 'UI Library'),
  ('state%20management', 'State Management'),
  ('bundler', 'Bundler'),
  ('linter', 'Linter'),
  ('formatter', 'Formatter'),
  ('browser%20api', 'Browser API'),
  ('preprocessor', 'Preprocessor'),
  ('runtime%20environment', 'Runtime Environment'),
  ('automation%20tool', 'Automation Tool'),
  ('container%20technology', 'Container Technology'),
  ('ci%2Fcd%20platform', 'CI/CD Platform'),
  ('development%20methodology', 'Development Methodology'),
  ('api%20client', 'API Client'),
  ('documentation%20tool', 'Documentation Tool'),
  ('language', 'Language'),
  ('framework%2Flibrary', 'Framework/Library'),
  ('tool', 'Tool')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name;