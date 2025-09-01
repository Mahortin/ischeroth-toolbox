CREATE TABLE IF NOT EXISTS product (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL
);

-- Create attributes table
CREATE TABLE IF NOT EXISTS attributes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  short_name VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL, 
  increased BOOLEAN NOT NULL
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL, 
  increased BOOLEAN NOT NULL,
  skill_group VARCHAR(255) NOT NULL,
  skill_group_key VARCHAR(255) NOT NULL,
  divisor INTEGER NOT NULL, 
  attributes VARCHAR(255) NOT NULL
);

INSERT INTO product (name, price) VALUES
('Produkt A', 10.50),
('Produkt B', 20.75),
('Produkt C', 6.66);

-- Set attributes
INSERT INTO attributes (short_name, name, value, increased) VALUES
('Mu', 'Mut', 12, 0),
('Au', 'Aufmerksamkeit', 12, 0),
('Ve', 'Verstand', 12, 0),
('Ch', 'Charisma', 12, 0),
('Fi', 'Fingerfertigkeit', 12, 0),
('Ge', 'Gewandheit', 12, 0),
('St', 'Stärke', 12, 0),
('Ko', 'Konstitution', 12, 0);

-- Set skills
INSERT INTO skills (name, value, increased, skill_group, skill_group_key, divisor, attributes) VALUES
('Robustheit', 12, 0, 'Grundwert', 'grundwert', 3, 'St,Ko,Ko'),
('Dolch & Fechtwaffen', 12, 0, 'Kampf', 'kampf', 2, 'Mu,Fi,Ge'),
('Akrobatik', 12, 0, 'Körper', 'körper', 3, 'Mu,Ge,St'),
('Fährtensuche', 12, 0, 'Natur', 'natur', 3, 'Au,Ve,Ko');