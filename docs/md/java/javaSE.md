# javaSE 

## 面向对象

### Object类

如果我们没显式的声明一个类的父类的话，则此类继承于java.lang.Object类

所的java类（除java.lang.Object类之外都直接或间接的继承于java.lang.Object类

意味着，所的java类具有java.lang.Object类声明的功能。

java.lang.Object类中定义的一些方法

| 方法名                             | 类型     | 描述           |
| ---------------------------------- | -------- | -------------- |
| public Object()                    | 构造方法 | 构造器         |
| public boolean equals( Object obj) | 普通方法 | 对象比较       |
| public int hashCode()              | 普通方法 | 获取Hash码     |
| public String toString()           | 普通方法 | 对象打印时调用 |

- 方法：equals() / toString() / getClass() /hashCode() / clone() / finalize()

  wait() 、 notify()、notifyAll()

####  equals()方法

- 是一个方法，而非运算符
- 只能适用于引用数据类型

参与对象比较的时候 类要重写equals方法

Object类中定义的equals()和==的作用是相同的：比较两个对象的地址值是否相同.即两个引用是否指向同一个对象实体

像String、Date、File、包装类 等都重写了Object类中的equals()方法。重写以后，比较的不是两个引用的地址是否相同，而是比较两个对象的"实体内容"是否相同。

通常情况下，我们自定义的类如果使用equals()的话，也通常是比较两个对象的"实体内容"是否相同。那么，我们就需要对Object类中的equals()进行重写.

重写的原则：比较两个对象的实体内容是否相同.

```java
class User{
	String name;
	int age;
	//重写其equals()方法
	public boolean equals(Object obj){
		if(obj == this){//判断形参和比较对象的引用地址是否相同，相同直接返回true
			return true;
		}
		if(obj instanceof User){
			User u = (User)obj;
			return this.age == u.age && this.name.equals(u.name);
		}
		return false;
	}
}
```

#### == 运算符的使用

== ：运算符

1. 可以使用在基本数据类型变量和引用数据类型变量中

2. 如果比较的是基本数据类型变量：

   比较两个变量保存的数据是否相等。（不一定类型要相同）

3. 如果比较的是引用数据类型变量：

   比较两个对象的地址值是否相同,即两个引用是否指向同一个对象实体

**使用说明**

- == 符号使用时，必须保证符号左右两边的变量类型一致。
- 基本数据类型用==，引用数据类型用equals

#### toString()方法

1. 当我们输出一个对象的引用时，实际上就是调用当前对象的toString()方法

2. Object类中toString()的定义：

   ```java
   public String toString() {
           return getClass().getName() + "@" + Integer.toHexString(hashCode());
   }
   
   ```

3. 像String、Date、File、包装类等都重写了Object类中的toString()方法。使得在调用对象的toString()时，返回"实体内容"信息。

4. 自定义类也可以重写toString()方法，当调用此方法时，返回对象的"实体内容"

```java
	//自动实现
	@Override
	public String toString() {
		return "Customer [name=" + name + ", age=" + age + "]";
	}


```

### 内部类

Java中允许将一个类A声明在另一个类B中，则类A就是内部类，类B称为外部类。

成员内部类（静态、非静态 ） 局部内部类(方法内、代码块内、构造器内)

一方面，作为外部类的成员：

- 调用外部类的结构
- 可以被static修饰
- 可以被4种不同的权限修饰

另一方面，作为一个类：

- 类内可以定义属性、方法、构造器等
- 可以被final修饰，表示此类不能被继承。言外之意，不使用final，就可以被继承
- 可以被abstract修饰

 **如何创建成员内部类的对象？(静态的，非静态的)**

```java
// 创建静态的Dog内部类的实例(静态的成员内部类):
Person.Dog dog = new Person.Dog();

// 创建非静态的Bird内部类的实例(非静态的成员内部类):
// Person.Bird bird = new Person.Bird();//错误的
Person p = new Person();
Person.Bird bird = p.new Bird();


```

**如何在成员内部类中调用外部类的结构？**

```java
class Person{
    String name = "小明";
    public void eat(){
    }
    //非静态成员内部类
    class Bird{
        String name = "杜鹃";
        public void display(String name){
            System.out.println(name);//方法的形参
            System.out.println(this.name);//内部类的属性
            System.out.println(Person.this.name);//外部类的属性
            //Person.this.eat();
        }
    }
}
```

### 局部内部类的使用：

```java
//返回一个实现了Comparable接口的类的对象
public Comparable getComparable(){

    //创建一个实现了Comparable接口的类:局部内部类
    //方式一：
    //      class MyComparable implements Comparable{
    //
    //          @Override
    //          public int compareTo(Object o) {
    //              return 0;
    //          }
    //          
    //      }
    //      
    //      return new MyComparable();

    //方式二：
    return new Comparable(){

        @Override
        public int compareTo(Object o) {
            return 0;
        }
    };
}


```



### 多态性

```java
class Base {
	int count = 10;

	public void display() {
		System.out.println(this.count);
	}
}

class Sub extends Base {
	int count = 20;

	public void display() {
		System.out.println(this.count);
	}
}

public class FieldMethodTest {
	public static void main(String[] args) {
		Sub s = new Sub();
		System.out.println(s.count);//20
		s.display();//20
		
		Base b = s;//多态性
		//==：对于引用数据类型来讲，比较的是两个引用数据类型变量的地址值是否相同
		System.out.println(b == s);//true
		System.out.println(b.count);//10
		b.display();//20
	}
}
```



若子类重写了父类方法，就意味着子类里面定义的方法彻底覆盖了父类里的同名方法，系统将不可能把父类里的方法转移到子类中：编译看左边，运行看右边

对于实例变量则不存在这样的现象，即使子类里定义了与父类完全相同的实例变量，这个实例变量依然不可能覆盖父类中定义的实例变量：编译运行都看左边

### 关键字

#### this关键字

在类的方法中，我们可以使用"this.属性"或"this.方法"的方式，调用当前对象属性或方法。但是，通常情况下，我们都择省略"this."。特殊情况下，如果***方法的形参和类的属性同名时***，我们必须显式的使用"this.变量"的方式，表明此变量是属性，而非形参。

在类的构造器中，我们可以使用"this.属性"或"this.方法"的方式，调用当前正在创建的对象属性或方法。但是，通常情况下，我们都择省略"this."。特殊情况下，如果***构造器的形参和类的属性同名***时，我们必须显式的使用"this.变量"的方式，表明此变量是属性，而非形参。

#### super -- 父类的

super 关键字可以理解为：父类的，可以用来调用的结构：***属性、方法、构造器***

- 尤其当子父类出现同名成员时，可以用supe表明调用的是父类中的成员
- super的追溯不仅限于直接父类
- super和this的用法相像，this代表本类对象的引用， super代表父类的内存空间的标识

super调用构造器：

我们可以在子类的构造器中显式的使用"super(形参列表)"的方式，调用父类中声明的指定的构造器

"super(形参列表)"的使用，必须声明在子类构造器的首行！

我们在类的构造器中，针对于"this(形参列表)"或"super(形参列表)"只能二选一，不能同时出现

在构造器的首行，没显式的声明"this(形参列表)"或"super(形参列表)"，则默认调用的是父类中空参的构造器：super()

在类的多个构造器中，至少一个类的构造器中使用了"super(形参列表)"，调用父类中的构造器

#### static -- 静态的

主要用来修饰类的内部结构，如：属性、方法、代码块、内部类

属性是否使用static修饰，可分为：静态属性 vs 非静态属性(实例变量)

- 实例变量：我们创建了类的多个对象，每个对象都独立的拥一套类中的非静态属性。当修改其中一个对象中的非静态属性时，不会导致其他对象中同样的属性值的修改。
- 静态变量：我们创建了类的多个对象，多个对象共享同一个静态变量。当通过某一个对象修改静态变量时，会导致其他对象调用此静态变量时，是修改过了的。

static修饰属性的其他说明：

- 静态变量随着类的加载而加载。可以通过"类.静态变量"的方式进行调用
- 静态变量的加载要早于对象的创建。
- 由于类只会加载一次，则静态变量在内存中也只会存在一份：存在方法区的静态域中。

static修饰方法：静态方法、类方法

- 随着类的加载而加载，可以通过"类.静态方法"的方式进行调用
- 静态方法中，只能调用静态的方法或属性(静态方法和属性加载早于成员属性)
- 非静态方法中，既可以调用非静态的方法或属性，也可以调用静态的方法或属性
- 静态方法不能被重写

**使用的注意点：**

- 在静态的方法内，不能使用this关键字、super关键字
- 关于静态属性和静态方法的使用，大家都从生命周期的角度去理解。

#### final -- 最终的

**可以用来修饰：类、方法、变量**

1. final 用来修饰一个类:此类不能被其他类所继承。

   比如：String类、System类、StringBuffer类

2. final 用来修饰方法：表明此方法不可以被重写

   比如：Object类中getClass();

3. final 用来修饰变量：此时的"变量"就称为是一个常量

   - final修饰属性：可以考虑赋值的位置：显式初始化、代码块中初始化、构造器中初始化

   - final修饰局部变量：尤其是使用final修饰形参时，表明此形参是一个常量。当我们调用此方法时，给常量形参赋一个实参。一旦赋值以后，就只能在方法体内使用此形参，但不能进行重新赋值。

   - ```java
     public void test(final String name){
     
     }
     ```

     

4. static final 用来修饰属性：全局常量

#### abstract -- 抽象的

abstract: 抽象的，可以用来修饰：类、方法

**abstract修饰类：抽象类**

- 此类不能实例化
- 抽象类中一定有构造器，便于子类实例化时调用（涉及：子类对象实例化的全过程）
- 开发中，都会提供抽象类的子类，让子类对象实例化，完成相关的操作 --->抽象的使用前提：继承性

**abstract修饰方法：抽象方法**

- 抽象方法只方法的声明，没方法体
- 包含抽象方法的类，一定是一个抽象类。反之，抽象类中可以没有抽象方法的。
- 若子类重写了父类中的所的抽象方法后，此子类方可实例化
- 若子类没重写父类中的所的抽象方法，则此子类也是一个抽象类，需要使用abstract修饰

#### 匿名类

```java
public abstract class Person{
    //抽象方法
    public abstract void eat();
}

// 此类继承Person类要重写方法 没有类名（也用到的多态）
Person p = new Person(){

    @Override
    public void eat() {
        System.out.println("吃东西");
    }
};
```



#### 代码块

1. 代码块的作用：用来初始化类、对象的 

2. 代码块如果有修饰的话，只能使用 static 

3. 分类:静态代码块 vs 非静态代码块

   *静态代码块*

   * 内部可以有输出语句

    *  随着类的加载而执行,而且只执行一次
    *  作用:初始化类的信息
    *  如果一个类中，定义了多个静态代码块，则按照声明的先后顺序执行
    *  静态代码块的执行，优先于非静态代码块的执行
    *  静态代码块内只能调用静态的属性、静态的方法，不能调用非静态的结构

   *非静态代码块*

   *  内部可以有输出语句
    *  随着对象的创建而执行
    *  每创建一个对象，就执行一次非静态代码块。
    *  作用:可以在创建对象时，对对象的属性等进行初始化。
    *  如果一个类中，定义了多个非静态代码块，则按照声明的先后顺序执行
    *  非静态代码块内可以调用静态的属性、静态的方法，或非静态的属性、非静态的方法。


**程序中成员变量赋值的执行顺序**

   *对属性可以赋值的位置*

   1. 默认初始化 
   2. 显式初始化 / ⑤在代码块中赋值 
   3. 构造器中初始化 
   4. 有了对象以后，可以通过"对象.属性"或"对象.方法"的方式，进行赋值。

#### java代码执行顺序

静态代码块 -> main方法 -> 普通代码块 -> 构造方法 -> 普通方法

静态代码块只执行一次：

​	因为static代码块只在类加载的时候执行，类是用类加载器来读取的，类加载器是带有一个缓存去的，它会把读取到的类缓存起来，所以在一次虚拟机运行期间，一个类只会被加载一，静态代码块只会运行一次。

### interface -- 接口

1. 接口使用interface来定义
2. Java中，接口和类是并列的两个结构

如何定义接口：定义接口中的成员

接口中不能定义构造器的！意味着接口不可以实例化

Java开发中，接口通过让类去实现(implements)的方式来使用.

- 如果实现类覆盖了接口中的所抽象方法，则此实现类就可以实例化
- 如果实现类没覆盖接口中所的抽象方法，则此实现类仍为一个抽象类

Java类可以实现多个接口 --->弥补了Java单继承性的局限性

格式：class AA extends BB implements CC,DD,EE

接口与接口之间可以继承，而且可以多继承

接口的具体使用，体现多态性

接口，实际上可以看做是一种规范

**Java8中关于接口的新规范**

JDK7及以前：只能定义全局常量和抽象方法

- 全局常量：public static final的，书写时可以省略不写
- 抽象方法：public abstract的

JDK8：除了定义全局常量和抽象方法之外，还可以定义静态方法、默认方法

- Java8中，可以为接口添加静态方法和默认方法。从技术角度来说，这是完全合法的，只是它看起来违反了接口作为一个抽象定义的理念。

- 静态方法：使用 static关键字修饰。

  可以通过接口直接调用静态方法，并执行其方法体。我们经常在相互一起使用的类中使用静态方法。你可以在标准库中找到像 Collection/co| ections或者Path/ Paths这样成对的接口和类。

- 默认方法：默认方法使用 default关键字修饰。

- 可以通过实现类对象来调用。我们在已有的接口中提供新方法的同时，还保持了与旧版本代码的兼容性比如：java8API中对 Collection、List、 Comparator等接口提供了丰富的默认方法。

```java
public interface TestInterface {
    public static final String NAME = "netjic";
    //静态方法
    public static void method1() {
        System.out.println("西安");
    }

    //默认方法
    public default void method2(){
        System.out.println("深圳");
    }

    default void method3(){
        System.out.println("杭州");
    }

    public abstract void method4();
}
	TestInterface.method1() 调用静态方法
	TestInterface.NAME 调用静态常量方法
        
    @Override
    public void method4() {
        System.out.println("实现抽象方法");
    }

    @Override
    public void method2() {
        System.out.println("重写public default .. ()");
    }
    

    @Override
    public void method3() {
        System.out.println("重写 . default .. ()");
    }
```



## 多线程的使用

### 1.线程的创建

#### 1.继承Thread类

Thread()：创建新的 Thread对象

Thread（String threadName）：创建线程并指定线程实例名

Thread（Runnable target）：指定创建线程的目标对象，它实现了 Runnable接口中的run方法

Thread（Runnable target， String name）：创建新的 Thread对象

创建线程类

```java
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            if (i % 2 == 0) {
                System.out.println(i);	
            }
        }
    }
}
```

使用多线程

```java
public class ThreadTest {
    public void threadTest() {
        MyThread myThread = new MyThread();
        // 启动当前线程
        myThread.start();
    }
```

匿名类创建线程

```java
public void test() {
        new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println("匿名类创建线程一" + i);
                }
            }
        }.start();
        new Thread() {
            @Override
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println("匿名类创建线程二"+i);
                }
            }
        }.start();
    }
```

#### 2.实现Runnable接口

```java
//1. 创建一个实现了Runnable接口的类
public class RunnableTest implements Runnable {
    // 2. 实现类去实现Runnable中的抽象方法：run()
    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            System.out.println(i);
        }
    }
}

class test {
    public static void main(String[] args) {
        //3. 创建实现类的对象
        RunnableTest runnableTest = new RunnableTest();
        //4. 将此对象作为参数传递到Thread类的构造器中，创建Thread类的对象
        Thread thread = new Thread(runnableTest);
        //5. 通过Thread类的对象调用start()
        thread.start();

    }
}


```

**两种方式的对比：**

开发中优先选择：实现Runnable接口的方式

**原因：**

1. 实现的方式没类的单继承性的局限性

2. 实现的方式更适合来处理多个线程共享数据的情况。

Thread类常用方法：

1. start():启动当前线程；调用当前线程的run()，只有Thread类和他的子类才能调用start()方法
2. run(): 通常需要重写Thread类中的此方法，将创建的线程要执行的操作声明在此方法中
3. currentThread():静态方法，返回执行当前代码的线程
4. getName():获取当前线程的名字
5. setName():设置当前线程的名字
6. yield():释放当前cpu的执行权
7. join():在线程a中调用线程b的join(),此时线程a就进入阻塞状态，直到线程b完全执行完以后，线程a才结束阻塞状态。
8. stop():已过时。当执行此方法时，强制结束当前线程。
9. sleep(long millitime):让当前线程“睡眠”指定的millitime毫秒。在指定的millitime毫秒时间内，当前线程是阻塞状态。
10. isAlive():判断当前线程是否存活

### 2.Thread的生命周期

- 新建：当一个 Thread类或其子类的对象被声明并创建时，新生的线程对象处于新建状态

- 就绪：处于新建状态的线程被star()后，将进入线程队列等待CPU时间片，此时它已具备了运行的条件，只是没分配到CPU资源

- 运行：当就绪的线程被调度并获得CPU资源时，便进入运行状态，run()方法定义了线程的操作和功能

- 阻塞：在某种特殊情况下，被人为挂起或执行输入输出操作时，让出CP∪并临时中止自己的执行，进入阻塞状态（等待状态）

- 死亡：线程完成了它的全部工作或线程被提前强制性地中止或出现异常导致结束

### 3.线程的同步机制

#### 为什么会出现线程不安全？

```java
public class Window extends Thread {
    private static int ticket = 100; // 共享数据 Window类所有

    @Override
    public void run() {
        // 0
        while (true) {
            // 1
            if (ticket > 0) {
                // 2
                System.out.println(ticket);
                // 3
                ticket--;
            } else {
                break;
            }
        }
    }
}
```

​	当有两个线程执行上面的代码：

A 线程执行 1处 ticket =100  B线程执行 0处 ticket =100

A 线程执行 2处 ticket =100 B线程执行 2处 ticket =100(此时的值应该是99，也就是说if中A还没有--，B线程钻了个空子进来了)

A 线程执行 3处 B ticket = 99 B线程执行 3处 ticket = 98

#### 同步代码块

```java
synchronized(同步监视器){//同步监视器就是需要同步线程的公共对象
	//需要被同步的代码
}
```

1. 同步监视器，俗称：锁。任何一个类的对象，都可以充当锁。

2. 要求多个线程必须要共用同一把锁。

   **继承Thread接口形式同步代码块**

```java
public class Window3 extends Thread {
    // 共享数据票
    private static int ticket = 100; 
	// 同步监视器对象（锁）共用同一把锁（类所有）
    private static final Object object = new Object();

    @Override
    public void run() {
        while (true) {
            synchronized (object) {
                if (ticket > 0) {
                    try {
                        Thread.sleep(500);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    System.out.println(Thread.currentThread().getName() + "卖票，票号为：" + ticket);
                    ticket--;
                } else {
                    break;
                }
            }
        }
    }
}
```

**实现Runnable接口形式同步代码块**

```java
public class Ticket implements Runnable {
    private int tick = 100;

    @Override
    public void run() {

        while (true) {
            synchronized (this) {
                if (tick > 0) {
                    System.out.println(Thread.currentThread().getName() + "号窗口买票，票号为：" + tick--);
                } else {
                    break;
                }
            }
        }
    }
}

class TicketTest {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();

        Thread thread1 = new Thread(ticket);
        Thread thread2 = new Thread(ticket);
        Thread thread3 = new Thread(ticket);

        thread1.setName("窗口1");
        thread2.setName("窗口2");
        thread3.setName("窗口3");

        thread1.start();
        thread2.start();
        thread3.start();

    }
}


```

####  同步方法

如果操作共享数据的代码完整的声明在一个方法中，我们不妨将此方法声明同步的。

```java
public synchronized void show(String namer){
....
}
```

实现Runnable接口

```java
public class Ticket3 implements Runnable {
    private int tick = 100;
    private boolean isFlag = true;

    @Override
    public void run() {
        while (isFlag) {
            show();

        }
    }

    public synchronized void show() { // 锁是 this
        if (tick > 0) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "号窗口买票，票号为：" + tick--);
        } else {
            isFlag = false;
        }
    }
}

class TicketTest3 {
    public static void main(String[] args) {
        Ticket3 ticket = new Ticket3();

        Thread thread1 = new Thread(ticket);
        Thread thread2 = new Thread(ticket);
        Thread thread3 = new Thread(ticket);

        thread1.setName("窗口1");
        thread2.setName("窗口2");
        thread3.setName("窗口3");

        thread1.start();
        thread2.start();
        thread3.start();

    }
}


```

继承Thread类

```java
public class Ticket4 extends Thread {
    private static int tick = 100;
    private static boolean isFlag = true;

    @Override
    public void run() {
        while (isFlag) {
            show();

        }
    }

    public static synchronized void show() {  // 锁是 类.class 此方法应是static的共享同一个类.class 锁
        if (tick > 0) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(Thread.currentThread().getName() + "号窗口买票，票号为：" + tick--);
        } else {
            isFlag = false;
        }
    }
}

class TicketTest3 {
    public static void main(String[] args) {
        Ticket3 thread1 = new Ticket3();
        Ticket3 thread2 = new Ticket3();
        Ticket3 thread3 = new Ticket3();

        thread1.setName("窗口1");
        thread2.setName("窗口2");
        thread3.setName("窗口3");

        thread1.start();
        thread2.start();
        thread3.start();

    }
}
```

#### Lock锁 --- JDK 5.0新增

```java
class A {
    //1.实例化ReentrantLock对象
    private final ReenTrantLock lock = new ReenTrantLook();
    public void m (){
        lock.lock//2.先加锁
        try{
            //保证线程同步的代码
        }finally{
            lock.unlock();//3.后解锁
        }
    }
}

//注意：如果同步代码块有异常，要将unlock()写入finally语句块中


```

```java
class Window implements Runnable{

    private int ticket = 100;
    //1.实例化ReentrantLock
    private ReentrantLock lock = new ReentrantLock();

    @Override
    public void run() {
        while(true){
            try{

                //2.调用锁定方法lock()
                lock.lock();

                if(ticket > 0){

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + "：售票，票号为：" + ticket);
                    ticket--;
                }else{
                    break;
                }
            }finally {
                //3.调用解锁方法：unlock()
                lock.unlock();
            }

        }
    }
}

public class LockTest {
    public static void main(String[] args) {
        Window w = new Window();

        Thread t1 = new Thread(w);
        Thread t2 = new Thread(w);
        Thread t3 = new Thread(w);

        t1.setName("窗口1");
        t2.setName("窗口2");
        t3.setName("窗口3");

        t1.start();
        t2.start();
        t3.start();
    }
}


```

#### 同步方法总结

1. 必须确保使用同一个资源的多个线程共用一把锁，这个非常重要，否则就无法保证共享资源的安全

   同步代码块：

   ​	实现Runnable接口时：可以使用this当做锁

   ​	继承Thread时：可以使用 类名.class当锁

   同步方法：

   ​	实现Runnable接口时：使用的是this当做锁

   ​	继承Thread时：使用的 类名.class当锁 （方法应该是静态的	）

#### 死锁问题

死锁的理解： 不同的线程分别占用对方需要的同步资源不放弃，都在等待对方放弃自己需要的同步资源，就形成了线程的死锁

```java
public static void main(String[] args) {

    StringBuffer s1 = new StringBuffer();
    StringBuffer s2 = new StringBuffer();


    new Thread(){
        @Override
        public void run() {

            synchronized (s1){

                s1.append("a");
                s2.append("1");

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }


                synchronized (s2){
                    s1.append("b");
                    s2.append("2");

                    System.out.println(s1);
                    System.out.println(s2);
                }


            }

        }
    }.start();


    new Thread(new Runnable() {
        @Override
        public void run() {
            synchronized (s2){

                s1.append("c");
                s2.append("3");

                try {
                    Thread.sleep(100);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }

                synchronized (s1){
                    s1.append("d");
                    s2.append("4");

                    System.out.println(s1);
                    System.out.println(s2);
                }
            }
        }
    }).start();


}


```

### 4.线程通信

线程A运行线程B阻塞，线程A运行完毕启用阻塞并告诉线程B运行，线程B运行完毕启用阻塞并告诉线程A运行，交替运行

交替打印

```java
class MyThread implements Runnable {
    private int number = 1;
    private Object object = new Object();

    @Override
    public void run() {
        while (true) {

            synchronized (object) {
                object.notify();//调用notify()方法唤醒线程
                if (number <= 100) {
                    //线程休眠
                    try {
                        Thread.sleep(10);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }

                    System.out.println(Thread.currentThread().getName() + number);
                    number++;

                    try {
                        object.wait();//打印输出一次后调用wait()方法将线程阻塞
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                } else {
                    break;
                }
            }
        }
    }
}

public class CommunicationTest {
    public static void main(String[] args) {
        MyThread myThread = new MyThread();

        Thread thread1 = new Thread(myThread);
        Thread thread2 = new Thread(myThread);

        thread1.setName("线程1:");
        thread2.setName("线程2:");

        thread1.start();
        thread2.start();
    }
}


```

wait():一旦执行此方法，当前线程就进入阻塞状态，并释放同步监视器。

notify():一旦执行此方法，就会唤醒被wait的一个线程。如果有多个线程被wait，就唤醒优先级高的那个。

notifyAll():一旦执行此方法，就会唤醒所有被wait的线程。

wait()，notify()，notifyAll()三个方法必须使用在同步代码块或同步方法中。

wait()，notify()，notifyAll()三个方法的调用者必须是同步代码块或同步方法中的同步监视器。否则，会出现IllegalMonitorStateException异常

wait()，notify()，notifyAll()三个方法是定义在java.lang.Object类中。

**sleep() 和 wait()的异同？**

相同点：一旦执行方法，都可以使得当前的线程进入阻塞状态。

不同点：

1）两个方法声明的位置不同：Thread类中声明sleep() , Object类中声明wait()

2）调用的要求不同：sleep()可以在任何需要的场景下调用。 wait()必须使用在同步代码块或同步方法中

3）关于是否释放同步监视器：如果两个方法都使用在同步代码块或同步方法中，sleep()不会释放锁，wait()会释放锁。

### 5.JDK 5.0新增线程创建方式

#### 实现Callable

创建一个实现Callable的实现类

实现call方法，将此线程需要执行的操作声明在call()中

创建Callable接口实现类的对象

将此Callable接口实现类的对象作为传递到FutureTask构造器中，创建FutureTask的对象

将FutureTask的对象作为参数传递到Thread类的构造器中，创建Thread对象，并调用start()

获取Callable中call方法的返回值

```java
class NumThread implements Callable {
    //2.实现call方法，将此线程需要执行的操作声明在call()中
    @Override
    public Object call() throws Exception {
        int sum = 0;
        for (int i = 1; i <= 100; i++) {
            if(i % 2 == 0){
                System.out.println(i);
                sum += i;
            }
        }
        return sum;
    }
}


 class ThreadNew {
    public static void main(String[] args) {
        //3.创建Callable接口实现类的对象
        NumThread numThread = new NumThread();
        //4.将此Callable接口实现类的对象作为传递到FutureTask构造器中，创建FutureTask的对象
        FutureTask futureTask = new FutureTask(numThread);
        //5.将FutureTask的对象作为参数传递到Thread类的构造器中，创建Thread对象，并调用start()
        new Thread(futureTask).start();

        try {
            //6.获取Callable中call方法的返回值
            //get()返回值即为FutureTask构造器参数Callable实现类重写的call()的返回值。
            Object sum = futureTask.get();
            System.out.println("总和为：" + sum);
        } catch (InterruptedException e) {
            e.printStackTrace();
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
    }

}


```

1. call()可以返回值的。
2. call()可以抛出异常，被外面的操作捕获，获取异常的信息
3. Callable是支持泛型的

##### 使用线程池

背景：经常创建和销毁、使用量特别大的资源，比如并发情况下的线程对性能影响很大。

提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。可以避免频繁创建销毁、实现重复利用。类似生活中的公共交通工具。

**实现方法：**

1. 提供指定线程数量的线程池
2. 执行指定的线程的操作。需要提供实现Runnable接口或Callable接口实现类的对象
3. 关闭连接池

**相关API：**

```java
JDK 5.0起提供了线程池相关AP|： Executor Service和 Executors

Executor Service：真正的线程池接口。常见子类 Thread Poolexecutor
void execute(Runnable command）：执行任务/命令，没有返回值，一般用来执行Runnable
<T> Future<T> submit（Callable<T>task）：执行任务，有返回值，一般又来执行Callable
void shutdown()：关闭连接池

Executors：工具类、线程池的工厂类，用于创建并返回不同类型的线程池
Executors. newCachedThreadPool()：创建一个可根据需要创建新线程的线程池
Executors.newFⅸedthreadPool(n)；创建一个可重用固定线程数的线程池
EXecutors. newSingleThreadEXecutor()：创建一个只有一个线程的线程池
Executors. new thread Poo(n)：创建一个线程池，它可安排在给定延迟后运行命令或者定期地执行。


```

```java
class NumberThread implements Runnable{

    @Override
    public void run() {
        for(int i = 0;i <= 100;i++){
            if(i % 2 == 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}

class NumberThread1 implements Runnable{

    @Override
    public void run() {
        for(int i = 0;i <= 100;i++){
            if(i % 2 != 0){
                System.out.println(Thread.currentThread().getName() + ": " + i);
            }
        }
    }
}

public class ThreadPool {

    public static void main(String[] args) {
        //1. 提供指定线程数量的线程池
        ExecutorService service = Executors.newFixedThreadPool(10);
        ThreadPoolExecutor service1 = (ThreadPoolExecutor) service;
        //设置线程池的属性
//        System.out.println(service.getClass());
//        service1.setCorePoolSize(15);
//        service1.setKeepAliveTime();


        //2.执行指定的线程的操作。需要提供实现Runnable接口或Callable接口实现类的对象
        service.execute(new NumberThread());//适合适用于Runnable
        service.execute(new NumberThread1());//适合适用于Runnable

//        service.submit(Callable callable);//适合使用于Callable
        //3.关闭连接池
        service.shutdown();
    }

}


```

**应用线程池的好处**

提高响应速度（减少了创建新线程的时间）

降低资源消耗（重复利用线程池中线程，不需要每次都创建）

便于线程管理

corePoolSize：核心池的大小

maximumPoolSize：最大线程数

keepAliveTime：线程没任务时最多保持多长时间后会终止

**创建线程的所有方法**

JDK 5.0以前：

- 即继承Thread类重run方法
- 实现Runnable接口实现run方法

JDK 5.0以后：

- 实现callable接口，实现call方法 有返回值 可以抛异常
- 利用线程池

## 集合

### 1.集合的分类

Java集合可分为Collection和Map两种体系

- Collection接口：单列数据，定义了存取一组对象的方法的集合
  - List：元素有序、可重复的集合
  - Set：元素无序、不可重复的集
- Map接口：双列数据，保存具有映射关系“key-value对”的集合

```java
|----Collection接口：单列集合，用来存储一个一个的对象
     |----List接口：存储有序的、可重复的数据。  -->“动态”数组
           |----ArrayList：作为List接口的主要实现类，线程不安全的，效率高;底层采用Object[] elementData数组存储
           |----LinkedList：对于频繁的插入删除操作，使用此类效率比ArrayList效率高底层采用双向链表存储
           |----Vector：作为List的古老实现类，线程安全的，效率低;底层采用Object[]数组存储
           
     |----Set接口：存储无序的、不可重复的数据   -->数学概念上的“集合”
           |----HashSet：作为Set接口主要实现类;线程不安全;可以存null值
           		|----LinkedHashSet：作为HashSet的子类;遍历其内部数据时，可以按照添加顺序遍历;对于频繁的遍历操作，LinkedHashSet效率高于HashSet.
           |----TreeSet：可以按照添加对象的指定属性，进行排序。


|----Map:双列数据，存储key-value对的数据   ---类似于高中的函数：y = f(x)
     |----HashMap:作为Map的主要实现类；线程不安全的，效率高；存储null的key和value
          |----LinkedHashMap:保证在遍历map元素时，可以照添加的顺序实现遍历。
                    原因：在原的HashMap底层结构基础上，添加了一对指针，指向前一个和后一个元素。
                    对于频繁的遍历操作，此类执行效率高于HashMap。
     |----TreeMap:保证照添加的key-value对进行排序，实现排序遍历。此时考虑key的自然排序或定制排序
                      底层使用红黑树
     |----Hashtable:作为古老的实现类；线程安全的，效率低；不能存储null的key和value
          |----Properties:常用来处理配置文件。key和value都是String类型



```

### 2.Collection接口

Collection接口是List、Set和Queue接口的父接口，该接口里定义的方法既可用于操作Set集合，也可用于操作List和 Queue集合。

JDK不提供此接口的任何直接实现，而是提供更具体的子接口（如：Set和List）实现。

在JDK 5.0之前，Java集合会丢失容器中所有对象的数据类型，把所有对象都当成 Object类型处理；从JDK 5.0增加了泛型以后，Java集合可以记住容器中对象的数据类型。

#### 1.collection接口常用方法

添加

- `add(Object obj)`
- `addAll(Collection coll)`

获取有效元素个数

- `int size()`

清空集合

- `void clear()`

是否为空集合

- `boolean isEmpty()`

是否包含某个元素

- `boolean contains(Object obj)`:是通过元素的equals方法来判断是否是同一个对象
- `boolean containsAll(Collection c)`:也是调用元素的equals方法来比较的。用两个两个集合的元素逐一比较

删除

- `boolean remove(Object obj)`:通过元素的equals方法判断是否是要删除的那个元素。只会删除找到的第一个元素
- `boolean removeAll(Collection coll)`:取当前集合的差集

取两个集合的交集

- `boolean retainAll(Collection c)`:把交集的结果存在当前的集合中，不影响c

集合是否相等

- `boolean equals(Object obj)`

转换成对象数组

- `Object [] toArray()`

### 3. Collection集合与数组间的转换

```java
Collection coll = new ArrayList();
coll.add(123);
coll.add(456);
coll.add(false);
//集合 --->数组：toArray()
Object[] arr = coll.toArray();
for(int i = 0;i < arr.length;i++){
System.out.println(arr[i]);
}

//拓展：数组 --->集合:调用Arrays类的静态方法asList(T ... t)
List<String> list = Arrays.asList(new String[]{"AA", "BB", "CC"});
System.out.println(list);

List arr1 = Arrays.asList(new int[]{123, 456});
System.out.println(arr1.size());//1

List arr2 = Arrays.asList(new Integer[]{123, 456});
System.out.println(arr2.size());//2



```

### 4.Iterator接口与foreach循环

① 使用迭代器Iterator

② foreach循环（或增强for循环）

```java
Collection coll = new ArrayList();
    coll.add(123);
    coll.add(456);
    coll.add(false);
Iterator iterator = coll.iterator();
//hasNext():判断是否还下一个元素
while(iterator.hasNext()){
    //next():①指针下移 ②将下移以后集合位置上的元素返回
    System.out.println(iterator.next());
}



```



```java
@Test
public void test3(){
    Collection coll = new ArrayList();
    coll.add(123);
    coll.add(456);
    coll.add(new Person("Jerry",20));
    coll.add("Tom"
            );
    coll.add(false);

    //删除集合中"Tom"
    Iterator iterator = coll.iterator();
    while (iterator.hasNext()){
        //            iterator.remove();
        Object obj = iterator.next();
        if("Tom".equals(obj)){
            iterator.remove();
            // iterator.remove();
        }

    }
    //将指针重新放到头部，遍历集合
    iterator = coll.iterator();
    while (iterator.hasNext()){
        System.out.println(iterator.next());
    }
}



```

iterator remove方法底层

```java
ArrayList.this.remove(lastRet); // 调用本类的remove方法
```

foreach

```java
 @Test
    public void test1(){
        Collection coll = new ArrayList();
        coll.add(123);
        coll.add(456);
        coll.add(new String("Tom"));
        coll.add(false);

        //for(集合元素的类型 局部变量 : 集合对象)

        for(Object obj : coll){
            System.out.println(obj);
        }
    }
```

### 5.List接口

1. **存储的数据特点：**

存储序有序的、可重复的数据。

- 鉴于Java中数组用来存储数据的局限性，我们通常使用List替代数组
- List集合类中元素有序、且可重复，集合中的每个元素都有其对应的顺序索引。
- List容器中的元素都对应一个整数型的序号记载其在容器中的位置，可以根据序号存取容器中的元素。
- JDK AP中List接口的实现类常用的有：ArrayList、LinkedList和 Vector.

List除了从 Collection集合继承的方法外，List集合里添加了一些根据索引来操作集合元素的方法。

读下源码就知道怎么用了

- `void add(int index, Object ele)`:在index位置插入ele元素
- `boolean addAll(int index, Collection eles)`:从index位置开始将eles中的所有元素添加进来
- `Object get(int index)`:获取指定index位置的元素
- `int indexOf(Object obj)`:返回obj在集合中首次出现的位置
- `int lastIndexOf(Object obj)`:返回obj在当前集合中末次出现的位置
- `Object remove(int index)`:移除指定index位置的元素，并返回此元素
- `Object set(int index, Object ele)`:设置指定index位置的元素为ele
- `List subList(int fromIndex, int toIndex)`:返回从fromIndex到toIndex位置的子集合(改变子集合父集合也变)

总结：

- 增：`add(Object obj)`
- 删：`remove(int index)` / `remove(Object obj)`
- 改：`set(int index, Object ele)`
- 查：`get(int index)`
- 插：`add(int index, Object ele)`
- 长度：`size()`
- 遍历： ① Iterator迭代器方式 ② foreach（增强for循环） ③ 普通的循环

#### ArrayList

ArrayList是List接口的典型实现类、主要实现类

本质上，ArrayList是对象引用的一个”变长”数组

Array Listi的JDK 1.8之前与之后的实现区别？

- JDK 1.7：ArrayList像饿汉式，直接创建一个初始容量为10的数组
- JDK 1.8：ArrayList像懒汉式，一开始创建一个长度为0的数组，当添加第一个元素时再创建一个始容量为10的数组

`Arrays.asList(...)`方法返回的List集合，既不是 ArrayList实例，也不是Vector实例。`Arrays.asList(...)`返回值是一个固定长度的List集合

#### linkedList

对与对于频繁的插入和删除元素操作，建议使用LinkedList类，效率更高

新增方法：

- `void addFirst(Object obj)`
- `void addLast(Object obj)`
- `Object getFirst()`
- `Object getlast)()`
- `Object removeFirst()`
- `Object removeLast()`

Linkedlist：双向链表，内部没有声明数组，而是定义了Node类型的frst和last，用于记录首末元素。同时，定义内部类Node，作为 Linkedlist中保存数据的基本结构。Node除了保存数据，还定义了两个变量：

- prev：变量记录前一个元素的位置
- next：变量记录下一个元素的位置

存储的元素的要求：

添加的对象，所在的类要重写equals()方法

**面试题**

请问 ArrayList/LinkedList/Vector的异同？谈谈你的理解？ArrayList底层是什么？扩容机制？ Vector和 ArrayList的最大区别？

- ArrayList和 Linkedlist的异同：

  二者都线程不安全，相比线程安全的 Vector，ArrayList执行效率高。 此外，ArrayList是实现了基于动态数组的数据结构，Linkedlist基于链表的数据结构。对于随机访问get和set，ArrayList觉得优于Linkedlist，因为Linkedlist要移动指针。对于新增和删除操作add（特指插入）和 remove，Linkedlist比较占优势，因为 ArrayList要移动数据。

- ArrayList和 Vector的区别：

  Vector和ArrayList几乎是完全相同的，唯一的区别在于Vector是同步类(synchronized)，属于强同步类。因此开销就比 ArrayList要大，访问要慢。正常情况下，大多数的Java程序员使用ArrayList而不是Vector，因为同步完全可以由程序员自己来控制。Vector每次扩容请求其大小的2倍空间，而ArrayList是1.5倍。Vector还有一个子类Stack.

#### Vector

### 6.Set接口

Set接口是Collection的子接口，set接口没有提供额外的方法

Set集合不允许包含相同的元素，如果试把两个相同的元素加入同一个Set集合中，则添加操作失败。（多用于过滤操作，去掉重复数据）

Set判断两个对象是否相同不是使用==运算符，而是根据equals()方法

#### HashSet

**1.存储的数据特点：**

用于存放无序的、不可重复的元素

以HashSet为例说明：

1. 无序性：不等于随机性。存储的数据在底层数组中并非照数组索引的顺序添加，而是根据数据的哈希值决定的。
2. 不可重复性：保证添加的元素照equals()判断时，不能返回true.即：相同的元素只能添加一个。

#### LinkedHashSet

LinkedhashSet是HashSet的子类

LinkedhashSet根据元素的hashCode值来决定元素的存储位置但它同时使用双向链表维护元素的次序，这使得元素看起来是以插入顺序保存的。

LinkedhashSet插入性能略低于HashSet，但在迭代访问Set里的全部元素时有很好的性能。

LinkedhashSet不允许集合元素重复。

**底层原理是LInkedHashMap**

#### TreeSet

**与HashSet/LinkedHashSet的比较**

- 要求：向Set(主要指：HashSet、LinkedHashSet)中添加的数据，其所在的类一定要重写hashCode()和equals()（因为插入值时先根据hashCode算出的值定位在数据的位置，然后再根据equals()比较是否相同）
- 要求：重写的hashCode()和equals()尽可能保持一致性：相等的对象必须具有相等的散列码

**TreeSet**

1. 自然排序中，比较两个对象是否相同的标准为：`compareTo()` 返回0.不再是 `equals()`
2. 定制排序中，比较两个对象是否相同的标准为：`compare()` 返回0.不再是 `equals()`

所以TreeSet中添加对象是对象要实现Comparable或

```java
Comparator com = new Comparator() {
    //照年龄从小到大排列
    @Override
    public int compare(Object o1, Object o2) {
        if(o1 instanceof User && o2 instanceof User){
            User u1 = (User)o1;
            User u2 = (User)o2;
            return Integer.compare(u1.getAge(),u2.getAge());
        }else{
            throw new RuntimeException("输入的数据类型不匹配");
        }
    }
};

TreeSet set = new TreeSet(com);
```



```java
@Test
public void test1(){
    TreeSet set = new TreeSet();

    //失败：不能添加不同类的对象
    //        set.add(123);
    //        set.add(456);
    //        set.add("AA");
    //        set.add(new User("Tom",12));

    //举例一：
    //        set.add(34);
    //        set.add(-34);
    //        set.add(43);
    //        set.add(11);
    //        set.add(8);

    //举例二：
    set.add(new User("Tom",12));
    set.add(new User("Jerry",32));
    set.add(new User("Jim",2));
    set.add(new User("Mike",65));
    set.add(new User("Jack",33));
    set.add(new User("Jack",56));


    Iterator iterator = set.iterator();
    while(iterator.hasNext()){
        System.out.println(iterator.next());
    }

}



```

```java
public class User implements Comparable {
    private String name;
    private int age;

    @Override
    public int compareTo(Object o) {
        if (o instanceof User) {
            User u = (User) o;
            int i = this.name.compareTo(u.name);
            if (i == 0) {
                return Integer.compare(this.age, u.age);
            } else {
                return i;
            }
        }
        return 0;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        User user = (User) o;

        if (age != user.age) {
            return false;
        }
        return name != null ? name.equals(user.name) : user.name == null;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + age;
        return result;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public User() {
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

```java
 public void test2(){
        Comparator com = new Comparator() {
            //照年龄从小到大排列
            @Override
            public int compare(Object o1, Object o2) {
                if(o1 instanceof User && o2 instanceof User){
                    User u1 = (User)o1;
                    User u2 = (User)o2;
                    return Integer.compare(u1.getAge(),u2.getAge());
                }else{
                    throw new RuntimeException("输入的数据类型不匹配");
                }
            }
        };

        TreeSet set = new TreeSet(com);
        set.add(new User("Tom",12));
        set.add(new User("Jerry",32));
        set.add(new User("Jim",2));
        set.add(new User("Mike",65));
        set.add(new User("Mary",33));
        set.add(new User("Jack",33));
        set.add(new User("Jack",56));

        Iterator iterator = set.iterator();
        while(iterator.hasNext()){
            System.out.println(iterator.next());
        }
    }

```

#### Map

Map与Collection并列存在。用于保存具有映射关系的数据:key-value

Map中的key和value都可以是任何引用类型的数据

Map中的key用set来存放，不允许重复，即同一个Map对象所对应的类，须重写 `hashCode()` 和 `equals()` 方法

常用 String类作为Map的“键”

key和value之间存在单向一对一关系，即通过指定的key总能找到唯一的、确定的value

Map接口的常用实现类:HashMap、TreeMap、LinkedHashMap和Properties。其中，HashMap是Map接口使用频率最高的实现类

```
|----Map:双列数据，存储key-value对的数据   ---类似于高中的函数：y = f(x)
     |----HashMap:作为Map的主要实现类；线程不安全的，效率高；存储null的key和value
          |----LinkedHashMap:保证在遍历map元素时，可以照添加的顺序实现遍历。
                    原因：在原的HashMap底层结构基础上，添加了一对指针，指向前一个和后一个元素。
                    对于频繁的遍历操作，此类执行效率高于HashMap。
     |----TreeMap:保证照添加的key-value对进行排序，实现排序遍历。此时考虑key的自然排序或定制排序
                      底层使用红黑树
     |----Hashtable:作为古老的实现类；线程安全的，效率低；不能存储null的key和value
          |----Properties:常用来处理配置文件。key和value都是String类型


HashMap的底层： 数组+链表  （JDK 7.0及之前)
               数组+链表+红黑树 （JDK 8.0以后)

```

##### **HashMap**

`DEFAULT_INITIAL_CAPACITY` : HashMap的默认容量，16

`DEFAULT_LOAD_FACTOR`：HashMap的默认加载因子：0.75

`threshold`：扩容的临界值，= 容量*填充因子：16 * 0.75 => 12

`TREEIFY_THRESHOLD`：Bucket中链表长度大于该默认值，转化为红黑树:JDK 8.0引入

`MIN_TREEIFY_CAPACITY`：桶中的Node被树化时最小的hash表容量:64

###### put()方法：

将指定key-value添加到(或修改)当前map对象中

```java
public V put(K key, V value) {
        return putVal(hash(key), key value, false, true);
}
```

调用hash(key)方法算出key在数据的位置，putVal方法会判断这个位置是否存在数据，如果不存在将数据存放在这个位置，如果存在调用 key的equals比较key是否相同如果相同value替换成新的value值，如果key的equals不相同，在jdk7中将这个key放到链表的头部，在jdk8中key放到链表的尾部，如果链表的长度等于8加上这个数据大于8了此时就要将链表转化为红黑树，还要判断数组的长度是否大于64，如果不大于64，数组扩容计算所用的key的位置重新分配位置

Object remove(Object key)：移除指定key的key-value对，并返回value

```
 p.next = node.next;
```

这是其中的一条情况,链表的p元素的next原来指向的是node(remove 的)现在要删除node所以让p.next指向node的next(A-B-C => A-C)

###### putAll(Map m):

将m中的所有key-value对存放到当前map中

######  clear()：

清空当前map中的所有数据

```java
for (int i = 0; i < tab.length; ++i){
    tab[i] = null;
}
```

###### Map扩容机制：

hashMap懒汉模式 实例化对象是没是初始化容量在，第一次添加元素的时候第一次扩容

```java
if ((tab = table) == null || (n = tab.length) == 0)
    n = (tab = resize()).length;
```

扩容

```java
newCap = DEFAULT_INITIAL_CAPACITY; // 初始容量是 1<<4 = 二的四次方 16
newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
threshold = newThr; // 扩容阈值 = 加载因子 0.7 * 默认初始容量16  = 12  数组容量大于12时扩容
// 扩容条件
if (++size > threshold)
            resize();
// 创建Node数组
Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
```

###### 元素查询的操作：

`Object get(Object key)`：获取指定key对应的value

`boolean containsKey(Object key)`：是否包含指定的key

`boolean containsValue(Object value)`：是否包含指定的value

`int size()`：返回map中key-value对的个数

`boolean isEmpty()`：判断当前map是否为空

`boolean equals(Object obj)`：判断当前map和参数对象obj是否相等

equals方法继承AbstractMap(也是循环遍历顺序也要一样)

```java
Iterator<Entry<K,V>> i = entrySet().iterator();
while (i.hasNext()) {
    Entry<K,V> e = i.next();
    K key = e.getKey();
    V value = e.getValue();
    if (value == null) {
        if (!(m.get(key)==null && m.containsKey(key)))
            return false;
    } else {
        if (!value.equals(m.get(key)))
            return false;
    }
}
```

######  元视图操作的方法：

- `Set keySet()`：返回所有key构成的Set集合

  ```java
  // 内部类KeySet 调用的都是HashMap内部的方法
      public final int size()                 { return size; }
  public final void clear()               { HashMap.this.clear(); }
  public final Iterator<K> iterator()     { return new KeyIterator(); }
  public final boolean contains(Object o) { return containsKey(o); }
  public final boolean remove(Object key) {
      return removeNode(hash(key), key, null, false, true) != null;
  }
  public final Spliterator<K> spliterator() {
      return new KeySpliterator<>(HashMap.this, 0, -1, 0, 0);
  }
  ```

  

- `Collection values()`：返回所有value构成的Collection集合

- `Set entrySet()`：返回所有key-value对构成的Set集合

  三个方法的原理一样

##### LinkedHashMap

- LinkedHashMap底层使用的结构与HashMap相同，因为LinkedHashMap继承于HashMap.
- 区别就在于：LinkedHashMap内部提供了Entry，替换HashMap中的Node.而Entry继承了Node
- LinkedHashMap可以维护Map的迭代顺序：迭代顺序与Key-value对的插入顺序一致

```java
static class Entry<K,V> extends HashMap.Node<K,V> {
    Entry<K,V> before, after;//能够记录添加的元素的先后顺序
    Entry(int hash, K key, V value, Node<K,V> next) {
        super(hash, key, value, next);
    }
}
```

put的时候保证顺序

```java
if ((p = tab[i = (n - 1) & hash]) == null)
    tab[i] = newNode(hash, key, value, null); // linkedMap重写了newNode 这个是有序的重点
else {
 
    Node<K,V> newNode(int hash, K key, V value, Node<K,V> e) {
        LinkedHashMap.Entry<K,V> p =
            new LinkedHashMap.Entry<K,V>(hash, key, value, e);
        linkNodeLast(p);
        return p;
    }
```

##### TreeMap

向TreeMap中添加key-value，要求key必须是由同一个类创建的对象 要照key进行排序：自然排序 、定制排序

```java
//自然排序
@Test
public void test() {
    TreeMap map = new TreeMap();
    User u1 = new User("Tom", 23);
    User u2 = new User("Jarry", 18);
    User u3 = new User("Bruce", 56);
    User u4 = new User("Davie", 23);

    map.put(u1, 98);
    map.put(u2, 16);
    map.put(u3, 92);
    map.put(u4, 100);

    Set entrySet = map.entrySet();
    Iterator iterator = entrySet.iterator();
    while (iterator.hasNext()) {
        Object obj = iterator.next();
        Map.Entry entry = (Map.Entry) obj;
        System.out.println(entry.getKey() + "=" + entry.getValue());
    }
}

//定制排序：按照年龄大小排
@Test
public void test2() {
    TreeMap map = new TreeMap(new Comparator() {
        @Override
        public int compare(Object o1, Object o2) {
            if (o1 instanceof User && o2 instanceof User) {
                User u1 = (User) o1;
                User u2 = (User) o2;
                return Integer.compare(u1.getAge(), u2.getAge());
            }
            throw new RuntimeException("输入数据类型错误");
        }
    });
    User u1 = new User("Tom", 23);
    User u2 = new User("Jarry", 18);
    User u3 = new User("Bruce", 56);
    User u4 = new User("Davie", 23);

    map.put(u1, 98);
    map.put(u2, 16);
    map.put(u3, 92);
    map.put(u4, 100);

    Set entrySet = map.entrySet();
    Iterator iterator = entrySet.iterator();
    while (iterator.hasNext()) {
        Object obj = iterator.next();
        Map.Entry entry = (Map.Entry) obj;
        System.out.println(entry.getKey() + "=" + entry.getValue());
    }
}



```

Properties 

```java
   // 使用junit jdbc.properties放到模块的根目录 main方法放到工程根目录下
   @Test
    public void test() {

        FileInputStream fis = null;
        try {
            Properties pros = new Properties();

            fis = new FileInputStream("jdbc.properties");
            pros.load(fis);//加载流对应的文件

            String name = pros.getProperty("name");
            String password = pros.getProperty("password");

            System.out.println("name = " + name + ", password = " + password);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }

            }
        }
    }
```

##### Collection工具类的使用

###### 排序操作

`reverse(List)`：反转 List 中元素的顺序

`shuffle(List)`：对 List 集合元素进行随机排序

`sort(List)`：根据元素的自然顺序对指定 List 集合元素升序排序

`sort(List，Comparator)`：根据指定的 Comparator 产生的顺序对 List 集合元素进行排序

`swap(List，int， int)`：将指定 list 集合中的 i 处元素和 j 处元素进行交换

```java
@Test
public void test1() {
    List list = new ArrayList();
    list.add(123);
    list.add(43);
    list.add(765);
    list.add(-97);
    list.add(0);
    System.out.println(list);//[123, 43, 765, -97, 0]

    //reverse(List)：反转 List 中元素的顺序
    Collections.reverse(list);
    System.out.println(list);//[0, -97, 765, 43, 123]

    //shuffle(List)：对 List 集合元素进行随机排序
    Collections.shuffle(list);
    System.out.println(list);//[765, -97, 123, 0, 43]

    //sort(List)：根据元素的自然顺序对指定 List 集合元素按升序排序
    Collections.sort(list);
    System.out.println(list);//[-97, 0, 43, 123, 765]

    //swap(List，int， int)：将指定 list 集合中的 i 处元素和 j 处元素进行交换
    Collections.swap(list,1,4);
    System.out.println(list);//[-97, 765, 43, 123, 0]
}



```

###### 查找、替换

`Object max(Collection)`：根据元素的自然顺序，返回给定集合中的最大元素

`Object max(Collection，Comparator)`：根据 Comparator 指定的顺序，返回给定集合中的最大元素

`Object min(Collection)`

`Object min(Collection，Comparator)`

`int frequency(Collection，Object)`：返回指定集合中指定元素的出现次数

`void copy(List dest,List src)`：将src中的内容复制到dest中

`boolean replaceAll(List list，Object oldVal，Object newVal)`：使用新值替换 List 对象的所旧值

```java
@Test
public void test2(){
    List list = new ArrayList();
    list.add(123);
    list.add(123);
    list.add(123);
    list.add(43);
    list.add(765);
    list.add(-97);
    list.add(0);
    System.out.println(list);//[123, 43, 765, -97, 0]
    //Object max(Collection)：根据元素的自然顺序，返回给定集合中的最大元素
    Comparable max = Collections.max(list);
    System.out.println(max);//765

    //Object min(Collection)
    Comparable min = Collections.min(list);
    System.out.println(min);//-97

    //int frequency(Collection，Object)：返回指定集合中指定元素的出现次数
    int frequency = Collections.frequency(list,123);
    System.out.println(frequency);//3

    //void copy(List dest,List src)：将src中的内容复制到dest中
    List dest = Arrays.asList(new Object[list.size()]);
    System.out.println(dest.size());//7
    Collections.copy(dest,list);
    System.out.println(dest);//[123, 123, 123, 43, 765, -97, 0]
    //boolean replaceAll(List list，Object oldVal，Object newVal)：使用新值替换 List 对象的所有旧值
}



```

###### 同步控制

Collections 类中提供了多个 `synchronizedXxx()` 方法，该方法可使将指定集合包装成线程同步的集合，从而可以解决多线程并发访问集合时的线程安全问题

```java
@Test
public void test3() {
    List list = new ArrayList();
    list.add(123);
    list.add(123);
    list.add(123);
    list.add(43);
    list.add(765);
    list.add(-97);
    list.add(0);
    System.out.println(list);//[123, 43, 765, -97, 0]
    //返回的list1即为线程安全的List
    List list1 = Collections.synchronizedList(list);
    System.out.println(list1);//[123, 123, 123, 43, 765, -97, 0]
}



```

## IO流

### File类的使用

File类的一个对象，代表一个文件或一个文件目录(俗称：文件夹)。

File类声明在 `java.io` 包下：文件和文件路径的抽象表示形式，与平台无关。

File类中涉及到关于文件或文件目录的创建、删除、重命名、修改时间、文件大小等方法，并未涉及到写入或读取文件内容的操作。如果需要读取或写入文件内容，必须使用IO流来完成。

想要在 Java 程序中表示一个真实存在的文件或目录，那么必须有一个 File 对象，但是 Java程序中的一个 File 对象，可能没有一个真实存在的文件或目录。

后续 File 类的对象常会作为参数传递到流的构造器中，指明读取或写入的"终点"。

```java
@Test
public void test1() {
    //构造器1
    File file1 = new File("hello.txt");
    File file2 = new File("E:\\workspace\\javase\\javase-1\\hello.txt");
    System.out.println(file1.length());
    System.out.println(file2);

    //构造器2
    File file3 = new File("E:\\workspace\\javase\\javase-1", "hello.txt");
    System.out.println(file3);

    //构造器3
    File file3_1 = new File("E:\\workspace\\javase\\javase-1");
    File file4 = new File(file3_1, "hi.txt");
    System.out.println(file4);
    System.out.println(file4.length());
}

```

IDEA中：

- 如果使用JUnit中的单元测试方法测试，相对路径即为当前Module下。
- 如果使用main()测试，相对路径即为当前的Project下。

Eclipse中：

- 不管使用单元测试方法还是使用main()测试，相对路径都是当前的Project下。

#### File类的获取功能

`public String getAbsolutePath()`：获取绝对路径

`public String getPath()`：获取路径

`public String getName()` ：获取名称

```
public String getParent()`：获取上层文件目录路径。若无，返回 `null
```

`public long length()` ：获取文件长度（即：字节数）。不能获取目录的长度。

`public long lastModified()` ：获取最后一次的修改时间，毫秒值

如下的两个方法适用于文件目录：

`public String[] list()` ：获取指定目录下的所有文件或者文件目录的名称数组

`public File[] listFiles()` ：获取指定目录下的所有文件或者文件目录的File数组

```java
@Test
public void test2(){
    File file1 = new File("hello.txt");
    File file2 = new File("E:\\workspace\\javase\\javase-1\\hello.txt");

    System.out.println(file1.getAbsolutePath());
    System.out.println(file1.getPath());
    System.out.println(file1.getName());
    System.out.println(file1.getParent());
    System.out.println(file1.length());
    System.out.println(new Date(file1.lastModified()));

    System.out.println();

    System.out.println(file2.getAbsolutePath());
    System.out.println(file2.getPath());
    System.out.println(file2.getName());
    System.out.println(file2.getParent());
    System.out.println(file2.length());
    System.out.println(file2.lastModified());
}
@Test
public void test3(){
    File file = new File("E:\\workspace\\javase\\javase-1");

    String[] list = file.list();
    for(String s : list){
        System.out.println(s);
    }

    System.out.println();

    File[] files = file.listFiles();
    for(File f : files){
        System.out.println(f);
    }

}
```

####  File类的重命名功能（剪切）

- `public boolean renameTo(File dest)`:把文件重命名为指定的文件路径
- 注意：`file1.renameTo(file2)`为例：要想保证返回 `true` ,需要file1在硬盘中是存在的，且file2不能在硬盘中存在。

```java
@Test
public void test4(){
    File file1 = new File("hello.txt");
    File file2 = new File("E:\\workspace\\javase\\javase-1\\hello1.txt");

    boolean renameTo = file1.renameTo(file2);
    System.out.println(renameTo);

}
```

#### File类的判断功能

`public boolean isDirectory()`：判断是否是文件目录

`public boolean isFile()` ：判断是否是文件

`public boolean exists()` ：判断是否存在

`public boolean canRead()` ：判断是否可读

`public boolean canWrite()` ：判断是否可写

`public boolean isHidden()` ：判断是否隐藏

####  File类的删除功能

- 删除磁盘中的文件或文件目录
- `public boolean delete()`：删除文件或者文件夹
- 删除注意事项：Java中的删除不走回收站。

### IO流概述

IO 是 Input/Output 的缩写，I/O 技术是非常实用的技术，用于处理设备之间的数据传输。如读/写文件，网络通讯等。

Java程序中，对于数据的输入输出操作以 “流(stream)” 的方式进行。

`Java.IO` 包下提供了各种“流”类和接口，用以获取不同种类的数据，并通过标准的方法输入或输出数据。

### 流的分类

**操作数据单位：字节流、字符流**

- 对于文本文件(`.txt,.java,.c,.cpp`)，使用字符流处理
- 对于非文本文件(`.jpg,.mp3,.mp4,.avi,.doc,.ppt,...`)，使用字节流处理

**数据的流向：输入流、输出流**

- 输入 input:读取外部数据（磁盘、光盘等存储设备的数据）到程序（内存）中。
- 输出 output:将程序（内存）数据输出到磁盘、光盘等存储设备中。

**流的角色：节点流、处理流**

节点流：直接从数据源或目的地读写数据。

处理流：不直接连接到数据源或目的地，而是“连接”在已存在的流（节点流或处理流）之上，通过对数据的处理为程序提供更为强大的读写功能。

####  常用的几个IO流结构

| 抽象基类    | 节点流（或文件流）                             | 缓冲流（处理流的一种）                                       |
| ----------- | ---------------------------------------------- | ------------------------------------------------------------ |
| InputStream | `FileInputStream (read(byte[] buffer))`        | `BufferedInputStream (read(byte[] buffer))`                  |
| OutputSteam | `FileOutputStream (write(byte[] buffer,0,len)` | `BufferedOutputStream (write(byte[] buffer,0,len)` / `flush()` |
| Reader      | `FileReader (read(char[] cbuf))`               | `BufferedReader (read(char[] cbuf)` / `readLine()`           |
| Writer      | `FileWriter (write(char[] cbuf,0,len)`         | `BufferedWriter (write(char[] cbuf,0,len)` / `flush()`       |

#### 对抽象基类的说明：

| 抽象基类 | 字节流      | 字符流 |
| -------- | ----------- | ------ |
| 输入流   | InputSteam  | Reader |
| 输出流   | OutputSteam | Writer |



- 说明：Java的lO流共涉及40多个类，实际上非常规则，都是从如下4个抽象基类派生的。
- 由这四个类派生出来的子类名称都是以其父类名作为子类名后缀。

#### InputSteam & Reader

- InputStream和Reader是所有输入流的基类。
- InputStream（典型实现：FileInputStream）
  - `int read()`
  - `int read(byte[] b)`
  - `int read(byte[] b,int off,int len)`
- Reader（典型实现：FileReader）
  - `int read()`
  - `int read(char[] c)`
  - `int read(char[] c,int off,int len)`
- 程序中打开的文件IO资源不属于内存里的资源，垃圾回收机制无法回收该资源，所以应该显式关闭文件IO资源。
- FileInputStream 从文件系统中的某个文件中获得输入字节。FileInputStream 用于读取非文本数据之类的原始字节流。要读取字符流，需要使用 FileReader。

**InputSteam**

从输入流中读取数据的下一个字节。返回0到255范围内的int字节值。如果因为已经到达流末尾而没有可用的字节，则返回值-1。

```
int read()
```

从此输入流中将最多b.length个字节的数据读入一个byte数组中。如果因为已经到达流末尾而没有可用的字节，则返回值-1.否则以整数形式返回实际读取的字节数。

```
int read(byte[] b)
```

将输入流中最多len个数据字节读入byte数组。尝试读取len个字节，但读取的字节也可能小于该值。以整数形式返回实际读取的字节数。如果因为流位于文件末尾而没有可用的字节，则返回值-1。

```
int read(byte[] b,int off,int len)
```

关闭此输入流并释放与该流关联的所有系统资源。

```
public void close throws IOException
```

**Reader：**

读取单个字符。作为整数读取的字符，范围在0到65535之间（0x00-0xffff）(2个字节的 Unicode码)，如果已到达流的末尾，则返回-1。

```
int read()
```

将字符读入数组。如果已到达流的末尾，则返回-1。否则返回本次读取的字符数。

```
int read（char[] cbuf)
```

将字符读入数组的某一部分。存到数组cbuf中，从off处开始存储，最多读len个字符。如果已到达流的末尾，则返回-1。否则返回本次读取的字符数。

```
int read（char[] cbuf,int off,int len)
```

关闭此输入流并释放与该流关联的所有系统资源

```
public void close throws IOException
```

####  OutputSteam & Writer

OutputStream 和 Writer也非常相似：

- `void write(int b/int c);`
- `void write(byte[] b/char[] cbuf);`
- `void write(byte[] b/char[] buff,int off,int len);`
- `void flush();`
- ` void close();//需要先刷新，再关闭此流`

因为字符流直接以字符作为操作单位，所以 Writer可以用字符串来替换字符数组，即以 String对象作为参数

- `void write(String str);`
- `void write(String str,int off,int len);`

FileOutputStream 从文件系统中的某个文件中获得输出字节。FileOutputstream 用于写出非文本数据之类的原始字节流。要写出字符流，需要使用 FileWriter

**OutputStream:**

将指定的字节写入此输出流。 write的常规协定是：向输出流写入一个字节。要写入的字节是参数b的八个低位。b的24个高位将被忽略。即写入0~255范围的

```
void write(int b)
```

将 `b.length` 个字节从指定的byte数组写入此输出流。`write(b)`的常规协定是：应该与调用`wite(b,0,b.length)`的效果完全相同。

```
void write（byte[] b)
```

将指定byte数组中从偏移量off开始的len个字节写入此输出流。

```
void write(byte[] b,int off,int len)
```

刷新此输出流并强制写出所有缓冲的输出字节，调用此方法指示应将这些字节立即写入它们预期的目标。

```
public void flush()throws IOException
```

关闭此输岀流并释放与该流关联的所有系统资源。

```
public void close throws IOException
```

**Writer:**

写入单个字符。要写入的字符包含在给定整数值的16个低位中，16高位被忽略。即写入0到65535之间的 Unicode码。

```
void write(int c)
```

写入字符数组

```
void write(char[] cbuf)
```

写入字符数组的某一部分。从off开始，写入len个字符

```
void write(char[] cbuf,int off,int len)
```

写入字符串。

```
void write(String str)
```

写入字符串的某一部分。

```
void write(String str,int off,int len)
```

刷新该流的缓冲，则立即将它们写入预期目标。

```
void flush()
```

关闭此输出流并释放与该流关联的所有系统资源

```
public void close throws IOException
```

#### 输入、输出标准化过程

 **输入过程**

① 创建 File 类的对象，指明读取的数据的来源。（要求此文件一定要存在）

② 创建相应的输入流，将 File 类的对象作为参数，传入流的构造器中

③ 具体的读入过程：创建相应的 `byte[]` 或 `char[]`。

④ 关闭流资源

说明：程序中出现的异常需要使用 `try-catch-finally` 处理。

**输出过程**

① 创建 File 类的对象，指明写出的数据的位置。（不要求此文件一定要存在）

② 创建相应的输出流，将 File 类的对象作为参数，传入流的构造器中

③ 具体的写出过程：`write(char[]/byte[] buffer,0,len)`

④ 关闭流资源

说明：程序中出现的异常需要使用 `try-catch-finally` 处理。

### 节点流（文件流）

#### 1. 文件字符流 FileReader 和 FileWriter 的使用

```java
@Test
public void testFileReader1()  {
    FileReader fr = null;
    try {
        //1.File类的实例化
        File file = new File("hello.txt");

        //2.FileReader流的实例化
        fr = new FileReader(file);

        //3.读入的操作
        //返回每次读入cbuf数组中的字符的个数。如果达到文件末尾，返回-1
        char[] cbuf = new char[5];
        int len;
        while((len = fr.read(cbuf)) != -1){
            // 因为读取到最后的时候 cbuf可能装不满，fr.read返回值是读取了几个字符
            String str = new String(cbuf,0,len);
            System.out.print(str);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if(fr != null){
            //4.资源的关闭
            try {
                fr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

}

```

**注意点：**

1. `read()` 的理解：返回读入的一个字符。如果达到文件末尾，返回-1
2. 异常的处理：为了保证流资源一定可以执行关闭操作。需要使用 `try-catch-finally` 处理
3. 读入的文件一定要存在，否则就会报 `FileNotFoundException`。

#### 文件的输出

```java
 @Test
    public void testFileWriter() {
        FileWriter fw = null;
        try {
            //1.提供File类的对象，指明写出到的文件
            File file = new File("hello.txt");

            //2.提供FileWriter的对象，用于数据的写出 append true 在原有文件上追加
            fw = new FileWriter(file,true);

            //3.写出的操作
            fw.write("I have a dream!\n");
            fw.write("you need to have a dream!");
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //4.流资源的关闭
            if(fw != null){

                try {
                    fw.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

```

**复制**

```java
@Test
public void testFileReaderFileWriter() {
    FileReader fr = null;
    FileWriter fw = null;
    try {
        //1.创建File类的对象，指明读入和写出的文件
        File srcFile = new File("hello.txt");
        File destFile = new File("hello2.txt");

        //不能使用字符流来处理图片等字节数据
        //            File srcFile = new File("test.jpg");
        //            File destFile = new File("test1.jpg");

        //2.创建输入流和输出流的对象
        fr = new FileReader(srcFile);
        fw = new FileWriter(destFile);

        //3.数据的读入和写出操作
        char[] cbuf = new char[5];
        int len;//记录每次读入到cbuf数组中的字符的个数
        while((len = fr.read(cbuf)) != -1){
            //每次写出len个字符
            fw.write(cbuf,0,len);

        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //4.关闭流资源
        try {
            if(fw != null) {
                fw.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            if(fr != null) {
                fr.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
```

#### 2. 文件字节流 FileInputSteam 和 FileOutputSteam 的使用

文件字节流操作与字符流操作类似，只是实例化对象操作和数据类型不同。

```java
//使用字节流FileInputStream处理文本文件，可能出现乱码。
@Test
public void testFileInputStream() {
    FileInputStream fis = null;
    try {
        //1. 造文件
        File file = new File("hello.txt");

        //2.造流
        fis = new FileInputStream(file);

        //3.读数据
        byte[] buffer = new byte[5];
        int len;//记录每次读取的字节的个数
        while((len = fis.read(buffer)) != -1){
            /**
                 * 出现乱码的情况是因为buffer数组里面读的中文可能是1.5个中文（也就是说不是完整的文字）所以乱码
                 * 如果直接将读取的字节写入另一个文件中就不存在这种情况，因为1.5个文字字节加1.5个文字字节就是完整的文字了
                 */
            String str = new String(buffer,0,len);
            System.out.print(str);

        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        if(fis != null){
            //4.关闭资源
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

}
```

**复制图片**

```java
@Test
public void testFileInputOutputStream()  {
    FileInputStream fis = null;
    FileOutputStream fos = null;
    try {
        //1.创建File对象
        File srcFile = new File("test.jpg");
        File destFile = new File("test2.jpg");

        //2.创建操流
        fis = new FileInputStream(srcFile);
        fos = new FileOutputStream(destFile);

        //3.复制的过程
        byte[] buffer = new byte[5];
        int len;
        while((len = fis.read(buffer)) != -1){
            fos.write(buffer,0,len);
        }

    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //4.关闭流
        if(fos != null){
            //
            try {
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if(fis != null){
            try {
                fis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

}
```

#### 注意点

定义路径时，可以用 `/` 或 `\\`。

输出操作，对应的 File 可以不存在的。并不会报异常。

File 对应的硬盘中的文件如果不存在，在输出的过程中，会自动创建此文件。

File 对应的硬盘中的文件如果存在：

- 如果流使用的构造器是：`FileWriter(file,false)` / `FileWriter(file)`:对原有文件的覆盖。
- 如果流使用的构造器是：`FileWriter(file,true)`:不会对原有文件覆盖，而是在原有文件基础上追加内容。

读取文件时，必须保证文件存在，否则会报异常。

对于文本文件(`.txt,.java,.c,.cpp`)，使用字符流处理

对于非文本文件(`.jpg,.mp3,.mp4,.avi,.doc,.ppt,...`)，使用字节流处理

### 缓冲流

- `BufferedInputStream`
- `BufferedOutputStream`
- `BufferedReader`
- `BufferedWriter`

- 作用：提供流的读取、写入的速度
- 提高读写速度的原因：内部提供了一个缓冲区。默认情况下是8kb

#### 使用说明

当读取数据时，数据按块读入缓冲区，其后的读操作则直接访问缓冲区。

当使用 `BufferedInputStream` 读取字节文件时，`BufferedInputStream` 会一次性从文件中读取8192个(8Kb)，存在缓冲区中，直到缓冲区装满了，才重新从文件中读取下一个8192个字节数组。

向流中写入字节时，不会直接写到文件，先写到缓冲区中直到缓冲区写满，`BufferedOutputStream` 才会把缓冲区中的数据一次性写到文件里。使用方法 `flush()` 可以强制将缓冲区的内容全部写入输出流。

关闭流的顺序和打开流的顺序相反。只要关闭最外层流即可，关闭最外层流也会相应关闭内层节点流。

`flush()` 方法的使用：手动将 buffer 中内容写入文件。

如果是带缓冲区的流对象的 `close()` 方法，不但会关闭流，还会在关闭流之前刷新缓冲区，关闭后不能再写出。

```java
@Test
public void testBufferedStream(){
    BufferedInputStream bis = null;
    BufferedOutputStream bos = null;
    try {
        //1.造文件
        File srcFile = new File("test.jpg");
        File destFile = new File("test4.jpg");
        //2.造流
        //2.1造节点流
        FileInputStream fis = new FileInputStream(srcFile);
        FileOutputStream fos = new FileOutputStream(destFile);
        //2.2造缓冲流，可以合并书写
        bis = new BufferedInputStream(fis);
        bos = new BufferedOutputStream(fos);

        //3.文件读取、写出操作
        byte[] buffer = new byte[1024];
        int len;
        while ((len = bis.read(buffer)) != -1){
            bos.write(buffer,0,len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //4.关闭流
        if (bos != null){
            try {
                bos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (bis != null){

            try {
                bis.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```

```java
@Test
public void testBufferedReaderBufferedWriter(){
    BufferedReader br = null;
    BufferedWriter bw = null;
    try {
        //创建文件和相应的流
        br = new BufferedReader(new FileReader(new File("hello.txt")));
        bw = new BufferedWriter(new FileWriter(new File("hello3.txt")));

        //读写操作
        //方式一：使用char[]数组
        //            char[] cbuf = new char[1024];
        //            int len;
        //            while((len = br.read(cbuf)) != -1){
        //                bw.write(cbuf,0,len);
        //    //            bw.flush();
        //            }

        //方式二：使用String
        String data;
        while((data = br.readLine()) != null){
            //方法一：
            //                bw.write(data + "\n");//data中不包含换行符
            //方法二：
            bw.write(data);//data中不包含换行符
            bw.newLine();//提供换行的操作

        }


    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //关闭资源
        if(bw != null){

            try {
                bw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if(br != null){
            try {
                br.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }

}
```

### 转换流

转换流提供了在字节流和字符流之间的转换

Java API提供了两个转换流：

- `InputstreamReader`：将 `Inputstream` 转换为 `Reader`
- `OutputStreamWriter`：将 `Writer` 转换为 `OutputStream`

字节流中的数据都是字符时，转成字符流操作更高效。

很多时候我们使用转换流来处理文件乱码问题。实现编码和解码的功能。

#####  **InputStreamReader**

InputStreamReader 将一个字节的输入流转换为字符的输入流

解码：字节、字节数组 --->字符数组、字符串

构造器：

- `public InputStreamReader(InputStream in)`
- `public InputStreamReader(Inputstream in,String charsetName)//可以指定编码集`

##### OutputStreamWriter

OutputStreamWriter 将一个字符的输出流转换为字节的输出流

编码：字符数组、字符串 ---> 字节、字节数组

构造器：

- `public OutputStreamWriter(OutputStream out)`
- `public OutputStreamWriter(Outputstream out,String charsetName)//可以指定编码集`

```java
/**
     综合使用InputStreamReader和OutputStreamWriter
     */
@Test
public void test1() {
    InputStreamReader isr = null;
    OutputStreamWriter osw = null;
    try {
        //1.造文件、造流
        File file1 = new File("hello.txt");
        File file2 = new File("hello_gbk.txt");

        FileInputStream fis = new FileInputStream(file1);
        FileOutputStream fos = new FileOutputStream(file2);

        isr = new InputStreamReader(fis, StandardCharsets.UTF_8);
        osw = new OutputStreamWriter(fos, "gbk");

        //2.读写过程
        char[] cbuf = new char[20];
        int len;
        while ((len = isr.read(cbuf)) != -1){
            osw.write(cbuf,0,len);
        }
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //3.关流
        if (isr != null){

            try {
                isr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        if (osw != null){
            try {
                osw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

        }
    }
}

```

###  编码集

ASCII：美国标准信息交换码。用一个字节的7位可以表示。

ISO8859-1：拉丁码表。欧洲码表用一个字节的8位表示。

GB2312：中国的中文编码表。最多两个字节编码所有字符

GBK：中国的中文编码表升级，融合了更多的中文文字符号。最多两个字节编码

Unicode：国际标准码，融合了目前人类使用的所字符。为每个字符分配唯一的字符码。所有的文字都用两个字节来表示。

UTF-8：变长的编码方式，可用1-4个字节来表示一个字符。

面向传输的众多UTF(UCS Transfer Format)标准出现了，顾名思义，UTF-8就是每次8个位传输数据，而UTF-16就是每次16个位。这是为传输而设计的编码，并使编码无国界，这样就可以显示全世界上所有文化的字符了。

Unicode只是定义了一个庞大的、全球通用的字符集，并为每个字符规定了唯确定的编号，具体存储成什么样的字节流，取决于字符编码方案。推荐的Unicode编码是UTF-8和UTF-16。

Unicode与Utf-8的关系：

为每个字符分配唯一的字符码,有的文字是一字节，有的文字是两字节

utf-8根据unicode的位置编码->编码对应的二进制

```text
Unicode 字符代码    utf-8二进制编码
U+ 0000 ~ U+ 007F: 0XXXXXXX
U+ 0080 ~ U+ 07FF: 110XXXXX 10XXXXXX
U+ 0800 ~ U+ FFFF: 1110XXXX 10XXXXXX 10XXXXXX
U+10000 ~ U+1FFFF: 11110XXX 10XXXXXX 10XXXXXX 10XXXXXX
```

0xxxxxxx 在底层一字节表示一个文字

110xxxxx 10xxxxxx 在表示两字节表示一个文字

1110xxxx 10xxxxxx 10xxxxxx 在表示三字节表示一个文字

自动确定那几个字节表示一个字符

`0xxxxxxx` `110xxxxx 10xxxxxx` `1110xxxx 10xxxxxx 10xxxxxx`

### 数据流

`DataInputStream` 和 `DataOutputStream` **作用：** 用于读取或写出基本数据类型的变量或字符串

将内存中的字符串、基本数据类型的变量写出到文件中。

```java
@Test
public void test3(){
    //1.造对象、造流
    DataOutputStream dos = null;
    try {
        dos = new DataOutputStream(new FileOutputStream("data.txt"));
        //数据输出
        dos.writeUTF("Bruce");
        dos.flush();//刷新操作，将内存的数据写入到文件
        dos.writeInt(23);
        dos.flush();
        dos.writeBoolean(true);
        dos.flush();
    } catch (IOException e) {
        e.printStackTrace();
    } finally {
        //3.关闭流
        if (dos != null){
            try {
                dos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

将文件中存储的基本数据类型变量和字符串读取到内存中，保存在变量中。

```
  /*
注意点：读取不同类型的数据的顺序要与当初写入文件时，保存的数据的顺序一致！
 */
    @Test
    public void test4(){
        DataInputStream dis = null;
        try {
            //1.造对象、造流
            dis = new DataInputStream(new FileInputStream("data.txt"));
            //2.从文件读入数据
            String name = dis.readUTF();
            int age = dis.readInt();
            boolean isMale = dis.readBoolean();

            System.out.println("name:"+name);
            System.out.println("age:"+age);
            System.out.println("isMale:"+isMale);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            //3.关闭流
            if (dis != null){

                try {
                    dis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
```

### 对象流

```
ObjectInputStream` 和 `ObjectOutputStream
```

- `ObjectOutputStream`:内存中的对象--->存储中的文件、通过网络传输出去：序列化过程
- `ObjectInputStream`:存储中的文件、通过网络接收过来 --->内存中的对象：反序列化过程

**对象的序列化**

对象序列化机制允许把内存中的Java对象转换成平台无关的二进制流，从而允许把这种二进制流持久地保存在磁盘上，或通过网络将这种二进制流传输到另一个网络节点。//当其它程序获取了这种二进制流，就可以恢复成原来的Java对象。

序列化的好处在于可将任何实现了Serializable接口的对象转化为字节数据，使其在保存和传输时可被还原。

序列化是RMI(Remote Method Invoke-远程方法调用)过程的参数和返回值都必须实现的机制，RMI是JavaEE的基础。因此序列化机制是JavaEE平台的基础。

如果需要让某个对象支持序列化机制，则必须让对象所属的类及其属性是可序列化的，为了让某个类是可序列化的，该类必须实现如下两个接口之一。否则，会抛出 `NotserializableEXception` 异常

- Serializable
- Externalizable

凡是实现Serializable接口的类都有一个表示序列化版本标识符的静态变量：

- `private static final long serialVersionUID;`
- `serialVersionUID` 用来表明类的不同版本间的兼容性。简言之，其目的是以序列化对象进行版本控制，有关各版本反序列化时是否兼容
- 如果类没有显示定义这个静态常量，它的值是Java运行时环境根据类的内部细节自动生成的。若类的实例变量做了修改，serialVersionUID可能发生变化。故建议显式声明。

简单来说，Java 的序列化机制是通过在运行时判断类的 `serialversionUID` 来验证版本一致性的。在进行反序列化时，JVM 会把传来的字节流中的 `serialversionUID` 与本地相应实体类的  `serialversionUID` 进行比较，如果相同就认为是一致的，可以进行反序列化，否则就会出现序列化版本不一致的异常。(`InvalidCastException`)

**实现序列化的对象所属的类需要满足：**

1. 需要实现接口：`Serializable`（标识接口）
2. 当前类提供一个全局常量：`serialVersionUID`（序列版本号）
3. 除了当前 `Person` 类需要实现 `Serializable` 接口之外，还必须保证其内部所属性也必须是可序列化的。（默认情况下，基本数据类型可序列化）

补充：`ObjectOutputStream` 和 `ObjectInputStream` 不能序列化 `static` 和 `transient` 修饰的成员变量

```java
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private Integer age;
    private String address;

    public Person() {
    }

    public Person(String name, Integer age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }


    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                '}';
    }
}
```

测试

```java
@Test
public void testversion1L() throws Exception {
    File file = new File("person.out");
    // 序列化
    ObjectOutputStream oout = new ObjectOutputStream(new FileOutputStream(file));
    Person person = new Person("Haozi", 22, "上海");
    oout.writeObject(person);
    oout.close();
    // 反序列化
    ObjectInputStream oin = new ObjectInputStream(new FileInputStream(file));
    Object newPerson = oin.readObject();
    oin.close();
    System.out.println(newPerson);
}
```

修改

```java
public class Person implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;
    private Integer age;
    private String address;
    private String email;

    public Person() {
    }

    public Person(String name, Integer age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public Person(String name, Integer age, String address,String email) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

测试

```java
@Test
public void testversion1LWithExtraEmail() throws Exception {
    File file = new File("person.out");
    ObjectInputStream oin = new ObjectInputStream(new FileInputStream(file));
    Object newPerson = oin.readObject();
    oin.close();
    System.out.println(newPerson);
}
```

将以前序列化到磁盘的旧 Person 反序列化到新 Person 类时，没有任何问题。

可当我们增加 email 字段后，不作向后兼容。即放弃原来序列化到磁盘的 Person 类，这时我们可以将版本标识提高，如下:

```java
private static final long serialVersionUID = 2L;
```

再次进行反序列化，则会报错，如下：

```java
java.io.InvalidClassException:Person local class incompatible: stream classdesc serialVersionUID = 1, local class serialVersionUID = 2
```

谈到这里，我们大概可以清楚，serialVersionUID 就是控制版本是否兼容的，若我们认为修改的 Person 是向后兼容的，则不修改 serialVersionUID；反之，则提高 serialVersionUID的值。再回到一开始的问题，为什么 ide 会提示声明 serialVersionUID 的值呢？

因为若不显式定义 serialVersionUID 的值，Java 会根据类细节自动生成 serialVersionUID 的值，如果对类的源代码作了修改，再重新编译，新生成的类文件的serialVersionUID的取值有可能也会发生变化。类的serialVersionUID的默认值完全依赖于Java编译器的实现，对于同一个类，用不同的Java编译器编译，也有可能会导致不同的serialVersionUID。所以 ide 才会提示声明 serialVersionUID 的值。

没有显示的声明id值IDE默认生成一个，当我们修改原来的类时，IDE重新又生成了一个Id,所以反序列化是就会报错id值不一样

serialVersionUID = -3706167084442370737, local class serialVersionUID = -4973599082071056518

## NIO

Java NIO (New IO，Non-Blocking IO)是从Java 1.4版本开始引入的一套新的IO API，可以替代标准的Java IO AP。

NIO 与原来的 IO 同样的作用和目的，但是使用的方式完全不同，NIO 支持面向缓冲区的(IO是面向流的)、基于通道的IO操作。

NIO 将以更加高效的方式进行文件的读写操作。

JDK 7.0对 NIO 进行了极大的扩展，增强了对文件处理和文件系统特性的支持，称他为 NIO.2。

#### Path的说明：

Path替换原有的File类。

- 在以前IO操作都是这样写的：
  - `import java.io.File`
  - `File file = new File("index.html");`
- 但在Java7中，我们可以这样写：
  - `import java.nio.file.Path;`
  - `import java.nio.file.Paths;`
  - `Path path = Paths.get("index. html");`

#### Paths的使用

`Paths` 类提供的静态 `get()` 方法用来获取 `Path` 对象：

`static Path get(String first， String….more)`：用于将多个字符串串连成路径

`static Path get(URI uri)`：返回指定 uri 对应的 Path 路径

```java
@Test
public void test1(){
    Path path1 = Paths.get("hello.txt");//new File(String filepath)

    Path path2 = Paths.get("E:\\", "test\\test1\\haha.txt");//new File(String parent,String filename);

    Path path3 = Paths.get("E:\\", "test");

    System.out.println(path1);
    System.out.println(path2);
    System.out.println(path3);

}

```

**常用方法**

- `String toString()` ： 返回调用 `Path` 对象的字符串表示形式
- `boolean startsWith(String path)` : 判断是否以 `path` 路径开始
- `boolean endsWith(String path)` : 判断是否以 `path` 路径结束
- `boolean isAbsolute()` : 判断是否是绝对路径
- `Path getParent()` ：返回 `Path` 对象包含整个路径，不包含 `Path` 对象指定的文件路径
- `Path getRoot()` ：返回调用 `Path` 对象的根路径
- `Path getFileName()` : 返回与调用 `Path` 对象关联的文件名
- `int getNameCount()` : 返回 `Path` 根目录后面元素的数量
- `Path getName(int idx)` : 返回指定索引位置 `idx` 的路径名称
- `Path toAbsolutePath()` : 作为绝对路径返回调用 `Path` 对象
- `Path resolve(Path p)` :合并两个路径，返回合并后的路径对应的 `Path` 对象
- `File toFile()`: 将 `Path` 转化为 `File` 类的对象

```java
@Test
public void test2() {
    Path path1 = Paths.get("E:\\","workspace\\javase\\javase-1\\hello.txt");
    Path path2 = Paths.get("hello.txt");

    //		String toString() ： 返回调用 Path 对象的字符串表示形式
    System.out.println(path1);

    //		boolean startsWith(String path) : 判断是否以 path 路径开始
    System.out.println(path1.startsWith("d:\\nio"));
    //		boolean endsWith(String path) : 判断是否以 path 路径结束
    System.out.println(path1.endsWith("hello.txt"));
    //		boolean isAbsolute() : 判断是否是绝对路径
    System.out.println(path1.isAbsolute() + "~");
    System.out.println(path2.isAbsolute() + "~");
    //		Path getParent() ：返回Path对象包含整个路径，不包含 Path 对象指定的文件路径
    System.out.println(path1.getParent());
    System.out.println(path2.getParent());
    //		Path getRoot() ：返回调用 Path 对象的根路径
    System.out.println(path1.getRoot());
    System.out.println(path2.getRoot());
    //		Path getFileName() : 返回与调用 Path 对象关联的文件名
    System.out.println(path1.getFileName() + "~");
    System.out.println(path2.getFileName() + "~");
    //		int getNameCount() : 返回Path 根目录后面元素的数量
    //		Path getName(int idx) : 返回指定索引位置 idx 的路径名称
    for (int i = 0; i < path1.getNameCount(); i++) {
        System.out.println(path1.getName(i) + "*****");
    }

    //		Path toAbsolutePath() : 作为绝对路径返回调用 Path 对象
    System.out.println(path1.toAbsolutePath());
    System.out.println(path2.toAbsolutePath());
    //		Path resolve(Path p) :合并两个路径，返回合并后的路径对应的Path对象
    Path path3 = Paths.get("d:\\", "nio");
    Path path4 = Paths.get("nioo\\hi.txt");
    path3 = path3.resolve(path4);
    System.out.println(path3);

    //		File toFile(): 将Path转化为File类的对象
    File file = path1.toFile();//Path--->File的转换

    Path newPath = file.toPath();//File--->Path的转换

}
```

#### Files类

`java.nio.file.Files` 用于操作文件或目录的工具类

#### Files类常用方法

- `Path copy(Path src, Path dest, CopyOption … how)` : 文件的复制

  要想复制成功，要求 `path1` 对应的物理上的文件存在。`path1` 对应的文件没有要求。

- `Files.copy(path1, path2, StandardCopyOption.REPLACE_EXISTING);`

- `Path createDirectory(Path path, FileAttribute<?> … attr)` : 创建一个目录

  要想执行成功，要求 `path` 对应的物理上的文件目录不存在。一旦存在，抛出异常。

- `Path createFile(Path path, FileAttribute<?> … arr)` : 创建一个文件

- 要想执行成功，要求 `path` 对应的物理上的文件不存在。一旦存在，抛出异常。

- `void delete(Path path)` : 删除一个文件/目录，如果不存在，执行报错

- `void deleteIfExists(Path path)` : `Path` 对应的文件/目录如果存在，执行删除.如果不存在，正常执行结束

- `Path move(Path src, Path dest, CopyOption…how)` : 将 `src` 移动到 `dest` 位置

  要想执行成功，`src` 对应的物理上的文件需要存在，`dest` 对应的文件没有要求。

- `long size(Path path)` : 返回 `path` 指定文件的大小

#### Files类常用方法：用于判断

`boolean exists(Path path, LinkOption … opts)` : 判断文件是否存在

`boolean isDirectory(Path path, LinkOption … opts) `: 判断是否是目录

不要求此 `path` 对应的物理文件存在。

`boolean isRegularFile(Path path, LinkOption … opts) `: 判断是否是文件

`boolean isHidden(Path path)` : 判断是否是隐藏文件

要求此 `path` 对应的物理上的文件需要存在。才可判断是否隐藏。否则，抛异常。

`boolean isReadable(Path path)` : 判断文件是否可读

`boolean isWritable(Path path)` : 判断文件是否可写

`boolean notExists(Path path, LinkOption … opts)` : 判断文件是否不存在

## 反射

Reflection（反射)是被视为动态语言的关键，反射机制允许程序在执行期借助于 `Reflection API` 取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。

加载完类之后，在堆内存的方法区中就产生了一个 `Class` 类型的对象（一个类只有一个 `Class` 对象），这个对象就包含了完整的类的结构信息。我们可以通过这个对象看到类的结构。这个对象就像一面镜子，透过这个镜子看到类的结构，所以，我们形象的称之为：反射。

只有当程序运行时我们才能知道调用的类（正常是编译的字节码时就知道是调用的是哪一个类字节码文件里面就已经确定要运行什么类）

 **反射机制提供的功能**

- 在运行时判断任意一个对象所属的类
- 在运行时构造任意一个类的对象
- 在运行时判断任意一个类所具有的成员变量和方法
- 在运行时获取泛型信息
- 在运行时调用任意一个对象的成员变量和方法
- 在运行时处理注解
- 生成动态代理

### 简单使用

需要的类

```java
public class Base {
    public  String netName = "wwww";

    public String getNetName() {
        return netName;
    }

    public void setNetName(String netName) {
        this.netName = netName;
    }
}
public class Person extends Base implements Serializable {

//    private static final long serialVersionUID = 2L;

    public String name;
    private Integer age;
    private String address;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    private void setAge(Integer age) {
        this.age = age;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Person() {
    }

    public Person(String name, Integer age) {
        this.name = name;
        this.age = age;
    }

    public Person(String name, Integer age, String address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }

    public Person(String name, Integer age, String address, String email) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.email = email;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}

```

通过构造器实例化对象

```java
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // Person{name='Tom', age=12, address='null', email='null'}
    System.out.println(person);
}
```

获取对象的非私有属性（两种情况）

```java
// 一
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    Field age = clazz.getField("name");
    age.set(person,"netjic");
    // Person{name='netjic', age=12, address='null', email='null'}
    System.out.println(person);
}

// clazz.getField（）方法可以获取到继承父类的字段 getDeclaredField（）方法只能获取到自己声明的方法Declared（声明），不能够获取到父类的字段
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    Field netName = clazz.getField("netName");
    netName.set(person,"23232");
    System.out.println(person.getNetName());
}
// 二
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    Field declaredField = clazz.getDeclaredField("name");
    declaredField.set(person,"netjic");
    // Person{name='netjic', age=12, address='null', email='null'}
    System.out.println(person);
}
```

获取私有属性

```java
@Test
public void test2() throws Exception {
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // 获取私有方法
    Field age = clazz.getDeclaredField("age");
    // 要加上这句，获取访问权限
    age.setAccessible(true);
    age.set(person, 23);
    System.out.println(person);
}
@Test
public void test2() throws Exception {
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // 这个方法不能获取私有属性
    Field age = clazz.getField("age");
    age.setAccessible(true);
    age.set(person, 23);
    System.out.println(person);
}
```

获取非私有属性

```java
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // 这个方法可以获取继承的方法
    Method setNetName = clazz.getMethod("setNetName", String.class);
    Object netName_23 = setNetName.invoke(person, "netName_23");
    Method setName = clazz.getMethod("setName", String.class);
    Object netjic1 = setName.invoke(person, "netjic");
    System.out.println(netName_23);
    System.out.println(netjic1);
    System.out.println(person.getNetName());
    System.out.println(person.getName());
}
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // 这个方法也只能获取本类声明的方法
    Method setNetName = clazz.getDeclaredMethod("setNetName", String.class);

}
```

获取私有方法

```java
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    Method setNetName = clazz.getDeclaredMethod("setAge", Integer.class);
    // 获取私有方法是要加上这句
    setNetName.setAccessible(true);
    setNetName.invoke(person, 13);
    System.out.println(person);
}
@Test
public void test2() throws Exception{
    Class<Person> clazz = Person.class;
    // 1.通过反射，创建Person类对象
    Constructor<Person> cons = clazz.getConstructor(String.class, Integer.class);
    Person person = cons.newInstance("Tom", 12);
    // 这个方法不可以获取私有方法	
    Method setNetName = clazz.getMethod("setAge", Integer.class);
    setNetName.setAccessible(true);
    setNetName.invoke(person, 13);
    System.out.println(person);
}
```

### Class简述

 

- 在 `Object` 类中定义了以下的方法，此方法将被所有子类继承：

```
public final Class getClass()
```

- 以上的方法返回值的类型是一个 `Class` 类，此类是Java反射的源头，实际上所谓反射从程序的运行结果来看也很好理解，即可以通过对象反射求出类的名称。

对象使用反射后可以得到的信息：某个类的属性、方法和构造器、某个类到底实现了哪些接口。对于每个类而言，JRE都为其保留一个不变的Class类型的对象。一个Class对象包含了特定某个结构（ `class/interface/enum/annotation/primitive type/void/[]`）的有关信息。

- `Class` 本身也是一个类
- `Class` 对象只能由系统建立对象
- 一个加载的类在 JVM 中只会有一个 `Class` 实例
- 一个 `Class` 对象对应的是一个加载到 JVM 中的一个 `.class` 文件
- 每个类的实例都会记得自己是由哪个 `Class` 实例所生成
- 通过 `Class` 可以完整地得到一个类中的所有被加载的结构
- `Class` 类是 Reflection 的根源，针对任何你想动态加载、运行的类，唯有先获得相应的 `Class` 对象

**类的加载过程：**

程序经过 `javac.exe` 命令以后，会生成一个或多个字节码文件(`.class` 结尾)。接着我们使用 `java.exe` 命令对某个字节码文件进行解释运行。相当于将某个字节码文件加载到内存中。此过程就称为类的加载。加载到内存中的类，我们就称为运行时类，此运行时类，就作为 `Class` 的一个实例。

换句话说，`Class` 的实例就对应着一个运行时类。

加载到内存中的运行时类，会缓存一定的时间。在此时间之内，我们可以通过不同的方式来获取此运行时类。

```java
//创建Class的实例 通过包名创建实例
String str = "com.netjic.javase.test9.Person";
Class clazz = Class.forName(str);
//调用Class的空参构造器创建对象
Object obj = clazz.newInstance;
//获取clazz的name属性
Field field = clazz.getField("name");
field.set(obj,"Jarry");

Object name = filed.get(obj);
System.out.println(name);
```

### 获取Class实例的几种方式：

1）已知具体的类，通过类的 `class` 属性获取，该方法最为安全可靠，程序性能最高 实例：`Class clazz = String.class;`

2）已知某个类的实例，调用该实例的 `getclass()` 方法获取 `Class` 对象 实例：`Class clazz=person.getclass(); `

3）已知一个类的全类名，且该类在类路径下，可通过 `Class` 类的静态方法 `forName()` 获取，可能抛出 `ClassNotFoundException`（比较常用）

实例：`Class clazz = Class.forName(String classPath)`

4）通过类加载器 `ClassLoader cl = this.getclass().getClassLoader();` `Class clazz = cl.loadClass("类的全类名");`

```java
@Test
public void test2() throws Exception {
    //方式一：调用运行时类的属性：.class
    Class<Person> clazz1 = Person.class;
    System.out.println(clazz1);

    //方式二：通过运行时类的对象,调用getClass()
    Person p1 = new Person();
    Class<? extends Person> clazz2 = p1.getClass();
    System.out.println(clazz2);

    //方式三：调用Class的静态方法：forName(String classPath)
    Class<?> clazz3 = Class.forName("com.netjic.javase.test9.Person");
    System.out.println(clazz3);
    //true
    System.out.println(clazz1 == clazz2);
    //true
    System.out.println(clazz1 == clazz3);
    //方式四：使用类的加载器：ClassLoader  (了解)
    ClassLoader classLoader = ASDF.class.getClassLoader();
    Class<?> clazz4 = classLoader.loadClass("com.netjic.javase.test9.Person");
    System.out.println(clazz4);
    //true
    System.out.println(clazz1 == clazz4);
}
// 比较 clazz 全都是true 说明只有使用class实例
```

### 创建类的对象的方式

方式一：new + 构造器

方式二：要创建Xxx类的对象，可以考虑：Xxx、Xxxs、XxxFactory、XxxBuilder类中查看是否有静态方法的存在。可以调用其静态方法，创建Xxx对象。

方式三：通过反射

###  Class实例可以代表的结构

（1）`class`：外部类，成员（成员内部类，静态内部类），局部内部类，匿名内部类

（2）`interface`：接口

（3）`[]`：数组

（4）`enum`：枚举

（5）`annotation`：注解@interface

（6）`primitive type`：基本数据类型

（7）`void`：无返回值

```java
@Test
public void test3(){
    Class<Object> c1 = Object.class;
    Class<Comparable> c2 = Comparable.class;
    Class<String[]> c3 = String[].class;
    Class<int[][]> c4 = int[][].class;
    Class<ElementType> c5 = ElementType.class;
    Class<Override> c6 = Override.class;
    Class<Integer> c7 = int.class;
    Class<Void> c8 = void.class;
    Class<Class> c9 = Class.class;

    int[] i1 = new int[10];
    int[] i2 = new int[100];
    Class<? extends int[]> c10 = i1.getClass();
    Class<? extends int[]> c11 = i2.getClass();
    // 只要数组的元素类型与维度一样，就是同一个Class
    System.out.println(c10 == c11);//true
}




```

**使用Classloader加载src目录下的配置文件**

```java
@Test
public void test3(){
    Properties pros = new Properties();
    //        //读取配置文件的方式一：
    //        //此时的文件默认在当前的module下。
    //        FileInputStream fis = null;
    //        try {
    //            fis = new FileInputStream("jdbc1.properties");
    //            pros.load(fis);
    //        } catch (IOException e) {
    //            e.printStackTrace();
    //        } finally {
    //            if (fis != null) {
    //                try {
    //                    fis.close();
    //                } catch (IOException e) {
    //                    e.printStackTrace();
    //                }
    //            }
    //        }

    //读取配置文件的方式二：使用ClassLoader
    //配置文件默认识别为：当前module的src下
    ClassLoader classLoader = ClassLoaderTest.class.getClassLoader();
    InputStream is = classLoader.getResourceAsStream("jdbc1.properties");
    try {
        pros.load(is);
    } catch (IOException e) {
        e.printStackTrace();
    }

    String user = pros.getProperty("user");
    String password = pros.getProperty("password");
    System.out.println("user = " + user + " password =" + password);
}




```

### 反射的应用

#### 创建运行时类的对象

```java
@Test
public void test1() throws Exception {
    //方式一
    Class<Person> clazz1 = Person.class;
    //方式二
    Class<Person> clazz2 = (Class<Person>) Class.forName("cn.bruce.java.Person");

    Person person1 = clazz1.newInstance();
    Person person2 = clazz2.newInstance();
    System.out.println(person1);
    System.out.println(person2);

}
```

`newInstance()`:调用此方法，创建对应的运行时类的对象。内部调用了运行时类的空参的构造器。

要想此方法正常的创建运行时类的对象，要求：

- 运行时类必须提供空参的构造器
- 空参的构造器的访问权限得够。通常，设置为 `public`。

在 `javabean` 中要求提供一个 `public` 的空参构造器。原因：

- 便于通过反射，创建运行时类的对象
- 便于子类继承此运行时类时，默认调用 `super()` 时，保证父类此构造器

####  获取运行时类的完整结构

我们可以通过反射，获取对应的运行时类中所有的属性、方法、构造器、父类、接口、父类的泛型、包、注解、异常等。。。。

####  使用反射可以取得：

1. 实现的全部接口： `public Class<?>[] getInterfaces()` 确定此对象所表示的类或接口实现的接口。

2. 所继承的父类： `public Class<? Super T> getSuperclass()` 返回表示此 `Class` 所表示的实体（类、接口、基本类型）的父类的 `Class`。

3. 全部的构造器：

   `public Constructor<T>[] getConstructors()`

   返回此 `Class` 对象所表示的类的所有 `public` 构造方法。

   `public Constructor<T>[] getDeclaredConstructors()`

   返回此Class对象表示的类声明的所有构造方法。

   在Constructor类中:

   - 取得修饰符：`public int getModifiers();`
   - 取得方法名称： `public String getName();`
   - 取得参数的类型： `public Class<?> getParameterTypes();`

4. 全部的方法：

   `public Method[] getDeclaredMethods()`

   返回此Class对象所表示的类或接口的全部方法

   `public Method[] getMethods()`

   返回此 `Class` 对象所表示的类或接口的 `public` 的方法

   `Method` 类中：

   - `public Class<?> getReturnType()`：取得全部的返回值
   - `public Class<?>[] getParameterTypes()`：取得全部的参数
   - `public int getModifiers()`：取得修饰符
   - `public Class<?> [] getEXceptionTypes()`：取得异常信息

5. 全部的 `Field`:

   `public Field[] getFields()`

   返回此 `Class` 对象所表示的类或接口的 `public` 的 `Field`。

   `public Field[] getDeclaredFields()`

   返回此 `Class` 对象所表示的类或接口的全部 `Field`

   `Field` 方法中

   - `public int getModifiers()`：以整数形式返回此 `Field` 的修饰符
   - `public Class<?> getType()`：得到 `Field` 的属性类型
   - `public String getName()`：返回 `Field` 的名称。

6. `Annotation` 相关

   `get Annotation(Class<T> annotationClass)`

   `getDeclaredAnnotations()`

7. 泛型相关

   获取父类泛型类型：`Type getGenericSuperclass()`

   泛型类型：`ParameterizedType`

   获取实际的泛型类型参数数组：`getActualTypeArguments()`

8. 类所在的包 `Package getPackage()`

```java
// 获取方法 Method
@Test
public void test2() throws Exception {
    Class<Person> clazz = Person.class;
    // 获取自己声明的方法 可以获取私有和公共的方法
    Method[] declaredMethods = clazz.getDeclaredMethods();
    System.out.println(Arrays.toString(declaredMethods));
    // 获取自己和父类的方法 只能获取公共方法
    Method[] methods = clazz.getMethods();
    System.out.println(Arrays.toString(methods));
}
```

```java
// 获取字段
@Test
public void test2() throws Exception {
    Class<Person> clazz = Person.class;
    // 获取自己声明的属性 只能获取私有的
    Field[] fields = clazz.getFields();
    System.out.println(Arrays.toString(fields));
    // 获取自己和父类的属性  私有和公共的都以获取
    Field[] declaredFields = clazz.getDeclaredFields();
    System.out.println(Arrays.toString(declaredFields));
}
```

```java
// 获取构造器
@Test
public void test2() throws Exception {
    Class<Person> clazz = Person.class;
    // public的构造器
    Constructor<?>[] constructors = clazz.getConstructors();
    System.out.println(Arrays.toString(constructors));
    // 获取当前运行时类中声明的所有的构造器
    Constructor<?>[] declaredConstructors = clazz.getDeclaredConstructors();
    System.out.println(Arrays.toString(declaredConstructors));
}
```

```java
// 获取运行时类的父类
Class<Person> clazz = Person.class;
Class<? super Person> superclass = clazz.getSuperclass();
System.out.println(superclass);
/*
    获取运行时类的父类
     */
    @Test
    public void test2(){
        Class<Person> clazz = Person.class;

        Class<? super Person> superclass = clazz.getSuperclass();
        System.out.println(superclass);
    }
    /*
    获取运行时类的带泛型的父类
     */
    @Test
    public void test3(){
        Class<Person> clazz = Person.class;

        Type genericSuperclass = clazz.getGenericSuperclass();
        System.out.println(genericSuperclass);
    }
    /*
    获取运行时类的带泛型的父类的泛型 (报错了。。。。)
    代码：逻辑性代码  vs 功能性代码
     */
    @Test
    public void test4(){
        Class clazz = Person.class;

        Type genericSuperclass = clazz.getGenericSuperclass();
        ParameterizedType paramType = (ParameterizedType) genericSuperclass;
        //获取泛型类型
        Type[] actualTypeArguments = paramType.getActualTypeArguments();
        //        System.out.println(actualTypeArguments[0].getTypeName());
        System.out.println(((Class)actualTypeArguments[0]).getName());
    }

    /*
    获取运行时类实现的接口
     */
    @Test
    public void test5(){
        Class clazz = Person.class;

        Class[] interfaces = clazz.getInterfaces();
        for(Class c : interfaces){
            System.out.println(c);
        }

        System.out.println();
        //获取运行时类的父类实现的接口
        Class[] interfaces1 = clazz.getSuperclass().getInterfaces();
        for(Class c : interfaces1){
            System.out.println(c);
        }

    }
    /*
        获取运行时类所在的包
     */
    @Test
    public void test6(){
        Class clazz = Person.class;

        Package pack = clazz.getPackage();
        System.out.println(pack);
    }

    /*
        获取运行时类声明的注解
     */
    @Test
    public void test7(){
        Class clazz = Person.class;

        Annotation[] annotations = clazz.getAnnotations();
        for(Annotation annos : annotations){
            System.out.println(annos);
        }
    }
}

```

####  动态代理的实现

**需要解决的两个主要问题：**

问题一：如何根据加载到内存中的被代理类，动态的创建一个代理类及其对象。

（通过 `Proxy.newProxyInstance()` 实现）

问题二：当通过代理类的对象调用方法a时，如何动态的去调用被代理类中的同名方法。

（通过 `InvocationHandler` 接口的实现类及其方法 `invoke()` )

**动态代理相关的API：**

Proxy：专门完成代理的操作类，是所有动态代理类的父类。通过此类为一个或多个接口动态地生成实现类。提供用于创建动态代理类和动态代理对象的静态方法。

- `static Class<?> getProxyClass(ClassLoader loader, Class<?>...interface)` 创建一个动态代理类所对应的  `Class` 对象
- `static Object newProxyInstance(ClassLoader loader, Class<?>...interface, InvocationHandler h)` 直接创建一个动态代理对象

**动态代理实现步骤：**

1. 创建一个实现接口 `InvocationHandler` 的类，它必须实现invoke方法，以完成代理的具体操作。

2. 创建被代理类以及接口

3. 通过Proxy的静态方法 `newProxyInstance(ClassLoader loader, Class<?>...interface, InvocationHandler h)` 创建一个接口代理

4. 通过代理类的实例调用被代理类的方法

```java
public class ProxyTest1{
    public static void main(String[] args) {
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println(method);
                if (method.getName().equals("morning")) {
                    System.out.println("Good morning, " + args[0]);
                }else {
                    System.out.println("Not Morning");
                }
                return null;
            }
        };
        Hello hello = (Hello) Proxy.newProxyInstance(
                Hello.class.getClassLoader(), // 传入ClassLoader
                new Class[] { Hello.class }, // 传入要实现的接口
                handler); // 传入处理调用方法的InvocationHandler
        hello.morning("Bob");
        hello.notMorning();
    }
}

interface Hello {
    void morning(String name);
    void notMorning();
}
```

```java
public class ProxyTest {
    interface Human {
        String getBelief();

        void eat(String food);
    }

    //被代理类
    static class SuperMan implements Human {

        @Override
        public String getBelief() {
            return "I believe I can fly!";
        }

        @Override
        public void eat(String food) {
            System.out.println("I like eat " + food);
        }
    }

    /*
    要想实现动态代理，需要解决的问题？
    问题一：如何根据加载到内存中的被代理类，动态的创建一个代理类及其对象。
    问题二：当通过代理类的对象调用方法a时，如何动态的去调用被代理类中的同名方法a。
    */

    //创建继承了InvocationHandler接口的类
    static class MyInvocationHanlder implements InvocationHandler {
        private Object obj;//需要使用被代理类的对象进行赋值

        public void bind(Object obj) {
            this.obj = obj;
        }

        //当我们通过代理类的对象，调用方法a时，就会自动的调用如下的方法：invoke()
        //将被代理类要执行的方法a的功能就声明在invoke()中
        @Override
        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

            //method:即为代理类对象调用的方法，此方法也就作为了被代理类对象要调用的方法
            System.out.println(method.getName());
            //obj:被代理类的对象
            DogUtils.method1();

            Object returnValue = method.invoke(obj, args);

            DogUtils.method2();
            //上述方法的返回值就作为当前类中的invoke()的返回值。
            return returnValue;
        }
    }


    static class ProxyFactory {
        //调用此方法，返回一个代理类的对象。解决问题一
        public static Object getProxyInstance(Object obj) {
            MyInvocationHanlder hanlder = new MyInvocationHanlder();
            hanlder.bind(obj);
            return Proxy.newProxyInstance(obj.getClass().getClassLoader(), obj.getClass().getInterfaces(), hanlder);

        }
    }

    //测试动态代理
    public static void main(String[] args) {
        SuperMan superMan = new SuperMan();
        //proxyInstance:代理类的对象
        Human proxyInstance = (Human) ProxyFactory.getProxyInstance(superMan);
        //当通过代理类对象调用方法时，会自动的调用被代理类中同名的方法
        String belief = proxyInstance.getBelief();
        System.out.println("----------");
        System.out.println(belief);
        System.out.println("----------");
        proxyInstance.eat("火锅");
    }

    static class DogUtils {
        public static void method1() {
            System.out.println("=======通用方法一=======");
        }

        public static void method2() {
            System.out.println("=======通用方法二=======");
        }
    }
}

```

