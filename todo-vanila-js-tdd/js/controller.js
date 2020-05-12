(function(window) {

  function Controller(model, view) {
    this.model = model;
    this.view = view;

    view.bindEvent('createTodo', (function(todoTitle) {

      this.createTodo({
        title: todoTitle,
        status: 'pending'
      })

    }).bind(this));


    view.bindEvent('updateTodo', (function(updatedTodoParams) {

      this.updateTodo(updatedTodoParams);

    }).bind(this))

    view.bindEvent('setTodoUpdateMode', (function(todoItemElement){

      this.setTodoForUpdate(todoItemElement);

    }).bind(this));


    view.bindEvent('updateTodoStatus', (function(updatedTodoParams) {
      this.updateTodo(updatedTodoParams);
    }).bind(this))

    view.bindEvent('deleteTodo', (function(todoId) {
      this.deleteTodo(todoId);
    }).bind(this))


  }

  Controller.prototype.setView = function(locationHash) {
    // all, pending, done
    var route = locationHash.split('#')[1];
    var listFilter = route || '';
    return this._filterTodoItems(listFilter)
  };


  Controller.prototype._verifyValidFilter = function(filter) {
    var validFilters = ['all', 'done', 'pending'];
    var result = [];

    result = validFilters.filter(function(filterItem) {
      return filterItem === filter;
    });

    return result.length > 0 && result[0] !== 'all' ? filter : undefined;
  }

  Controller.prototype._filterTodoItems = function(filter) {
    var validFilter = this._verifyValidFilter(filter);
    var filterObj = validFilter ? { status: filter } : null;

    return new Promise((function(resolve, reject) {

      this.model.read(filterObj)
        .then((function(todoItemsData) {

          resolve(todoItemsData);

          this.view.render('showTodoItems', todoItemsData);

        }).bind(this));

    }).bind(this));

  }


  Controller.prototype.createTodo = function(todo) {
    this.model.create(todo)
      .then((function(result) {

        console.log(this.view);

        // Clear create todo input form
        this.view.render('clearTodoInputField')

        // Re-render todo list
        this.setView('');

      }).bind(this));
  };

  Controller.prototype.setTodoForUpdate = function(todoItemElement) {
    this.view.render('setTodoItemForTitleUpdate', todoItemElement);
  };

  Controller.prototype.updateTodo = function(updatedTodoParams) {
    this.model.create(updatedTodoParams)
      .then((function(resolve) {
        this.setView('');
      }).bind(this))
  };

  Controller.prototype.deleteTodo = function(todoId) {
    this.model.delete(todoId)
      .then((function(result) {
        this.setView('');
      }).bind(this))
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
