const monthNames = ["January", "February", "March", "April", 
                    "May", "June", "July", "August", 
                    "September", "October", "November", "December"];

now = new Date();

year = now.getFullYear();
month = now.getMonth();
days_in_month = new Date(year, month + 1, 0).getDate();
first_day = new Date(year, month, 1).getDay();

$("#month_name")[0].innerText = monthNames[month];
$("#year")[0].innerText = year;

function makeDay(d) {
  return '<li>' + d + '</li>';
}

days_ul = $("#days");

for (let i = 0; i < first_day; i++)
  days_ul.append(makeDay(""));
for (let i = 1; i <= days_in_month; i++)
  days_ul.append(makeDay(i));

let spare = 7 - (first_day + days_in_month) % 7;
if (spare == 7) spare = 0;

for (let i = 0; i < spare; i++)
  days_ul.append(makeDay(""));


////
let prev_clicked = undefined;
let list_view = $('#day-assignments');

function pad(x){
  if (x < 10) return '0' + x;
  return x;
}

$('#days li').each(function(index) {
  $(this).on('click', function(){
    if (prev_clicked != undefined)
      prev_clicked.removeClass('selected');
    prev_clicked = $(this);
    prev_clicked.addClass('selected');
    
    list_view[0].innerText = '';
    if (prev_clicked[0].innerText == '') return;
    let selected_day = parseInt(prev_clicked[0].innerText);


    if (localStorage.getItem("assignments") === null)
      assignments = {};
    else
      assignments = JSON.parse(localStorage.assignments);

    for (let key in assignments){
      a = assignments[key];
      if (a.progress >= a.size) continue;
        
      let duedate = new Date(a.due);

      if (duedate.getFullYear() == year && 
          duedate.getMonth() == month && 
          duedate.getDate() == selected_day){
        let time = pad((duedate.getHours() + 11) % 12 + 1) + ':' + pad(duedate.getMinutes());
        if (duedate.getHours() >= 12) time += ' PM';
        else time += ' AM';
        list_view.append('<p class=\"todo\">Name: ' + a.name + '<br>Subject: ' + a.subject + '<br>Urgency: ' + a.lvl + '<br>Due: ' + time + '</p>');
      }
    }
  });
});



if (localStorage.getItem("assignments") === null){
  localStorage.assignments = '{}';
}
assignments = JSON.parse(localStorage.assignments);
