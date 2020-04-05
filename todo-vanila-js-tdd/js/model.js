(function(window){
	'use strict';

	function Model(storage) {
		this.storage = storage;
	}

  Model.prototype.createTodo = function(todo) {
    var self = this;

    try {
      self.storage.save(todo);
    } catch(error) {
      return new Error();
    }

    return todo;
  };


	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
