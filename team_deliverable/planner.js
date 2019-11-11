$('.menu').each(function(index) {
  $(this).click(function(){
    makeActive($(this)[0].id); 
  });
});

function makeActive(menu_id){
  menu_item = $('#' + menu_id);
  content_item = $('#content' + menu_id.substr(4));
  
  if (menu_item.length == 0) return false;

  $('.active').removeClass('active')
  menu_item.addClass('active');
  content_item.addClass('active');
  localStorage.active_tab = menu_id

  return true;
}

if (localStorage.active_tab === undefined || !makeActive(localStorage.active_tab))
  makeActive('menu_home');

var menu_collapsed = true; 
$('.collapsible').click(function(){
  console.log('clicked');
  if (menu_collapsed)
    $('.menu').addClass('visible');
  else
    $('.menu').removeClass('visible');
  menu_collapsed ^= true;
});