---
layout: post
title:  "Artificial Intelligence Search Algorithms Interactive Web App"
type: "Projects"
author: Jitender Singh Virk
---

## Abstract
The article describes an interactive web app that demonstrates the working of four uninformed problem-solving algorithms: breadth first search, depth first search, depth limited search, and iterative deepening depth first search. The example state space is the simplified map of Romania, a southeastern European country. Each node in the state space represents a city of Romania. The web app also provides run-time resources stats such as number of nodes in the queue, path elements, path cost. The purpose of this demonstration is to visualize the working of uninformed problem-solving algorithms. The web app is available [here](https://aiuninformedsearchalgos.pythonanywhere.com) and the code is available [here](https://github.com/VirkSaab/ai_uninformed_search_algorithms_interactive_webapp)

## Introduction
A problem-solving agent is one kind of goal-based agent. As stated by Russell and Norvig~\cite{aibook}, problem-solving algorithms work without any information about the state space. The only information available is the problem statement. These algorithms treat the states of the world as wholes, provided with no internal structure information. Goals are helpful to achieve an objective by considering necessary actions towards the target. Therefore, the first step in problem-solving is goal formulation based on the current state and performance measures. After goal formulation, the problem formulation process is considered. Problem formulation process decides the actions and states to act upon, given a goal. Sometimes the information is not provided for the given problem statement. The agent has to search the state space on its own. The algorithms used for these kinds of problems are known as uninformed search algorithms. In other words, uninformed search algorithms are the one with no given information about the problem other than its definition. 

This article explains the interactive web app's working and an interface that demonstrates how uninformed search algorithms work. This system is equipped with four fundamental uninformed search algorithms: breadth first search, depth first search, depth limited search, and iterative deepening depth first search. This article also explains the theoretical aspect of the algorithms mentioned above. 

## Infrastructure for search algorithms
Search algorithms require a data structure to keep track of the path from the initial state to the goal state. The data structure for each node of the state space used in the proposed system is based on four components described in~\cite{aibook}. These components are

* State: the state in the state space to which the node corresponds;
* Parent: The parent of the current state.
* Action: The action taken on the parent node to generate the current state.
* Path Cost g(n): The cost of the path from the initial state to the current state.

There are two ways to implement the underneath search tree: tree-based search and graph-based search. The proposed system uses a graph-based search. The advantages of graph-based over tree-based are
* it uses *explored* set which records the explored states while traversing the state space. It avoids redundant paths by allowing each state to be explored only once.
* The state space can be distinguished into explored space and unexplored space using explored and frontier. With this, we can verify that the algorithms are running systematically and exploring states one by one until they find a solution.

## Uninformed Search Algorithms
Uninformed search is also known as blind search. As stated earlier, no information related to states and state-space, other than problem statement, is given to uninformed search algorithms. These algorithms work by traversing the search tree in a specific manner and distinguishing the goal state from non-goal states. The search is initialized from a particular state, also known as the initial state. A record of the parsed search tree is kept to determine the optimal path from the initial state to the goal state. These search algorithms' motive is to find an optimal path from an initial state to goal state that takes minimum time and space. As suggested by~\cite{aibook}, the performance of these algorithms can be evaluated by four measures:

* Completeness: A solution is guaranteed, if exists.
* Optimality: The solution provided by the algorithm is optimal or not.
* Time complexity: Time taken by the algorithm.
* Space complexity: Memory used by the algorithm to perform the search.

The proposed system demonstrates four uninformed search algorithms - breadth first search, depth first search, depth limited search, and iterative deepening depth first search. 
### Breadth First Search (BFS)
BFS is an instance of the general graph-search algorithm. Starting from the root node, it expands all successors of the root node. In other words, BFS expands all nodes at one depth level then move to the next depth level and so on. This approach is easy to implement using a First-In-First-Out (FIFO) queue for the frontier. The performance measures for BFS are given in the Table~\ref{pmtab}.
### Depth First Search (DFS)
As the name suggests, DFS always expands depth-wise, which means that after expanding the current node, it will expand the first successor next then the first successor of this node and so on. In other words, it explores the deepest nodes first. The only difference between BFS and DFS is that the DFS uses Last-In-First-Out (LIFO). LIFO is also known as *stack*. The performance measures are given in the Table~\ref{pmtab}.
### Depth Limited Search (DLS)
DLS is a solution to the infinite-depth problem of DFS. DLS works by limiting the depth of the search with a predetermined depth limit of *L*. That is, nodes at the depth *L* are treated as leaf nodes. Unfortunately, it also adds an additional source of incompleteness if the goal state is beyond the limit *L*, even just after the limit. However, carefully choosing the value of *L* according to the problem can avoid this issue. We can also say that DLS is a special case of DFS with *L = ∞*. The performance measures are given in the Table~\ref{pmtab}. DLS can terminate in two ways - standard *failure* with no solution and *cutoff* with no solution within depth limit *L*. 
### Iterative Deepening Depth First Search (ID-DFS)
ID or ID-DFS is yet another solution to the infinite-depth problem of DFS. This algorithm also solves the DLS depth limit *L* problem if the depth limit is not determinable from the problem statement or the given knowledge about the problem. It solves the depth limit *L* problem by gradually increasing the limit, i.e. first *L = 0*, then 1, then 2, and so on, until goal state is reached, if exists. This algorithm combines the benefits of both BFS and DFS. It is complete and optimal like BFS, and its memory requirements are modest like DFS. The performance measures are given in the Table~\ref{pmtab}. ID-DFS might seems wasteful because of the repeated generation of search tree with each iteration. It turns out that this process is not too expensive. 

## Interface
The web app interface layout is depicted in Figure~\ref{mainfig}. The base is built using the Flask~\cite{flaskref} which is a lightweight Web Server Gateway Interface (WSGI) web application framework built on Python~\cite{pythonref} programming language. All algorithms are written in JavaScript~\cite{jsref} programming language. The web page layout is based on HTML5, CSS3, and Bootstrap4.

As depicted in Figure~\ref{mainfig}, there are three dropdown lists on the top of the interface. These are:

* Algorithm: to select an algorithm to run.
* Initial State: to choose one of the node from the given state space as a starting point of the search.
* Goal State: to select the target or goal node.


Next is the *Animation Delay* box. User can change the time delay of animation, i.e. animation of taking action from one node to the nearest neighbour node. The value is in seconds. The minimum value to update the new action is zero seconds, i.e. without any delay and the maximum value is two seconds.

There are three buttons on the top right side, as depicted in Figure~\ref{mainfig} to control the visualization. The use of *RESET* button is to reset state-space after any completed or stopped search. *STOP* button stops the running search. *RUN* button is to start the search.

The main visualization component is the *State Space* area. The network of the nodes or the search environment is based on the Network graph API of Highcharts~\cite{hcref}. Highcharts are interactive JavaScript charts for web pages. The user can see the path cost information from this node to the immediate neighbour nodes on hovering on to any node. In this paper, nodes and states are the same thing and used interchangeably. The given state space is the simplified map of Romania, a southeastern European country. Each light blue node represents Romania's city, and the edge between two cities represents the path or the road connecting them. The *path cost* is the approximate distance from one city to another. The goal is to find an optimal path, in which the total path cost is minimum, from one city to another. The red path from the initial state (red circle) to goal state (green circle) is the algorithm's recorded path. This red path will appear when the search is complete, and a solution is found. The system uses parent node backtracking from goal state to the initial state to get the path after the goal is reached.

On the left side of the interface, the *Network Information* group represents the color of states which are:

* Initial State (red color): As shown in the Figure~\ref{mainfig}, in State Space, the big red circle marks the initial state.
* Goal State (green color): As shown in the Figure~\ref{mainfig}, in State Space, the big green circle marks the goal state.
* Explored State (orange color): As shown in the Figure~\ref{mainfig}, in State Space, there are multiple orange nodes. It means that the algorithm has traversed these nodes, and they are currently in the explored set.
* Current State (blue color): This represents the current state of the algorithm which is visible at the runtime only.


Next is the *Runtime Information* group which displays useful information about memory usage and total path cost.
* number of nodes in the frontier: The number of nodes pushed in the frontier.
* number of explored nodes: The set of explored nodes.
* Path elements: Number of nodes in between the path from the initial state to the goal state, including initial and goal node.
* Total enqueue: Total number of enqueues used by the frontier to add successors of explored nodes.
* Path cost: Total path cost from the initial state to the current state. It will update as search moves forward. When the goal node is reached, the path cost will be the total path cost from the initial state to the goal state.

Finally, When the goal is reached, a green rectangular box with text "Goal reached!" will appear. If there is no solution, then the system will display a *failure* pop up alert. Note that, in DLS, if *cutoff* occurs then the corresponding alert pop up will be displayed.

## Conclusion and Future Work
In conclusion, this paper demonstrates the interactive web app interface of uninformed search algorithms in Artificial Intelligence. This web app's main purpose is to explain and understand how the uninformed search algorithms look in the state space step-by-step. It will help to understand how these different algorithms find their paths in the state-space. The state-space used in this visualization is Romania's map, a southeastern European country where each node is a city of Romania.

In future, the expected goals are to extend this system to include more state spaces with a choice to select from multiple state spaces, in addition to more uninformed search algorithms. Further, I believe this system can be extended to include informed search algorithms in future.


### References:
1. aibook: Russell, Stuart J. (Stuart Jonathan). Artificial Intelligence : a Modern Approach. Upper Saddle River, N.J. :Prentice Hall, 2010. 
2. hcref: [Highcharts](https://www.highcharts.com/)