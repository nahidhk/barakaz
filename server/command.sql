
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

CREATE TABLE adslink (
    id INT PRIMARY KEY AUTO_INCREMENT,
    imgname VARCHAR(255) NOT NULL,
    is_visible BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    products_category_id INT NOT NULL,
    products_subcategory_id INT NOT NULL,
    
    products_image VARCHAR(255),
    products_name VARCHAR(255) NOT NULL,
    products_badge_id INT,
    
    products_new_price DECIMAL(10,2) NOT NULL,
    products_old_price DECIMAL(10,2),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Keys
    FOREIGN KEY (products_category_id) 
    REFERENCES catagory(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    FOREIGN KEY (products_subcategory_id) 
    REFERENCES subcatagory(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE

    FOREIGN KEY (products_badge_id) 
    REFERENCES tags(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE tags(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
)