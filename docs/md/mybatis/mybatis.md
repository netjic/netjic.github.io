# mybatis

参考 http://mybatis.javaboy.org/

## 入门

### 项目搭建

![image-20220305133306980](mybatis.assets/image-20220305133306980.png)

### 准备一个数据库

```mysql
CREATE DATABASE /*!32312 IF NOT EXISTS */`mybatis01`;
USE `mybatis01`;

# DROP TABLE IF EXISTS `user`;

CREATE TABLE `user`
(
    `id`       int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    `address`  varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 8
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

/*Data for the table `user` */

insert into `user`(`id`, `username`, `address`)
values (1, 'javaboy123', 'www.javaboy.org'),
       (3, 'javaboy', 'spring.javaboy.org'),
       (4, '张三', '深圳'),
       (5, '李四', '广州'),
       (6, '王五', '北京');


```

### 接下来创建一个普通的 Maven 工程

不用创建 Web 工程，JavaSE 工程即可。项目创建完成后，添加 MyBatis 依赖：

```xml
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.22</version>
        </dependency>
```

### 创建 MyBatis 配置文件

在resources下创建mybatis-config.xml文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis01?serverTimezone=Asia/Shanghai"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>

```

### 创建mapper文件

在resources目录下创建mapper目录然后创建UserMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.netjic.mymapper">

    <select id="getUserById" resultType="com.netjic.entity.User">
        select *
        from user
        where id = #{id};
    </select>
</mapper>

```

namepace **这里**可以随便写，保证唯一，因为通过这个namespace定位到这个xml文件执行响应sql语句

### 创建实体类

User.java

```java
public class User {
    private Integer id;
    private String username;
    private String address;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", address='" + address + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

### 创建主类

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        User user = (User) sqlSession.selectOne("com.netjic.mymapper.getUserById", 3);
        System.out.println(user);
        sqlSession.close();
    }
}
```

selectOne方法参数 第一个参数是定位到相应的xml文件再定位到方法，第二个参数是sql所需要的参数

### 运行结果

User{id=3, username='javaboy', address='spring.javaboy.org'}

### 增删改查

#### 增

在xml中添加 SQL 插入语句：

```xml
<insert id="addUser" parameterType="com.netjic.entity.User">
    insert into user (username,address) values (#{username},#{address});
</insert>
```

测试

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        User user = new User();
        user.setAddress("上海");
        user.setUsername("netjic");
        int insert = sqlSession.insert("mymapper1.addUser", user);
        System.out.println(insert);
        sqlSession.close();
        sqlSession.commit()
    }
}
```

结果

```
1
```

#### 删

删除操作比较容易，首先在 UserMapper.xml 中定义删除 SQL：

```xml
<delete id="deleteUserById" parameterType="java.lang.Integer">
	delete
	from user
	where id = #{id}
</delete>
```

测试

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        int delete = sqlSession.delete("mymapper1.deleteUserById", 3);
        System.out.println(delete);
        sqlSession.commit();
        sqlSession.close();
    }
}
```

结果：

```
1
```

#### 改

修改操作，也是先定义 SQL：

```xml
<update id="updateUser" parameterType="com.netjic.entity.User">
    update user set username = #{username} where id=#{id};
</update>
```

测试：

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        User user = new User();
        user.setUsername("netjic");
        user.setId(4);
        int update = sqlSession.update("mymapper1.updateUser", user);
        System.out.println(update);
        sqlSession.commit();
        sqlSession.close();
    }
}
```

结果：

```
1
```

#### 查

HelloWorld 中展示了根据 id 查询一条记录，这里来看一个查询所有：

```xml
<select id="getAllUser" resultType="com.netjic.entity.User">
    select * from user
</select>
```

测试：

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        List<User> list = sqlSession.selectList("mymapper1.getAllUser");
        System.out.println(list);
    }
}
```

### 引入Mapper

项目结构

![image-20220305142934057](mybatis.assets/image-20220305142934057.png)

mybatis-config.xml添加mapper位置

```xml
<mappers>
	<mapper resource="mapper/UserMapper.xml"/>
	<mapper resource="mapper/UserMapper2.xml"/>
</mappers>
```

修改userMapper2.xml文件 namespace位置是对应mapper位置

```xml
<mapper namespace="com.netjic.dao.UserDao">
```

增加UserDao接口

```java
public interface UserDao {
    User getUserById(Integer id);
    List<User> getAllUser();
    Integer addUser(User user);
    Integer deleteUserById(Integer id);
    Integer updateUser(User user);
}
```

mapper接口中的方法名、返回类型、方法参数对应xml文件中的 id resultType param

测试：

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        System.out.println(mapper.getAllUser());
        User user = new User();
        user.setUsername("小明");
        user.setAddress("青浦区");
        System.out.println(mapper.addUser(user));
        System.out.println(mapper.getUserById(4));
        System.out.println(mapper.deleteUserById(4));
        User user1 = new User();
        user1.setId(5);
        user1.setAddress("青浦区");
        System.out.println(mapper.updateUser(user1));
    }
}
```

sqlSession.getMapper(UserDao.class); com.netjic.dao.UserDao定位到xml文件，根据mapper 定位到具体的sql语句，组装sql语句，然后执行

## 全局配置

### properties

properties 可以用来引入一个外部配置，最近常见的例子就是引入数据库的配置文件，例如我们在 resources 目录下添加一个 db.properties 文件作为数据库的配置文件，文件内容如下：

```properties
db.username=root
db.password=123
db.driver=com.mysql.cj.jdbc.Driver
db.url=jdbc:mysql:///test01?serverTimezone=Asia/Shanghai
```

然后，利用 mybatis-config.xml 配置文件中的 properties 属性，引入这个配置文件，然后在 DataSource 中使用这个配置文件，最终配置如下：

```xml
<configuration>
    <properties resource="db.properties"></properties>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${db.driver}"/>
                <property name="url" value="${db.url}"/>
                <property name="username" value="${db.username}"/>
                <property name="password" value="${db.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="org.javaboy.mybatis.mapper"/>
    </mappers>
</configuration>
```

### settings

### typeAliases

#### MyBatis 自带的别名

| 别名       | 映射的类型 |
| :--------- | :--------- |
| _byte      | byte       |
| _long      | long       |
| _short     | short      |
| _int       | int        |
| _integer   | int        |
| _double    | double     |
| _float     | float      |
| _boolean   | boolean    |
| string     | String     |
| byte       | Byte       |
| long       | Long       |
| short      | Short      |
| int        | Integer    |
| integer    | Integer    |
| double     | Double     |
| float      | Float      |
| boolean    | Boolean    |
| date       | Date       |
| decimal    | BigDecimal |
| bigdecimal | BigDecimal |

本来，我们在 Mapper 中定义数据类型时，需要写全路径，如下：

```xml
<select id="getUserCount" resultType="java.lang.Integer">
    select count(*) from user ;
</select>
```

但是，每次写全路径比较麻烦。这种时候，我们可以用类型的别名来代替，例如用 int 做 Integer 的别名：

```xml
<select id="getUserCount" resultType="int">
    select count(*) from user ;
</select>
```

####  自定义别名

我们自己的对象，在 Mapper 中定义的时候，也是需要写全路径：

```xml
<select id="getAllUser" resultType="org.javaboy.mybatis.model.User">
    select * from user;
</select>
```

这种情况下，写全路径也比较麻烦，我们可以给我们自己的 User 对象取一个别名，在 mybatis-config.xml 中添加 typeAliases 节点：

```xml
<configuration>
    <properties resource="db.properties"></properties>
    <typeAliases>
        <typeAlias type="org.javaboy.mybatis.model.User" alias="javaboy"/>
    </typeAliases>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${db.driver}"/>
                <property name="url" value="${db.url}"/>
                <property name="username" value="${db.username}"/>
                <property name="password" value="${db.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name="org.javaboy.mybatis.mapper"/>
    </mappers>
</configuration>
```

这里，我们给 User 对象取了一个别名叫 javaboy，然后，我们就可以在 Mapper 中直接使用 javaboy 来代替 User 对象了：

```xml
<select id="getAllUser" resultType="javaboy">
    select * from user;
</select>
```

但是，这种一个一个去枚举对象的过程非常麻烦，我们还可以批量给对象定义别名，批量定义主要是利用包扫描来做，批量定义默认的类的别名，是类名首字母小写，例如如下配置：

```xml
<typeAliases>
    <package name="org.javaboy.mybatis.model"/>
</typeAliases>
```

这个配置就表示给 org.javaboy.mybatis.model 包下的所有类取别名，默认的别名就是类名首字母小写。这个时候，我们在 Mapper 中，就可以利用 user 代替 User 全路径了：

```xml
<select id="getAllUser" resultType="user">
    select * from user;
</select>
```

**在最新版中，批量定义的别名，类名首字母也可以不用小写，在实际开发中，我们一般使用第二种方式（批量定义的方式）**

### typeHandlers

在 MyBatis 映射中，能够自动将 Jdbc 类型映射为 Java 类型。默认的映射规则，如下：

| 类型处理器              | Java类型              | JDBC类型                                                   |
| :---------------------- | :-------------------- | :--------------------------------------------------------- |
| BooleanTypeHandler      | Boolean，boolean      | 任何兼容的布尔值                                           |
| ByteTypeHandler         | Byte，byte            | 任何兼容的数字或字节类型                                   |
| ShortTypeHandler        | Short，short          | 任何兼容的数字或短整型                                     |
| IntegerTypeHandler      | Integer，int          | 任何兼容的数字和整型                                       |
| LongTypeHandler         | Long，long            | 任何兼容的数字或长整型                                     |
| FloatTypeHandler        | Float，float          | 任何兼容的数字或单精度浮点型                               |
| DoubleTypeHandler       | Double，double        | 任何兼容的数字或双精度浮点型                               |
| BigDecimalTypeHandler   | BigDecimal            | 任何兼容的数字或十进制小数类型                             |
| StringTypeHandler       | String                | CHAR和VARCHAR类型                                          |
| ClobTypeHandler         | String                | CLOB和LONGVARCHAR类型                                      |
| NStringTypeHandler      | String                | NVARCHAR和NCHAR类型                                        |
| NClobTypeHandler        | String                | NCLOB类型                                                  |
| ByteArrayTypeHandler    | byte[]                | 任何兼容的字节流类型                                       |
| BlobTypeHandler         | byte[]                | BLOB和LONGVARBINARY类型                                    |
| DateTypeHandler         | Date（java.util）     | TIMESTAMP类型                                              |
| DateOnlyTypeHandler     | Date（java.util）     | DATE类型                                                   |
| TimeOnlyTypeHandler     | Date（java.util）     | TIME类型                                                   |
| SqlTimestampTypeHandler | Timestamp（java.sql） | TIMESTAMP类型                                              |
| SqlDateTypeHandler      | Date（java.sql）      | DATE类型                                                   |
| SqlTimeTypeHandler      | Time（java.sql）      | TIME类型                                                   |
| ObjectTypeHandler       | 任意                  | 其他或未指定类型                                           |
| EnumTypeHandler         | Enumeration类型       | VARCHAR-任何兼容的字符串类型，作为代码存储（而不是索引）。 |

前面案例中，之所以数据能够接收成功，是因为有上面这些默认的类型处理器，处理基本数据类型，这些够用了，特殊类型，需要我们自定义类型处理器。

比如，我有一个用户爱好的字段，这个字段，在对象中，是一个 List 集合，在数据库中，是一个 VARCHAR 字段，这种情况下，就需要我们自定义类型转换器，自定义的类型转换器提供两个功能：

1. 数据存储时，自动将 List 集合，转为字符串（格式自定义）
2. 数据查询时，将查到的字符串再转为 List 集合

首先，在数据表中添加一个 favorites 字段：

修改user表 添加字段favorites

修改User类

```java
public class User {
    private Integer id;
    private String username;
    private String address;
    private List<String> favorites;

    public List<String> getFavorites() {
        return favorites;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", address='" + address + '\'' +
                ", favorites=" + favorites +
                '}';
    }

    public void setFavorites(List<String> favorites) {
        this.favorites = favorites;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```



```java
@MappedJdbcTypes(JdbcType.VARCHAR)
@MappedTypes(List.class)
public class List2VarcharHandler implements TypeHandler<List<String>> {
    @Override
    public void setParameter(PreparedStatement ps, int i, List<String> parameter, JdbcType jdbcType) throws SQLException {
        StringBuffer sb = new StringBuffer();
        for (String s : parameter) {
            sb.append(s).append(",");
        }
        ps.setString(i, sb.toString());
    }
    @Override
    public List<String> getResult(ResultSet rs, String columnName) throws SQLException {
        String favs = rs.getString(columnName);
        if (favs != null) {
            return Arrays.asList(favs.split(","));
        }
        return null;
    }
    @Override
    public List<String> getResult(ResultSet rs, int columnIndex) throws SQLException {
        String favs = rs.getString(columnIndex);
        if (favs != null) {
            return Arrays.asList(favs.split(","));
        }
        return null;
    }
    @Override
    public List<String> getResult(CallableStatement cs, int columnIndex) throws SQLException {
        String favs = cs.getString(columnIndex);
        if (favs != null) {
            return Arrays.asList(favs.split(","));
        }
        return null;
    }
}
```

- 首先在这个自定义的类型转换器上添加 @MappedJdbcTypes 注解指定要处理的 Jdbc 数据类型，另外还有一个注解是 @MappedTypes 指定要处理的 Java 类型，这两个注解结合起来，就可以锁定要处理的字段是 favorites 了。
- setParameter 方法看名字就知道是设置参数的，这个设置过程由我们手动实现，我们在这里，将 List 集合中的每一项，用一个 , 串起来，组成一个字符串。
- getResult 方法，有三个重载方法，其实都是处理查询的。

接下来，修改插入的 Mapper：

```xml
<insert id="addUser" parameterType="com.netjic.entity.User">
    insert into user (username,address,favorites) values (#{username},#{address},#{favorites,typeHandler=com.netjic.typeHandlers.List2VarcharHandler});
</insert>
```

在mybatis-config.xml中加入

```xml
<typeHandlers>
	<package name="com.netjic.typeHandlers"/>
</typeHandlers>
```

测试

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        User user = new User();
        user.setUsername("小明");
        user.setAddress("青浦区");
        List<String> list = new ArrayList();
        list.add("篮球");
        list.add("足球");
        list.add("羽毛球");
        user.setFavorites(list);
        System.out.println(mapper.addUser(user));
        List<User> allUser = mapper.getAllUser();
        System.out.println(allUser);
        sqlSession.commit();
        sqlSession.close();
    }
}
```

接下来去查询，查询过程中，就会自动将字符串转为 List 集合了。

为什么会将字符串转为list

因为Jdbc类型是varchar，而对应的实体类该字段的类型是List

`@MappedJdbcTypes(JdbcType.VARCHAR)`  `@MappedTypes(List.class)`

如果对应的实体类字段是String就不会转

### mapper

### Mapper

Mapper 配置的几种方法：

- `<mapper resource=" " />`

使用相对于类路径的资源，即 XML 的定位，从 classpath 开始写。

如：

```
<mapper resource="mapping/User.xml" />
```

- `<mapper url="" />`

使用完全限定路径，相当于使用绝对路径，这种方式使用非常少。

如：

```
<mapper url="file:///D:\demo\xxx\User.xml" />
```

- `<mapper class=" " />`

使用 mapper 接口类路径，注意：此种方法要求 mapper 接口名称和 mapper 映射文件名称相同，且放在同一个目录中

如：

```
<mapper class="org.sang.mapper.UserMapper"/>
```

- `<package name=""/>`

注册指定包下的所有 mapper 接口

如：

```
<package name="org.sang.mybatis.mapper"/>
```

注意：此种方法要求 mapper 接口名称和 mapper 映射文件名称相同，且放在同一个目录中。实际项目中，多采用这种方式。

## mapper映射文件

### parameterType

这个表示输入的参数类型。

这是一个非常非常高频的面试题，虽然很简单。在面试中，如果涉及到 MyBatis，一般情况下，都是这个问题。

在 MyBatis 中，我们在 mapper 引用变量时，默认使用的是 `#`，像下面这样：

```xml
<select id="getUserById" resultType="org.javaboy.mybatis.model.User">
    select * from user where id=#{id};
</select>
```

除了使用 `#` 之外，我们也可以使用 `$` 来引用一个变量：

```xml
<select id="getUserById" resultType="org.javaboy.mybatis.model.User">
    select * from user where id=${id};
</select>
```

在旧的 MyBatis 版本中，如果使用 `$`，变量需要通过 @Param 取别名，在最新的 MyBatis 中，无论是 `#` 还是 `$`，如果只有一个参数，可以不用取别名，如下：

```
public interface UserMapper {
    User getUserById(Integer id);
}
```

既然 `#` 和 `$` 符号都可以使用，那么他们有什么区别呢？

在 MyBatis 中，`$` 相当于是参数拼接的方式，而 `#` 则相当于是占位符的方式。

一般来说，由于参数拼接的方式存在 SQL 注入的风险，因此我们使用较少，但是在一些特殊的场景下，又不得不使用这种方式。

有的 SQL 拼接实际上可以通过数据库函数来解决，例如模糊查询：

```xml
<select id="getUserByName" resultType="org.javaboy.mybatis.model.User">
    select * from user where username like concat('%',#{name},'%');
</select>
```

但是有的 SQL 无法使用 `#` 来拼接，例如传入一个动态字段进来，假设我想查询所有数据，要排序查询，但是排序的字段不确定，需要通过参数传入，这种场景就只能使用 `$`，例如如下方法：

```
List<User> getAllUser(String orderBy);
```

定义该方法对应的 XML 文件：

```
<select id="getAllUser" resultType="user">
    select * from user order by ${orderBy}
</select>
```

### 简单类型

简单数据类型传递比较容易，像前面的根据 id 查询一条记录就算是这一类的。

这里再举一个例子，比如根据 id 修改用户名：

```java
Integer updateUsernameById(String username, Integer id);
```

再定义该方法对应的 mapper：

```xml
<update id="updateUsernameById">
    update user set username = #{username} where id=#{id};
</update>
```

此时，如果直接调用该方法，会抛出异常：

这里是说，找不到我们定义的 username 和 id 这两个参数。同时，这个错误提示中指明，可用的参数名是 [arg1, arg0, param1, param2]，相当于我们自己给变量取的名字失效了，要使用系统提供的默认名字，默认名字实际上是两套体系：

第一套就是 arg0、arg1、、、、 第二套就是 param1、param2、、、

注意，这两个的下标是不一样的。

因此，按照错误提示，我们将参数改为下面这样：

```xml
<update id="updateUsernameById">
    update user set username = #{arg0} where id=#{arg1};
</update>
```

或者下面这样：

```xml
<update id="updateUsernameById">
    update user set username = #{param1} where id=#{param2};
</update>
```

这两种方式，都可以使该方法顺利执行。

但是，默认的名字不好记，容易出错，我们如果想要使用自己写的变量的名字，可以通过给参数添加 @Param 来指定参数名（一般在又多个参数的时候，需要加），一旦用 @Param 指定了参数类型之后，可以省略掉参数类型，就是在 xml 文件中，不用定义 parameterType 了：

```java
Integer updateUsernameById(@Param("username") String username, @Param("id") Integer id);
```

这样定义之后，我们在 mapper.xml 文件中，就可以直接使用 username 和 id 来引用变量了。

#### 对象参数

对象参数。

例如添加一个用户：

```
Integer addUser(User user);
```

对应的 mapper 文件如下：

```
<insert id="addUser" parameterType="org.javaboy.mybatis.model.User">
    insert into user (username,address,favorites) values (#{username},#{address},#{favorites,typeHandler=org.javaboy.mybatis.typehandler.List2VarcharHandler});
</insert>
```

我们在引用的时候，直接使用属性名就能够定位到对象了。如果对象存在多个，我们也需要给对象添加 @Param 注解，如果给对象添加了 @Param 注解，那么对象属性的引用，会有一些变化。如下：

```java
Integer addUser(@Param("user") User user);
```

如果对象参数添加了 @Param 注解，Mapper 中的写法就会发生变化：

```xml
<insert id="addUser" parameterType="org.javaboy.mybatis.model.User">
    insert into user (username,address,favorites) values (#{user.username},#{user.address},#{user.favorites,typeHandler=org.javaboy.mybatis.typehandler.List2VarcharHandler});
</insert>
```

注意多了一个前缀，这个前缀不是变量名，而是 @Param 注解中定义名称。

如果对象中还存在对象，用 . 继续取访问就可以了。

#### Map 参数

一般不推荐在项目中使用 Map 参数。如果想要使用 Map 传递参数，技术上来说，肯定是没有问题的。

```
Integer updateUsernameById(HashMap<String,Object> map);
```

XML 文件写法如下：

```
<update id="updateUsernameById">
    update user set username = #{username} where id=#{id};
</update>
```

引用的变量名，就是 map 中的 key。基本上和实体类是一样的，如果给 map 取了别名，那么在引用的时候，也要将别名作为前缀加上，这一点和实体类也是一样的。

### resultType

resultType 是返回类型，在实际开发中，如果返回的数据类型比较复杂，一般我们使用 resultMap，但是，对于一些简单的返回，使用 resultType 就够用了。

resultType 返回的类型可以是简单类型，可以是对象，可以是集合，也可以是一个 hashmap，如果是 hashmap，map 中的 key 就是字段名，value 就是字段的值。

输出 pojo 对象和输出 pojo 列表在 sql 中定义的 resultType 是一样的。 返回单个 pojo 对象要保证 sql 查询出来的结果集为单条，内部使用 sqlSession.selectOne 方法调用，mapper 接口使用 pojo 对象作为方法返回值。返回 pojo 列表表示查询出来的结果集可能为多条，内部使用 sqlSession.selectList 方法，mapper 接口使用 List 对象作为方法返回值。

### resultMap

在实际开发中，resultMap 是使用较多的返回数据类型配置。因为实际项目中，一般的返回数据类型比较丰富，要么字段和属性对不上，要么是一对一、一对多的查询，等等，这些需求，单纯的使用 resultType 是无法满足的，因此我们还需要使用 resultMap，也就是自己定义映射的结果集。

先来看一个基本用法：

首先在 mapper.xml 中定义一个 resultMap：

```xml
<resultMap id="MyResultMap" type="org.javaboy.mybatis.model.User">
    <id column="id" property="id"/>
    <result column="username" property="username"/>
    <result column="address" property="address"/>
</resultMap>
```

在这个 resultMap 中，id 用来描述主键，column 是数据库查询出来的列名，property 则是对象中的属性名。

然后在查询结果中，定义返回值时使用这个 ResultMap：

```xml
<select id="getUserById" resultMap="MyResultMap">
    select * from user where id=#{id};
</select>
```

## 动态 SQL

动态 SQL 是 MyBatis 中非常强大的一个功能。例如一些常见的查询场景：

- 查询条件不确定
- 批量插入
- ….

这些类似需求，我们都可以通过 MyBatis 提供的动态 SQL 来解决。

MyBatis 中提供的动态 SQL 节点非常多。

####  if

```xml
<select id="getAllUserPage" resultType="com.netjic.entity.User" parameterType="map">
        select *
        from user
        <if test="start !=null and count!=null">
            limit #{start},#{count}
        </if>
</select>
```

#### where

这个查询的复杂之处在于：每个参数都是可选的，如果 id 为 null，则表示根据 name 查询，name 为 null，则表示根据 id 查询，两个都为 null，表示查询所有。

```xml
<select id="getUserByUsernameAndId" resultType="com.netjic.entity.User">
    select * from user
    <where>
        <if test="id!=null">
            and id>#{id}
        </if>
        <if test="name!=null">
            and username like concat('%',#{name},'%')
        </if>
    </where>
</select>
```

用 where 节点将所有的查询条件包起来，如果有满足的条件，where 节点会自动加上，如果没有，where 节点也将不存在，在有满足条件的情况下，where 还会自动处理 and 关键字。

####  foreach

foreach 用来处理数组/集合参数。

例如，我们有一个批量查询的需求：

```xml
<select id="getUserByIds" resultType="com.netjic.entity.User">
    select *
    from user where id in
    <foreach collection="ids" open="(" close=")" item="id" separator=",">
        #{id}
    </foreach>
</select>
```

测试：

```java
public class Main {
    public static void main(String[] args) throws IOException {
        SqlSessionFactory factory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        SqlSession sqlSession = factory.openSession();
        ArrayList<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(4);
        ids.add(5);
        ids.add(6);
        HashMap<String, List> map = new HashMap<>();
        map.put("ids",ids);
        // 不能直接将ids当做参数 因为不知道参数的名字 使用map 将参数的名字和值传入
        List<User> objects = sqlSession.selectList("mymapper1.getUserByIds",map);
        System.out.println(objects);
    }
}
```

在 mapper 中，通过 foreach 节点来遍历数组，collection 表示数组变量，open 表示循环结束后，左边的符号，close 表示循环结束后，右边的符号，item 表示循环时候的单个变量，separator 表示循环的元素之间的分隔符。

**注意，默认情况下，无论你的数组/集合参数名字是什么，在 XML 中访问的时候，都是 array，开发者可以通过 @Param 注解给参数重新指定名字。**

例如我还有一个批量插入的需求：

```xml
Integer batchInsertUser(@Param("users") List<User> users);
```

然后，定义该方法对应的 mapper：

```xml
<insert id="batchInsertUser">
    insert into user (username,address) values 
    <foreach collection="users" separator="," item="user">
        (#{user.username},#{user.address})
    </foreach>
</insert>
```

#### sql 片段

大家知道，在 SQL 查询中，一般不建议写 `*`，因为 select `*` 会降低查询效率。但是，每次查询都要把字段名列出来，太麻烦。这种使用，我们可以利用 SQL 片段来解决这个问题。

例如，我们先在 mapper 中定义一个 SQL 片段：

```xml
<sql id="Base_Column">
    id,usename,address
</sql>
```

然后，在其他 SQL 中，就可以引用这个变量：

```xml
<select id="getUserByIds" resultType="org.javaboy.mybatis.model.User">
    select <include refid="Base_Column" /> from user where id in
    <foreach collection="ids" open="(" close=")" item="id" separator=",">
        #{id}
    </foreach>
</select>
```

#### set

set 关键字一般用在更新中。因为大部分情况下，更新的字段可能不确定，如果对象中存在该字段的值，就更新该字段，不存在，就不更新。例如如下方法：

```xml
Integer updateUser(User user);
```

现在，这个方法的需求是，根据用户 id 来跟新用户的其他属性，所以，user 对象中一定存在 id，其他属性则不确定，其他属性要是有值，就更新，没值（也就是为 null 的时候），则不处理该字段。

我们结合 set 节点，写出来的 sql 如下：

```xml
<update id="updateUser" parameterType="org.javaboy.mybatis.model.User">
    update user
    <set>
        <if test="username!=null">
            username = #{username},
        </if>
        <if test="address!=null">
            address=#{address},
        </if>
        <if test="favorites!=null">
            favorites=#{favorites},
        </if>
    </set>
    where id=#{id};
</update>
```

## 查询进阶

在实际开发中，经常会遇到一对一查询，一对多查询等。这里我们先来看一对一查询。

例如：每本书都有一个作者，作者都有自己的属性，根据这个，我来定义两个实体类：

```java
public class Book {
    private Integer id;
    private String name;
    private Author author;

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", author=" + author +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
public class Author {
    private Integer id;
    private String name;
    private Integer age;

    @Override
    public String toString() {
        return "Author{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}
```

创建表:

```sql
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mybatis01` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `mybatis01`;

/*Table structure for table `author` */

# DROP TABLE IF EXISTS `author`;

CREATE TABLE `author` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                          `age` int(11) DEFAULT NULL,
                          PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `author` */

/*Table structure for table `book` */

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
                        `aid` int(11) DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

添加成功后，我们新建一个 BookMapper：

```java
public interface BookMapper {
    Book getBookById(Integer id);
}
```

BookMapper 中定义了一个查询 Book 的方法，但是我希望查出来 Book 的同时，也能查出来它的 Author。再定义一个 BookMapper.xml ，内容如下：

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.netjic.dao.BookMapper">
    <resultMap id="BookWithAuthor" type="com.netjic.entity.Book">
        <id column="id" property="id"></id>
        <result column="name" property="name"></result>
        <association property="author" javaType="com.netjic.entity.Author">
            <result column="aage" property="age"></result>
            <result column="aid" property="id"></result>
            <result column="aname" property="name"></result>
        </association>
    </resultMap>
    <select id="getBookById" resultMap="BookWithAuthor">
        select b.*, a.age as aage, a.id as aid, a.name as aname
        from book b,
             author a
        where b.aid = a.id
          and b.id = #{id}
    </select>
</mapper>

```

在这个查询 SQL 中，首先应该做好一对一查询，然后，返回值一定要定义成 resultMap，注意，这里千万不能写错。然后，在 resultMap 中，来定义查询结果的映射关系。

其中，association 节点用来描述一对一的关系。这个节点中的内容，和 resultMap 一样，也是 id，result 等，在这个节点中，我们还可以继续描述一对一。

由于在实际项目中，每次返回的数据类型可能都会有差异，这就需要定义多个 resultMap，而这多个 resultMap 中，又有一部份属性是相同的，所以，我们可以将相同的部分抽出来，做成一个公共的模板，然后被其他 resultMap 继承，优化之后的 mapper 如下：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.netjic.dao.BookMapper">
    <resultMap id="BaseResultMap" type="com.netjic.entity.Book">
        <id column="id" property="id"></id>
        <result column="name" property="name"></result>

    </resultMap>

    <resultMap id="BookWithAuthor" type="com.netjic.entity.Book" extends="BaseResultMap">
        <association property="author" javaType="com.netjic.entity.Author">
            <result column="aage" property="age"></result>
            <result column="aid" property="id"></result>
            <result column="aname" property="name"></result>
        </association>
    </resultMap>
    <select id="getBookById" resultMap="BookWithAuthor">
        select b.*, a.age as aage, a.id as aid, a.name as aname
        from book b,
             author a
        where b.aid = a.id
          and b.id = #{id}
    </select>
</mapper>

```

### 懒加载

上面这种加载方式，是一次性的读取到所有数据。然后在 resultMap 中做映射。如果一对一的属性使用不是很频繁，可能偶尔用一下，这种情况下，我们也可以启用懒加载。

懒加载，就是先查询 book，查询 book 的过程中，不去查询 author，当用户第一次调用了 book 中的 author 属性后，再去查询 author。

例如，我们再来定义一个 Book 的查询方法：

```java
Book getBookById2(Integer id);
Author getAuthorById(Integer id);
```

接下来，在 mapper 中定义相应的 SQL：

```xml
<resultMap id="BaseResultMap" type="com.netjic.entity.Book">
    <id column="id" property="id"></id>
    <result column="name" property="name"></result>

</resultMap>
<resultMap id="BookWithAuthor2" type="com.netjic.entity.Book" extends="BaseResultMap">
        <association property="author" javaType="com.netjic.entity.Author"
                     select="com.netjic.dao.BookMapper.getAuthorById" column="aid" fetchType="lazy">
        </association>
    </resultMap>
    <select id="getAuthorById" resultType="com.netjic.entity.Author">
        select *
        from author
        where id = #{aid};
    </select>
    <select id="getBookById2" resultMap="BookWithAuthor2">
        select *
        from book
        where id = #{id};
    </select>
```

### 一对多查询

创建表：

```sql

use mybatis01;

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `name` varchar(32) DEFAULT NULL,
                        `nameZh` varchar(32) DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', 'dba', '数据库管理员');
INSERT INTO `role` VALUES ('2', 'admin', '系统管理员');
INSERT INTO `role` VALUES ('3', 'user', '用户');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
                        `id` int(11) NOT NULL AUTO_INCREMENT,
                        `username` varchar(32) DEFAULT NULL,
                        `password` varchar(255) DEFAULT NULL,
                        `enabled` tinyint(1) DEFAULT NULL,
                        `locked` tinyint(1) DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'root', '$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq', '1', '0');
INSERT INTO `user` VALUES ('2', 'admin', '$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq', '1', '0');
INSERT INTO `user` VALUES ('3', 'sang', '$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq', '1', '0');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
                             `id` int(11) NOT NULL AUTO_INCREMENT,
                             `uid` int(11) DEFAULT NULL,
                             `rid` int(11) DEFAULT NULL,
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('1', '1', '1');
INSERT INTO `user_role` VALUES ('2', '1', '2');
INSERT INTO `user_role` VALUES ('3', '2', '2');
INSERT INTO `user_role` VALUES ('4', '3', '3');
SET FOREIGN_KEY_CHECKS=1;
```

这三个表中，有用户表，角色表以及用户角色关联表，其中用户角色关联表用来描述用户和角色之间的关系，他们是一对多的关系。

然后，根据这三个表，创建两个实体类：

```java
public class User {
    private Integer id;
    private String username;
    private String password;
    private List<Role> roles;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
public class Role {
    private Integer id;
    private String name;
    private String nameZh;

    @Override
    public String toString() {
        return "Role{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", nameZh='" + nameZh + '\'' +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameZh() {
        return nameZh;
    }

    public void setNameZh(String nameZh) {
        this.nameZh = nameZh;
    }
}
```

接下来，定义一个根据 id 查询用户的方法：

```java
User getUserById(Integer id);
```

然后，定义该方法的实现：

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.netjic.dao.UserDao">
    <resultMap id="UserWithRole" type="com.netjic.entity.User">
        <id column="id" property="id"></id>
        <result column="username" property="username"></result>
        <result column="password" property="password"/>
        <collection property="roles" ofType="com.netjic.entity.Role">
            <id column="rid" property="id"/>
            <result column="rname" property="name"/>
            <result column="rnameZh" property="nameZh"/>
        </collection>
    </resultMap>
    <select id="getUserById" resultMap="UserWithRole">
        SELECT u.*,r.`id` AS rid,r.`name` AS rname,r.`nameZh` AS rnameZh FROM user u,role r,user_role ur WHERE u.`id`=ur.`uid` AND ur.`rid`=r.`id` AND u.`id`=#{id}
    </select>
</mapper>

```

在 resultMap 中，通过 collection 节点来描述集合的映射关系。在映射时，会自动将一的一方数据集合并，然后将多的一方放到集合中，能实现这一点，靠的就是 id 属性。

当然，这个一对多，也可以做成懒加载的形式，那我们首先提供一个角色查询的方法：

```java
List<Role> getRolesByUid(Integer id);
```

然后，在 XML 文件中，处理懒加载：

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.netjic.dao.UserDao">

    <resultMap id="UserWithRole" type="com.netjic.entity.User">
        <id column="id" property="id"/>
        <result column="username" property="username"/>
        <result column="password" property="password"/>
        <collection property="roles" select="com.netjic.dao.UserDao.getRolesByUid" column="id" fetchType="lazy">
        </collection>
    </resultMap>
    <select id="getUserById" resultMap="UserWithRole">
        select * from user  where id=#{id};
    </select>
    <select id="getRolesByUid" resultType="com.netjic.entity.Role">
        SELECT r.* FROM role r,user_role ur WHERE r.`id`=ur.`rid` AND ur.`uid`=#{id}
    </select>
</mapper>

```



## 日志

在mybatis-config.xml中

```xml
<settings>
    <setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

##  查询缓存

一级缓存

```
 SqlSession sqlSession = factory.openSession();
        UserDao mapper = sqlSession.getMapper(UserDao.class);
        User user = mapper.getUserById(1);
        User user1 = mapper.getUserById(1);
        System.out.println(user1);
        System.out.println(user);
        sqlSession.close();
```

日志

```
Setting autocommit to false on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6279cee3]
==>  Preparing: select * from user where id=?;
==> Parameters: 1(Integer)
<==    Columns: id, username, password, enabled, locked
<==        Row: 1, root, $2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq, 1, 0
<==      Total: 1
User{id=1, username='root', password='$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq'}
User{id=1, username='root', password='$2a$10$RMuFXGQ5AtH4wOvkUqyvuecpqUSeoxZYqilXzbz50dceRsga.WYiq'}
Resetting autocommit to true on JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6279cee3]
Closing JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@6279cee3]
Returned connection 1652149987 to pool.

```

Mybatis 一级缓存的作用域是同一个 SqlSession，在同一个 sqlSession 中两次执行相同的 sql 语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。当一个 sqlSession 结束后该 sqlSession 中的一级缓存也就不存在了。Mybatis 默认开启一级缓存。

Mybatis 二级缓存是多个 SqlSession 共享的，其作用域是 mapper 的同一个 namespace，不同的 sqlSession 两次执行相同 namespace 下的 sql 语句且向 sql 中传递参数也相同即最终执行相同的 sql 语句，第一次执行完毕会将数据库中查询的数据写到缓存（内存），第二次会从缓存中获取数据将不再从数据库查询，从而提高查询效率。Mybatis 默认没有开启二级缓存需要在 setting 全局参数中配置开启二级缓存。
