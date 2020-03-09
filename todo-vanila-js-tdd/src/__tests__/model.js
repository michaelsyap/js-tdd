import { createTodo } from "../model";


describe('Tests for the todo application model', () => {
  // Create Todo Item
  it('Creates a new todo item', () => {
    const newTodoObject = {
      id: 1,
      name: "Pick up bread from the bakery",
      date: "01-12-2020",
      status: "done",
      tags: "bread, bakery"
    };


    expect(createTodo(newTodoObject)).toEqual(newTodoObject);


  });
  
  // Read Todo Item

  // Delete Todo Item

  // Update Todo Item
});