describe('Model', function() {

  var storage, todoModel;

  var createStorageStub = function(name) {
    return {
      save: jasmine.createSpy('save'),
      remove: jasmine.createSpy('remove'),
      update: jasmine.createSpy('update'),
      find: jasmine.createSpy('find'),
      findAll: jasmine.createSpy('findAll')
    }
  };

	beforeEach(function(){
    storage = new createStorageStub('myDB');

    todoModel = new app.Model(storage);
  });


	it('should be able to create a new todo item', () => {
		var todoItem = {
			id: 1,
			text: 'Buy some apples from the grocery',
			status: 'pending'
    };


		// A successful creation of a todo item should return the item object created
		expect(todoModel.createTodo(todoItem)).toBe(todoItem)

    // One way to check the function worked is if the local storage function to create has been called
    expect(storage.save).toHaveBeenCalledWith(todoItem);


	});
});
