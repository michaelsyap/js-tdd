describe('Todo App', function() {

  var store;
  var sampleTodos = [
    {
      id: '1',
      dateCreated: new Date().toISOString(),
      title: 'This is a new task',
      status: 'pending'
    },
    {
      id: '2',
      dateCreated: new Date().toISOString(),
      title: 'This is a new task',
      status: 'pending'
    },
    {
      id: '3',
      dateCreated: new Date().toISOString(),
      title: 'This is a new task',
      status: 'pending'
    }
  ];



  function setupLocalStorageMock(storeTest) {
    var store = storeTest || {};

    spyOn(localStorage, 'setItem').and.callFake(function(key, value) {
      return store[key] = value + '';
    })

    spyOn(localStorage, 'getItem').and.callFake(function(key) {
      return store[key];
    })

  }

  beforeEach(function() {
    store = new app.Store('todoApp');

  })



  // CRUD

  it('Should be able to create a new todo item', function() {
    var newTodoItem = {
      title: 'This is a new task',
      status: 'pending'
    };


    setupLocalStorageMock({
      'todoApp': JSON.stringify([])
    });

    expect(store.save(newTodoItem)).toEqual(jasmine.objectContaining({
      title: newTodoItem.title,
      status: newTodoItem.status
    }))

    expect(localStorage.getItem).toHaveBeenCalled()
    expect(localStorage.setItem).toHaveBeenCalled()

  });


  it('Should be able to read all the todo items', function() {
    setupLocalStorageMock({
      'todoApp': JSON.stringify(sampleTodos)
    });

    console.log(store.findAll());

    expect(store.findAll()).toEqual(sampleTodos)

    expect(localStorage.getItem).toHaveBeenCalledWith('todoApp')

  });


})
