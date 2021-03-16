Create table Documents(
	id SERIAL primary key,
	user_id int,
	name_file varchar,
	path varchar,
	constraint fk_user Foreign key(user_id) references users(id)

);
--select * from Documents
--select * from users
create table users(
	id serial primary key,
	username varchar(50),
	password varchar,
	fullname varchar(255),
	email varchar(100),
	date_birthday date,
	created_on date,
	role varchar(50),
	email_confirmed bit,
	confirmed_on timestamp
);