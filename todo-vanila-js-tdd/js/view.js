(function(window) {


  function View(template) {
    this.template = template;

		this.ENTER_KEY = 13;
		this.ESCAPE_KEY = 27;

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
      },
      setTodoItemForTitleUpdate: function() {
        console.log(params);
        self._setTodoItemForTitleUpdate(params);
      }
    };


    viewCommands[command]();
  };

  View.prototype._getId = function(element) {
    var $todoItem = $parent(element, 'li');

    return $todoItem.getAttribute('data-id');

  };


  View.prototype.bindEvent = function(event, eventHandler) {
    var self = this;

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
      case 'setTodoUpdateMode':
        $delegate(this.$todoListContainer, 'li .todo-title', 'dblclick', function(event){
          var $todoItem = $parent(this, 'li');
          eventHandler($todoItem);
        });
        break;
      case 'updateTodo':

        $delegate(this.$todoListContainer, '.todo-title-edit', 'blur', function(event) {
          var todoId =  self._getId(this);
          var inputValue =  event.target.value.trim();
          var params = {
            id: todoId,
            title: inputValue
          };

          eventHandler(params);
        });

        $delegate(this.$todoListContainer, '.todo-title-edit', 'keypress', function(event) {
          if (event.keyCode === self.ENTER_KEY) {
            // Remove the cursor from the input when you hit enter just like if it
            // were a real form
            this.blur();
          }
        });
        break;
      case 'updateTodoStatus':

        $delegate(this.$todoListContainer, '.form-check-input', 'click', function(event) {
          var todoId = self._getId(this);
          var params = {
            id: todoId,
            status: event.target.checked ? 'done' : 'pending'
          };

          eventHandler(params);

        });


        break;
      default:
        break;
    }

  };

  View.prototype._setTodoItemForTitleUpdate = function(todoItemElement) {
    var todoID = todoItemElement.getAttribute('data-id');
    var titleContainer = qs("[data-id='"+ todoID +"'] .title-column");
    var todoTitle = qs("[data-id='"+ todoID +"'] .todo-title");

    todoItemElement.className = todoItemElement.className + " --editing";

    var input = document.createElement('input');
    input.className = "form-control todo-title-edit";

    titleContainer.appendChild(input);
    input.focus();
    input.value = todoTitle.innerHTML;

  };


  window.app = window.app || {};
  window.app.View = View;

})(window);
