(function(window){

  var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  function Store(name) {
    this._storeName = name;
  }


  Store.prototype.saveV1 = function(todoItem){
    var newTodoItem = Object.assign({
      id: ID(),
      dateCreated: new Date().toISOString()
    }, todoItem);

    return new Promise((function(resolve, reject) {

      try {

        localStorage.setItem(this._storeName, JSON.stringify([newTodoItem]));

        resolve(newTodoItem)
      } catch(error) {
        reject(error);
      }

    }).bind(this))

  }

  Store.prototype.save = function(todoItem){
    var todoItems = this.findAll();
    var newTodoItem;
    var isTodoExisting = this.find(todoItem.id);

    var newTodoItem = Object.assign({
      id: ID(),
      dateCreated: new Date().toISOString()
    }, todoItem);

    return new Promise((function(resolve, reject) {

      try {


        localStorage.setItem(this._storeName, JSON.stringify([newTodoItem]));

        resolve(newTodoItem)
      } catch(error) {
        reject(error);
      }

    }).bind(this))

  }

  Store.prototype.findAll = function() {
    var todoItems;

    return new Promise((function(resolve, reject) {

      try {

        todoItems = JSON.parse(localStorage.getItem(this._storeName));

        resolve(todoItems);
      } catch(error) {
        reject(error);
      }


    }).bind(this))


  };


  Store.prototype.find = function(id) {
    var todoItems;

    return new Promise((function(resolve, reject) {

      try {

        todoItems = JSON.parse(localStorage.getItem(this._storeName));

        todoItem = todoItems.filter(function(item) {
          return item.id === id;
        })

        resolve(todoItem[0] || null)

      } catch(error) {
        reject(error);
      }

    }).bind(this));
  }

  window.app = window.app || {};
  window.app.Store = Store;
})(window)
