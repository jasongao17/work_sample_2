Table of contents
=================

<!--ts-->
   * [Setup Instructions](#setup-instructions)
   * [Milestone One](#milestone-one)
      * [Project Description](#project-description)
      * [Feedback from TA
](#feedback-from-ta)
      * [Follow-up tasks](#follow-up-tasks)
   * [Milestone Two](#milestone-two)
      * [Main responsibilities](#main-responsibilities)
      * [Project Roadmap](#project-roadmap)
      * [Progress so far](#progress-so-far)
   * [Milestone Three](#milestone-three)
      * [Mockup of analysis design](#mockup-of-analysis-design)
      * [User Study notes](#user-study-notes)
      * [Changes to original analysis/visualisation design](#changes-to-original-analysisvisualisation-design)
   * [Milestone Four](#milestone-four)
      * [Status of implementation](#status-of-implementation)
      * [Final User Study](#final-user-study)
      * [Final Plans](#final-plans)
   * [Citations](#citations)
   * [Final Notes](#final-notes)
      * [Final User Study result](#final-user-study-result)
      * [Comments on the project](#comments-on-the-project)
   * [Documentation](#documentation)
      * [Introduction](#introduction)
      * [Usage](#usage)
<!--te-->


# Setup Instructions
1. Install Maven
2. Edit env.bat file to point to your JDK (preferably Java 11)
3. In backend folder, run env.bat to set the environmental variable (Path to JDK)
4. In backend folder, run mvn commands (mvn clean, mvn package, mvn spring-boot:run) to start server
5. In frontend folder, run npm install to update node modules (it may take a while)
6. In frontend folder, run npm commands (npm start) to start the server
7. To run tests, run mvn clean test

# Milestone One

## Project Description
We are planning to create a program that takes a Java program and creates a UML visualization and animation of that program (Such as class diagram and sequence diagram). The tool we design will be a static analysis of the program's code; then generating class diagram as a map for the user. User can dig into each class to see basic info and check out the sequence diagram of the methods. The visualization (User Interface) may be presented as a UML class diagram. User can click on a class to see its details and click on a method to generate a sequence diagram for that method with an animation. If there is enough time then the diagrams may be presented with a different ui such as having classes visualized as buildings; methods presented as rooms inside of its building and sequence diagram as a tiny man walking through the buildings and rooms (which indicate the classes dependency and function call).

## Feedback from TA

The TA thought our idea was great as it can be useful for users as well. Although the TA did have some question on how would be draw those seqeunce diagrams since its usually showing a high level workflow of interaction between classes so we needed to give more thoughts into how to draw the sequence diagrams. The TA also gave us another suggestion which is we can try to draw a Control-Flow diagram as well or instead of a sequence diagram if we want to analyze code in methods anyway.

## Follow-up tasks

1. Determine libraries and language to be used
2. Frontend ui and backend server setup 
3. Implementation of the tool
4. User Interface Implementation
5. Testing and deploying
6. User Study and Feedback
7. Repeat from task 3

# Milestone Two

## Main responsibilities

1. React and Java with RESTful API: Yuchen, Yihao, Zhenhuan
2. Hook up parser library to Java (Maven): Kuanmin, Haolin
3. User Study and Feedback: Kuanmin
4. Implement upload folder/file: Yuchen, Yihao, Zhenhuan
5. Implementation of the parser (First Half):  Kuanmin, Haolin

## Project Roadmap

- (Nov 8-9th) Frontend ui and backend server setup (React and Java with RESTful API)
- (Nov 7-8th) Hook up parser library to Java (Maven)
- (Nov 8th) User Study and Feedback
- (Nov 15th) Implement upload folder/file in front in and pass data to backend
- Optional - if front end pass Zip file then implement unzip in back end (Nov 19th)
- (Nov 14th) Implementation of the parser (Retrieve relevant data for Class diagram and pass to front end)
- (Nov 19-20th) User Interface Implementation (Take data to generate Class diagrams)
- (Nov 27th) Implementation of the parser 2 (Retrieve relevant data for sequence diagram and pass to front end)
- (Nov 27th) User Interface Implementation 2 (Add workflow to generate Sequence diagram)
- Optional - UI visualization change to cities and room
- (Nov 28th) Testing and deploying
- (Nov 28th) Final User Study and Feedback
- (Nov 29th) Video done


## Progress so far

1. Finalized plans on how the program workflow will work and what UI to generate and how
2. Determined libraries and language to be used.

# Milestone Three

## Mockup of analysis design

Essentially the language will allow users to upload a folder containing a set of java files and generate a UML class diagram containing information such as the relationship between classes, the attributes in the classes and the methods in the classes. The user will also be able click on an individual method in the class and a UML sequence diagram will be generated for the specific method.

### Back-end

The back-end will be using maven with spring boot and rest controller for server setup and RESTful API to communicate with front-end. The library Java Parser will be used to do analysis on the classes.

### Front-end

The front-end will allow user to upload folder and generate class/sequence diagrams based on the classes in the folder. Current UI decision is to keep it formal and show the actual class/sequence diagram as it can be beneficial for people who want to learn about these diagrams as well. 

## User Study notes

The user has some knowledge in programming and some knowledge in class/sequence diagrams. The user was given a brief description on what the program is meant to do, we then showed a picture of a class diagram and sequence diagram and explain what they are and how they will interact in our program.

The user thought it was a good program for learning purposes and liked the idea of keeping it simple and formal. 

Although the user did have a suggestion. The previous design was that the class diagram will only show methods of the class since our main focus is on the sequence diagrams and the class diagram is mainly there to organize the methods into classes. However, the user suggests that we might as well also provide attributes of the class such as public, private and protected fields since we are already creating the class diagram we should also provide as much details as possible while keeping it simple, so providing class fields would sill keep the diagrams simple but more informative as well which faciliates better learning.

Overall the user was satisfied and can see themselves using it as well.

## Changes to original analysis/visualisation design

We will be following the suggestion from the user study which is to make class diagram more informative by adding private, public and protected fields. 

# Milestone Four

## Status of implementation

### Back-end

The backend has implemented the ability to retrieve the necessary data to send to front-end, still need some final touches of data retrival and currently working on creating a JSON format to send data back to front-end correctly.

### Front-end

The front-end has implemented the UI for file upload and is now implementing the UI for creating class/sequence diagrams with sample JSON data.

We are also hooking up the backend with frontend now.

## Final User Study

The plan for our final user study is similar to the previous one. User should have knowledge of basic programming and at least know what class and sequence diagrams are.

We will give the user a brief description of what our program does then ask the user to try and use it themselves with sample projects or projects they have written themselves. Afterwards we will ask some questions to the user to access user satisfication and usability. Finally we will ask if the user has any feedback to give.

## Final Plans

- (Nov 24th) Hookup front-end with back-end
- (Nov 27th) Finish back-end implementation (Finish data retrival, JSON format to send to fron-end with RESTful API)
- (Nov 28th) Finish User Interface implementation
- (Nov 28th) Final User Study and Feedback
- (Nov 29th) Video done

# Citations

- Project structure is based on: https://www.springboottutorial.com/spring-boot-react-full-stack-crud-maven-application
- Frontend graph generation library: https://mermaid-js.github.io/mermaid/#/
- Backend parser library: https://www.javadoc.io/doc/com.github.javaparser/javaparser-core

# Final Notes

## Final User Study result

The user had little knowledge on class diagram and sequence diagram.

### Steps taken: 
1. We gave the user a background of our project and show a workflow on how to generate the class and sequence diagram.
2. We let the user to try the program themselvs with their own project 
3. We asked questions on usability and usefulness
4. We asked for feedback and improvements

### Result
- The user was able to understand how to use the program easily
- The user had suggestion on UI improvement such as improving zoom functionality since the picture produced at the start is very small
- Overall user study and feedback was positive as it was easy to use, useful and the user would be able to use this on their own projects for presentation or for education

## Comments on the project

Our program has substantial program analysis to be able to read java projects and figure out how to generate class diagrams as well as complex sequence diagrams. (i.e. retriving correct data for class diagram and recursively analysing statements in multiple methods to keep relevent data needed to generate the full sequence diagram)
Our program applies to a real-world programming language (i.e. Java)
Our program includes a substantial visualisation component. (i.e having a UI to show formal class diagrams and adding an interactive componenet to allow users to generate formal sequence diagrams they want to see)

### Negative points/Limitations:
- Currently for class diagram generation we do not support handling classes with inner classes, thus users will have to do a work around by extrating the inner class out.
- For sequence diagram generation, we do not support handling circular recurisve method calls. For example, if function A calls function B in one of its lines and function B calls function A in one its lines then our program will not be able to present the sequence diagram.
- For sequence diagram generation, we do not support handling overloaded methods as current implementation uses method name to retrieve the appropriate sequence diagram.

### Improvements:

#### Backend
- Add support for the limitations stated above
- Add functionality to generate other UML diagrams such as control flow diagrams
- General code clean up and refactoring

#### UI
- Improve zooming experience of the picture since for large projects the starting diagram generated is very small and users have to zoom in to see everything clearly

# Documentation

## Introduction

![](DlUdycorjH.gif)

This program analysis app is meant to be an tool that can help users facilitate their learning of UML class diagrams and UML sequence diagrams, or for users who want to present a UML diagram for their project but doesn't want to waste time drawing all the diagrams themselvs or just for users who want to get a general idea on the project structure and workflows for a specific project. 

The program currently only support Java projects.

For the Java projects, we support class/abstract/interface type, private/public/protected type, type parameters for classes and loops, if, if/else, recursion for sequence diagrams.

## Usage

Follow the setup instructions to start the frontend and backend server then go to http://localhost:3000/ to access the webpage. Once you are there you can just click upload and select a zip file representing the project to see the class diagram and sequence diagram.

To zoom in the class digram you can use the mouse wheel to scroll in or double click on the screen. 

### Considerations

Because there are so many ways to code in java that essentially does the same things, our program cannot account for all possible cases of java projects. 

In general if users encountered an error or have an inaccurate graph, users should:
1. Make sure their code follows the standard java coding conventions
2. Try to not have long and complicated statements in 1 line and separate it into different lines instead 
3. Make sure their project compiles
