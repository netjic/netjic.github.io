# 变量
- 局部变量
- 用户变量
- 会话变量
- 全局变量 
  
一、局部变量，只在当前begin/end代码块中有效
```sql
declare var_name [, var_name]... data_type [ DEFAULT value ];
declare c int default 0;
```
set语句语法形式set var_name=expr [, var_name=expr]...; 
set语句既可以用于局部变量的赋值，也可以用于用户变量的申明并赋值。
```sql
declare c int default 0;
set c=a+b;
select c as C;
```
或者用select …. into…形式赋值
```sql
select into 语句句式：select col_name[,...] into var_name[,...] table_expr [where...];
select count(8) into count from student;
select cloumn_1 ,cloumn_2 into var_1,var_2 from teable_name
```
二、用户变量，在客户端链接到数据库实例整个过程中用户变量都是有效的。  
MySQL中用户变量不用事前申明，在用的时候直接用“@变量名”使用就可以了。

第一种用法：set @num=1; 或set @num:=1; //这里要使用set语句创建并初始化变量，直接使用@num变量

第二种用法：select @num:=1; 或 select @num:=字段名 from 表名 where ……，

注意上面两种赋值符号，使用set时可以用“=”或“:=”，但是使用select时必须用“:=赋值”

用户变量与数据库连接有关，在连接中声明的变量，在存储过程中创建了用户变量后一直到数据库实例接断开的时候，变量就会消失。
在此连接中声明的变量无法在另一连接中使用。

用户变量的变量名的形式为@varname的形式。

名字必须以@开头。

声明变量的时候需要使用set语句，比如下面的语句声明了一个名为@a的变量。

set @a = 1;

声明一个名为@a的变量，并将它赋值为1，MySQL里面的变量是不严格限制数据类型的，它的数据类型根据你赋给它的值而随时变化 。（SQL SERVER中使用declare语句声明变量，且严格限制数据类型。） 
```sql
set @name = '';
select @name:=password from user limit 0,1; -- 变量只复制一个
#从数据表中获取一条记录password字段的值给@name变量。在执行后输出到查询结果集上面。
```
系统变量：

系统变量又分为全局变量与会话变量。

全局变量在MySQL启动的时候由服务器自动将它们初始化为默认值，这些默认值可以通过更改my.ini这个文件来更改。

会话变量在每次建立一个新的连接的时候，由MySQL来初始化。MySQL会将当前所有全局变量的值复制一份。来做为会话变量。

（也就是说，如果在建立会话以后，没有手动更改过会话变量与全局变量的值，那所有这些变量的值都是一样的。）

全局变量与会话变量的区别就在于，对全局变量的修改会影响到整个服务器，但是对会话变量的修改，只会影响到当前的会话（也就是当前的数据库连接）。
```sql
show session variables; -- 查看会话变量
```
```sql
show global variables -- 查看全局变量
```
系统变量在变量名前面有两个@
```sql
-- 改变会话的值
set session varname = value;
或者
set @@session.varname = value;
-- 设置会话变量
set session sort_buffer_size = 40000;
-- 查看系统变量
select @@global.sort_buffer_size;
select @@sort_buffer_size;
```
#### 会话变量
服务器为每个连接的客户端维护一系列会话变量。在客户端连接数据库实例时，使用相应全局变量的当前值对客户端的会话变量进行初始化。设置会话变量不需要特殊权限，但客户端只能更改自己的会话变量，而不能更改其它客户端的会话变量。会话变量的作用域与用户变量一样，仅限于当前连接。当当前连接断开后，其设置的所有会话变量均失效。
```sql
-- 设置会话变量
set session var_name = value;
set @@session.var_name = value;
set var_name = value;  #缺省session关键字默认认为是session

查看所有的会话变量
show session variables;
```
查看一个会话变量也有如下三种方式：
```sql
select @@var_name;
select @@session.var_name;
show session variables like "%var%";
```
####　全局变量
全局变量影响服务器整体操作。当服务器启动时，它将所有全局变量初始化为默认值。这些默认值可以在选项文件中或在命令行中指定的选项进行更改。要想更改全局变量，必须具有super权限。全局变量作用于server的整个生命周期，但是不能跨重启。即重启后所有设置的全局变量均失效。要想让全局变量重启后继续生效，需要更改相应的配置文件。
要设置一个全局变量，有如下两种方式：
```sql
set global var_name = value; //注意：此处的global不能省略。根据手册，set命令设置变量时若不指定GLOBAL、SESSION或者LOCAL，默认使用SESSION
set @@global.var_name = value; //同上
```
查看所有的全局变量 
```sql
show global variables; 
```
要想查看一个全局变量，有如下两种方式
```sql
select @@global.var_name;
show global variables like “%var%”;
```
