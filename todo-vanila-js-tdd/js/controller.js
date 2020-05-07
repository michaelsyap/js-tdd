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

    view.bindEvent('setTodoUpdateMode', (function(element){
      // console.log(element.target);

      var findParent = function (element, tagName) {
        if (!element.parentNode) {
          return;
        }
        if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
          return element.parentNode;
        }
        return findParent(element.parentNode, tagName);
      };

      var todoIDForUpdate = findParent(element.target, 'li').getAttribute('data-id');

      // console.log(findParent(element.target, 'li').getAttribute('data-id'));

      this.setTodoForUpdate(todoIDForUpdate);

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

  Controller.prototype.setTodoForUpdate = function(todoIDForUpdate) {

  };

  Controller.prototype.updateTodo = function(updatedTodoParams) {
    this.model.create(updatedTodoParams)
      .then((function(resolve) {

        this.setView('');
      }).bind(this))
  }

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
