(function(window) {
  var store = new app.Store('todo-tdd');
  var model = new app.Model(store);
  var template = new app.Template();
  var view = new app.View(template);
  var controller = new app.Controller(model, view);


  window.onload = function() {
    console.log('Starting app...');

    controller.setView(document.location.hash);
  };


})(window, $);
