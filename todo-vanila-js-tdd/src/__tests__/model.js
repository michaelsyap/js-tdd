import { setTodoItem, getTodoItems, updateTodoItem, deleteTodoItem } from "../model";


beforeEach(() => {
  localStorage.clear();
})

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

    setTodoItem(newTodoObject);

    expect(localStorage.setItem).toHaveBeenLastCalledWith('todoItems', JSON.stringify([newTodoObject]));

    expect(localStorage.__STORE__['todoItems']).toBe(JSON.stringify([newTodoObject]));
    
    expect(JSON.parse(localStorage.__STORE__['todoItems']).length).toBe(1);

  });
  
  // Read all todo items
  it('Gets all todo items', () => {
    const mockTodoItemsList = [
      {
        id: 1,
        name: "Pick up bread from the bakery",
        date: "01-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 2,
        name: "Pick up bread from the bakery 2",
        date: "02-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 3,
        name: "Pick up bread from the bakery 3",
        date: "03-12-2020",
        status: "pending",
        tags: "bread, bakery"
      }
    ];

    localStorage.__STORE__['todoItems'] = JSON.stringify(mockTodoItemsList);

    const todoItems = getTodoItems();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(todoItems).toEqual(mockTodoItemsList);
  });

  // Update Todo Item
  it('Updates a certain todo item', () => {
    const mockTodoItemsList = [
      {
        id: 1,
        name: "Pick up bread from the bakery",
        date: "01-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 2,
        name: "Pick up bread from the bakery 2",
        date: "02-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 3,
        name: "Pick up bread from the bakery 3",
        date: "03-12-2020",
        status: "pending",
        tags: "bread, bakery"
      }
    ];


    const updatedTodoItem = {
      id: 2,
      name: "Pick up bread from the bakery 2020",
      date: "01-12-2020",
      status: "pending",
      tags: "bread, bakery"
    };

    const updatedMockItemsList = [
      {
        id: 1,
        name: "Pick up bread from the bakery",
        date: "01-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      updatedTodoItem,
      {
        id: 3,
        name: "Pick up bread from the bakery 3",
        date: "03-12-2020",
        status: "pending",
        tags: "bread, bakery"
      }
    ];


    localStorage.__STORE__['todoItems'] = JSON.stringify(mockTodoItemsList);
    expect(updateTodoItem(updatedTodoItem)).toEqual(updatedTodoItem);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('todoItems', JSON.stringify(updatedMockItemsList));
    expect(JSON.parse(localStorage.__STORE__['todoItems'])).toEqual(updatedMockItemsList);
  });



  // Delete Todo Item
  it('Deletes todo item', () => {

    const mockTodoItemsList = [
      {
        id: 1,
        name: "Pick up bread from the bakery",
        date: "01-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 2,
        name: "Pick up bread from the bakery 2",
        date: "02-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 3,
        name: "Pick up bread from the bakery 3",
        date: "03-12-2020",
        status: "pending",
        tags: "bread, bakery"
      }
    ];


    const todoItemForDeletion = {
      id: 2,
      name: "Pick up bread from the bakery 2020",
      date: "01-12-2020",
      status: "pending",
      tags: "bread, bakery"
    };

    const updatedMockItemsList = [
      {
        id: 1,
        name: "Pick up bread from the bakery",
        date: "01-12-2020",
        status: "done",
        tags: "bread, bakery"
      },
      {
        id: 3,
        name: "Pick up bread from the bakery 3",
        date: "03-12-2020",
        status: "pending",
        tags: "bread, bakery"
      }
    ];


    localStorage.__STORE__['todoItems'] = JSON.stringify(mockTodoItemsList);
    expect(deleteTodoItem(todoItemForDeletion)).toEqual(todoItemForDeletion);
    expect(localStorage.setItem).toHaveBeenLastCalledWith('todoItems', JSON.stringify(updatedMockItemsList));
    expect(JSON.parse(localStorage.__STORE__['todoItems'])).toEqual(updatedMockItemsList);

  });

})