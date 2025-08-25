CREATE TABLE IF NOT EXISTS product (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DOUBLE NOT NULL
);

INSERT INTO product (name, price) VALUES
('Produkt A', 10.50),
('Produkt B', 20.75),
('Produkt C', 6.66);