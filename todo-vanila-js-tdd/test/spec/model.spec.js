describe('Model', function() {
	var todoModel;

	beforeEach(function(){
		todoModel = new TodoModel();
	});

	it('should be able to create a new todo item', () => {
		var todoItem = {
			id: 1,
			text: 'Buy some apples from the grocery',
			status: 'pending'
		};

		// One way to check the function worked is if the local storage function to create has been called


		// A successful creation of a todo item should return the item object created
		expect(todoModel.createTodo(todoItem)).toBe(actual)
	});
});
