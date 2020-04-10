(function(window){

  /**
   * Creates a new client side storage object, and will create an empty collection if
   * there is no todo collections yet in the localstorage
   *
   * @param {string} name The name to identify the localStorage item to store the todo items
   */
  function Store(name) {
    var todos = [];
    this.storeName = name;

    if(!localStorage.getItem(name)) {
      localStorage.setItem(name, JSON.stringify(todos));
    }

  }

  /**
   * To find through localStorage for all the todo items
   *
   */
  Store.prototype.findAll = function(){
    var todos = JSON.parse(localStorage.getItem(this.storeName));
    return todos || [];
  };




  /**
   * To find through localStorage for a specific todo item
   *
   * @param {object} todo The object that contains the id of the todo to find in the localStorage DB
   */
  Store.prototype.find = function(todo){
    var todos = this.findAll();
    var filteredTodos = [];

    filteredTodos = todos.filter(function(todoItem) {
      return todo.id === todoItem.id
    });

    return filteredTodos.length > 0 ? filteredTodos[0] : null;
  };

  Store.prototype.save = function(todo){
    var todos = this.findAll();
    var existingTodo = this.find(todo);
    var existingTodoIndex;
    var updatedArray = [];
    var newTodo = !existingTodo && Object.assign({id: uuidv4()}, todo);

    console.log(existingTodo);
    console.log(todos);

    if(existingTodo) {
      existingTodoIndex = todos.findIndex(function(todo) {
        return existingTodo.id === todo.id;
      });

      console.log(existingTodoIndex)

      updatedArray = updatedArray.concat(todos.slice(0, existingTodoIndex));
      updatedArray = updatedArray.concat([todo]);
      updatedArray = updatedArray.concat(todos.slice(existingTodoIndex + 1));
    } else {
      updatedArray = [newTodo];
      updatedArray = updatedArray.concat(todos);
    }

    localStorage.setItem(this.storeName, JSON.stringify(updatedArray))


    return existingTodo ? todo : newTodo;
  };


  Store.prototype.remove = function(todo){
    var todos = this.findAll();
    var existingTodo = this.find(todo);
    var existingTodoIndex;
    var updatedArray = [];

    if(existingTodo) {
      existingTodoIndex = todos.findIndex(function(todo) {
        return existingTodo.id === todo.id;
      });

      updatedArray = updatedArray.concat(todos.slice(0, existingTodoIndex));
      updatedArray = updatedArray.concat(todos.slice(existingTodoIndex + 1));

      localStorage.setItem(this.storeName, JSON.stringify(updatedArray))

      return true;
    }

    return false;
  };


  window.app = window.app || {};
  window.app.Store = Store;
})(window);
