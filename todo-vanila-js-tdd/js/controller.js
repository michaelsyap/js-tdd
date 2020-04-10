(function(window) {

  function Controller(model, view) {
    this.model = model;
    this.view = view;

    view.bindEvent('createTodo', (function(todoTitle) {

      this.model.create({
        title: todoTitle,
        status: 'pending'
      });

    }).bind(this));


  }

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
