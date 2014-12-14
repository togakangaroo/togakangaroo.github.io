let eq = (val, ...vals) => vals.length == 0 || ( (val == vals[0]) && eq.apply(null, [val].concat(vals.slice(1))) );
function filterChange(cm, e) {
  if(!(
        (e.origin=='cut')
     || (e.origin=='copy')
     || (e.origin=='paste')
     || (e.origin=='undo')
     || (e.origin=='redo')
     || (e.origin=='+input' && e.text.length == 2 && eq("", e.text[0], e.text[1])) //enter key
  ))
    e.cancel();
}

$(() => $.when($.get('seed.txt'), $.get('target.txt')).then(([lhs], [rhs]) => {
  let setValue = (val) => (setValue) => setValue(val);

  $('#cut-copy-paste').mergely({
    cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work
      
    lhs_cmsettings: {  },
    rhs_cmsettings: { readOnly: true },
    lhs: setValue(lhs),
    rhs: setValue(rhs),
  }); 

  let wait = (ms) => (fn) => setTimeout(fn, ms)
  wait(100)(() =>
    $('#cut-copy-paste-editor-lhs .CodeMirror')[0].CodeMirror.on('beforeChange', filterChange)
  );
}) );  				