---
layout: post
type: "MECSEAIML"
subject: "ADSA"
section: "Unit 1: Introduction, Linear, Non-Linear, and Advanced Data Structures"
title:  "4. Linked List"
author: Jitender Singh Virk
---

While declaring arrays, we have to specify the size of the array, which will restrict the number of elements that the array can store. For example, if we declare an array as `int marks[10]`, then the array can store a maximum of 10 data elements but not more than that. But what if we are not sure of the number of elements in advance? Moreover, to make efficient use of memory, the elements must be stored randomly at any location rather than in consecutive locations. So, there must be a data structure that removes the restrictions on the maximum number of elements and the storage condition to write efficient programs.

Linked list is a data structure that is free from the aforementioned restrictions. A linked list does not store its elements in consecutive memory locations and the user can add any number of elements to it. However, unlike an array, a linked list does not allow random access of data. Elements in a linked list can be accessed only in a sequential manner. But like an array, insertions and deletions can be done at any point in the list in a constant time.

A linked list, in simple terms, is a linear collection of data elements. These data elements are called *nodes*. Linked list is a data structure which in turn can be used to implement other data structures. Thus, it acts as a building block to implement data structures such as stacks, queues, and their variations. A linked list can be perceived as a train or a sequence of nodes in which each node contains one or more data fields and a pointer to the next node.

<img src="/assets/20MAI/ADSA/linkedlist.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 7rem;">

In the above figure, we can see a linked list in which every node contains two parts, an integer and a pointer to the next node. The left part of the node which contains data may include a simple data type, an array, or a structure. The right part of the node contains a pointer to the next node (or address of the next node in sequence). The last node will have no next node connected to it, so it will store a special value called *NULL*. In above figure, the *NULL* pointer is represented by X. While programming, we usually define *NULL* as –1. Hence, a *NULL* pointer denotes the end of the list. Since in a linked list, every node contains a pointer to another node which is of the same type, it is also called a *self-referential data type*.

Linked lists contain a pointer variable *START* that stores the address of the first node in the list. We can traverse the entire list using *START* which contains the address of the first node; the next part of the first node in turn stores the address of its succeeding node. Using this technique, the individual nodes of the list will form a chain of nodes. If *START = NULL*, then the linked list is empty and contains no nodes.

In C, we can implement a linked list using the following code:
```c
struct node{
  int data;
  struct node *next;
};
```


***Note***: Linked lists provide an efficient way of storing related data and perform basic operations such as insertion, deletion, and updation of information at the cost of extra space required for storing address of the next node.

Let us see how a linked list is maintained in the memory. In order to form a linked list, we need a structure called *node* which has two fields, *DATA* and *NEXT*. *DATA* will store the information part and *NEXT* will store the address of the next node in sequence. Consider Fig. 6.2.

<div class="row">
  <div class="col">
    <img src="/assets/20MAI/ADSA/linkedlist_example.png" class="rounded mx-auto d-block" alt="Example of spatial resolution" style="max-width: 97%; min-width: 50%; max-height:30rem;">
  </div>
  <div class="col-lg">
  <br>
  In the figure, we can see that the variable START is used to store the address of the first node. Here, in this example, START = 1, so the first data is stored at address 1, which is H. The corresponding NEXT stores the address of the next node, which is 4. So, we will look at address 4 to fetch the next data item. The second data element obtained from address 4 is E. Again, we see the corresponding NEXT to go to the next node. From the entry in the NEXT, we get the next address, that is 7, and fetch L as the data. We repeat this procedure until we reach a position where the NEXT entry contains –1 or NULL, as this would denote the end of the linked list. When we traverse DATA and NEXT in this manner, we finally see that the linked list in the above example stores characters that when put together form the word HELLO.

  Note that Fig. 6.2 shows a chunk of memory locations which range from 1 to 10. The shaded portion contains data for other applications. Remember that the nodes of a linked list need not be in consecutive memory locations. In our example, the nodes for the linked list are stored at addresses 1, 4, 7, 8, and 10. The computer maintains a list of all free memory cells. This list of available space is called the <b>free pool</b>.
  </div>
</div>

## Types of Linked List
Following are the types of linked list.
* **Singly Linked List** − Item navigation is forward only.
* **Doubly Linked List** − Items can be navigated forward and backward.
* **Circular Linked List** − Last item contains link of the first element as next and the first element has a link to the last element as previous.

## Singly Linked Lists
A singly linked list is the simplest type of linked list in which every node contains some data and a pointer to the next node of the same data type. By saying that the node contains a pointer to the next node, we mean that the node stores the address of the next node in sequence. A singly linked list allows traversal of data only in one way. Below figure shows a singly linked list.

<img src="/assets/20MAI/ADSA/linkedlist.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 7rem;">

#### Traversing a Linked List
Traversing a linked list means accessing the nodes of the list in order to perform some processing on them. Remember a linked list always contains a pointer variable START which stores the address of the first node of the list. End of the list is marked by storing NULL or –1 in the NEXT field of the last node. For traversing the linked list, we also make use of another pointer variable PTR which points to the node that is currently being accessed. The algorithm to traverse a linked list is shown below

```
Step 1: [INITIALIZE] SET PTR = START
Step 2: Repeat Steps 3 and 4 while PTR != NULL
Step 3:   Apply Process to PTR --> DATA
Step 4:   SET PTR = PTR --> NEXT
        [END OF LOOP]
Step 5: EXIT
```

In this algorithm, we first initialize PTR with the address of START. So now, PTR points to the first node of the linked list. Then in Step 2, a while loop is executed which is repeated till PTR processes the last node, that is until it encounters NULL. In Step 3, we apply the process (e.g., print) to the current node, that is, the node pointed by PTR. In Step 4, we move to the next node by making the PTR variable point to the node whose address is stored in the NEXT field.

#### Searching for a Value in a Linked List
Searching a linked list means to find a particular element in the linked list. As already discussed, a linked list consists of nodes which are divided into two parts, the information part and the next part. So searching means finding whether a given value is present in the information part of the node or not. If it is present, the algorithm returns the address of the node that contains the value. The algorithm to search for a value in the linked list is given below

```
Step 1: [INITIALIZE] SET PTR = START
Step 2: Repeat Step 3 while PTR != NULL
Step 3:   IF VAL = PTR --> DATA
            SET POS = PTR
            Go To Step 5
          ELSE
            SET PTR = PTR --> NEXT
          [END OF IF]
        [END OF LOOP]
Step 4: SET POS = NULL
Step 5: EXIT
```

In Step 1, we initialize the pointer variable PTR with START that contains the address of the first node. In Step 2, a while loop is executed which will compare every node’s DATA with VAL for which the search is being made. If the search is successful, that is, VAL has been found, then the address of that node is stored in POS and the control jumps to the last statement of the algorithm. However, if the search is unsuccessful, POS is set to NULL which indicates that VAL is not present in the linked list.


#### Inserting a New Node in a Linked List
We will take four cases and then see how insertion is done in each case.
* **Case 1**: The new node is inserted at the beginning.
* **Case 2**: The new node is inserted at the end.
* **Case 3**: The new node is inserted after a given node.
* **Case 4**: The new node is inserted before a given node.

There are two important terms that we need to know:
* **Overflow** is a condition that occurs when *AVAIL = NULL* or no free memory cell is present in the system.
* **Underflow** is a condition that occurs when we try to delete a node from a linked list that is empty. This happens when START = NULL or when there are no more nodes to delete. Note that when we delete a node from a linked list, we actually have to free the memory occupied by that node. The memory is returned to the free pool so that it can be used to store other programs and data. Whatever be the case of deletion, we always change the AVAIL pointer so that it points to the address that has been recently vacated.

***Case 1: Inserting a Node at the Beginning of a Linked List***
Consider the linked list shown in Fig. 6.12. Suppose we want to add a new node with data 9 and add it as the first node of the list. Then the following changes will be done in the linked list.

<img src="/assets/20MAI/ADSA/insert_beg_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 25em;">

Below is the algorithm to insert a new node at the beginning of a linked list

```
Step 1: IF AVAIL = NULL
          Write OVERFLOW
          Go to Step 7
        [END OF IF]
Step 2: SET NEW_NODE = AVAIL
Step 3: SET AVAIL = AVAIL -> NEXT
Step 4: SET NEW_NODE -> DATA = VAL
Step 5: SET NEW_NODE -> NEXT = START
Step 6: SET START = NEW_NODE
Step 7: EXIT
```

<br>
***Case 2: Inserting a Node at the End of a Linked List***
Consider the linked list shown in Fig. 6.14. Suppose we want to add a new node with data 9 as the last node of the list. Then the following changes will be done in the linked list.

<img src="/assets/20MAI/ADSA/insert_end_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 30em;">

below is the algorithm to insert a new node at the end of a linked list.

```
Step 1: IF AVAIL = NULL
          Write OVERFLOW
          Go to Step 1
        [END OF IF]
Step 2: SET NEW_NODE = AVAIL
Step 3: SET AVAIL = AVAIL - > NEXT
Step 4: SET NEW_NODE - > DATA = VAL
Step 5: SET NEW_NODE - > NEXT = NULL
Step 6: SET PTR = START
Step 7: Repeat Step 8 while PTR - > NEXT != NULL
Step 8:   SET PTR = PTR - > NEXT
      [END OF LOOP]
Step 9: SET PTR - > NEXT = NEW_NODE
Step 10: EXIT
```

<br>
***Case 3: Inserting a Node After a Given Node in a Linked List***
Consider the linked list shown in Fig. 6.17. Suppose we want to add a new node with value 9 after the node containing data 3. Before discussing the changes that will be done in the linked list, let us first look at the algorithm shown below (insert a new node after a node that has value NUM)
```
Step 1: IF AVAIL = NULL
          Write OVERFLOW
          Go to Step 12
        [END OF IF]
Step 2: SET NEW_NODE = AVAIL
Step 3: SET AVAIL = AVAIL - > NEXT
Step 4: SET NEW_NODE - > DATA = VAL
Step 5: SET PTR = START
Step 6: SET PREPTR = PTR
Step 7: Repeat Steps 8 and 9 while PREPTR - > DATA != NUM
Step 8:   SET PREPTR = PTR
Step 9:   SET PTR = PTR - > NEXT
      [END OF LOOP]
Step 1 : PREPTR - > NEXT = NEW_NODE
Step 11: SET NEW_NODE - > NEXT = PTR
Step 12: EXIT
```
<img src="/assets/20MAI/ADSA/insert_after_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 40em;">

<br>
***Inserting a Node Before a Given Node in a Linked List***
Consider the linked list shown in Fig. 6.19. Suppose we want to add a new node with value 9 before the node containing 3. Before discussing the changes that will be done in the linked list, let us first look at the algorithm shown below (insert a new node before a node that has value NUM)

```
Step 1: IF AVAIL = NULL
          Write OVERFLOW
          Go to Step 12
        [END OF IF]
Step 2: SET NEW_NODE = AVAIL
Step 3: SET AVAIL = AVAIL - > NEXT
Step 4: SET NEW_NODE - > DATA = VAL
Step 5: SET PTR = START
Step 6: SET PREPTR = PTR
Step 7: Repeat Steps 8 and 9 while PTR - > DATA != NUM
Step 8:   SET PREPTR = PTR
Step 9:   SET PTR = PTR - > NEXT
        [END OF LOOP]
Step 10: PREPTR - > NEXT = NEW_NODE
Step 11: SET NEW_NODE - > NEXT = PTR
Step 12: EXIT
```

<img src="/assets/20MAI/ADSA/insert_before_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 40em;">

<br>
#### Deleting a Node from a Linked List
We will consider three cases and then see how deletion is done in each case.
* **Case 1** : The first node is deleted.
* **Case 2** : The last node is deleted.
* **Case 3** : The node after a given node is deleted.

***Case 1: Deleting the First Node from a Linked List***
Consider the linked list in Fig. 6.20. When we want to delete a node from the beginning of the list, then the following changes will be done in the linked list.

<img src="/assets/20MAI/ADSA/delete_start_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 10em;">

The algorithm to delete a node from a linked list is
```
Step 1: IF START = NULL
          Write UNDERFLOW
          Go to Step 5
        [END OF IT]
Step 2: SET PTR = START
Step 3: SET START = START --> NEXT
Step 4: FREE PTR
Step 5: EXIT
```

<br>
***Case 2: Deleting the Last Node from a Linked List***
Consider the linked list shown in Fig. 6.22. Suppose we want to delete the last node from the linked list, then the following changes will be done in the linked list.

<img src="/assets/20MAI/ADSA/delete_end_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 25em;">

The algorithm to delete a node from the end is given below

```
Step 1: IF START = NULL
          Write UNDERFLOW
          Go to Step 8
        [END OF IF]
Step 2: SET PTR = START
Step 3: Repeat Steps 4 and 5 while PTR -> NEXT != NULL
Step 4:   SET PREPTR = PTR
Step 5:   SET PTR = PTR -> NEXT
        [END OF LOOP]
Step 6: SET PREPTR -> NEXT = NULL
Step 7: FREE PTR
Step 8: EXIT
```

<br>
***Case 3: Deleting the Node After a Given Node in a Linked List***
Consider the linked list shown in Fig. 6.24. Suppose we want to delete the node that succeeds the node which contains data value 4. Then the following changes will be done in the linked list.

<img src="/assets/20MAI/ADSA/delete_given_ll.png" class="rounded mx-auto d-block" alt="LinkedList" style="max-width: 97%; max-height: 35em;">

The algorithm to delete the node after a given node is
```
Step 1: IF START = NULL
          Write UNDERFLOW
          Go to Step 1
        [END OF IF]
Step 2: SET PTR = START
Step 3: SET PREPTR = PTR
Step 4: Repeat Steps 5 and 6 while PREPTR -> DATA != NUM
Step 5:   SET PREPTR = PTR
Step 6:   SET PTR = PTR -> NEXT
        [END OF LOOP]
Step 7: SET TEMP = PTR
Step 8: SET PREPTR -> NEXT = PTR -> NEXT
Step 9: FREE TEMP
Step 10: EXIT
```



---
## FAQs <small>(hover on green text for answer)<small>


* In a linked list, every node contains a pointer to another node which is of the same type, it is also called a __blank__ data type. <span class="text-success" data-toggle="tooltip" data-placement="right" title="self-referential"> answer </span>

* What is step 3 doing in the given algo. In what situation step 7 will be executed? mid-sem question type.



---
#### References
* [Book: Data Structures using C, second edition, Reema Thareja](http://masterraghu.com/subjects/Datastructures/ebooks/rema%20thareja.pdf), Chapter 6
