DROP DATABASE IF EXISTS todo_db;
CREATE DATABASE todo_db;
USE todo_db;

CREATE TABLE todos
(
    id INT NOT NULL
    AUTO_INCREMENT,
    text VARCHAR
    (80) NOT NULL,
    completed BOOLEAN DEFAULT false,
    PRIMARY KEY
    (id)
);

    INSERT INTO todos
        (text)
    VALUES
        ("Mysql programmers get a lot of money");

    INSERT INTO todos
        (text)
    VALUES
        ("finish the course");

    INSERT INTO todos
        (text)
    VALUES
        ("have fun");

    -- view all todos
    SELECT *
    FROM todos;
    SELECT text, id
    FROM todos
    WHERE completed = false;

    -- update todos
    UPDATE todos 
SET text = "Live life"
WHERE id = 3;

    UPDATE todos 
SET completed = true
WHERE id = 3;

    -- delete a todo
    DELETE FROM todos WHERE id = 2;