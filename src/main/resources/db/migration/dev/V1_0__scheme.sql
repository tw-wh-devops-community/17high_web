CREATE TABLE activity (
  id int(20) NOT NULL AUTO_INCREMENT,
  end_time datetime DEFAULT NULL,
  imageurl varchar(255) DEFAULT NULL,
  location varchar(255)  DEFAULT NULL,
  description varchar(255) DEFAULT NULL,
  name varchar(255) DEFAULT NULL,
  start_time datetime DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  sponsor varchar(255) DEFAULT NULL,
  guest varchar(255) DEFAULT NULL,
  type varchar(10)
);
