# 数据库操纵语言

> 所有的DML操作，都需要再执行事务提交语句commit, mysql数据库本身默认设置自动提交 ,oracle数据库本身默认不设置自动提交需要手动提交
#### 1.inster语句
```sql
insert into student (name, class_id, gender, s_num)
values ('李四', 1, '男', '2021000001');

insert into student value (6,'刘能',2,'男','2021000002');

insert into student (name, class_id, gender, s_num)
values ('李四', 1, '男', '2021000001'),
       ('刘能', 2, '男', '2021000002');

insert into student value (7,'刘能',2,'男','2021000002'),(8,'刘能',2,'男','2021000002');
```

#### 2.update语句

```sql
update student
set test.student.name = '孙大圣'
where id = 8;
update student
set class_id = 3,
    name     = '武则天',
    gender   = '女'
where id = 6;
```

#### 3.delete语句

```sql
delete
from student
where id = 2;
```
