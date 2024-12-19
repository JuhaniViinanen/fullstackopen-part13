CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES ('Matti Luukkainen', 'https://fullstackopen.com/en/', 'Deep Div
e Into Modern Web Development'), ('W3Schools', 'https://www.w3schools.com/', 'Learn to Code');