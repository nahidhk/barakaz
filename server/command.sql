
create table users (
    id int primary key auto_increment,
    name varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null unique,
    phone varchar(20),
    created_at timestamp default current_timestamp
);


create table catagory (
    id int primary key auto_increment,
    name varchar(255) not null unique,
    created_at timestamp default current_timestamp
)

create table subcatagory (
    id int primary key auto_increment,
    catagory_id int not null,
    name varchar(255) not null,
    created_at timestamp default current_timestamp,
    foreign key (catagory_id) references catagory(id)
)