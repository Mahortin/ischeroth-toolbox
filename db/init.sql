CREATE TABLE IF NOT EXISTS product (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL
);

-- Create attributes table
CREATE TABLE IF NOT EXISTS attributes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  shortname VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL, 
  increased BOOLEAN NOT NULL
);

INSERT INTO product (name, price) VALUES
('Produkt A', 10.50),
('Produkt B', 20.75),
('Produkt C', 6.66);

-- Set attributes
INSERT INTO attributes (shortname, name, value, increased) VALUES
('Mu', 'Mut', 12, 0),
('Au', 'Aufmerksamkeit', 12, 0),
('Ve', 'Verstand', 12, 0),
('Ch', 'Charisma', 12, 0),
('Fi', 'Fingerfertigkeit', 12, 0),
('Ge', 'Gewandheit', 12, 0),
('St', 'Stärke', 12, 0),
('Ko', 'Konstitution', 12, 0);