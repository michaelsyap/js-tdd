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

  Store.prototype.save = function(todoItem){
    var newTodoItems;

    return this
            .findAll()
            .then((function(result) {

              var newTodoItem = Object.assign({
                id: ID(),
                dateCreated: new Date().toISOString()
              }, todoItem);

              return new Promise((function(resolve, reject) {

                try {
                  newTodoItems = [newTodoItem].concat(result);

                  console.log(newTodoItems)
                  console.log(this._storeName)

                  localStorage.setItem(this._storeName, JSON.stringify(newTodoItems));

                  resolve(newTodoItem)
                } catch(error) {
                  reject(error);
                }

              }).bind(this))

            }).bind(this))

  }

  Store.prototype.findAll = function() {
    var todoItems;

    return new Promise((function(resolve, reject) {

      try {

        todoItems = JSON.parse(localStorage.getItem(this._storeName));

        console.log(localStorage.getItem(this._storeName));

        resolve(todoItems || []);
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


  Store.prototype.update = function(todoItem){
    var newTodoItems;

    return this
            .findAll()
            .then((function(storedTodoItems) {
              var existingTodoItemIndex = storedTodoItems.findIndex(function(item) {
                return item.id === todoItem.id
              });

              return new Promise((function(resolve, reject) {

                try {
                  newTodoItems = storedTodoItems.slice(0, existingTodoItemIndex);
                  newTodoItems = newTodoItems.concat([todoItem]);
                  newTodoItems = newTodoItems.concat(storedTodoItems.slice(existingTodoItemIndex + 1));

                  localStorage.setItem(this._storeName, JSON.stringify(newTodoItems));

                  resolve(todoItem)
                } catch(error) {
                  reject(error);
                }

              }).bind(this))

            }).bind(this))

  }


  Store.prototype.remove = function(id) {

    return this
            .findAll()
            .then((function(storedTodoItems) {
              var existingTodoItemIndex = storedTodoItems.findIndex(function(item) {
                return item.id === id
              });

              return new Promise((function(resolve, reject) {

                try {
                  newTodoItems = storedTodoItems.slice(0, existingTodoItemIndex);
                  newTodoItems = newTodoItems.concat(storedTodoItems.slice(existingTodoItemIndex + 1));

                  if(existingTodoItemIndex != -1) {
                    localStorage.setItem(this._storeName, JSON.stringify(newTodoItems));
                    resolve(true)
                  } else {
                    resolve(false)
                  }




                } catch(error) {
                  reject(error);
                }

              }).bind(this))

            }).bind(this))
  }

  window.app = window.app || {};
  window.app.Store = Store;
})(window)
