let checkmark = '<img class=\"checkmark\" src=\"blue-check.png\" onclick=\"mark_done(this)\">';

let assignment_name = $('input[id="assignment-name"]')[0];
let assignment_subject = $('input[id="assignment-subject"]')[0];
let assignment_due = $('input[id="assignment-duedate"]')[0];
let assignment_size = $('select[id="assignment-size"]');

// start load data

if (localStorage.getItem("nxtId") === null){
  localStorage.nxtId = 0;
}

if (localStorage.getItem("assignments") === null){
  localStorage.assignments = '{}';
}
assignments = JSON.parse(localStorage.assignments);

for (let id in assignments){
  a = assignments[id];
  if (a.progress >= a.size) continue;
  $('div.' + a.lvl + ' > ul').prepend('<li id=\"' + a.id + '\"><p>' + a.name + '</p>' + checkmark + '</li>');
}
// end load data

for (let i=1; i<=10; i++){
  assignment_size.append('<option value=\"' + i + '\">' + i + '</option>');
}

function mark_done(e){
  li = e.parentElement;
  ul = li.parentElement;
  id = li.id;

  assignments[id].progress = assignments[id].size;
  localStorage.assignments = JSON.stringify(assignments);

  ul.removeChild(li);
}


let adding = false;

$('.new-task').each(function(index) {
  $(this).click(function(){
    if (adding) return;
    adding = true;
    add_new(this.parentElement); 
  });
});

let form = $('#new-task-form');
let error_text = $('p.error');
let cur_ul = undefined;

function add_new(ul){
  form.removeClass('hidden');
  cur_ul = ul;
}

form.submit((e) => {
  e.preventDefault();
  if (!adding) return;

  let error = '';
  if (assignment_name.value == '') error += "Must supply name\n";
  if (assignment_subject.value == '') error += "Must supply subject\n";
  if (assignment_due.value == '') error += "Must supply full due date & time\n";

  if (error != '') {
    error_text[0].innerText = error;
    error_text.removeClass('hidden');
    return;
  } 

  assignment = {
    id: localStorage.nxtId++,
    name: assignment_name.value,
    subject: assignment_subject.value,
    due: assignment_due.value,
    size: assignment_size[0].value,
    lvl: cur_ul.parentElement.className,
    progress: 0
  };

  assignments[assignment.id] = assignment;
  localStorage.assignments = JSON.stringify(assignments);

  adding = false;
  assignment_name.value = "";
  assignment_subject.value = "";
  assignment_due.value = "";
  assignment_size[0].value = "1";
  error_text.addClass('hidden');
  form.addClass('hidden');

  $(cur_ul).prepend('<li id=\"' + assignment.id + '\"><p>' + assignment.name + '</p>' + checkmark + '</li>');
});