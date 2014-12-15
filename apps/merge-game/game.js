"use strict";

var _toArray = function (arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
};

var _slice = Array.prototype.slice;
(function ($, _) {
  var eq = function (val) {
    var vals = _slice.call(arguments, 1);

    return vals.length == 0 || ((val == vals[0]) && eq.apply(null, [val].concat(vals.slice(1))));
  };

  var setupMergeGame = function (gameElement, op, customFilter, mergelyOptions) {
    if (op === undefined) op = {};
    if (customFilter === undefined) customFilter = null;
    if (mergelyOptions === undefined) mergelyOptions = {};
    customFilter || (customFilter = function () {
      return true;
    });
    _.defaults(mergelyOptions, {
      cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work

      lhs_cmsettings: {},
      rhs_cmsettings: { readOnly: true } });

    var filters = _.pick(setupMergeGame.changeDetectors, _.intersection(_.keys(op), _.keys(setupMergeGame.changeDetectors)));
    var filterFns = _.values(filters).concat([customFilter]);
    var filterChange = function (cm, e) {
      if (_.any(filterFns, function (f) {
        return f(cm, e);
      })) return;
      e.cancel();
    };

    $(function () {
      return $.when($.get("seed.txt"), $.get("target.txt")).then(function (_ref, _ref3) {
        var _ref2 = _toArray(_ref);

        var lhs = _ref2[0];
        var _ref4 = _toArray(_ref3);

        var rhs = _ref4[0];
        var $game = $(gameElement);
        var setValue = function (val) {
          return function (setValue) {
            return setValue(val);
          };
        };

        $game.mergely(_.extend(mergelyOptions, {
          lhs: setValue(lhs),
          rhs: setValue(rhs) }));

        var cm = $game.find(".CodeMirror")[0].CodeMirror;
        cm.on("beforeChange", filterChange);
        cm.on("change", function () {
          return $game.mergely("diff").trim() === "" && $game.parent().toggleClass("won");
        });
      });
    });
  };

  setupMergeGame.changeDetectors = {
    allowCutCopyPaste: function (cm, e) {
      return _.contains(["cut", "copy", "paste"], e.origin);
    },
    allowUndoRedo: function (cm, e) {
      return _.contains(["undo", "redo"], e.origin);
    },
    allowEnter: function (cm, e) {
      return e.origin == "+input" && e.text.length == 2 && eq("", e.text[0], e.text[1]);
    } };

  window.setupMergeGame = setupMergeGame;
})($, _);
