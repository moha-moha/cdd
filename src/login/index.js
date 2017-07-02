require('./index.css');
const render = require('./login.art');
const html = render();
function swapScreen(id) {
  $('.visible').removeClass('visible animated fadeInUp');
  $('#'+id).addClass('visible animated fadeInUp');
}
$(function(){
  $('body').html(html);
  App.setPage('login');  //Set current page
  App.init(); //Initialise plugins and elements
  $('.scene').on('click',function(){
    var target = $(this).data('param');
    swapScreen(target);
  });
});
