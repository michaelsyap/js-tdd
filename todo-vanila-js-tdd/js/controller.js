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


  Controller.prototype.createTodo = function(todo) {
    this.model.create(todo);
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
