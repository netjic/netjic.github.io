# mysql视图

> MySQL 视图（View）是一种虚拟存在的表，同真实表一样，视图也由列和行构成，但视图并不实际存在于数据库中。行和列的数据来自于定义视图的查询中所使用的表，并且还是在使用视图时动态生成的。
> 数据库中只存放了视图的定义，并没有存放视图中的数据，这些数据都存放在定义视图查询所引用的真实表中。使用视图查询数据时，数据库会从真实表中取出对应的数据。因此，视图中的数据是依赖于真实表中的数据的。一旦真实表中的数据发生改变，显示在视图中的数据也会发生改变。

视图一般用于查询很少用于修改数据 

可以进行查询、修改、更新和删除等操作
### 创建视图

```sql
create table class(
                   id int primary key auto_increment,
                   class varchar(10) not null comment '班级',
                   class_desc varchar(100) default '没有什么介绍' comment '介绍',
                   class_tea_name varchar(10) not null comment '班主任姓名'
);

insert into class values (1,'一班',null,'秦始皇'),
                         (2,'二班',null,'刘盈'),
                         (3,'三班',null,'刘启'),
                         (4,'四班',null,'刘彻'),
                         (6,'六班',null,'刘询'),
                         (7,'七班',null,'刘欣');

create view student_class AS
select s.id as student_id, name, gender, s.s_num, class, class_desc, class_tea_name
from student s
         left join class c on s.class_id = c.id;
```
### 使用视图
```sql
select name from student_class;
```
### 查看视图

```sql
describe student_class;
desc student_class;
-- 查看建视图语句
show create view student_class;
```
### 修改视图
#### 修改视图内容
有点类似于将原来的视图删除又重新创建了一个相同名字的视图
```sql
alter view student_class AS select name,gender,s.s_num,class,class_desc,class_tea_name from student s left join class c on s.class_id = c.id;
select * from student_class;
```
#### 修改视图名字
修改视图的名称可以先将视图删除，然后按照相同的定义语句进行视图的创建，并命名为新的视图名称。

### 删除视图
```sql
dorp view view_name;
```
