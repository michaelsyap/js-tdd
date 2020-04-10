describe('Controller', function() {
  var model, view, controller;

  function setupModel(todos) {

    model.create.and.callFake(function(newTodoItem) {
      return Promise.resolve(Object.assign({
        id: '1'
      }, newTodoItem))
    });

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
    model = jasmine.createSpyObj('model', ['create']);
    view = createViewStub();
    controller = new app.Controller(model, view);
  })

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




