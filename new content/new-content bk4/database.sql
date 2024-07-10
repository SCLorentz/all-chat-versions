CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO favorites (user_id, content_id) VALUES (1, 10);

DELETE FROM favorites WHERE user_id = 1 AND content_id = 10;