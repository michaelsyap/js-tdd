(function(window) {


  function View(template) {
    this.template = template;

    this.$todoListContainer = document.querySelector('#todo-list-container');
    this.$todoCreateInput = document.querySelector('#todo-create-input');
  }

  View.prototype.render = function(command, params) {
    var self = this;

    var viewCommands = {
      showTodoItems: function() {
        self.$todoListContainer.innerHTML = self.template.show(params);
      },
      clearTodoInputField: function() {
        self.$todoCreateInput.value = ''
      }
    };


    viewCommands[command]();
  };


  View.prototype.bindEvent = function(event, eventHandler) {

    switch(event) {
      case 'createTodo':
        this.$todoCreateInput.addEventListener('change', (function() {
          eventHandler(this.$todoCreateInput.value)
        }).bind(this))
        break;
      default:
        break;
    }

  }


  window.app = window.app || {};
  window.app.View = View;

})(window);
