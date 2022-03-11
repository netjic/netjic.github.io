# 数据库控制语言

####　1.创建用户
```sql
create user 'netjic'@'localhost' identity by '123456'
create user '用户名'@'%' identified by '123456'; --  % 可以从任意远程主机登陆

-- 查看密码
select host, user, password from mysql.user;               -- 5.7版本之前的
select host, user, authentication_string from mysql.user;  -- 5.7版本之后的，包括5.7
-- 修改密码
alter user 'netjic'@'localhost' identified by '123456';  -- root用户修改其它用户密码 -- 本用户可以修改自己密码
-- 修改登陆 host
update user set Host='localhost' where user = 'root';
update user set Host= '%' where user = 'netjic';

-- 更改用户名
rename user old_name to new_name; 
rename user 'netjic' to 'netjic_1';
rename user 'netjic_1' to 'netjic';
```
`查看数据库所有用户`
```sql
select user,Host from mysql.user;
```
#### 2.授权
`flush privileges ;` 
有时修改修改权限的时候 再查时发现没有改变此时刷新权限
##### 1. 查看用户所有权限
```sql
show grants for 'root'@'localhost';
show grants for 'netjic'@'localhost';
```


root 用户所有权限

#####　2. 授权
允许访问所有数据库下的所有表
```sql
-- 新版不需要 identified by '用户密码' ;
grant all privileges on *.* to '用户名'@'指定ip' identified by '用户密码' ;
```
允许访问指定数据库下的所有表
```sql
grant all privileges on test.* to '用户名'@'指定ip';
```
允许访问指定数据库下的指定表
```sql
grant all privileges on test.test to '用户名'@'指定ip';
```
列权限使用于一个给定表中的单一列
```sql
grant all (col1， col2， col3)  on test.test to '用户名'@'指定ip';
grant select (col1， col2， col3)  on test.test to '用户名'@'指定ip';
```
all表示所有权限, select表示只查权限, update表示只改权限等

授权
```sql
-- 授权该数据库下的指定表的查询权限 已测试
grant select on test.student to 'netjic'@'localhost';
grant select,insert on test.student to 'netjic'@'localhost'; -- 添加insert select权限不变
grant update on test.student to 'netjic'@'localhost'; -- 添加update权限
flush privileges; --刷新权限 可不加
```
授予某一数据库的某一表的某些字段的增删改查权限
```sql
grant select(name),update(name) on test.student to 'netjic'@'localhost';
```
##### 3.收回权限 (与授权相似 from关键字)
收回所有权限
```sql
revoke all privileges on test.student from 'netjic'@'localhost';
revoke all on test.student from 'netjic'@'localhost';
```
收回指定权限
```sql
revoke select on test.student from 'netjic'@'localhost';
```
#### 3.删除用户以及权限
```sql
drop user 用户名@主机地址;
```

#### mysql 权限分类
1. 数据权限 (库,表,字段)
   数据 select, insert, update, delete, file
2. 管理权限 (数据库库创建,临时表创建,主从部署,进程管理等)
   结构 create, alter index,drop,create temporary tables,show view,create routine,alter routine,
   execute,create view ,event, trigger
3. 程序权限 (触发器,存储过程,函数等)
   管理 grant,super,process,reload,shutdown,show datebases,lock tables,references,replication client,
   replication slave,create user
   
root 用户所用的权限 (所有库表)
```sql
show grants for 'root'@'localhost';
```
select, insert, update, delete, 
create, drop, reload, shutdown,
process, file, references, index, 
alter, show databases, super, 
create temporary tables, 
lock tables, execute, replication slave, 
replication client, create view,
show view, create routine, 
alter routine, create user, event,
trigger, create tablespace, create role,
drop role
---------------------------
application_password_admin,
audit_admin,backup_admin,
binlog_admin,binlog_encryption_admin,
clone_admin,connection_admin,
encryption_key_admin,group_replication_admin,
innodb_redo_log_archive,innodb_redo_log_enable,
persist_ro_variables_admin,replication_applier,
replication_slave_admin,resource_group_admin,
resource_group_user,role_admin,
service_connection_admin,session_variables_admin,
set_user_id,show_routine,system_user,
system_variables_admin,table_encryption_admin,
xa_recover_admin
--------------------------------------------
proxy

#### 授权示例
1. grant 所有权限

```sql
grant all privileges on *.* to 'USERNAME'@'HOST';
flush privileges;
```

2. grant super权限在*.*上(super权限可以对全局变量更改)；

```sql
grant super on *.* to 'USERNAME'@'HOST';
flush privileges;
```
3. grant某个库下所有表的所有权限

```sql
grant all privileges on DB_NAME.* to 'USERNAME'@'HOST';
flush privileges;
```

4. grant某个库下所有表的select权限
```sql
grant select on DB_NAME.* to 'USERNAME'@'HOST';
flush privileges;
```
5. grant某个库下某个表的insert权限

```sql
grant insert on  DB_NAME.TABLE_NAME to 'USERNAME'@'HOST';
flush privileges;
```
6. grant某个库下某个表的update权限
```sql
grant update on DB_NAME.TABLE_NAME to 'USERNAME'@'HOST';
flush privileges;
```

7. grant某个库下某个表的某个字段update权限

```sql
grant update on DB_NAME.TABLE_NAME to 'USERNAME'@'HOST';
flush privileges;
```
8.通过GRANT语句中的USAGE权限，可以创建账户而不授予任何权限

```sql
-- 创建新用户时 原始权限
grant usage on *.* to 'USERNAME'@'HOST';
flush privileges;
```


9. grant创建、修改、删除MySQL数据表结构权限
```sql
grant create on testdb.* to developer@'192.168.0.%';
grant alter on testdb.* to developer@'192.168.0.%';
grant drop on testdb.* to developer@'192.168.0.%';
flush privileges;
```

10. grant操作MySQL外键权限
```sql
grant references on testdb.* to developer@'192.168.0.%';
flush privileges;
```
11. grant操作MySQL临时表权限
```sql
grant create temporary tables on testdb.* to developer@'192.168.0.%';
flush privileges;
```
12. grant操作MySQL索引权限
```sql
grant index on testdb.* to developer@'192.168.0.%';
flush privileges;
```
13.grant操作MySQL视图、查看视图源代码权限
```sql
grant create view on testdb.* to developer@'192.168.0.%';
grant show view on testdb.* to developer@'192.168.0.%';
flush privileges;

```
14. grant操作MySQL存储过程、存储函数权限
```sql
grant create routine on testdb.* to developer@'192.168.0.%';
grant alter routine on testdb.* to developer@'192.168.0.%';
grant execute on testdb.* to developer@'192.168.0.%';
flush privileges;
```

15.PROXY特殊权限如果想让某个用户具有给他人赋予权限的能力，那么就需要proxy权限了。当你给一个用户赋予all权限之后，你查看mysql.user表会发现Grant_priv字段还是为N，表示其没有给他人赋予权限的权限。
可以看到其本身有PROXY权限，并且这个语句跟一般授权语句还不太一样。所以如果想让一个远程用户有给他人赋予权限的能力，就需要给此用户PROXY权限，如下：
```sql
grant all on *.* to 'test'@'%' identified by 'helloWORD';
GRANT PROXY ON ''@'' TO 'test'@'%' WITH GRANT OPTION;
flush privileges;
```
16. 查看用户的权限
```sql
Mysql> show grants for 'USERNAME'@'HOST';
```
17. 移除用户权限
移除tom用户对于db.xsb的权限
```sql
revoke all on db.xsb from 'tom'@'localhost';
```
刷新授权表;
```sql
flush privileges;
```
使用REVOKE收回权限之后，用户帐户的记录将从db、host、tables_priv、columns_priv表中删除，但是用户帐号依然在user表中保存。
