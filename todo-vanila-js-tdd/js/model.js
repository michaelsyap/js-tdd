(function(window){
	'use strict';

	function Model(storage) {
		this.storage = storage;
	}

  Model.prototype.create = function(todo) {

    return new Promise((function(resolve, reject){

      this.storage.save(todo)
        .then(function onSaveSuccess(data) {
          resolve(data);
        })

    }).bind(this))

  };

  Model.prototype.read = function(filter) {

    return new Promise((function(resolve, reject) {

      if(filter) {

        resolve(this.storage.findAll(filter))

      } else {

        resolve(this.storage.findAll())
      }


    }).bind(this))

  };


  Model.prototype.update = function(todo) {
    return new Promise((function(resolve, reject){

      this.storage.save(todo)
        .then(function onUpdateSuccess(data) {
          resolve(data);
        })

    }).bind(this))
  }


  Model.prototype.delete = function(todo) {
    return new Promise((function(resolve, reject){

      this.storage.remove(todo)
        .then(function onDeleteSuccess(data) {
          resolve(data)
        })

    }).bind(this))
  }


	// Export to window
	window.app = window.app || {};
	window.app.Model = Model;
})(window);
