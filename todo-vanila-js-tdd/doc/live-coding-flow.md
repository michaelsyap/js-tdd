TDD Todo App:

Objective:

Create unit tests for the controller units.

Part 1:

- Displaying todo items
- Filtering todo items via
- Creating a new todo item

Part 1 use cases:

Reading todo items:

- On app load, if there are no todo items in the storage, display no todo items
- On app load, if there are todo items in the storage, display the todo items
- On app load, if the URL has no hash, display all todo items
- On app load, if the URL has #pending, display only todo items with status:'pending'
- On app load, if the URL has #done, display only todo items with status:'done'


Creating todo item:

- When the user
  - Finishes entering the todo item in the form,
  - Save the new todo item to the storage
  - Clear the todo item form
  - Display the new todo item in the todo items list


Part 2:

- Updating & deleting todo item

Prerequisites:

1. Markup

In doing TDD for front-end development, the layout development comes first. As we mentioned, in TDD, write the test first, then write the code that passes the test. In this case, we cannot write tests first for the layout since this is visual. In this case, this is an exception.

In doing TDD for front-end development, the test first applies to the code which handles the logic behind the behavior the elements that the users see on screen.

2. JS Storage & model (Go through the model & storage tests)

In this session, since we already created tests for this during our last session, we'll go through the finished product.


3. JS Template

In this session we have a code that is pre-defined, ready for integration to our todo app. Let's think of this part as a 3rd party library that's responsible to render html content mixed with the data that we want to print. This is something like template engines or JSX in react.


4. Jasmine standalone


Live coding session flow:

TDD sequence in CRUD apps:

1. Read
1. Create
1. Update
1. Delete




Things to remember in unit testing:

1. What is a unit?

According to wikipedia:

A unit is the smallest testable part of an application.

Based on experience and also echoing the same sentiment according to this [Stackoverflow answer](https://stackoverflow.com/questions/1066572/what-should-a-unit-be-when-unit-testing):
`make the unit as small as you possibly can such that it still makes sense to the developer/tester by itself.`


2. In unit testing, you only focus on the unit you are testing. What that means is that you make a test to check if that unit behaves the way it should.
Caution: In unit testing, the units that you test may make a call to outside dependencies (ie. APIs, libraries, services, other units/modules, etc.). In this case, you will be needing to mock out these dependencies. The purpose of mocking is to isolate and focus on the code being tested and not on the behavior or state of external dependencies.
