
-- # FIX: ER_NOT_SUPPORTED_AUTH_MODE
-- # Changing plugin to *mysql_native_password* instead of *caching_sha2_password*
-- # @see: https://github.com/mysqljs/mysql/issues/1507#issuecomment-385224467
use mysql;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123';
ALTER USER 'users_service'@'%' IDENTIFIED WITH mysql_native_password BY '123';

-- # Initial data test
use users;
create table directory (user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email TEXT, phone_number TEXT);
insert into directory (email, phone_number) values ('homer@thesimpsons.com', '+1 888 123 1111');
insert into directory (email, phone_number) values ('marge@thesimpsons.com', '+1 888 123 1112');
insert into directory (email, phone_number) values ('maggie@thesimpsons.com', '+1 888 123 1113');
insert into directory (email, phone_number) values ('lisa@thesimpsons.com', '+1 888 123 1114');
insert into directory (email, phone_number) values ('bart@thesimpsons.com', '+1 888 123 1115');
