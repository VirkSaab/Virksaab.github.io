---
layout: post
type: "MECSEAIML"
subject: "ADSA"
section: "Unit 1: Introduction, Linear, Non-Linear, and Advanced Data Structures"
title:  "1. Introduction to Data Structures"
author: Jitender Singh Virk
---

## Data Structure
Data Structure is a systematic way to organize data in order to use it efficiently. Following terms are the foundation terms of a data structure.
* **Interface** − Each data structure has an interface. Interface represents the set of operations that a data structure supports. An interface only provides the list of supported operations, type of parameters they can accept and return type of these operations.
* **Implementation** − Implementation provides the internal representation of a data structure. Implementation also provides the definition of the algorithms used in the operations of the data structure.

Data Structure mainly specifies the following four things -
* Organization of Data
* Accessing methods
* Degree of associativity
* Processing alternatives for information

## Basic Terminology
* Data − Data are values or set of values.
* Data Item − Data item refers to single unit of values.
* Group Items − Data items that are divided into sub items are called as Group Items.
* Elementary Items − Data items that cannot be divided are called as Elementary Items.
* Attribute and Entity − An entity is that which contains certain attributes or properties, which may be assigned values.
* Entity Set − Entities of similar attributes form an entity set.
* Field − Field is a single elementary unit of information representing an attribute of an entity.
* Record − Record is a collection of field values of a given entity.
* File − File is a collection of records of the entities in a given entity set.

## Characteristics of a Data Structure
* **Correctness** − Data structure implementation should implement its interface correctly.

* **Time Complexity** − Running time or the execution time of operations of data structure must be as small as possible.

* **Space Complexity** − Memory usage of a data structure operation should be as little as possible.

## Need for Data Structure
As applications are getting complex and data rich, there are three common problems that applications face now-a-days.

* **Data Search** − Consider an inventory of 1 million items of a store. If the application is to search an item, it has to search an item in 1 million items every time slowing down the search. As data grows, search will become slower.

* **Processor speed** − Processor speed although being very high, falls limited if the data grows to billion records.

* **Multiple requests** − As thousands of users can search data simultaneously on a web server, even the fast server fails while searching the data.

To solve the above-mentioned problems, data structures come to rescue. Data can be organized in a data structure in such a way that all items may not be required to be searched, and the required data can be searched almost instantly.

## Execution Time Cases
There are three cases which are usually used to compare various data structure's execution time in a relative manner.

* **Worst Case (O)** − Big O notation specifically describes worst case scenario. This is the scenario where a particular data structure operation takes maximum time it can take. If an operation's worst case time is ƒ(n) then this operation will not take more than ƒ(n) time where ƒ(n) represents function of n.

* **Average Case (θ)** −  Theta notation represents the average complexity of an algorithm. This is the scenario depicting the average execution time of an operation of a data structure. If an operation takes ƒ(n) time in execution, then m operations will take mƒ(n) time.

* **Best Case (Ω)**−  Omega(Ω) notation specifically describes best case scenario. This is the scenario depicting the least possible execution time of an operation of a data structure. If an operation takes ƒ(n) time in execution, then the actual operation may take time as the random number which would be maximum as ƒ(n).

## Classification of Data Structure
The classification is given in the image below:
<img src="/assets/20MAI/ADSA/ds_clf.png" class="rounded mx-auto d-block" alt="Data Structure classification image" style="max-height: 35rem;">

### Primitive Data Structures
Primitive Data Structures are the basic data structures that directly operate upon the machine instructions.They have different representations on different computers. Integers, Floating point numbers, Character constants, String constants and Pointers come under this category.

### Non-Primitive data structures
Non-primitive data structures are more complicated data structures and are derived from primitive data structures. They emphasize on grouping same or different data items with relationship between each data item. Arrays, Lists and Files come under this category.

#### Linear Data Structures
A data structure is said to be Linear, if its elements are connected in linear fashion by means of logically or in sequence memory locations. There are two ways to represent a linear data structure in memory -- static memory allocation and dynamic memory allocation. The possible operations on the linear data structure are: traversal, insertion, deletion, searching, sorting, and merging. Examples of linear data structure are array, linked-list, stack, and queue.

##### Static and Dynamic Data Structure
In **Static data structure** the size of the structure is fixed. The content of the data structure can be modified but without changing the memory space allocated to it. Memory allocation is done at compile time. Array is an example of static data structure.

* **Array**: An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together. This makes it easier to calculate the position of each element by simply adding an offset to a base value, i.e., the memory location of the first element of the array (generally denoted by the name of the array).
<img src="/assets/20MAI/ADSA/array.png" class="rounded mx-auto d-block" alt="Data Structure classification image" style="max-width: 90%; max-height: 15rem;">

In **Dynamic data structure** the size of the structure in not fixed and can be modified during the operations performed on it. Dynamic data structures are designed to facilitate change of data structures in the run time. It is used frequently in competitive programming.

* **Linked List**: A linked list is a linear data structure, in which the elements are not stored at contiguous memory locations. The elements in a linked list are linked using pointers as shown in the below image.
<img src="/assets/20MAI/ADSA/Linkedlist.png" class="rounded mx-auto d-block" alt="Data Structure classification image" style="max-width: 80%; max-height: 10rem;">
Each link contains a connection to another link. Linked list is the second most-used data structure after array. Following are the important terms to understand the concept of Linked List.
  * *Link* − Each link of a linked list can store a data called an element.
  * *Next* − Each link of a linked list contains a link to the next link called Next.
  * *LinkedList* − A Linked List contains the connection link to the first link called Head.

* **Stack**: Stack is an abstract data structure in which insertion and deletion operations are performed at one end only. The insertion operation is referred to as ‘PUSH’ and deletion operation is referred to as ‘POP’ operation. Stack is also called as Last in First out (LIFO) data structure or First In Last Out (FILO). It is said to be in Overflow state when it is completely full and is said to be in Underflow state if it is completely empty. The data type of every element in stack is same.
<img src="/assets/20MAI/ADSA/stack.png" class="rounded mx-auto d-block" alt="stack data type image" style="max-width: 80%; max-height: 15rem;">

* **Queue**: Queue is also an abstract data type or a linear data structure, just like stack data structure, in which the first element is inserted from one end called the REAR(also called tail), and the removal of existing element takes place from the other end called as FRONT(also called head). This makes queue as FIFO(First in First Out) data structure, which means that element inserted first will be removed first. Which is exactly how queue system works in real world. If you go to a ticket counter to buy movie tickets, and are first in the queue, then you will be the first one to get the tickets. Right? Same is the case with Queue data structure. Data inserted first, will leave the queue first. The process to add an element into queue is called Enqueue and the process of removal of an element from queue is called Dequeue.
<img src="/assets/20MAI/ADSA/queue.png" class="rounded mx-auto d-block" alt="queue image" style="max-width: 95%; max-height: 20rem;">

#### Non-Linear Data Structures
In Non Linear Data Structure, the data elements are not organized sequentially or linearly. To reflect a special relationships among different elements of non linear data structures, the data elements in such type of data structures can be connected with more then one elements. One of the important characteristic of non linear data structures is that all the data items of non linear data structures may not be visited in one traversal. That means, if we want to visit all the nodes of non linear data structure then it may require more than one run. Two most common example of non linear data structures are Tree and Graph.

##### Tree
Tree is a collection of nodes which creates parent child relationships. Nodes in a tree are stored hierarchically where top most node is the root node of the tree.
<img src="/assets/20MAI/ADSA/tree.png" class="rounded mx-auto d-block" alt="queue image" style="max-width: 95%; max-height: 20rem;">
There are many types of trees in data structure. Some of important types are as follows:

* General Tree
* Forest
* Binary Tree
* Binary Search Tree
* AVL Tree
* B Tree
* B+ Tree


##### Graph
A Graph G(V,E) is defined as a collection of vertices V and collection of edges E which connects these vertices. Vertices store the data elements and edges can represent relationships among these vertices. A tree can be viewed as restricted graph.
<img src="/assets/20MAI/ADSA/graph.png" class="rounded mx-auto d-block" alt="queue image" style="max-width: 95%; max-height: 20rem;">

Types of Graphs are as follows:
* Directed Graph
* Un-directed Graph
* Mixed Graph
* Multi Graph
* Simple Graph
* Null Graph
* Weighted Graph


## Difference between Linear and Non Linear Data Structure
<table class="table table-bordered">
<thead>
  <tr>
    <th class="tg-0pky">Linear Data Structure</th>
    <th class="tg-0pky">Non-Linear Data Structure</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">Every item is related to its previous and next item.</td>
    <td class="tg-0pky">Every item is attched with many other items.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Data is arranged in linear sequence.</td>
    <td class="tg-0pky">Data is not arrageed in sequence.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Data items can be traversed in a single run.</td>
    <td class="tg-0pky">Data cannot be traversed in a single run.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Examples: Array, stacks queue, linkedlist</td>
    <td class="tg-0pky">Examples: Tree, Graph</td>
  </tr>
  <tr>
    <td class="tg-0pky">Easy to implement.</td>
    <td class="tg-0pky">Difficult to implement.</td>
  </tr>
</tbody>
</table>

The data structures can also be classified based on the following characteristic:
<table class="table table-bordered">
<thead>
  <tr>
    <th class="tg-0pky">Characterstics</th>
    <th class="tg-0pky">Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">Linear</td>
    <td class="tg-0pky">the data items are arranged in a linear sequence such as Array, Linkedlist</td>
  </tr>
  <tr>
    <td class="tg-0pky">Non-Linear</td>
    <td class="tg-0pky">the data items are not in sequence such as Tree and Graph.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Homogeneous</td>
    <td class="tg-0pky">All the elements are of same type such as array and strings.</td>
  </tr>
  <tr>
    <td class="tg-0pky">Non-Homogeneous</td>
    <td class="tg-0pky">The elements may or may not be the same type. For example, structures and union </td>
  </tr>
  <tr>
    <td class="tg-0pky">Static</td>
    <td class="tg-0pky">whose sizes and structures associated memory locations are fixed at compile time such as arrays.</td>
  </tr>
  <tr>
    <td class="tg-0lax">Dynamic</td>
    <td class="tg-0lax">Which expands or shrinks depending upon the program needs at runtime. Also, their associated memory locations changes. For example, linked lists created using pointers.</td>
  </tr>
</tbody>
</table>


##  Operations on Data Structure
1. **Traversing**: Every data structure contains the set of data elements. Traversing the data structure means visiting each element of the data structure in order to perform some specific operation like searching or sorting. For example, if we need to calculate the average of the marks obtained by a student in 6 different subject, we need to traverse the complete array of marks and calculate the total sum, then we will divide that sum by the number of subjects i.e. 6, in order to find the average.

2. **Insertion**: Insertion can be defined as the process of adding the elements to the data structure at a particular location. If the size of data structure is *n* then we can only insert *n-1* data elements into it. There can be three ways to insert elements into data structure: at the beginning, at the end, and at the desired location.

3. **Deletion**: The process of removing an element from the data structure is called Deletion. There are 3 ways to delete a value from data structure. These are: from the beginning, from the end and from the given location. If we try to delete an element from an empty data structure then underflow occurs.

4. **Searching**: The process of finding the location of an element within the data structure is called Searching. There are two types of algorithms to perform searching:
  * *Linear Search*: Searching from one end to another sequentially.
  * *Binary Search*: It works on divide and conquer rule.

5. **Sorting**: The process of arranging the data structure in a specific order is known as Sorting. There are many algorithms that can be used to perform sorting, for example, insertion sort, selection sort, bubble sort, etc.

6. **Merging**: When two lists List A and List B of size M and N respectively, of similar type of elements, combined or joined to produce the third list, List C of size (M+N), then this process is called merging


## Advantages of Data Structures
**Efficiency**: Efficiency of a program depends upon the choice of data structures. For example: suppose, we have some data and we need to perform the search for a particular record. In that case, if we organize our data in an array, we will have to search sequentially element by element. hence, using array may not be very efficient here. There are better data structures which can make the search process efficient like ordered array, binary search tree or hash tables.

**Re usability**: Data structures are reusable, i.e. once we have implemented a particular data structure, we can use it at any other place. Implementation of data structures can be compiled into libraries which can be used by different clients.

**Abstraction**: Data structure is specified by the Abstract Data Type (ADT) which provides a level of abstraction. The client program uses the data structure through interface only, without getting into the implementation details.

<!-- Algorithm Analysis
Efficiency of an algorithm can be analyzed at two different stages, before implementation and after implementation, as mentioned below −

A priori analysis − This is theoretical analysis of an algorithm. Efficiency of algorithm is measured by assuming that all other factors e.g. processor speed, are constant and have no effect on implementation.

A posterior analysis − This is empirical analysis of an algorithm. The selected algorithm is implemented using programming language. This is then executed on target computer machine. In this analysis, actual statistics like running time and space required, are collected.

We shall learn here a priori algorithm analysis. Algorithm analysis deals with the execution or running time of various operations involved. Running time of an operation can be defined as no. of computer instructions executed per operation. -->

<br>
## FAQs
* “Are Data Structures really required? “. Comment on this statement.
*  “Good data structure allows fast and efficient of data”. Comment on this statement.
* Which data structure uses static memory allocation ? Which memory allocation is better static or Dynamic ? Justify your answers.
* Assuming int is of 4 bytes, what is the size of int arr[15];?
* Which one is better O(1) or O(n)? Justify your answer.
* Provide the Code(in any language) with the time complexity of O(n2).
* **Posterior** algorithm analysis you will choose if you are implementing the algorithm on I-7 processor.
* If the element we are searching in Arrays is found at the first position in Array. It is a Worst Case. **FALSE**


---
#### References
* [Overview](https://www.tutorialspoint.com/data_structures_algorithms/data_structure_overview.htm)
* [Array](https://www.geeksforgeeks.org/array-data-structure/)
* [Linked List](https://www.geeksforgeeks.org/data-structures/linked-list/)
* [Stack](https://www.studytonight.com/data-structures/stack-data-structure)
* [Queue](https://www.studytonight.com/data-structures/queue-data-structure)
* [Non-Linear Data Structures](https://theknowshares.com/computerscience/datastructure/nonlinear-data-structures/)
* [Trees](https://theknowshares.com/wp-content/uploads/2019/09/Trees.pdf)
* Sorting Applications:https://algs4.cs.princeton.edu/25applications/
