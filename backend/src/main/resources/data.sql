INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Ana', 'Evans', 'ana@gmail.com', '$2a$12$OgpAGS1x8Coe68v0ZJja9uJn/aBqUNMFQLtympBliGm5JmpC4SMTy');
INSERT INTO tb_user (first_name, last_name, email, password) VALUES ('Bob', 'Borba', 'bob@gmail.com', '$2a$12$BCZmh8iO/cib7aKmh.zC/.sbJ.DOIUtqDMqkvXePhmcFGga9z3YzK');

INSERT INTO tb_role (authority) VALUES ('ROLE_OPERATOR');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);

INSERT INTO tb_book (id, author, surname, title, publisher, edition, year) 
VALUES
(1, 'Paul', 'DEITEL', 'Java: como programar', 'Person', 10, 2020),
(2, 'Herbert', 'SCHILDT', 'Java para iniciantes: crie, compile e execute programas Java rapidamente', 'Sapienza', 3, 2014);
