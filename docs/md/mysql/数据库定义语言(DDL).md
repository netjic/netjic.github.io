# 数据库定义语言
> DDL 数据库定义语言
主要由create（添加）、alter（修改）、drop（删除）和 truncate（删除） 四个关键字完成。
#### 查看所有的数据库
```sql
show databases;
```
#### 创建数据库
```sql
create database `test`;
```
#### 使用选择数据库
```
use `test`;
```
#### 查看数据库中所有的表
```sql
use test;
show tables;
```
#### 创建表
```
create table if not exists student(
    id int primary key auto_increment,
    name varchar(10) not null ,
    class_id int not null ,
    gender enum('男','女') default '男'
);
```
#### 修改表
##### 1.添加字段
```
alter table  student add s_num varchar(11) comment '学号';
```
##### 2.删除字段
```
alter table student drop s_num;

alter table  student add s_num varchar(11) comment '学号';
```
##### 3.修改字段
```
alter table student modify s_num varchar(11) default '2021000000' comment '学号';

此修改相当于 将原来的这个字段的内容删掉 然后再添加约束
```
##### 修改字段以及字段名
```sql 
alter table student change s_num s_num_1 varchar(11) default '2021000000' comment '学号';
alter table student change s_num_1 s_num varchar(11) default '2021000000' comment '学号';
```
##### 4.修改表名
```sql
alter table student rename student_1;
alter table student_1 rename student;
```
##### 5.查看表字段以及定义
```sql
desc student;
```
##### 6. 删除表
```sql
drop table `table_name`;
```
```sql
truncate table `table_name`; 
```
drop 删除数据和表的结构(表没了)
truncate 删除数据(表还在数据没了)
#### 其它
##### 查看数据库支持的引擎和默认引擎
```sql
show engines;
```
##### 查看权限
```sql
show grants;
```
##### 查看表的状态 (需要use db_name打开数据库)
```sql
show table status ;
```
##### 显示表索引信息(需要先创建索引)
```
show index ;
```
##### 查看MySQL各种运行状态
```sql
show status ;
```
##### 查看全局变量
```sql
show global variables;
```
##### 查看会话变量
```sql
show session variables;
```
			