/*
 * 
 * 1. Classes:
Declaring members: fields and methods

2. Objects:
Class instantiation
Refrence value
References
Objects vs Classes
Instance Members
Static Members

3. Learn to Compile and Run Java application using command line

4. JVM, JRE

5. Why is Java platform independent?
What makes Java Unique?
what is Bytecode

6. Language Elements:

Lexical Tokens, Identifiers, Keywords, Separators

Literals:
Integar Literals, Floating point literals, Boolean literals, Character Literals, String Literals

String Class
String Immutability
String Pooling

7. Primitive Data Types:
int, char, float, bool, ascii code and unicode
Learn to declare and initialise variable
Default and initial Values
Lifetime of variables
Operators and Expressions 
Boxing and Unboxing Conversions

8. Control Flow: if, else, for, while, do-while

9. Class and Method declarations:
Instance Methods, Object References, Method Overloading

10. Constructors:
Default, overloaded,

11. Main Method:
Command line arguments, keywords: public, static, void, main

12. Arrays:
Declaring Array Variables, Constructing an array, initializing an array, Accesing an array element,
Multidimensional Array, Jagged Arrays, 
Sorting and Searching in Array

13. Passing Values to Methods:
Passing Primitive data values, references values, arrays
Final Parameters and Final Keyword

14. Variable Arity Methods:
Calling a Variable Arity Method
Differences between Varible Arity and Fixed Arity Methods Call

15. Important Topics:
Packages, Enums, Access Specifiers, Static Members, Final Members, Method Overloading

16. Inheritance:
Abstract Class, Super Keyword, Instance of Keyword, Runtime Polymorphism, 
Method Overriding
Difference between Method Overloading and Method Overriding,
Multiple Inheritance

17. Interfaces:
Extend an Interface, Default Methods, Static Methods, Constants

18. Exception Handling:
Categories of Exception, Common Exceptions and Categories, Try Block, Catch Clause, Finally Clause, Try with Resource

19. Difference Between Final, Finally and Finalize.

20. Object Lifetime and Garbage Collection: 
Object Finalization, Finalizer Chaining, Invoking Garbage Collection Programmatically, 
Initializers, Field Initializer Expressions, Declaration order of Initializer Expressions, 
Static Initializer Blocks, 
Declaration order of Static Initializers,
Instance Initializer Blocks, 
Declaration order of Instance initializers

21. Object Class: 
Wrapper Class, Common Wrapper Class Constructors, 
Common Wrapper Class Utility Methods, Numeric Wrapper Classes, 
Character and Boolean Class,
String Builder and String Buffer

22. Anonymous Inner Class, Nested Class, Inner Class 
Lamdas and Functional Programming

23. Advanced Topics:
Java Streams, Java Generics, Java Collections, Java i/o (File Handling) 

24. Multithreading:
Volatile, Atomic Integer, Locks, Runnable and Callable, Executor Service, Async Programming in Java, Futures
 * 
*/
class Adder{    
    static int add(int a,int b){return a+b;}    
    static double add(float a,int b){return a+b;}    
}    
public class Main {
   
     public static void main(String []args){    
     System.out.println(Adder.add(11,11));//ambiguity    
     }
}
