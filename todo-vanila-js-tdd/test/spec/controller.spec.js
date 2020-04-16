describe('Controller', function() {
  var model, view, controller;

  var sampleTodoItems = [
    {
      id: '1',
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
    {
      id: '2',
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
    {
      id: '3',
      text: 'Buy some apples from the grocery',
      status: 'pending'
    },
  ]


  function setupModel(todos) {

    model.create.and.callFake(function(newTodoItem) {
      return Promise.resolve(Object.assign({
        id: '1'
      }, newTodoItem))
    });

    model.read.and.callFake(function() {
      return Promise.resolve(todos)
    })

  }

  function createViewStub() {
    var eventRegistry = {};

    return {
      render: jasmine.createSpy('render'),
      bindEvent: function(event, handler) {
        eventRegistry[event] = handler;
      },
      trigger: function(event, parameter) {
        // This is a stub to simulate an event which is usually
        // triggered by DOM events
        eventRegistry[event](parameter)
      }
    };
  }

  beforeEach(function() {
    model = jasmine.createSpyObj('model', ['create', 'read']);
    view = createViewStub();
    controller = new app.Controller(model, view);
  })


  // Create a test first displaying todo items
  // It make sense to test first the displaying the list of todo items
  /**
   * Create a test first for displaying todo items.
   * It makes sense to test the display of todo items first
   * so that you are now ready to
   */
  describe('Displaying todo items', function() {

    it('Should be able to render without any todo items', function() {
      setupModel([]);

      return controller.setView()
              .then(function(todoItemsData) {
                console.log(todoItemsData);

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalled()

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith([])
              });

    });


    it('Should be able to render all the todo items', function() {

      setupModel(sampleTodoItems);

      return controller.setView()
              .then(function(todoItemsData) {
                console.log(todoItemsData);

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalled()

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith(sampleTodoItems)
              });

    });

  });

  describe('Creation of todo items', function() {


    it('Should be able to create a new todo item', function() {
      var newTodo = {
        title: 'New todo item',
        status: 'pending'
      };

      // Reset the database to blank
      setupModel([]);

      // Create a fake simulation of the event
      view.trigger('createTodo', newTodo.title);

      // Check if the model gets called with the value from the event
      expect(model.create).toHaveBeenCalledWith(newTodo);
    });

  })

})




