describe('Controller', function() {
  var model, view, controller;

  var sampleTodoItems = [
    {
      id: '1',
      title: 'Buy some apples from the grocery',
      status: 'pending',
      dateCreated: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Buy some apples from the grocery',
      status: 'pending',
      dateCreated: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Buy some apples from the grocery',
      status: 'pending',
      dateCreated: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Buy some apples from the grocery',
      status: 'done',
      dateCreated: new Date().toISOString()
    },
  ]


  function setupModel(todos) {

    model.create.and.callFake(function(newTodoItem) {
      return Promise.resolve(Object.assign({
        id: '1'
      }, newTodoItem))
    });

    model.read.and.callFake(function(filter) {

      var query = todos.filter(function(todoItem) {

        // Scan through the keys in the filter object
        for(key in filter) {

          // If at least one of the properties of the todo item
          // doesn't match the corresponding filter,
          // do not include this specific todo item
          if(todoItem[key] != filter[key]) {
            return false;
          }

        }

        // If it didn't return any false in the condition above,
        // obviously this todo item passes the filter test
        return true;
      });

      if(filter) {
        return Promise.resolve(query)
      } else {
        return Promise.resolve(todos || [])
      }

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

      return controller.setView('')
              .then(function(todoItemsData) {

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalled()

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith('showTodoItems', [])
              });

    });


    it('Should be able to render all the todo items', function() {

      setupModel(sampleTodoItems);

      return controller.setView('')
              .then(function(todoItemsData) {

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalled()

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith('showTodoItems',sampleTodoItems)
              });

    });

    it('Should be able to render pending todo items', function() {

      setupModel(sampleTodoItems);

      return controller.setView('#pending')
              .then(function(todoItemsData) {

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalledWith({
                  status: 'pending'
                })

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith('showTodoItems',sampleTodoItems.filter(function(sampleTodoItem) {
                  return sampleTodoItem.status === 'pending'
                }))

              });

    });

    it('Should be able to render done todo items', function() {

      setupModel(sampleTodoItems);

      return controller.setView('#done')
              .then(function(todoItemsData) {

                // Make sure the call to the data store executes
                expect(model.read).toHaveBeenCalledWith({
                  status: 'done'
                })

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith('showTodoItems',sampleTodoItems.filter(function(sampleTodoItem) {
                  return sampleTodoItem.status === 'done'
                }))

              });

    });

    it('Should be able to render all todo items even if the hash is not among the valid statuses', function() {

      setupModel(sampleTodoItems);

      return controller.setView('#something')
              .then(function(todoItemsData) {

                // Make sure the call to the data store executes
                expect(model.read).not.toHaveBeenCalledWith({
                  status: 'something'
                })

                // Make sure that after the call to the data store executes, render the data to the DOM
                expect(view.render).toHaveBeenCalledWith('showTodoItems', sampleTodoItems)

              });

    });

  });

  describe('Creation of todo items', function() {

    it('Should be able to save the todo item in the model', function(done) {
      var newTodo = {
        title: 'New todo item',
        status: 'pending'
      };

      // Reset the database to blank
      setupModel([]);


			view.render.calls.reset();
			model.read.calls.reset();
			model.read.and.callFake(function () {
				return Promise.resolve([newTodo])
			});

      // Create a fake simulation of the event
      view.trigger('createTodo', newTodo.title);

      // Check if the model gets called with the value from the event
      expect(model.create).toHaveBeenCalledWith(newTodo);

      // This is just a simulation of how Promises behave
      setTimeout(function() {

        // Create a fake simulation of clearing the input field
        expect(view.render).toHaveBeenCalledWith('clearTodoInputField');

        // Make sure the call to the data store executes
        expect(model.read).toHaveBeenCalled()

        // Make sure that after the call to the data store executes, render the data to the DOM
        expect(view.render).toHaveBeenCalledWith('showTodoItems', [newTodo])

        done();
      }, 100)

    });



  })

})




