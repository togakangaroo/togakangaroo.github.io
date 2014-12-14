"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var _slice = Array.prototype.slice;
var eq = function (val) {
  var vals = _slice.call(arguments, 1);

  return vals.length == 0 || ((val == vals[0]) && eq.apply(null, [val].concat(vals.slice(1))));
};
function filterChange(cm, e) {
  if (!((e.origin == "cut") || (e.origin == "copy") || (e.origin == "paste") || (e.origin == "undo") || (e.origin == "redo") || (e.origin == "+input" && e.text.length == 2 && eq("", e.text[0], e.text[1])) //enter key
  )) e.cancel();
}

$(function () {
  return $.when($.get("seed.txt"), $.get("target.txt")).then(function (_ref, _ref3) {
    var _ref2 = _toArray(_ref);

    var lhs = _ref2[0];
    var _ref4 = _toArray(_ref3);

    var rhs = _ref4[0];
    var $game = $("#cut-copy-paste");
    var setValue = function (val) {
      return function (setValue) {
        return setValue(val);
      };
    };

    $game.mergely({
      cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work

      lhs_cmsettings: {},
      rhs_cmsettings: { readOnly: true },
      lhs: setValue(lhs),
      rhs: setValue(rhs) });

    var cm = $("#cut-copy-paste-editor-lhs .CodeMirror")[0].CodeMirror;
    cm.on("beforeChange", filterChange);
    cm.on("change", function () {
      return $game.mergely("diff").trim() === "" && $game.parent().toggleClass("won");
    });
  });
});
