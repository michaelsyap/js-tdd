(function(window){

  function Store(storeName) {
    this._storeName = storeName;
  }

  Store.prototype.save = function(todoItem) {
    var allTodoItems = this.findAll();
    var newTodoItem = Object.assign({
      id: '1',
      dateCreated: new Date().toISOString()
    }, todoItem);
    var newTodoItems = [newTodoItem].concat(allTodoItems);

    localStorage.setItem(this._storeName, JSON.stringify(newTodoItems))

    return newTodoItem
  };

  Store.prototype.findAll = function() {
    var todoItems = JSON.parse(localStorage.getItem(this._storeName))

    return todoItems || [];
  }

  window.app = window.app || {};
  window.app.Store = Store;

})(window)
