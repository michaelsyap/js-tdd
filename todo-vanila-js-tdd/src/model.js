export const setTodoItem = function setTodoItem(todo) {
  // Store todo in local storage
  const todoItems = getTodoItems();

  localStorage.setItem('todoItems', JSON.stringify([
    ...todoItems,
    todo
  ]))

};


export const getTodoItems = function getTodoItems(id) {
  const todoItems = localStorage.getItem('todoItems')
  let parsedTodoItems = JSON.parse(todoItems) || [];

  return parsedTodoItems;
};


export const updateTodoItem = function updateTodoItem(updatedTodoItem) {
  try {
    const todoItems = getTodoItems();

    const updatedTodoItems = [
      ...todoItems.slice(0, 
          todoItems.findIndex(todoItem => todoItem.id === updatedTodoItem.id)),
      updatedTodoItem,
      ...todoItems.slice(todoItems.findIndex(todoItem => todoItem.id === updatedTodoItem.id) + 1),
    ];

    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems))
    
    return updatedTodoItem;

  } catch(error) {
    return error;
  }
};

export const deleteTodoItem = function deleteTodoItem(todoItemForDeletion) {
  try {
    const todoItems = getTodoItems();

    const updatedTodoItems = [
      ...todoItems.slice(0, 
          todoItems.findIndex(todoItem => todoItem.id === todoItemForDeletion.id)),
      ...todoItems.slice(todoItems.findIndex(todoItem => todoItem.id === todoItemForDeletion.id) + 1),
    ];

    localStorage.setItem('todoItems', JSON.stringify(updatedTodoItems))
    
    return todoItemForDeletion;
  } catch(error) {
    return error;
  }

}

export default {
  setTodoItem,
  getTodoItems,
  updateTodoItem
}