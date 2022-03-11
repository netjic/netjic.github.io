# 事务控制语言
> 事务: 一个或一组sql语句组成一个执行单元，这个执行单元要么全部执行，要么全部不执行

案例：转账 

小熊一号	1000 

小熊二号	1000

update 表 set 小熊一号的余额=500 where name='小熊一号';

意外

update 表 set 小熊二号的余额=1500 where name='小熊二号';

如果出现意外那么上面的语句执行成功，下面语句执行失败

那么小熊一号的余额就剩余500，而小熊二号的余额还是1000

这个不是我们想看到的，事务就用在这种场合，要么全部失败，要么全部执行

如果发生错误，整个单元回滚
##### 操作事务
```sql
-- 设置自动提交功能为禁用 (mysql默认自动提交 atuocommit=1)
SET autocommit=0;
-- 步骤1：开启事务
set autocommit=0;
-- 步骤2：编写事务中的SQL语句(select insert、update、delete语句)
-- 转账案例
update bank set money = money - 500 where name = '熊一';
update bank set money = money + 500 where name = '熊二';
commit;
-- 提交之后rollback是没用的
-- 再commit 之前rollback 中间的操作都会回到操作之前的状态
```

##### 查看mysql的存储引擎

`show engines;`

在MySQL中用的最多的存储引擎有：innodb myisam memory等 其中innodb支持事务，其他的不支持

##### 事务的ACID属性
1. 原子性: 
原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生 (一个事务中的sql 要么全部成功,要么全部失败)
2. 一致性:
事务必须使数据库从一个一致性状态变换成另外一个一致性状态(熊一加100,熊二减100)
3. 隔离性:
一个事务的执行不能被其他事务干扰，简单的说就是事务内部的操作及使用的数据对并发的事务是隔离的
并发执行的各个事务之间不能互相干扰(两个连接同时事务操作 互不影响 与隔离级别有关)
4. 持久性:
指一个事务一旦被提交，数据库中数据的改变是永久性的，
接下来的其他操作和数据库故障不应该对其他有任何影响

#### 数据库隔离级别
```sql
-- 查看数据库隔离级别
mysql5.5版本：select @@tx_isolation;
mysql8.0版本：select @@transaction_isolation;
```
- read-uncommitted 
- read-committed
- repeatable-read
- serializable
mysql默认隔离级别 repeatable-read
  
> serializable 串行化

两个连接 `set session transaction isolation level serializable`
```sql
- 事务A
set autocommit = 0;
update student set name = '广坤' where id = 5;
- 先不提交
- 事务B
set autocommit = 0;
select * from student where id = 5;
发现阻塞等待 事务A commit 
- 事务A提交
commit;
```
总结: serializable 一个事务操作的数据另一个事务不可以操作 (阻塞状态)
> repeatable-read 可重复读

```sql
-- AB set session transaction isolation level repeatable read;
-- 事务A
set autocommit=0;
select * from student;
insert into  student (name, class_id, gender) value ('吴三桂',4,'男');
-- 事务B
set autocommit=0;
select * from student;
-- 此时没有阻塞 查出的数据没有事务A插入的数据
-- 事务A 提交
commit ;
-- 事务B 查询
select * from student;  
-- 发现还是没有数据
-- 事务B 提交 
-- 事务B 重新开启事务
set autocommit=0;
select * from student;
-- 此时可以查询到数据

----------------------------------------

-- 幻读 针对插入
-- 事务A 
set autocommit =0;
insert into  student (name, class_id, gender) value ('吴三桂',7,'男');
--事务B
set autocommit =0;
select * from student;
update student set name='刘备' where class_id = 7;
-- 此时会出现阻塞状态 两个事务操作统一个数据后的数据处于等待
-- 事务AB 回滚

-- 重复上面的操作
-- 事务A 
set autocommit =0;
insert into  student (name, class_id, gender) value ('刘备',9,'男');
--事务B
set autocommit =0;
select * from student;
-- 看不到加入的数据
-- 事务A 提交
commit;
-- 事务B 更新
update student set name='刘备-1' where class_id = 9;
select * from student;
-- 发现有新加入的数据并且是更新后的数据
-- 此时的情况就是幻读
-- TODO delete 语句
```
总结: repeatable read 在可重复读隔离级别下，事务B只能在事务A修改过数据并提交后，自己也提交事务后，才能读取到事务B修改的数据。
事务A查询所有的数据 事务B在事务A查询后插入数据并提交 此时事务A查询不到此数据但可以修改此数据 这就是幻读.
幻读只发生insert操作中;

不可重复读 : 一个事务中 两次查询的数据不一样
> read-commit 读已提交
```sql
-- 事务A B
set session transaction isolation level read committed ;
select @@transaction_isolation;

-- 事务A
set autocommit =0;
select * from student;
-- 事务B
set autocommit =0;
select * from student;
-- 事务A
update student set test.student.name='鳌拜' where id = 19;
-- 事务B
select * from student; -- 没有事务A更新之后的数据 解决了脏读
-- 事务A 
commit;
-- 事务B 
select * from student; -- 不可重复读
commit;
```
总结:read-committed 读已提交 事务A只能读取到事务B提交的数据避免了脏读 但是事务B的两次查询数据不一直不可重复读;

> read-uncommitted 读未提交

```sql
-- 事务A B
set session transaction isolation level read uncommitted ;
select @@transaction_isolation;
-- 事务A
set autocommit =0;
select * from student;
update student set test.student.name='赵四' where id = 4;
-- 事务B
set autocommit =0;
select * from student; -- 此时id等于4的数据是事务A更新过后的数据 脏读
-- 事务A
rollback ;
-- 事务B
select * from student; -- 发现id等于4的数据是事务A更新之前的数据 不可重复读
commit;
```
总结: read-uncommitted

#### 三、MySQL事务隔离级别

| 事务隔离级别      | 脏读 | 不可重复读 |幻读|
| ----------|----------|----------|-----------|
|读未提交（read-uncommitted）	|是|	是|	是
|不可重复读（read-committed）	|否|	是|	是
|可重复读（repeatable-read）	|否|	否|	是
|串行化（serializable）	    |否|	否|	否
