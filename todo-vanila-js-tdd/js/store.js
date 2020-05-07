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
  Store.prototype.findAll = function(filter){
    var todos = JSON.parse(localStorage.getItem(this.storeName));

    var query = todos.filter(function(todoItem) {

      // Scan through the keys in the filter object
      for(key in filter) {

        // If at least one of the properties of the todo item
        // doesn't match the corresponding filter,
        // do not include this specific todo item
        if(todoItem[key] != filter[key]) {
          return false;
        }

      }

      // If it didn't return any false in the condition above,
      // obviously this todo item passes the filter test
      return true;
    });

    return filter ? Promise.resolve(query) : Promise.resolve(todos || []);
  };

  Store.prototype._findTodoById = (todos, todo) => {
    var filteredTodos = [];

    filteredTodos = todos.filter(function(todoItem) {
      return todo.id === todoItem.id
    });

    return filteredTodos.length > 0 ? filteredTodos[0] : null;
  }

  Store.prototype.save = function(todo){
    var todos = JSON.parse(localStorage.getItem(this.storeName));
    var existingTodo = this._findTodoById(todos, todo);
    var existingTodoIndex;
    var updatedArray = [];
    var newTodo = !existingTodo && Object.assign({
      id: uuidv4(),
      dateCreated: new Date().toISOString()
    }, todo);

    if(existingTodo) {
      existingTodoIndex = todos.findIndex(function(todo) {
        return existingTodo.id === todo.id;
      });

      console.log(existingTodo)
      console.log(todo)
      console.log(existingTodoIndex)

      updatedArray = updatedArray.concat(todos.slice(0, existingTodoIndex));
      updatedArray = updatedArray.concat([Object.assign(existingTodo, todo)]);
      updatedArray = updatedArray.concat(todos.slice(existingTodoIndex + 1));
    } else {
      updatedArray = [newTodo];
      updatedArray = updatedArray.concat(todos);
    }

    localStorage.setItem(this.storeName, JSON.stringify(updatedArray))


    return existingTodo ? Promise.resolve(todo) : Promise.resolve(newTodo);
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

      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  };


  window.app = window.app || {};
  window.app.Store = Store;
})(window);
