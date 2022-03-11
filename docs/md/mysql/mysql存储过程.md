# 存储过程

### 创建存储过程
**IN 输入参数:**

表示该参数的值必须在调用存储过程时指定，在存储过程中修改该参数的值不能被返回，为默认值

**OUT 输出参数:**

该值可在存储过程内部被改变，并可返回

**INOUT 输入输出参数:**

调用时指定，并且可被改变和返回


#### 无参存储过程
```sql
-- 无参数存储过程
delimiter $
create procedure student_all ()
begin
    select * from student;
end $
delimiter ;
```
（1）这里需要注意的是DELIMITER $和DELIMITER;两句， 
DELIMITER是分割符的意思，因为MySQL默认以";"为分隔 符，
如果我们没有声明分割符，那么编译器会把存储过程当成SQL语句进行处理，
则存储过程的编译过程会报错，所以要事先用DELIMITER关键字申明当 前段分隔符，
这样MySQL才会将";"当做存储过程中的代码，
不会执行这些代码，用完了之后要把分隔符还原。

#### 输出参数存储过程
```sql
-- 创建
delimiter $
create procedure student_count (out count int)
begin
    select count(8) into count from student;
end $
delimiter ;
 -- 使用
set @s_count = 0;
call  student_count(@s_count);
select @s_count;
```
#### 输入参数存储过程
```sql
delimiter $
create procedure select_by_id(in id int)
begin
    select * from student where student.id = id;
end $
delimiter ;

call select_by_id(1);
```

#### 输入参数输出参数存储过程
```sql
delimiter $
create procedure select_save_name_count(in name varchar(20),out count int)
begin
    select count(1) into count from student where student.name = name;
end $
delimiter ;

set @s_count = 0;
call select_save_name_count('李四',@s_count);
select @s_count;
```

#### inout存储过程
```sql
set @num = 10;
call square(@num);
select @num;
```
