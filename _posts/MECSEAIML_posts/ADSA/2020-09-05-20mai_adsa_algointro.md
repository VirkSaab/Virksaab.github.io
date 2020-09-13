---
layout: post
type: "MECSEAIML"
subject: "ADSA"
section: "Unit 1: Introduction, Linear, Non-Linear, and Advanced Data Structures"
title:  "2. Introduction to Algorithms"
author: Jitender Singh Virk
---

Algorithm is a step-by-step procedure, which defines a set of instructions to be executed in a certain order to get the desired output. Algorithms are generally created independent of underlying languages, i.e. an algorithm can be implemented in more than one programming language. It can be represented either as an informal description using a Flowchart or Pseudo code.

From the data structure point of view, following are some important categories of algorithms

* **Search**: Algorithm to search an item in a data structure.
* **Sort**: Algorithm to sort items in a certain order.
* **Insert**: Algorithm to insert item in a data structure.
* **Update**: Algorithm to update an existing item in a data structure.
* **Delete**: Algorithm to delete an existing item from a data structure.

The performance of algorithm is measured on the basis of following properties:
* **Time complexity**: It is a way of representing the amount of time needed by a program to run to the completion.
* **Space complexity**: It is the amount of memory space required by an algorithm, during a course of its execution.

Each algorithm must have:
* **Specification**: Description of the computational procedure.
* **Pre-conditions**: The condition(s) on input.
* **Body of the Algorithm**: A sequence of clear and unambiguous instructions.
* **Post-conditions**: The condition(s) on output.

## Characteristics of an Algorithm
Not all procedures can be called an algorithm. An algorithm should have the following characteristics −
* **Unambiguous**: Algorithm should be clear and unambiguous. Each of its steps (or phases), and their inputs/outputs should be clear and must lead to only one meaning.
* **Input**: An algorithm should have 0 or more well-defined inputs.
* **Output**: An algorithm should have 1 or more well-defined outputs, and should match the desired output.
* **Finiteness**: Algorithms must terminate after a finite number of steps.
* **Feasibility**: Should be feasible with the available resources.
* **Independent**: An algorithm should have step-by-step directions, which should be independent of any programming code.

## How to Write an Algorithm?
There are no well-defined standards for writing algorithms. Rather, it is problem and resource dependent. Algorithms are never written to support a particular programming code. As we know that all programming languages share basic code constructs like loops (do, for, while), flow-control (if-else), etc. These common constructs can be used to write an algorithm. We write algorithms in a step-by-step manner, but it is not always the case. Algorithm writing is a process and is executed after the problem domain is well-defined. That is, we should know the problem domain, for which we are designing a solution.
Example

Let's try to learn algorithm-writing by using an example.

**Problem** − Design an algorithm to add two numbers and display the result.

    Step 1 − START
    Step 2 − declare three integers a, b & c
    Step 3 − define values of a & b
    Step 4 − add values of a & b
    Step 5 − store output of step 4 to c
    Step 6 − print c
    Step 7 − STOP

Algorithms tell the programmers how to code the program. Alternatively, the algorithm can be written as −

    Step 1 − START ADD
    Step 2 − get values of a & b
    Step 3 − c ← a + b
    Step 4 − display c
    Step 5 − STOP

In design and analysis of algorithms, usually the second method is used to describe an algorithm. It makes it easy for the analyst to analyze the algorithm ignoring all unwanted definitions. He can observe what operations are being used and how the process is flowing.
We design an algorithm to get a solution of a given problem. A problem can be solved in more than one ways.
Hence, many solution algorithms can be derived for a given problem. The next step is to analyze those proposed solution algorithms and implement the best suitable solution.

## Algorithm Complexity
Suppose X is an algorithm and n is the size of input data, the time and space used by the algorithm X are the two main factors, which decide the efficiency of X.
* **Time Factor** − Time is measured by counting the number of key operations such as comparisons in the sorting algorithm. It is also known as **time complexity**.
* **Space Factor** − Space is measured by counting the maximum memory space required by the algorithm. It is also known as **space complexity**.
The complexity of an algorithm f(n) gives the running time and/or the storage space required by the algorithm in terms of n as the size of input data.


## Algorithm Analysis
Efficiency of an algorithm can be analyzed at two different stages, before implementation and after implementation. They are the following −
* __A *Priori* Analysis__ − This is a theoretical analysis of an algorithm. Efficiency of an algorithm is measured by assuming that all other factors, for example, processor speed, are constant and have no effect on the implementation.
* __A *Posterior* Analysis__ − This is an empirical analysis of an algorithm. The selected algorithm is implemented using programming language. This is then executed on target computer machine. In this analysis, actual statistics like running time and space required, are collected.

We shall learn about a priori algorithm analysis. Algorithm analysis deals with the execution or running time of various operations involved. The running time of an operation can be defined as the number of computer instructions executed per operation.

In theoretical analysis of algorithms, it is common to estimate their complexity in the asymptotic sense, i.e., to estimate the complexity function for arbitrarily large input. The term "analysis of algorithms" was coined by Donald Knuth. Algorithm analysis is an important part of computational complexity theory, which provides theoretical estimation for the required resources of an algorithm to solve a specific computational problem. Most algorithms are designed to work with inputs of arbitrary length. Analysis of algorithms is the determination of the amount of time and space resources required to execute it. Usually, the efficiency or running time of an algorithm is stated as a function relating the input length to the number of steps, known as time complexity, or volume of memory, known as space complexity.

#### Difference between A Posteriori analysis and A Priori analysis
<table class="table table-bordered">
<thead>
  <tr>
    <th class="tg-0pky">Posteriori Analysis</th>
    <th class="tg-0pky">Priori Analysis</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-0pky">Posteriori analysis is a relative analysis.</td>
    <td class="tg-0pky">Priori analysis is a absolute analysis</td>
  </tr>
  <tr>
    <td class="tg-0pky">It is dependent on language of compiler and type of hardware.</td>
    <td class="tg-0pky">It is independent of language of compiler and type of hardware.</td>
  </tr>
  <tr>
    <td class="tg-0pky">It provides exact answer.</td>
    <td class="tg-0pky">It provides approximate answer.</td>
  </tr>
  <tr>
    <td class="tg-0pky">It does not use asymptotic notations to represent the time complexity of an algorithm.</td>
    <td class="tg-0pky">It uses the asymptotic notations to represent how much time the algorithm will take in order to complete its execution.</td>
  </tr>
  <tr>
    <td class="tg-0pky">The execution time varies from system to system.</td>
    <td class="tg-0pky">Time complexity is same for every system.</td>
  </tr>
  <tr>
    <td class="tg-0lax">If the time taken by the algorithm is less, then the credit will go to the complier and hardware.</td>
    <td class="tg-0lax">If the program takes less time, credit goes to the algorithm designer.</td>
  </tr>
</tbody>
</table>


## The Need for Analysis
Algorithms are often quite different from one another, though the objective of these algorithms are the same. For example, we know that a set of numbers can be sorted using different algorithms. Number of comparisons performed by one algorithm may vary with others for the same input. Hence, time complexity of those algorithms may differ. At the same time, we need to calculate the memory space required by each algorithm.

Analysis of algorithm is the process of analyzing the problem-solving capability of the algorithm in terms of the time and size required (the size of memory for storage while implementation). However, the main concern of analysis of algorithms is the required time or performance. Generally, we perform the following types of analysis −
* **Worst-case**: The maximum number of steps taken on any instance of size a.
* **Best-case**: The minimum number of steps taken on any instance of size a.
* **Average case**: An average number of steps taken on any instance of size a.
* **Amortized**: A sequence of operations applied to the input of size a averaged over time.

To solve a problem, we need to consider time as well as space complexity as the program may run on a system where memory is limited but adequate space is available or may be vice-versa. In this context, if we compare bubble sort and merge sort. Bubble sort does not require additional memory, but merge sort requires additional space. Though time complexity of bubble sort is higher compared to merge sort, we may need to apply bubble sort if the program needs to run in an environment, where memory is very limited.


## Time and Space Analysis of Algorithms
### Time complexity
Time Complexity of an algorithm is the representation of the amount of time required by the algorithm to execute to completion. Time requirements can be denoted or defined as a numerical function _t(N)_, where _t(N)_ can be measured as the number of steps, provided each step takes constant time. For example, in case of addition of two _n_-bit integers, _N_ steps are taken. Consequently, the total computational time is *t(N) = c*n*, where _c_ is the time consumed for addition of two bits. Here, we observe that _t(N)_ grows linearly as input size increases.

### Space complexity
Space complexity of an algorithm represents the amount of memory space needed the algorithm in its life cycle. Space needed by an algorithm is equal to the sum of the following two components:
* A fixed part that is a space required to store certain data and variables (i.e. simple variables and constants, program size etc.), that are not dependent of the size of the problem.
* A variable part is a space required by variables, whose size is totally dependent on the size of the problem. For example, recursion stack space, dynamic memory allocation etc.

Space complexity _S(p)_ of any algorithm _p_ is _S(p) = A + Sp(I)_. Where _A_ is treated as the fixed part and _S(I)_ is treated as the variable part of the algorithm which depends on instance characteristic I. Following is a simple example that tries to explain the concept:

**SUM(P, Q)**

    Step 1 - START
    Step 2 - R ← P + Q + 10
    Step 3 - Stop

Here we have three variables P, Q and R and one constant. Hence S(p) = 1 + 3. i.e. *fixed space* + *variable space*. Now space is dependent on data types of given constant types and variables and it will be multiplied accordingly.

## Asymptotic Analysis
Asymptotic analysis of an algorithm refers to defining the mathematical boundation/framing of its run-time performance. Using asymptotic analysis, we can very well conclude the best case, average case, and worst case scenario of an algorithm. Asymptotic analysis is input bound i.e., if there's no input to the algorithm, it is concluded to work in a constant time. Other than the "input" all other factors are considered constant.

Using asymptotic analysis, we can get an idea about the performance of the algorithm based on the input size. We should not calculate the exact running time, but we should find the relation between the running time and the input size. We should follow the running time when the size of the input is increased. For the space complexity, our goal is to get the relation or function that how much space in the main memory is occupied to complete the algorithm.

For a function _f(n)_, the **asymptotic behavior** is the growth of _f(n)_ as _n_ gets large. Small input values are not considered. Our task is to find how much time it will take for a large value of the input. For example, _f(n) = c * n + k_ as linear time complexity. _f(n) = c *(n*n) + k_ is quadratic time complexity.

The analysis of algorithms can be divided into three different cases. The cases are as follows:
* **Best Case**: Here the lower bound of the running time is calculated. It describes the behavior of an algorithm under optimal conditions.
* **Average Case**: In this case, we calculate the region between the upper and lower bound of the running time of algorithms. In this case, the number of executed operations are not minimum and not maximum.
* **Worst Case**: In this case we calculate the upper bound of the running time of algorithms. In this case, a maximum number of operations are executed.

<img src="/assets/20MAI/ADSA/bigochart.jpeg" class="rounded mx-auto d-block" alt="Big-o time complexity chart" style="max-width: 95%; max-height: 40rem;">

#### Does Asymptotic Analysis always work?
Asymptotic Analysis is not perfect, but that’s the best way available for analyzing algorithms. For example, say there are two sorting algorithms that take 1000nLogn and 2nLogn time respectively on a machine. Both of these algorithms are asymptotically same (order of growth is nLogn). So, With Asymptotic Analysis, we can’t judge which one is better as we ignore constants in Asymptotic Analysis.
Also, in Asymptotic analysis, we always talk about input sizes larger than a constant value. It might be possible that those large inputs are never given to your software and an algorithm which is asymptotically slower, always performs better for your particular situation. So, you may end up choosing an algorithm that is Asymptotically slower but faster for your software.

## Asymptotic Notations
Asymptotic notations are used to represent the complexities of algorithms for asymptotic analysis. These notations are mathematical tools to represent the complexities. There are three notations that are commonly used.

### O (Big Oh) Notation
The notation Ο(n) is the formal way to express the upper bound of an algorithm's running time. It measures the worst case time complexity or the longest amount of time an algorithm can possibly take to complete.

<img src="/assets/20MAI/ADSA/big_oh_notation.jpg" class="rounded mx-auto d-block" alt="big_oh_notation" style="max-width: 95%; max-height: 20rem;">

For example, Big-Oh (O) notation gives an upper bound for a function f(n) to within a constant factor. We write  O(g(n)) = { f(n) : There exist positive constant c and n<sub>0</sub> such that 0 ≤ f(n) ≤ c * g(n), for all n ≥ n<sub>0</sub>}

### Ω (Omega) Notation
The notation Ω(n) is the formal way to express the lower bound of an algorithm's running time. It measures the best case time complexity or the best amount of time an algorithm can possibly take to complete.

<img src="/assets/20MAI/ADSA/big_omega_notation.jpg" class="rounded mx-auto d-block" alt="big_oh_notation" style="max-width: 95%; max-height: 20rem;">

Big-Omega (Ω) notation gives a lower bound for a function f(n) to within a constant factor. We write Ω(g(n)) = { f(n) : There exist positive constant c and n<sub>0</sub> such that 0 ≤ c g(n) ≤ f(n), for all n ≥ n<sub>0</sub>}

### θ (Theta) Notation
The notation θ(n) is the formal way to express both the lower bound and the upper bound of an algorithm's running time. It measures the average case complexity.

<img src="/assets/20MAI/ADSA/big_theta_notation.jpg" class="rounded mx-auto d-block" alt="big_oh_notation" style="max-width: 95%; max-height: 20rem;">

Big-Theta (Θ) notation gives bound for a function f(n) to within a constant factor. We write Θ(g(n)) = {f(n) : There exist positive constant c1, c2 and n<sub>0</sub> such that 0 ≤ c1 g(n) ≤ f(n) ≤ c2 g(n), for all n ≥ n<sub>0</sub>}

### Common Asymptotic Notations
<table class="table table-bordered">
<thead>
  <tr>
    <th class="tg-0lax">Function</th>
    <th class="tg-0lax">O complexity</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td class="tg-9wq8">constant</td>
    <td class="tg-nrix">Ο(1)</td>
  </tr>
  <tr>
    <td class="tg-9wq8">logarithmic</td>
    <td class="tg-nrix">Ο(log n)</td>
  </tr>
  <tr>
    <td class="tg-9wq8">linear</td>
    <td class="tg-nrix">Ο(n)</td>
  </tr>
  <tr>
    <td class="tg-9wq8">n log n</td>
    <td class="tg-nrix">Ο(n log n)</td>
  </tr>
  <tr>
    <td class="tg-9wq8">quadratic</td>
    <td class="tg-nrix">Ο(n<sup>2</sup>)</td>
  </tr>
  <tr>
    <td class="tg-9wq8">cubic</td>
    <td class="tg-nrix">Ο(n<sup>3</sup>)</td>
  </tr>
  <tr>
    <td class="tg-nrix">polynomial</td>
    <td class="tg-nrix">n<sup>Ο(1)</sup></td>
  </tr>
  <tr>
    <td class="tg-nrix">exponential</td>
    <td class="tg-nrix">2<sup>Ο(n)</sup></td>
  </tr>
</tbody>
</table>

<br>
## FAQs
[WRITE QUESTIONS HERE]

---
#### References
* [Overview](https://www.tutorialspoint.com/data_structures_algorithms/algorithms_basics.htm)
* [Asymptotic Analysis 1](https://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm), [Asymptotic Analysis 2](https://www.tutorialspoint.com/Asymptotic-Analysis)
* [Does Asymptotic Analysis always work?](https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/)
* [Asymptotic Notations 1](https://www.tutorialspoint.com/Asymptotic-Notations), [Asymptotic Notations 2](https://www.tutorialspoint.com/data_structures_algorithms/asymptotic_analysis.htm)
