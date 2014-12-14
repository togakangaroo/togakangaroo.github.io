"use strict";

function filterChange(cm, e) {
  if (!((e.origin == "cut") || (e.origin == "copy") || (e.origin == "paste"))) e.cancel();
}

var lhs = "I'm coming out of my cage\nAnd I've been doing just fine\nGotta gotta be damned\nBecause I want it all\n\nIt started out with a kiss\nHow did it end up like this?\nIt was only a kiss\nIt was only a kiss";

var rhs = "I'm coming out of my cage\nAnd I've been doing just fine\nGotta gotta be damned\nBecause I want it all\n\nThe killers rulez\nIt started out with a kiss\nIt was only a kiss\nIt was only a kiss";


$(document).ready(function () {
  var setValue = function (val) {
    return function (setValue) {
      return setValue(val);
    };
  };
  $("#cut-copy-paste").mergely({
    cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work

    lhs_cmsettings: {},
    rhs_cmsettings: { readOnly: true },
    lhs: setValue(lhs),
    rhs: setValue(rhs) });
});

var wait = function (ms) {
  return function (fn) {
    return setTimeout(fn, ms);
  };
};
wait(100)(function () {
  return $("#cut-copy-paste #compare-editor-lhs .CodeMirror")[0].CodeMirror.on("beforeChange", filterChange);
});
