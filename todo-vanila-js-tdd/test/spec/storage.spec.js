describe('NWStorage', function() {
  var storage;

  beforeEach(function(){
    storage = new Storage('todoApp', function(){});
  });

  it('Storage successfully invoked', function(){
    expect(storage).toBeCalledWith('todoApp', function(){});
  });


  it('Should be able to create data to the storage layer', function(){
		var todoItem = {
			id: 1,
			text: 'Buy some apples from the grocery',
			status: 'pending'
		};

    expect(storage.save(todoItem)).toBe(todoItem);
  });

})
