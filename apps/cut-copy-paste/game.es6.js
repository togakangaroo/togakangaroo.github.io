function filterChange(cm, e) {
  if(!(
        (e.origin=='cut')
     || (e.origin=='copy')
     || (e.origin=='paste')
  ))
    e.cancel();
}

let lhs = `I'm coming out of my cage
And I've been doing just fine
Gotta gotta be damned
Because I want it all

It started out with a kiss
How did it end up like this?
It was only a kiss
It was only a kiss`;

let rhs = `I'm coming out of my cage
And I've been doing just fine
Gotta gotta be damned
Because I want it all

The killers rulez
It started out with a kiss
It was only a kiss
It was only a kiss`;


$(document).ready(() => {
  let setValue = (val) => (setValue) => setValue(val);
  $('#cut-copy-paste').mergely({
    cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work
    
    lhs_cmsettings: {  },
    rhs_cmsettings: { readOnly: true },
    lhs: setValue(lhs),
    rhs: setValue(rhs),
  }); 
});

let wait = (ms) => (fn) => setTimeout(fn, ms)
wait(100)(() =>
  $('#cut-copy-paste #compare-editor-lhs .CodeMirror')[0].CodeMirror.on('beforeChange', filterChange)
);
         
				