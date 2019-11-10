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

