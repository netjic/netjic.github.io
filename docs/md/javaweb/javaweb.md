# javaWeb

## 1.Servelet技术

### a) 什么是Servlet

1. Servlet是javaEE规范之一。规范就是接口
2. Servlet就JavaWeb三大组件之一。三大组件分别是：servlet程序、Filter过滤器、Listener监听器。
3. Servlet是运行在服务器上的一个 java 小程序，它可以接收客户端发送过来的请求，并响应数据给客户端。

### b)手动实现Servlet

1. 编写一个类去实现Servlet接口
2. 实现 service 方法，处理请求，并响应数据
3. 到 web.xml 中去配置 servlet 程序的访问地址

Servlet 程序的示例代码：

```java
public class HelloServlet implements Servlet {
     @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("servlet1接收到请求");
    }
}
```

web.xml 中的配置：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!-- servlet 标签给 Tomcat 配置 Servlet 程序 -->
    <servlet>
        <!--servlet-name 标签 Servlet 程序起一个别名（一般是类名） -->
        <servlet-name>HelloServlet</servlet-name>
        <!--servlet-class 是 Servlet 程序的全类名-->
        <servlet-class>com.netjic.demo_servlet.HelloServlet</servlet-class>
    </servlet>
    <!--servlet-mapping 标签给 servlet 程序配置访问地址-->
    <servlet-mapping>
        <!--servlet-name 标签的作用是告诉服务器，我当前配置的地址给哪个 Servlet 程序使用-->
        <servlet-name>HelloServlet</servlet-name>
        <!--url-pattern 标签配置访问地址 <br/> / 斜杠在服务器解析的时候，表示地址为：http://ip:port/工程路径 <br/> /hello 表示地址为：http://ip:port/工程路径/hello <br/> -->
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
</web-app>

```

### c)Servlet **的生命周期**

1. 执行 Servlet 构造器方法

2. 执行 init 初始化方法 

   第一、二步，是在第一次访问，的时候创建 Servlet 

3. 执行 service 方法

   第三步，每次访问都会调用。

4. 执行 destroy 销毁方法

   第四步，在 web 工程停止的时候调用。

### d)GET **和** **POST** 请求的分发处理

```java
public class HelloServlet implements Servlet {

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("servlet1接收到请求");
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String method = httpServletRequest.getMethod();
        // 这里要是大写
        if ("GET".equals(method)) {
            doGet();
        } else if ("POST".equals(method)) {
            doPost();
        }
    }

    public void doPost() {
        System.out.println("post方法");
    }

    public void doGet() {
        System.out.println("get方法");
    }
}

```

### **e)** 通过继承 HttpServlet **实现** Servlet 程序

一般在实际项目开发中，都是使用继承 HttpServlet 类的方式去实现 Servlet 程序。 

1、编写一个类去继承 HttpServlet 类 

2、根据业务需要重写 doGet 或 doPost 方法 

3、到 web.xml 中的配置 Servlet 程序的访问地址

```java
public class HelloServlet2 extends HttpServlet {

    @Override
    public void init(ServletConfig config) throws ServletException {
        // 调用父类初始化方法
        super.init(config);
        System.out.println("重写了init初始化方法,做了一些工作");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("get请求");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("post请求！！！");
    }
}
```

web.xml 中的配置：

```xml
 <servlet>
        <servlet-name>HelloServlet2</servlet-name>
        <servlet-class>com.netjic.demo_servlet.HelloServlet2</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet2</servlet-name>
        <url-pattern>/hello2</url-pattern>
    </servlet-mapping>
```

## **2.ServletConfig** 类

ServletConfig 类从类名上来看，就知道是 Servlet 程序的配置信息类。 

Servlet 程序和 ServletConfig 对象都是由 Tomcat 负责创建，我们负责使用。 

Servlet 程序默认是第一次访问的时候创建，ServletConfig 是每个 Servlet 程序创建时，就创建一个对应的 ServletConfig 对 

象。

### **a)ServletConfig** 类的三大作用

1、可以获取 Servlet 程序的别名 servlet-name 的值 

2、获取初始化参数 init-param 

3、获取 ServletContext 对象

web.xml 中的配置：

```java
 <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.netjic.demo_servlet.HelloServlet</servlet-class>
        <!--init-param 是初始化参数-->
        <init-param>
            <!--是参数名-->
            <param-name>name</param-name>
            <!--是参数值-->
            <param-value>netjic</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
```

Servlet 中的代码：

```java
 @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("servlet1初始化。。。。");
        // 获取配置的初始化参数
        System.out.println(servletConfig.getInitParameter("name"));
    }

```

## **3.ServletContext** 类

### a)什么是 ServletContext?

1、ServletContext 是一个接口，它表示 Servlet 上下文对象 

2、一个 web 工程，只有一个 ServletContext 对象实例。 

3、ServletContext 对象是一个域对象。 

4、ServletContext 是在 web 工程部署启动的时候创建。在 web 工程停止的时候销毁。 

什么是域对象? 

域对象，是可以像 Map 一样存取数据的对象，叫域对象。 

这里的域指的是存取数据的操作范围，整个 web 工程。

|        | 存数据         | 取数据       | 删除数据          |
| ------ | -------------- | ------------ | ----------------- |
| Map    | put()          | get()        | remove()          |
| 域对象 | setAttribute() | getAttribute | removeAttribute() |

### **b)ServletContext** **类的四个作用** 

1、获取 web.xml 中配置的上下文参数 context-param 

2、获取当前的工程路径，格式: /工程路径 

3、获取工程部署后在服务器硬盘上的绝对路径 

4、像 Map 一样存取数据 

ServletContext 演示代码：

```java
public class ContextServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // 1、获取web.xml中配置的上下文参数context-param
        ServletContext servletContext = getServletContext();
        String password = servletContext.getInitParameter("password");
        System.out.println(password);
        // 2、获取当前的工程路径，格式: /工程路径
        System.out.println("当前工程路径:" + servletContext.getContextPath());
        // 3、获取工程部署后在服务器硬盘上的绝对路径

        // 斜杠被服务器解析地址为:http://ip:port/工程名/  映射到IDEA代码的web目录<br/>
        System.out.println("工程部署的路径是:" + servletContext.getRealPath("/"));
        System.out.println("工程下css目录的绝对路径是:" + servletContext.getRealPath("/css"));
        System.out.println("工程下imgs目录1.jpg的绝对路径是:" + servletContext.getRealPath("/imgs/1.jpg"));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```

web.xml 中的配置：

```xml
<!--context-param 是上下文参数(它属于整个 web 工程)-->
    <context-param>
        <param-name>password</param-name>
        <param-value>root</param-value>
    </context-param>
```

ServletContext 像 Map 一样存取数据：

```java
public class ContextServlet2 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ServletContext servletContext = getServletContext();
        System.out.println(servletContext.getAttribute("url"));
        servletContext.setAttribute("url", "netjic.com");
        System.out.println(servletContext.getAttribute("url"));
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
```

## **4.HTTP** 协议

### a)什么是 **HTTP** 协议

什么是协议? 

协议是指双方，或多方，相互约定好，大家都需要遵守的规则，叫协议。 

所谓 HTTP 协议，就是指，客户端和服务器之间通信时，发送的数据，需要遵守的规则，叫 HTTP 协议。 

HTTP 协议中的数据又叫报文。

### b)请求的 HTTP 协议格式

客户端给服务器发送数据叫请求。 

服务器给客户端回传数据叫响应。 

请求又分为 GET 请求，和 POST 请求两种 

#### **i. GET** **请求**

1、请求行 

(1) 请求的方式    GET 

(2) 请求的资源路径[+?+请求参数] 

(3) 请求的协议的版本号    HTTP/1.1 

2、请求头 

key : value  组成  不同的键值对，表示不同的含义。

下面的内容是Get请求的HTTP协议内容

```http
GET /service/rt-thread.txt HTTP/1.1  # 请求方式 请求资源路径 请求的协议的版本号 
Host: www.baidu.com  # 请求的服务器IP和端口号
Connection: keep-alive # 告诉服务器回传数据不要马上关闭，保持一小段连接,Keep-Alive表示是一个长连接，时间大概是2分钟 Closed 表示马上关闭
Cache-Control: max-age=0 
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36 # 浏览器的信息 
Accept:text/html,application/xhtml+xml # 告诉服务器，客户端可以接收的数据类型
Accept-Encoding: gzip, deflate # 告诉服务器，客户端可以接收的数据编码（压缩）格式
Accept-Language: zh-CN,zh;q=0.9 # 告诉服务器客服端可以接收的语言类型 zh_CN 中文中国 en_US 英文美国
Cookie:PREF=ID=80a06da87be9ae3c; # 携带服务器发送的cookie 
```

可以看到，GET方式的请求一般不包含”请求内容”部分，请求数据以地址的形式表现在请求行。

#### ii. POST 请求

1、请求行

​	(1) 请求的方式   POST 

​	(2) 请求的资源路径[+?+请求参数] 

​	(3) 请求的协议的版本号   HTTP/1.1 

2、请求头

1) key : value 

   不同的请求头，有不同的含义 

   空行 

3、请求体 ===>>> 就是发送给服务器的数据

```http
# Request Headers
POST /adduser HTTP/1.1
Host: localhost:8030
Connection: keep-alive
Content-Length: 16
Pragma: no-cache
Cache-Control: no-cache
Origin: chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36
Content-Type: application/x-www-form-urlencoded
Accept: */*
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9
# Form Data

name=name&age=11
```

post 请求 自定义数据提交格式！

1.**application/x-www-form-urlencoded**，form表单默认的数据格式，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。大部分服务端语言都对这种方式有很好的支持。

```http
# Form Data
name=name&age=11
```

2.**application/json**，现在越来越多的人把它作为请求头，用来告诉服务端消息主体是序列化后的 JSON 字符串。服务端语言也有很多函数去解析JSON，使用JSON可以支持更加复杂的结构化数据。

```http
# Request Payload
{"name":"121","age":121}
```

3.**multipart/form-data**，对用于在表单中上传文件时，也可以上传普通数据，只需要让from的ectyle等于multipart/form-data就可以了。(多段的形式提交数据，以流的形式，用于上传)

```http
# Request Payload

------WebKitFormBoundaryBRi81vNtMyBL97Rb
Content-Disposition: form-data; name="name"

name1
------WebKitFormBoundaryBRi81vNtMyBL97Rb
Content-Disposition: form-data; name="age"

------WebKitFormBoundaryBRi81vNtMyBL97Rb--

```

#### **iii.** **常用请求头的说明** 

Accept: 表示客户端可以接收的数据类型 

Accpet-Languege: 表示客户端可以接收的语言类型 

User-Agent: 表示客户端浏览器的信息 

Host： 表示请求时的服务器 ip 和端口号 

#### **iv.** **哪些是** **GET** **请求，哪些是** **POST** **请求** 

GET 请求有哪些： 

1、form 标签 method=get 

2、a 标签 

3、link 标签引入 css 

4、Script 标签引入 js 文件 

5、img 标签引入图片 

6、iframe 引入 html 页面 

7、在浏览器地址栏中输入地址后敲回车 

POST 请求有哪些： 

8、form 标签 method=post

### c)响应的HTTP协议格式

1、响应行 

(1) 响应的协议和版本号 

(2) 响应状态码 

(3) 响应状态描述符 

2、响应头 

(1) key : value 

不同的响应头，有其不同含义 

**空行** 

3、响应体    ---->>>    就是回传给客户端的数据

```http
HTTP/1.1 200 OK
Age: 529651
Cache-Control: max-age=604800
Connection: keep-alive
Content-Encoding: gzip
Content-Length: 648
Content-Type: text/html; charset=UTF-8
Date: Mon, 02 Nov 2020 17:53:39 GMT
Etag: "3147526947+ident+gzip"
Expires: Mon, 09 Nov 2020 17:53:39 GMT
Keep-Alive: timeout=4
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Proxy-Connection: keep-alive
Server: ECS (sjc/16DF)
Vary: Accept-Encoding
X-Cache: HIT

<!doctype html>
<html>
<head>
    <title>Example Domain</title>
	// 省略... 
</body>
</html>

```



#### d)常用的响应码说明

200 

表示请求成功 

302 

表示请求重定向（明天讲） 

404 

表示请求服务器已经收到了，但是你要的数据不存在（请求地址错误） 

500 

表示服务器已经收到请求，但是服务器内部错误（代码错误

### **e)MIME** **类型说明** 

MIME 是 HTTP 协议中数据类型。 

MIME 的英文全称是"Multipurpose Internet Mail Extensions" 多功能 Internet 邮件扩充服务。MIME 类型的格式是“大类型/小 

类型”，并与某一种文件的扩展名相对应。

**通用结构**

```
type/subtype 由类型与子类型两个字符串中间用'/'分隔而组成。不允许空格存在。type 表示可以被分多个子类的独立类别。subtype 表示细分后的每个类型。
```

| 类型        | 描述                                                         | 典型示例                                                     |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| text        | 表明文件是普通文本，理论上是人类可读                         | text/plain, text/html,text/css, text/javascript              |
| image       | 表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型 | image/gif,image/png,image/jpeg,image/bmp,image/webp,image/x-icon,image/vnd.microsoft.icon |
| audio       | 表明是某种音频文件                                           | audio/midi,audio/mpeg, audio/webm, audio/ogg, audio/wav      |
| application | 表明是某种二进制数据                                         | application/json, application/javascript, application/ecmascript ,application/octet-stream |

 1）、text/html ： HTML格式

 2）、text/plain ：纯文本格式

 3）、application/json：json格式

 4）、text/xml ： XML格式

 5）、image/gif ：gif图片格式

6）、image/jpeg ：jpg图片格式

 7）、image/png：png图片格式

 8）、application/pdf：pdf格式

 9）、application/msword ： Word文档格式

 10）、application/octet-stream ： 二进制流数据（如常见的文件下载）

 resp.setContentType() 设置不同的格式返回到页面展示不同的格式

```java
 resp.setCharacterEncoding("utf-8");
        String content = "html字符串";
        String json = "josn字符串“;
        if ("plain".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=plain
            resp.setContentType("text/plain");
        } else if ("html".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=html
            resp.setContentType("text/html");
        } else if ("json".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=json
            content = json;
            resp.setContentType("application/json");
        } else if ("plainjson".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=plainjson
            content = json;
            resp.setContentType("text/plain");
        } else if ("jpg".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=jpg
            resp.setContentType("image/png");
            File file = new File("E:\\workspace\\demo-servlet\\src\\img\\image.png");
            FileInputStream inputStream = new FileInputStream(file);
            byte[] bytes = new byte[inputStream.available()];
            inputStream.read(bytes, 0, inputStream.available());
            resp.getOutputStream().write(bytes);
        } else if ("video".equals(req.getParameter("type"))) {
            // http://localhost:8080/hello2?type=video
            resp.setContentType("video/mpeg");
        }
        resp.getWriter().println(content);
    }
```

## 5.request response 对象

### 1.request对象

| 方法声明                     | 功能描述                                                     |
| ---------------------------- | ------------------------------------------------------------ |
| String getMethod()           | 请求方式（如 GET、POST 等）                                  |
| String getRequestURI()       | 位于 URL 的主机和端门之后、参数部分之前的部分 "/hello4" Servlet 设置的路径 |
| String getQueryString()      | 资源路径后问号（？）以后的所有内容 "type=4&name=netjic" 字符串 |
| String getContextPath()      | 该方法用于获取请求 URL 中属于 Web 应用程序的路径，这个路径以 / 开头，表示相对于整个 Web 站点的根目录，路径结尾不含 /。如果请求 URL 属于 Web 站点的根目录，那么返回结果为空字符串（""） |
| String getServletPath()      | 该方法用于获取 Servlet 的名称或 Servlet 所映射的路径 "/hello4" |
| String getRemoteAddr()       | 该方法用于获取请求客户端的 IP 地址，其格式类似于 192.168.0.3 "127.0.0.1" |
| String getRemoteHost()       | 该方法用于获取请求客户端的完整主机名，其格式类似于 pcl.mengma.com。如果无法解析出客户机的完整主机名，那么该方法将会返回客户端的 IP 地址,"127.0.0.1" |
| int getRemotePort()          | 该方法用于获取请求客户端网络连接的端口号 "50854"             |
| String getLocaIAddr()        | 获取 Web 服务器上接收当前请求网络连接的 IP 地址 "127.0.0.1"（服务器ip） |
| String getLocalName()        | 获取 Web 服务器上接收当前网络连接 IP 所对应的主机名 (服务器主机名)"kubernetes.docker.internal" |
| int getLocalPort()           | 获取 Web 服务器上接收当前网络连接的端口号 "8080" （服务器端口号） |
| String getServerName()       | 请求所指向的主机名，即 HTTP 请求消息中 Host 头字段所对应的主机名部分"localhost" http://localhost |
| int getServcrPort()          | 请求所连接的服务器端口号，即 HTTP 请求消息中 Host 头字段所对应的端口号部分 "8080" http://localhost:8080 |
| StringBuffcr getRequestURL() | 该方法用于获取客户端发出请求时的完整 URL，包括协议、服务器名、端口号、 资源路径等信息，但不包括后面的査询参数部分。注意，getRequcstURL() 方法返冋的结果是 StringBuffer 类型，而不是 String 类型，这样更便于对结果进行修改 "http://localhost:8080/hello4" |

Header 内容

| 方法声明                            | 功能描述                                                     |
| ----------------------------------- | ------------------------------------------------------------ |
| String getHeader(String name)       | 该方法用于获取一个指定头字段的值，如果请求消息中没有包含指定的头字段，则 getHeader() 方法返回 null；如果请求消息中包含多个指定名称的头字段，则 getHeader() 方法返回其中第一个头字段的值 |
| Enumeration getHeaders(String name) | 该方法返回一个 Enumeration 集合对象，该集合对象由请求消息中出现的某个指定名称的所有头字段值组成。在多数情况下，一个头字段名在请求消息中只出现一次，但有时可能会出现多次 |
| Enumeration getHeaderNames()        | 该方法用于获取一个包含所有请求头字段的 Enumeration 对象      |
| int getIntHeader(String name)       | 该方法用于获取指定名称的头字段，并且将其值转为 int 类型。需要注意的是，如果指定名称的头字段不存在，则返回值为 -1；如果获取到的头字段的值不能转为 int 类型，则将发生 NumberFormatException 异常 |
| long getDateHeader(String name)     | 该方法用于获取指定头字段的值，并将其按 GMT 时间格式转换为一个代表日期/时间的长整数，该长整数是自 1970 年 1 月 1 日 0 时 0 分 0 秒算起的以毫秒为单位的时间值 |
| String getContentType()             | 该方法用于获取 Content-Type 头字段的值，结果为 String 类型   |
| int getContentLength()              | 该方法用于获取 Content-Length 头字段的值，结果为 int 类型    |
| String getCharacterEncoding()       | 该方法用于返回请求消息的实体部分的字符集编码，通常是从 Content-Type 头字段中进行提取，结果为 String 类型 |

request获取参数

GET:

```java
// 1.参数类型 query 地址栏中的数据:
req.setCharacterEncoding("utf-8");
String name = req.getParameter("name");
// 2.参数类型 body中 application/x-www-form-urlencoded
ServletInputStream inputStream = req.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
StringBuilder sb = new StringBuilder();
String inputStr;
while ((inputStr = bufferedReader.readLine()) != null) {
    sb.append(inputStr);
}
System.out.println(sb.toString());
// 接收到的数据 name=netjic&type=zh
// 3.参数类型 body中 application/json text/html text/plain application/javascript application/xml
ServletInputStream inputStream = req.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
StringBuilder sb = new StringBuilder();
String inputStr;
while ((inputStr = bufferedReader.readLine()) != null) {
    sb.append(inputStr);
}
System.out.println(sb.toString());
// 接收到的参数 "{"type":"zh"}"
// 4.参数类型 body中 multipart/form-data; 
ServletInputStream inputStream = req.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
StringBuilder sb = new StringBuilder();
String inputStr;
while ((inputStr = bufferedReader.readLine()) != null) {
    sb.append(inputStr);
}
// 获取到的数据
----------------------------345884551567867907957292Content-Disposition: form-data; name="name"netjic----------------------------345884551567867907957292Content-Disposition: form-data; name="type"zh----------------------------345884551567867907957292--
```

POST:

```java
// 1.请求类型(content-Type)是application/x-www-form-urlencoded 使用postman
req.setCharacterEncoding("utf-8");
String name = req.getParameter("name");
// 2.参数类型 query 地址栏中的数据:
req.setCharacterEncoding("utf-8");
String name = req.getParameter("name");
// 3.参数类型 application/json text/html text/plain application/javascript application/xml
ServletInputStream inputStream = req.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
StringBuilder sb = new StringBuilder();
String inputStr;
while ((inputStr = bufferedReader.readLine()) != null) {
    sb.append(inputStr);
}
// 接收到的参数 "{"type":"zh"}"
// 4.参数类型 multipart/form-data;
ServletInputStream inputStream = req.getInputStream();
BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8));
StringBuilder sb = new StringBuilder();
String inputStr;
while ((inputStr = bufferedReader.readLine()) != null) {
    sb.append(inputStr);
}
// 获取到的数据
----------------------------345884551567867907957292Content-Disposition: form-data; name="name"netjic----------------------------345884551567867907957292Content-Disposition: form-data; name="type"zh----------------------------345884551567867907957292--
```

> post get 在地址栏传递的数据可以直接req.getParameter("name")获取，body中要从流中获取 但当post请求 参数类型是application/x-www-form-urlencoded 可以直接req.getParameter("name") 获取，当参数类型为multipart/form-data;获取参数也特殊

### 2.response对象

```java
// 设置响应的编码
resp.setCharacterEncoding("utf-8");
// 获取设置的响应编码
String characterEncoding = resp.getCharacterEncoding();
// 设置响应的文件类型 同上MIME类型
resp.setContentType("text/plain");
// 获取设置响应的文件类型 同上MIME类型
String contentType = resp.getContentType();
// 设置响应的内容正文的长度
resp.setContentLength(int len)
// 设置响应内容语言
Locale locale = new Locale("en", "US");
resp.setLocale(locale);
// 响应表头
Content-Language: en-US
// 返回响应的语言环境。如果未指定任何语言环境，则返回容器的默认语言环境
Locale locale = resp.getLocale();
locale.getLanguage()
```



#### PrintWriter

> 返回可将字符文本发送到客户端的 PrintWriter 对象。PrintWriter 使用 #getCharacterEncoding 返回的字符编码。如果未如 getCharacterEncoding 中所述指定响应的字符编码（即该方法只返回默认值 ISO-8859-1），则 getWriter 会将字符编码更新到 ISO-8859-1。 
> 对 PrintWriter 调用 flush() 将提交响应

```java
PrintWriter writer = resp.getWriter();
```

- wirte方法

  ```java
  // 返回对象类型 
  writer.write(String.valueOf(netjic));
  writer.write("hello world");
  ```

  

- println方法

  ```java
  // 返回字符串
  writer.println("hello world");
  // 返回对象类型 方法内调用对象的toString方法
  writer.println(user);
  ```

#### ServletOutputStream

> 返回适用于在响应中编写二进制数据的 servlet  容器不会编码二进制数据。  对 ServletOutputStream 调用 flush() 将提交响应。

```java
ServletOutputStream outputStream = resp.getOutputStream();
```

- write

  ```
  byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
  outputStream.write(bytes);
  outputStream.flush();
  outputStream.close();
  ```

  返回文件类型

  ```java
  // 设置返回文件类型
  resp.setContentType("image/png");
  // 文件对象
  File file = new File("E:\\workspace\\demo-servlet\\src\\img\\image.png");
  // 输入流
  FileInputStream inputStream = new FileInputStream(file);
  // 创建byte数组并指定长度
  byte[] bytes = new byte[inputStream.available()];
  // 读取文件,存放到bytes数组中
  inputStream.read(bytes, 0, inputStream.available());
  // 创建输出流
  ServletOutputStream outputStream = resp.getOutputStream();
  // 返回文件
  outputStream.write(bytes);
  ```

  ## 

  

## 6.session cookie

### 1.什么是cookie

1、Cookie 翻译过来是饼干的意思。 

2、Cookie 是服务器通知客户端保存键值对的一种技术。 

3、客户端有了 Cookie 后，每次请求都发送给服务器。 

4、每个 Cookie 的大小不能超过 4kb 

### 2.创建cookie

```java
// 发送cookie
Cookie cookie = new Cookie("name","netjic");
resp.addCookie(cookie);
// 一次创建连个
Cookie cookie1 = new Cookie("age","20");
resp.addCookie(cookie1);
```



| Name | Value  | HttpOnly | Domain    | Expires | Path |
| ---- | ------ | -------- | --------- | ------- | ---- |
| name | netjic | true     | localhost | -       | /    |
| age  | 20     | true     | localhost | -       | /    |

### 3.服务器如何获取cookie

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取cookie
    Cookie[] cookies = req.getCookies();
    for (Cookie cookie : cookies) {
        System.out.println(cookie.getValue());
    }
}

// netjic
// 20
// 说明：创建cookie使用浏览器，在获取的时候可以获取的到。使用postman 可以接收cookie但是请求的时候不携带cookie
```



### 4.Cookie值的修改

方案一：

1、先创建一个要修改的同名（指的就是 key）的 Cookie 对象 
2、在构造器，同时赋于新的 Cookie 值。 
3、调用 response.addCookie( Cookie );

```java
Cookie cookie = new Cookie("name", "helloWord");
resp.addCookie(cookie);
```

方案二：

 1、先查找到需要修改的 Cookie 对象 
2、调用 setValue()方法赋于新的 Cookie 值。 
3、调用 response.addCookie()通知客户端保存修改

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    for (Cookie cookie : req.getCookies()) {
        if (cookie.getName().equals("name")) {
            cookie.setValue("China");
            resp.addCookie(cookie);
        }
    }
}
```



### 5.Cookie生命控制

Cookie 的生命控制指的是如何管理 Cookie 什么时候被销毁（删除） 
setMaxAge() 
正数，表示在指定的秒数后过期 

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Cookie time = new Cookie("time", "30");
    // 过期时间单位秒
    time.setMaxAge(30);
    resp.addCookie(time);
}
```

负数，表示浏览器一关，Cookie 就会被删除（默认值是-1） 
零，表示马上删除 Cookie

```java
 @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Cookie time = new Cookie("time", "30");
        // 过期时间单位秒
        time.setMaxAge(0);
        resp.addCookie(time);
    }
```



### 6.Cookie 有效路径 Path 的设置

Cookie 的 path 属性可以有效的过滤哪些 Cookie 可以发送给服务器。哪些不发。 
path 属性是通过请求的地址来进行有效的过滤。

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    Cookie cookie = new Cookie("pathTest", "pathTest");
    cookie.setPath("/hello13");
    resp.addCookie(cookie);
}
```

```
CookieA path=/工程路径 
CookieB path=/工程路径/abc 
请求地址如下： http://ip:port/工程路径/a.html
CookieA 发送 
CookieB 不发送 
http://ip:port/工程路径/abc/a.html 
CookieA 发送 
CookieB 发送
```



### 1.什么是Session

1、Session 就一个接口（HttpSession）。 
2、Session 就是会话。它是用来维护一个客户端和服务器之间关联的一种技术。 
3、每个客户端都有自己的一个 Session 会话。 
4、Session 会话中，我们经常用来保存用户登录之后的信息。

### 2.如何创建 Session 和获取id号是否为新)

如何创建和获取 Session。它们的 API 是一样的。 
request.getSession() 
第一次调用是：创建 Session 会话 
之后调用都是：获取前面创建好的 Session 会话对象。 
isNew(); 判断到底是不是刚创建出来的（新的） 
true 表示刚创建 
false 表示获取之前创建 
每个会话都有一个身份证号。也就是 ID 值。而且这个 ID 是唯一的。 
getId() 得到 Session 的会话 id 值。

```java
// 第一次调用是创建session，之后是获取之前的创新好的session回话
HttpSession session = req.getSession();
// 判断是否是新创建的session
boolean aNew = session.isNew();
System.out.println(aNew);
// sessionId 每个回话都有一个身份证号。也就是sessionId,而且这个id是唯一的
String id = session.getId();
System.out.println(id);
// 使用浏览器-----------------------------------------------
true // 第一次访问
BEB16BA4BB37CFCA3D0D3BC2D2BD6FFA // sessionId
false // 第二次访问
BEB16BA4BB37CFCA3D0D3BC2D2BD6FFA // sessionId
// 使用postman---------------------------------------------
true // 第一次访问
9164A9D3A33C108118B907466485DF24
true // 第二次访问
70B12B10212B436AA216F3450DF3CBA9
// 每次都是新的 
// 说明：默认浏览器关闭回话结束，打开浏览器重新访问是新的session
```

### 3.Session 域数据的存取

创建session域数据

```java
// 创建session域数据
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 创建session域参数
    HttpSession session = req.getSession();
    session.setAttribute("name", "netjic");
}
```

获取session域数据

```java
// 获取session域数据
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 获取session域参数
    HttpSession session = req.getSession();
    String name = (String) session.getAttribute("name");
    System.out.println(name);
}
```

说明：在浏览器中访问创建数据的接口，不关闭浏览器，访问获取数据的接口，此时可以获取到到数据，关闭浏览器，再次访问获取数据的接口，此时获取不到数据

### 4.Session生命周期控制

public void setMaxInactiveInterval(int interval) 设置 Session 的超时时间（以秒为单位），超过指定的时长，Session 就会被销毁。
值为正数的时候，设定 Session 的超时时长。 
负数表示永不超时（极少使用） 
public int getMaxInactiveInterval()获取 Session 的超时时间 
public void invalidate() 让当前 Session 会话马上超时无效。

Session 默认的超时时长是多少！ Session 默认的超时时间长为 30 分钟。 因为在 Tomcat 服务器的配置文件 web.xml中默认有以下的配置，它就表示配置了当前 Tomcat 服务器下所有的 Session 超时配置默认时长为：30 分钟。

```xml
<session-config> 
    <session-timeout>30</session-timeout> 
</session-config>
```

如果说。你希望你的 web 工程，默认的 Session 的超时时长为其他时长。你可以在你自己的 web.xml 配置文件中做 
以上相同的配置。就可以修改你的 web 工程所有 Seession 的默认超时时长。

设置session 时长

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 先获取 Session 对象
    HttpSession session = req.getSession();
    session.setMaxInactiveInterval(3);
    boolean aNew = session.isNew();
    System.out.println(aNew);
    // 设置当前 Session3 秒后超时
    resp.setContentType("text/plain;charset=utf-8");
    resp.getWriter().write("当前 Session 已经设置为 3 秒后超时");
}
```

Session 马上被超时示例：

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    // 先获取 Session 对象
    HttpSession session = req.getSession();
    System.out.println(session.getId());
    session.invalidate();
    // 设置当前 Session3 秒后超时
    resp.setContentType("text/plain;charset=utf-8");
    resp.getWriter().write("当前 Session 已经设置为 3 秒后超时");
}
// 每次获取的sessionId都不一样 说明每次是新的session
// D49A8F3D98432DE64262F840D95BF917
// 62D08F4DF25EF8ACF42021CC012B1CE6
// A2320AE6207FB174CBCEF6AD459545F6
```

### 5.浏览器和Session之间关联的

Session 技术，底层其实是基于 Cookie 技术来实现的。

第一次访问时：客户端(浏览器)没有任何Cookie信息 request.getSession() 创建session会话对象，服务器创建session时都会创建一个Cookie（发给浏览器 Set-Cookie:JSESSIONID=633F2A56740D074B9DAD81FBB22695AB）。这个Cookie对象的key永远是JSESSIONID 值是新创建出来的Session的id值，request.getSession();通过Cookie中的id值找到自己之前创建好的Session对象并返回



| Name       | Value                            | HttpOnly | Domain    | Expires | Path | Secure |
| ---------- | -------------------------------- | -------- | --------- | ------- | ---- | ------ |
| JSESSIONID | 633F2A56740D074B9DAD81FBB22695AB | true     | localhost | -       | /    | false  |

## 7.filter

### 1.Filter什么是过滤器

1. Filter过滤器它是JavaWeb的三大组件之一。三大组件是：Servlet程序、Listener监听器、Filter过滤器

2. Filter过滤器它是JavaEE的规范。也就是接口

3. Filter过滤器它的作用是：拦截请求，过滤响应。

   拦截请求常见的应用场景有：

   - 权限检查
   - 日志操作
   - 事务管理

### 2.Filter的初体验

要求：在你的 web 工程下，有一个 admin 目录。这个 admin 目录下的所有资源（
html 页面、jpg 图片、jsp 文件、等等）都必 
须是用户登录之后才允许访问。

Filter 过滤器的使用步骤： 

1、编写一个类去实现 Filter 接口 

2、实现过滤方法 doFilter() 

3、到 web.xml 中去配置 Filter 的拦截路径

```java
public class HelloFilter implements Filter {
	// tomcat使用的8版本 不重写init方法启动报错。问题待解决
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("hello Filter init...");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        System.out.println("进去filter内部");
        System.out.println("访问" + req.getRequestURI());
        servletResponse.setCharacterEncoding("utf-8");
        servletResponse.setContentType("text/plain");
        PrintWriter writer = servletResponse.getWriter();
        writer.println("你已被拦截");
        // 满足条件放行
        if (servletRequest.getParameter("name") != null) {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }
}

```

### 3.Filter的生命周期

Filter 的生命周期包含几个方法 

1、构造器方法 

2、init 初始化方法 

第 1，2 步，在 web 工程启动的时候执行（Filter 已经创建）

 3、doFilter 过滤方法 第 3 步，每次拦截到请求，就会执行 

4、destroy 销毁 第 4 步，停止 web 工程的时候，就会执行（停止 web 工程，也会销毁 Filter 过滤器）

```java
public class HelloFilter2 implements Filter {
    public HelloFilter2(){
        System.out.println("HelloFilter2的构造函数");
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("HelloFilter2初始化...");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("HelloServlet过滤器");
    }
}
// HelloFilter2的构造函数
// HelloFilter2初始化...
```

### 4、FilterConfig 类

FilterConfig 类见名知义，它是 Filter 过滤器的配置文件类。

 Tomcat 每次创建 Filter 的时候，也会同时创建一个 FilterConfig 类，这里包含了 Filter 配置文件的配置信息。 FilterConfig 类的作用是获取 filter 过滤器的配置内容 

1、获取 Filter 的名称 filter-name 的内容 

2、获取在 Filter 中配置的 init-param 初始化参数 

3、获取 ServletContext 对象

```java
@Override
public void init(FilterConfig filterConfig) throws ServletException {
    System.out.println("HelloFilter3 的 init(FilterConfig filterConfig)初始化");
    // 1、获取 Filter 的名称 filter-name 的内容
    System.out.println("filter-name 的值是：" + filterConfig.getFilterName());
    // 2、获取在 web.xml 中配置的 init-param 初始化参数
    System.out.println("初始化参数 name 的值是：" + filterConfig.getInitParameter("name"));
    // 3、获取 ServletContext 对象
    System.out.println(filterConfig.getServletContext());
}
```

### 5、FilterChain 过滤器链

Filter 过滤器 

Chain 链，链条 

FilterChain 就是过滤器链（多个过滤器如何一起工作）

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    // 前置操作 权限验证等等。。
    filterChain.doFilter(servletRequest,servletResponse); // 目标资源（访问的接口）
    // 后置操作 响应的接口数据
}
```

**后置操作**

创建类 MyWriter

```java
public class MyWriter extends PrintWriter{
    private StringBuilder buffer;

    public MyWriter(Writer out) {
        super(out);
        buffer = new StringBuilder();
    }

    @Override
    public void write(char[] buf, int off, int len) {
        // super.write(buf, off, len);
        char[] dest = new char[len];
        System.arraycopy(buf, off, dest, 0, len);
        buffer.append(dest);
        System.out.println("write1");
    }

    @Override
    public void write(char[] buf) {
        super.write(buf);
        System.out.println("write2");
    }

    @Override
    public void write(int c) {
        super.write(c);
        System.out.println("write3");
    }

    @Override
    public void write(String s, int off, int len) {
        super.write(s, off, len);
        buffer.append(s);
        System.out.println("write4");
    }

    @Override
    public void write(String s) {
        super.write(s);
        System.out.println("write5");
    }

    public String getContent(){
        return buffer.toString();
    }
}
```

创建类 ResponseWrapper

```java
public class ResponseWrapper extends HttpServletResponseWrapper {
    private MyWriter myWriter;


    public ResponseWrapper(HttpServletResponse response) {
        super(response);
    }

    @Override
    public PrintWriter getWriter() throws IOException {
        myWriter = new MyWriter(super.getWriter());
        return myWriter;
    }



    public MyWriter getMyWriter() {
        return myWriter;
    }
}
```

对应过滤器

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    //转换成代理类
    ResponseWrapper wrapperResponse = new ResponseWrapper((HttpServletResponse) servletResponse);
    // 这里只拦截返回，直接让请求过去，如果在请求前有处理，可以在这里处理
    filterChain.doFilter(servletRequest, wrapperResponse);
    //获取返回值
    MyWriter myWriter = wrapperResponse.getMyWriter();
    // 获取响应的值 对应的servlet接口要用返回数据（直接访问静态文件此处获取不到响应值 /admin/style.css）
    if (myWriter != null) {
        String content = myWriter.getContent();
        System.out.println("content="+content);
    }
}
```



### 6、Filter 的拦截路径

**精确匹配** 

```xml
<url-pattern>/target.jsp</url-pattern> 
```

以上配置的路径，表示请求地址必须为：http://ip:port/工程路径/target.jsp 

**目录匹配** 

```xml
<url-pattern>/admin/*</url-pattern> 
```

以上配置的路径，表示请求地址必须为：http://ip:port/工程路径/admin/* 

**后缀名匹配** 

```xml
<url-pattern>*.html</url-pattern> 
```

以上配置的路径，表示请求地址必须以.html 结尾才会拦截到 

```xml
<url-pattern>*.do</url-pattern> 
```

以上配置的路径，表示请求地址必须以.do 结尾才会拦截到 

```xml
<url-pattern>*.action</url-pattern> 
```

以上配置的路径，表示请求地址必须以.action 结尾才会拦截到 

Filter 过滤器它只关心请求的地址是否匹配，不关心请求的资源是否存在！！！

