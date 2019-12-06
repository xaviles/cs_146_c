let txt = $('textarea')[0];
let notes = $('.notes');

$('#new-note').click((e) => {
  let nw = '<div class="note"><p>' + txt.value + '</p></div>';
  notes.append(nw);
  txt.value = '';
});