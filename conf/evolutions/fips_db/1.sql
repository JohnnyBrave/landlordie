# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table department_member (
  department_id                 varchar(255) not null,
  email                         varchar(255) not null,
  default_department            tinyint(1) default 0,
  constraint pk_department_member primary key (department_id,email)
);

create table departments (
  department_id                 varchar(255) not null,
  department_name               varchar(255),
  constraint pk_departments primary key (department_id)
);

create table houses (
  house_no                      varchar(255) not null,
  name                          varchar(255),
  constraint pk_houses primary key (house_no)
);

create table networks (
  network_id                    varchar(255) not null,
  network_name                  varchar(255),
  network_department            varchar(255),
  constraint pk_networks primary key (network_id)
);

create table permission (
  id                            integer auto_increment not null,
  module_name                   varchar(255),
  constraint pk_permission primary key (id)
);

create table role_permission (
  permission_id                 integer not null,
  user_ref_role_role_code       varchar(255) not null,
  constraint pk_role_permission primary key (permission_id,user_ref_role_role_code)
);

create table user_ref_role (
  role_code                     varchar(255) not null,
  role                          varchar(255),
  constraint pk_user_ref_role primary key (role_code)
);

create table tenants (
  tenant_id                     varchar(255) not null,
  id_type                       varchar(255),
  id_number                     varchar(255),
  first_name                    varchar(255),
  middle_name                   varchar(255),
  last_name                     varchar(255),
  phone_no                      varchar(255),
  tenant_house_no               varchar(255),
  constraint pk_tenants primary key (tenant_id)
);

create table user_role (
  role_id                       varchar(255) not null,
  email                         varchar(255) not null,
  department_id                 varchar(255) not null,
  role_code                     varchar(255),
  constraint pk_user_role primary key (role_id,email,department_id)
);

create table users (
  email                         varchar(255) not null,
  password                      varchar(255),
  first_name                    varchar(255),
  constraint pk_users primary key (email)
);

alter table department_member add constraint fk_department_member_department_id foreign key (department_id) references departments (department_id) on delete restrict on update restrict;
create index ix_department_member_department_id on department_member (department_id);

alter table department_member add constraint fk_department_member_email foreign key (email) references users (email) on delete restrict on update restrict;
create index ix_department_member_email on department_member (email);

alter table role_permission add constraint fk_role_permission_permission foreign key (permission_id) references permission (id) on delete restrict on update restrict;
create index ix_role_permission_permission on role_permission (permission_id);

alter table role_permission add constraint fk_role_permission_user_ref_role foreign key (user_ref_role_role_code) references user_ref_role (role_code) on delete restrict on update restrict;
create index ix_role_permission_user_ref_role on role_permission (user_ref_role_role_code);

alter table tenants add constraint fk_tenants_tenant_house_no foreign key (tenant_house_no) references houses (house_no) on delete restrict on update restrict;
create index ix_tenants_tenant_house_no on tenants (tenant_house_no);

alter table user_role add constraint fk_user_role_email foreign key (email) references users (email) on delete restrict on update restrict;
create index ix_user_role_email on user_role (email);

alter table user_role add constraint fk_user_role_department_id foreign key (department_id) references departments (department_id) on delete restrict on update restrict;
create index ix_user_role_department_id on user_role (department_id);

alter table user_role add constraint fk_user_role_role_code foreign key (role_code) references user_ref_role (role_code) on delete restrict on update restrict;
create index ix_user_role_role_code on user_role (role_code);


# --- !Downs

alter table department_member drop foreign key fk_department_member_department_id;
drop index ix_department_member_department_id on department_member;

alter table department_member drop foreign key fk_department_member_email;
drop index ix_department_member_email on department_member;

alter table role_permission drop foreign key fk_role_permission_permission;
drop index ix_role_permission_permission on role_permission;

alter table role_permission drop foreign key fk_role_permission_user_ref_role;
drop index ix_role_permission_user_ref_role on role_permission;

alter table tenants drop foreign key fk_tenants_tenant_house_no;
drop index ix_tenants_tenant_house_no on tenants;

alter table user_role drop foreign key fk_user_role_email;
drop index ix_user_role_email on user_role;

alter table user_role drop foreign key fk_user_role_department_id;
drop index ix_user_role_department_id on user_role;

alter table user_role drop foreign key fk_user_role_role_code;
drop index ix_user_role_role_code on user_role;

drop table if exists department_member;

drop table if exists departments;

drop table if exists houses;

drop table if exists networks;

drop table if exists permission;

drop table if exists role_permission;

drop table if exists user_ref_role;

drop table if exists tenants;

drop table if exists user_role;

drop table if exists users;

