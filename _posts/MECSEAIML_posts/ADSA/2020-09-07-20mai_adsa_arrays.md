---
layout: post
type: "MECSEAIML"
subject: "ADSA"
section: "Unit 1: Introduction, Linear, Non-Linear, and Advanced Data Structures"
title:  "3. Arrays"
author: Jitender Singh Virk
---


An array is a collection of similar data elements. These data elements have the same data type. The elements of the array are stored in consecutive memory locations and are referenced by an index (also known as the subscript). The subscript is an ordinal number which is used to identify an element of the array.

<img src="/assets/20MAI/ADSA/arrays.png" class="rounded mx-auto d-block" alt="Arrays" style="max-width: 97%; max-height: 20rem;">

In array, elements are stored at contiguous memory locations. An index is always less than the total number of array items. In terms of syntax, any variable that is declared as an array can store multiple values. Almost all languages have the same comprehension of arrays but have different ways of declaring and initializing them. However, three parts will always remain common in all the initializations, i.e., array name, elements, and the data type of elements.

#### Why do we need arrays?
Let’s consider the situation where we need to get 10 student’s age and store it for some calculation. Since age is an integer type, we can store it in 10 integer variables. However, if we do that, it will be very difficult for us to manipulate the data. If more number of student joins, then it is very difficult to declare a lot of variables and keep track of it. To overcome this kind of situation, we should use Array data structure.

Here, are some advantages of using arrays:
* Arrays are best for storing multiple values in a single variable
* Arrays are better at processing many values easily and quickly
* Sorting and searching the values is easier in arrays


## Declaration of Arrays
We have already seen that every variable must be declared before it is used. The same concept holds true for array variables. An array must be declared before being used. Declaring an array means specifying the following:
* **Data type**: the kind of values it can store, for example, int, char, float, double.
* **Name**: to identify the array.
* **Size**: the maximum number of values that the array can hold.

Arrays are declared using the following syntax:

`type name[size];`

The type can be either int, float, double, char, or any other valid data type. The number within brackets indicates the size of the array, i.e., the maximum number of elements that can be stored in the array. For example, if we write,

`int marks[10];`

then the statement declares marks to be an array containing 10 elements. In C, the array index starts from zero. The first element will be stored in *marks[0]*, second element in *marks[1]*, and so on. Therefore, the last element, that is the 10th element, will be stored in *marks[9]*. Note that 0, 1, 2, 3 written within square brackets are the subscripts.

The elements of an array can be initialized at the time of declaration, just as any other variable. When an array is initialized, we need to provide a value for every element in the array. Arrays are initialized by writing, `type array_name[size]={list of values};`. Note that the values are written within curly brackets and every value is separated by a comma. It is a compiler error to specify more values than there are elements in the array. When we write, `int marks[5]={90, 82, 78, 95, 88};`

#### How to access a specific array value?
You can access any array item by using its index.

**SYNTAX**: arrayName[indexNumber]

**EXAMPLE**: balance[1]. The following image illustrates the basic concept of accessing arrays items by their index.

<img src="/assets/20MAI/ADSA/access_array.png" class="rounded mx-auto d-block" alt="Access Arrays" style="max-width: 97%; max-height: 25rem;">

#### How to calculate the address of array elements?
Since an array stores all its data elements in consecutive memory locations, storing just the base address, that is the address of the first element in the array, is sufficient. The address of other data elements can simply be calculated using the base address. The formula to perform this calculation is,

`Address of data element, A[k] = BA(A) + w(k – lower_bound)`

Here, A is the array, k is the index of the element of which we have to calculate the address, BA is
the base address of the array A, and w is the size of one element in memory, for example, size of
int is 2.

**Example**: Given an array `int marks[] = {99,67,78,56,88,90,34,85}`, calculate the address of
*marks[4]* if the base address = 1000.

**Solution**: We know that storing an integer value requires 2 bytes, therefore, its size is 2 bytes. marks[4] = 1000 + 2(4 – 0) = 1000 + 2(4) = **1008**


## Operations on Arrays
There are a number of operations that can be preformed on arrays. These operations include:
* Traversing an array
* Inserting an element in an array
* Deleting an element from an array
* Searching an element in an array
* Update an element in an array
* Merging two arrays

### Traversing an Array
Traversing an array means accessing each and every element of the array for a specific purpose. Traversing the data elements of an array *A* can include printing every element, counting the total number of elements, or performing any process on these elements. Since, array is a linear data structure (because all its elements form a sequence), traversing its elements is very simple and straightforward. The algorithm for array traversal is given below
```
Step 1: [INITIALIZATION] SET I = lower_bound
Step 2: Repeat Steps 3 to 4 while I<= upper_bound
Step 3: Apply Process to A[I]
Step 4: SET I = I + 1
[END OF LOOP]
Step 5: EXIT
```

### Inserting an Element in an Array
If an element has to be inserted at the end of an existing array, then the task of insertion is quite simple. We just have to add 1 to the *upper_bound* and assign the value. Here, we assume that the memory space allocated for the array is still available. For example, if an array is declared to contain 10 elements, but currently it has only 8 elements, then obviously there is space to accommodate two more elements. But if it already has 10 elements, then we will not be able to add another element to it. Below algorithm shows the steps to insert a new element to the end of the array.
```
Step 1: Set upper_bound = upper_bound+1
Step 2: Set A[upper_bound] = VAL
Step 3: EXIT
```
However, if we have to insert an element in the middle of the array, then this is not a trivial task. On an average, we might have to move as much as half of the elements from their positions in order to accommodate space for the new element. For example, consider an array whose elements are arranged in ascending order. Now, if a new element has to be added, it will have to be added probably somewhere in the middle of the array. To do this, we must first find the location where the new element will be inserted and then move all the elements (that have a value greater than that of the new element) one position to the right so that space can be created to store the new value.

The algorithm to **insert an element in the middle of an array** is as follows

The algorithm INSERT will be declared as `INSERT (A, N, POS, VAL)`. The arguments are
* *A*, the array in which the element has to be inserted
* *N*, the number of elements in the array
* *POS*, the position at which the element has to be inserted
* *VAL*, the value that has to be inserted

```
Step 1: [INITIALIZATION] SET I = N
Step 2: Repeat Steps 3 and 4 while I >= POS
Step 3: SET A[I + 1] = A[I]
Step 4: SET I = I – 1
[END OF LOOP]
Step 5: SET N = N + 1
Step 6: SET A[POS] = VAL
Step 7: EXIT
```

### Deleting an Element from an Array
Deleting an element from an array means removing a data element from an already existing array. If the element has to be deleted from the end of the existing array, then the task of deletion is quite simple. We just have to subtract 1 from the *upper_bound*. The algorithm to delete an element from the end of an array is as follows

```
Step 1: SET upper_bound = upper_bound-1
Step 2: EXIT
```

For example, if we have an array that is declared as `int marks[60];` The array is declared to store the marks of all the students in the class. Now, suppose there are 54 students and the student with roll number 54 leaves the course. The score of this student was
stored in *marks[54]*. We just have to decrement the *upper_bound*. Subtracting 1 from the *upper_bound* will indicate that there are 53 valid data in the array.

However, if we have to delete an element from the middle of an array, then it is not a trivial task. On an average, we might have to move as much as half of the elements from their positions in order to occupy the space of the deleted element. For example, consider an array whose elements are arranged in ascending order. Now, suppose an element has to be deleted, probably from somewhere in the middle of the array. To do this, we must first find the location from where the element has to be deleted and then move all the elements (having a value greater than that of the element) one position towards left so that the space vacated by the deleted element can be occupied by rest of the elements.

**Algorithm to delete an element from the middle of an array** is as follows

The algorithm DELETE will be declared as `DELETE(A, N, POS)`. The arguments are:
* *A*, the array from which the element has to be
deleted
* *N*, the number of elements in the array
* *POS*, the position from which the element has to be deleted

```
Step 1: [INITIALIZATION] SET I = POS
Step 2: Repeat Steps 3 and 4 while I <= N – 1
Step 3: SET A[I] = A[I + 1]
Step 4: SET I = I + 1
[END OF LOOP]
Step 5: SET N = N – 1
Step 6: EXIT
```

### Search an Element in an Array
You can perform a search for an array element based on its value or its index. `SEARCH (ITEM)` method accepts only one argument, value. This is a non-destructive method, which means it does not affect the array values.

**Algorithm**
Consider *LA* is a linear array with *N* elements and *K* is a positive integer such that *K <= N*. Following is the algorithm to find an element with a value of *ITEM* using sequential search.
```
STEP 1: Start
STEP 2: Set J = 0
STEP 3: Repeat steps 4 and 5 while J < N
STEP 4: IF LA[J] is equal ITEM THEN GOTO STEP 6
STEP 5: Set J = J + 1
STEP 6: PRINT J, ITEM
STEP 7: Stop
```

### Update an Element in an Array
Update operation refers to updating an existing element from the array at a given index. This means will simply assign a new value at the given index. `UPDATE(K, ITEM)` method expects two arguments, index and value.

**Algorithm**
Consider *LA* is a linear array with *N* elements and *K* is a positive integer such that *K <= N*. Following is the algorithm to update an element available at the *Kth* position of *LA*.
```
STEP 1: Start
STEP 2: Set LA[K - 1] = ITEM
STEP 3: Stop
```

### Merging Two Arrays
Merging two arrays in a third array means first copying the contents of the first array into the third array and then copying the contents of the second array into the third array. Hence, the merged array contains the contents of the first array followed by the contents of the second array. If the arrays are unsorted, then merging the arrays is very simple, as one just needs to copy the contents of one array into another. But merging is not a trivial task when the two arrays are sorted and the merged array also needs to be sorted. Let us first discuss the merge operation on unsorted arrays. This operation is as follows
```
Array 1 - {90, 56, 89, 77, 69}
Array 2 - {45, 88, 76, 99, 12, 58, 81}
Array 3 - {90, 56, 89, 77, 69, 45, 88, 76, 99, 12, 58, 81}
```
If we have two sorted arrays and the resultant merged array also needs to be a sorted one, then the task of merging the arrays becomes a little difficult. The task of merging can be explained as
```
Array 1 - {20, 30, 40, 50, 60}
Array 2 - {15, 22, 31, 45, 56, 62, 78}
Array 3 - {15, 20, 22, 30, 31, 40, 45, 50, 56, 60, 62, 78}
```
This shows how the merged array is formed using two sorted arrays. Here, we first compare the 1st element of array1 with the 1st element of array2, and then put the smaller element in the merged array. Since 20 > 15, we put 15 as the first element in the merged array. We then compare the 2nd element of the second array with the 1st element of the first array. Since 20 < 22, now 20 is stored as the second element of the merged array. Next, the 2nd element of the first array is compared with the 2nd element of the second array. Since 30 > 22, we store 22 as the third element of the merged array. Now, we will compare the 2nd element of the first array with the 3rd element of the second array. Because 30 < 31, we store 30 as the 4th element of the merged array. This procedure will be repeated until elements of both the arrays are placed in the right location in the merged array.



<br>
## FAQs
[WRITE QUESTIONS HERE]




---
#### References
* http://masterraghu.com/subjects/Datastructures/ebooks/rema%20thareja.pdf
