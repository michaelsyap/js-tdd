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


  }

  Controller.prototype.setView = function() {


    return new Promise((function(resolve, reject) {

      this.model.read()
        .then((function(todoItemsData) {

          resolve(todoItemsData);

          this.view.render(todoItemsData);

        }).bind(this));

    }).bind(this));


  };


  Controller.prototype.createTodo = function(todo) {
    this.model.create(todo);
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
