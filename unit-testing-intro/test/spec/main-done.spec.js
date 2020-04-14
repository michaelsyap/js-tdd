describe('Console Todo App Tests', function() {

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
  var store;

  function setupLocalStorageMock(storeTest) {
    var store = storeTest || {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
  }


  beforeEach(function() {
    store = new app.Store('todoPresentation');


  })

  // Create Todo Item
  it('Should be able to create a todo item', function() {
    var newTodoItem = {
      title: 'This is a new task 1',
      status: 'pending'
    };

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify([])
    });

    return store
      .save(newTodoItem)
      .then(function(result) {

        // Check the result if it contains what you send to localstorage
        expect(result).toEqual(jasmine.objectContaining({
          title: newTodoItem.title,
          status: 'pending'
        }))

        // Check also if localStorage was called in the process
        expect(localStorage.setItem).toHaveBeenCalled();

      });

  });

  // Read Todo Items
  it('Should be able to return all todo items', function() {

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify(sampleTodos)
    });

    return store
            .findAll()
            .then(function(result) {

              expect(result).toEqual(sampleTodos);

              expect(localStorage.getItem).toHaveBeenCalled();
            });
  })

  it('Should be able to return a specific todo item', function() {

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify(sampleTodos)
    });

    return store
            .find(sampleTodos[0].id)
            .then(function(result) {

              expect(result).toEqual(sampleTodos[0]);

              expect(localStorage.getItem).toHaveBeenCalled();
            });

  })

  it('Should be able to return null when there is no todo item returned', function() {

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify(sampleTodos)
    });

    return store
            .find('10')
            .then(function(result) {

              expect(result).toBeFalsy();

              expect(localStorage.getItem).toHaveBeenCalled();
            });

  })


  it('Should be able to update a specific todo item', function(){

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify(sampleTodos)
    });

    return store
            .update(Object.assign(sampleTodos[2], { status: 'done' }))
            .then(function(result) {

              expect(result).toEqual(jasmine.objectContaining({
                status: 'done'
              }))

              expect(localStorage.getItem).toHaveBeenCalled();
              expect(localStorage.setItem).toHaveBeenCalled();

            })

  });


  it('Should be able to remove a specific todo item', function(){

    setupLocalStorageMock({
      'todoPresentation': JSON.stringify(sampleTodos)
    });

    return store
            .remove(sampleTodos[1].id)
            .then(function(result) {

              expect(result).toBeTruthy();

              expect(localStorage.getItem).toHaveBeenCalled();
              expect(localStorage.setItem).toHaveBeenCalled();

            })

  });

});
