SHOW TABLES;

DESCRIBE usuarios;

CREATE TABLE usuarios(
    nome VARCHAR(50), 
    email VARCHAR(100),
    idade INT
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Fellipe Castro", 
    "fellipecastro@gmail.com", 
    16
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "João Silva", 
    "joaosilva@gmail.com", 
    18
);

INSERT INTO usuarios(nome, email, idade) VALUES(
    "Ana Maria", 
    "anamaria@gmail.com", 
    20
);

SELECT * FROM usuarios;

SELECT * FROM usuarios WHERE idade >= 18;

DELETE FROM usuarios; /*Deleta TODOS registros*/

DELETE FROM usuarios WHERE nome = "João Silva";