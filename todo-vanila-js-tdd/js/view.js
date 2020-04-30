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
        /**
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
         * For some elements, including <input type="text">, the change event doesn't fire until the control loses focus. Try entering something into the field below, and then click somewhere else to trigger the event.
         */
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
