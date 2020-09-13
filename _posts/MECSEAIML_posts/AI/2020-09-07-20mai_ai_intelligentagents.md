---
layout: post
type: "MECSEAIML"
subject: "AI"
section: "Unit 1: Introduction to AI and Problem Solving"
title:  "2. Intelligent Agents"
author: Jitender Singh Virk
---


Artificial intelligence is defined as a study of rational agents. A rational agent could be anything which makes decisions, as a person, firm, machine, or software. It carries out an action with the best outcome after considering past and current percepts (agent’s perceptual inputs at a given instance).

An AI system is composed of an agent and its environment. The agents act in their environment. The environment may contain other agents. An agent is anything that can be viewed as :
* perceiving its environment through sensors and
* acting upon that environment through actuators

Note : Every agent can perceive its own actions (but not always the effects)

In other words, an *agent* is anything that can be viewed as perceiving its *environment* through *sensors* and acting upon that environment through *actuators*. This simple idea is illustrated in the below figure. A human agent has eyes, ears, and other organs for sensors and hands, legs, vocal tract, and so on for actuators. A robotic agent might have cameras and infrared range finders for sensors and various motors for actuators. A software agent receives keystrokes, file contents, and network packets as sensory inputs and acts on the environment by displaying on the screen, writing files, and sending network packets.

<img src="/assets/20MAI/AI/agent.png" class="rounded mx-auto d-block" alt="Scientific Method image" style="max-width: 97%; max-height: 25rem;">

We use the term **percept** to refer to the agent’s perceptual inputs at any given instant. An agent’s **percept sequence** is the complete history of everything the agent has ever perceived. In general, *an agent’s choice of action at any given instant can depend on the entire percept sequence observed to date, but not on anything it hasn’t perceived*. By specifying the agent’s choice of action for every possible percept sequence, we have said more or less everything there is to say about the agent. Mathematically speaking, we say that an agent’s behavior is described by the **agent function** that maps any given percept sequence to an action.

We can imagine *tabulating* the agent function that describes any given agent; for most agents, this would be a very large table — infinite, in fact, unless we place a bound on the length of percept sequences we want to consider. Given an agent to experiment with, we can, in principle, construct this table by trying out all possible percept sequences and recording which actions the agent does in response. 1 The table is, of course, an *external* characterization of the agent. *Internally*, the agent function for an artificial agent will be implemented by an **agent program**. It is important to keep these two ideas distinct. *The agent function is an abstract mathematical description; the agent program is a concrete implementation, running
within some physical system.*

To understand the structure of *Intelligent Agents*, we should be familiar with *Architecture and Agent Program*. Architecture is the machinery that the agent executes on. It is a device with sensors and actuators, for example : a robotic car, a camera, a PC, etc. As we discussed earlier, agent program is an implementation of an agent function. An agent function is a map from the percept sequence (history of all that an agent has perceived till date) to an action.

***Agent = Architecture + Agent Program***

***Examples of Agent***:
* A *software agent* has Keystrokes, file contents, received network packages which act as sensors and displays on the screen, files, sent network packets acting as actuators.
* A *Human agent* has eyes, ears, and other organs which act as sensors and hands, legs, mouth, and other body parts acting as actuators.
* A *Robotic agent* has Cameras and infrared range finders which act as sensors and various motors acting as actuators.

## The concept of Rationality
A rational agent is one that does the right thing—conceptually speaking, every entry in the table for the agent function is filled out correctly. Obviously, doing the right thing is better than doing the wrong thing, but what does it mean to do the right thing?

We answer this age-old question in an age-old way: by considering the consequences of the agent’s behavior. When an agent is plunked down in an environment, it generates a sequence of actions according to the percepts it receives. This sequence of actions causes the environment to go through a sequence of states. If the sequence is desirable, then the agent has performed well. This notion of desirability is captured by a performance measure that evaluates any given sequence of environment states. Notice that we said *environment states, not agent states*. If we define success in terms of agent’s opinion of its own performance, an agent could achieve perfect rationality simply by deluding itself that its performance was perfect. Human agents in particular are notorious for “sour grapes”—believing they did not really want something (e.g., a Nobel Prize) after not getting it.

*As a general rule, it is better to design performance measures according to what one actually wants in the environment, rather than according to how one thinks the agent should behave.*

What is rational at any given time depends on four things:
* The performance measure that defines the criterion of success.
* The agent’s prior knowledge of the environment.
* The actions that the agent can perform.
* The agent’s percept sequence to date.

This leads to a definition of a rational agent:
*For each possible percept sequence, a rational agent should select an action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and whatever built-in knowledge the agent has.*


## The Nature of Environments
Now that we have a definition of rationality, we are almost ready to think about building rational agents. First, however, we must think about **task environments**, which are essentially the ***problems*** to which rational agents are the ***solutions***. The flavor of the task environment directly affects the appropriate design for the agent program.

We group the performance measure, the environment, and the agent’s actuators and sensors under the heading of the task environment. we call this the **PEAS** (Performance, Environment, Actuators, Sensors) description. In designing an agent, the first step must always be to specify the task environment as fully as possible.

Let's take the example of an automated taxi driver. Below table summarizes the PEAS description for the taxi’s task environment.






<br>
<br>
## Agents and environments, concept of rationality, nature of environments, structure of agents

## Write these applications: Computer Vision, LP, Semantic web intelligence





---
## FAQs
[WRITE QUESTIONS HERE]

---
##### References
* Book - Artificial Intelligence: A Modern Approach, third edition, Stuart Russell and Peter Norvig, Chapter 2.
