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
  divisor INTEGER NOT NULL, 
  attributes VARCHAR(255) NOT NULL
);

-- Create name table
CREATE TABLE IF NOT EXISTS names (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_group VARCHAR(255) NOT NULL,
  gender VARCHAR(255) NOT NULL
);

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
INSERT INTO skills (name, value, increased, skill_group, divisor, attributes) VALUES
('Robustheit', 12, 0, 'Grundwert', 3, 'St,Ko,Ko'),
('Bewegung', 7, 0, 'Grundwert', 5, 'Au,Ge,Ge'),
('Mumm', 7, 0, 'Grundwert', 5, 'Mu,Mu,Ve'),
('Reflexe', 12, 0, 'Grundwert', 3, 'Au,Ve,Ge'),
('Sprachbegabung', 12, 0, 'Grundwert', 3, 'Au,Ve,Ch'),
('Dolch & Fechtwaffen', 12, 0, 'Kampf', 2, 'Mu,Fi,Ge'),
('Hieb- & Kettenwaffen', 12, 0, 'Kampf', 2, 'Mu,St,Ko'),
('Raufen & Ringen', 12, 0, 'Kampf', 2, 'Mu,Ge,St'),
('Säbel & Schwerter', 12, 0, 'Kampf', 2, 'Mu,Ge,St'),
('Speere & Stäbe', 12, 0, 'Kampf', 2, 'Mu,Fi,St'),
('Schilde', 12, 0, 'Kampf', 2, 'Au,St,Ko'),
('Armbrust', 12, 0, 'Kampf', 2, 'Au,Fi,St'),
('Bogen', 12, 0, 'Kampf', 2, 'Au,Ge,St'),
('Feuerrohre', 12, 0, 'Kampf', 2, 'Au,Ve,Fi'),
('Wurf & Schleuderwaffen', 12, 0, 'Kampf', 2, 'Au,Fi,Ge'),
('Akrobatik', 12, 0, 'Körper', 3, 'Mu,Ge,St'),
('Athletik', 12, 0, 'Körper', 3, 'Ge,St,Ko'),
('Diebeskunst', 12, 0, 'Körper', 3, 'Au,Ve,Fi'),
('Heimlichkeit', 12, 0, 'Körper', 3, 'Mu,Au,Ge'),
('Horchen', 12, 0, 'Körper', 3, 'Au,Ve,Ko'),
('Klettern', 12, 0, 'Körper', 3, 'Mu,Ge,St'),
('Reiten', 12, 0, 'Körper', 3, 'Ch,Ge,St'),
('Schwimmen', 12, 0, 'Körper', 3, 'Ge,St,Ko'),
('Verborgenes Erkennen', 12, 0, 'Körper', 3, 'Mu,Au,Ve'),
('Zechen', 12, 0, 'Körper', 3, 'Mu,St,Ko'),
('Fährtensuche', 12, 0, 'Natur', 3, 'Au,Ve,Ko'),
('Fischen & Angeln', 12, 0, 'Natur', 3, 'Au,Fi,St'),
('Himmelskunde', 12, 0, 'Natur', 3, 'Au,Au,Ve'),
('Lager & Rasten', 12, 0, 'Natur', 3, 'Au,Ge,Ko'),
('Orientierung', 12, 0, 'Natur', 3, 'Au,Au,Ve'),
('Pflanzenkunde', 12, 0, 'Natur', 3, 'Au,Ve,Fi'),
('Tierkunde', 12, 0, 'Natur', 3, 'Mu,Ve,Ch'),
('Alchemie', 12, 0, 'Handwerk', 3, 'Mu,Ve,Fi'),
('Boot- & Seefahrt', 12, 0, 'Handwerk', 3, 'Au,Ge,Ko'),
('Fahrzeug lenken', 12, 0, 'Handwerk', 3, 'Au,Ch,Fi'),
('Holzbearbeitung', 12, 0, 'Handwerk', 3, 'Ve,Fi,St'),
('Kochen & Brauen', 12, 0, 'Handwerk', 3, 'Ve,Fi,Fi'),
('Lehm- & Steinbearbeitung', 12, 0, 'Handwerk', 3, 'Ve,Fi,Fi'),
('Malen & Zeichnen', 12, 0, 'Handwerk', 3, 'Au,Fi,Fi'),
('Singen & Musizieren', 12, 0, 'Handwerk', 3, 'Au,Ch,Fi'),
('Schmiedekunst', 12, 0, 'Handwerk', 3, 'Fi,St,Ko'),
('Schneider- & Lederarbeiten', 12, 0, 'Handwerk', 3, 'Ve,Fi,Ko'),
('Einschüchtern', 12, 0, 'Gesellschaft', 3, 'Mu,Ch,St'),
('Handel', 12, 0, 'Gesellschaft', 3, 'Au,Ve,Ch'),
('Schauspielerei', 12, 0, 'Gesellschaft', 3, 'Mu,Ve,Ch'),
('Standeswissen', 12, 0, 'Gesellschaft', 3, 'Au,Ve,Ch'),
('Tanzen', 12, 0, 'Gesellschaft', 3, 'Ch,Ge,Ge'),
('Überreden', 12, 0, 'Gesellschaft', 3, 'Mu,Au,Ch'),
('Überzeugen', 12, 0, 'Gesellschaft', 3, 'Au,Ve,Ch'),
('Architekt', 12, 0, 'Wissen', 3, 'Ve,Ve,Fi'),
('Geschichtswissen', 12, 0, 'Wissen', 3, 'Au,Ve,Ve'),
('Götter & Kulte', 12, 0, 'Wissen', 3, 'Ve,Ve,Ch'),
('(Heil-)Kunde des Geistes', 12, 0, 'Wissen', 3, 'Ve,Ve,Ch'),
('(Heil-)Kunde des Körpers', 12, 0, 'Wissen', 3, 'Ve,Ve,Fi'),
('Kriegskunst', 12, 0, 'Wissen', 3, 'Mu,Ve,Ch'),
('Magiekunde', 12, 0, 'Wissen', 3, 'Au,Ve,Ve'),
('Rechnen & Physik', 12, 0, 'Wissen', 3, 'Ve,Ve,Fi'),
('Rechts- & Staatskunst', 12, 0, 'Wissen', 3, 'Ve,Ve,Ch');

INSERT INTO names (name, name_group, gender) VALUES
('Alrik', 'DSA', 'male'),
('Alrika', 'DSA', 'female'),
('Damila', 'Sonnenreich', 'female'),
('Karn', 'MtG', 'neutral');