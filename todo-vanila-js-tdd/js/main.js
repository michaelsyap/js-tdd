(function(window) {
  var store = new app.Store();
  var model = new app.Model(store);
  var view = new app.View();
  var controller = new app.Controller(model, view);


  window.onload = function() {
    console.log('Starting app...');
  };


})(window, $);
