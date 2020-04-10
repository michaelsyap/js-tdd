describe('Model', function() {

  var storage, todoModel;



  var todoItems = [
    {
      id: 1,
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
    {
      id: 2,
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
    {
      id: 3,
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
  ]

  var createStorageStub = function(name, todoItems) {
    return {
      save: jasmine.createSpy('save').and.callFake(function(todo) {
        return Promise.resolve(Object.assign(todo))
      }),
      remove: jasmine.createSpy('remove').and.callFake(function(todo) {
        return Promise.resolve(true)
      }),
      update: jasmine.createSpy('update').and.callFake(function(todo) {
        return Promise.resolve(todo);
      }),
      find: jasmine.createSpy('find', function(callback){
        callback(todoItems[1])
      }),
      findAll: jasmine.createSpy('findAll').and.callFake(function() {
        return Promise.resolve(todoItems)
      }),
    }
  };

	beforeEach(function(){
    storage = new createStorageStub('myDB', todoItems);

    todoModel = new app.Model(storage);
  });


	it('should be able to create a new todo item', () => {
		var newTodoItem = {
			text: 'Buy some apples from the grocery',
			status: 'pending'
    };


    return todoModel
            .create(newTodoItem)
            .then(function(result) {
              // A successful creation of a todo item should return the item object created
              expect(result).toEqual(jasmine.objectContaining({
                text: newTodoItem.text
              }));

              // One way to check the function worked is if the function has made a call to the database
              expect(storage.save).toHaveBeenCalledWith(newTodoItem);

            })
  });


  it('should be able to get all todo items', function() {

    return  todoModel
              .read()
              .then(function(result) {
                // A successful read to the database should reter all todo items
                expect(result).toBe(todoItems);

                // One way to check if this feature worked is if the function was able to make a call to database
                expect(storage.findAll).toHaveBeenCalled();
              })

  });

  it('should be able to update a todo item', function() {
    var todoItemForUpdate = {
      id: 1,
      status: 'done'
    };

    return todoModel
            .update(todoItemForUpdate)
            .then(function(result) {

              // This is pretty much creating the save.
              // The main logic of knowing if a todo item has been updated lies on
              // the storage unit
              expect(result).toEqual(jasmine.objectContaining({
                status: todoItemForUpdate.status
              }));

              expect(storage.save).toHaveBeenCalledWith(todoItemForUpdate);
            })

  });

  it('should be able to delete a todo item', function(){
    var todoItemForDelete = {
      id: 1,
      text: 'Buy some apples from the grocery',
      status: 'pending'
    };

    return todoModel
              .delete(todoItemForDelete)
              .then(function(result) {
                expect(result).toBeTruthy();

                expect(storage.remove).toHaveBeenCalledWith(todoItemForDelete);
              })

  });



});
