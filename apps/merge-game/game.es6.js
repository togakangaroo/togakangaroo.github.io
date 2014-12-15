(($, _) => {
  let eq = (val, ...vals) => vals.length == 0 || ( (val == vals[0]) && eq.apply(null, [val].concat(vals.slice(1))) );

  let setupMergeGame = (gameElement, op = {}, customFilter = null, mergelyOptions = {}) => {
    customFilter || (customFilter = () => true);
    mergelyOptions = _.merge({
        cmsettings: { lineNumbers: true }, //actually mandatory that this key exists for lhs/rhs versions to work
          
        lhs_cmsettings: {  },
        rhs_cmsettings: { readOnly: true },
      }, mergelyOptions); 

    let filters = _.pick(setupMergeGame.changeDetectors, _.intersection(_.keys(op), _.keys(setupMergeGame.changeDetectors)))
    let filterFns = _.values(filters).concat([customFilter]);
    let filterChange = (cm, e) => { 
      if( _.any(filterFns, (f) => f(cm, e)) )
        return;
      e.cancel();
    }

    $(() => $.when($.get('seed.txt'), $.get('target.txt')).then(([lhs], [rhs]) => {
      let $game = $(gameElement);
      let setValue = (val) => (setValue) => setValue(val);

      $game.mergely(_.extend(mergelyOptions, {
        lhs: setValue(lhs),
        rhs: setValue(rhs),      
      })); 

      let cm = $game.find('.CodeMirror')[0].CodeMirror;
      cm.on('beforeChange', filterChange);
      cm.on('change', () => $game.mergely('diff').trim() === "" && $game.parent().toggleClass('won'))
    }) );  				
  };

  setupMergeGame.changeDetectors = {
    allowCutCopyPaste: (cm, e) => _.contains(['cut', 'copy', 'paste'], e.origin),
    allowUndoRedo: (cm, e)  => _.contains(['undo', 'redo'], e.origin),
    allowEnter: (cm, e) => e.origin=='+input' && e.text.length == 2 && eq("", e.text[0], e.text[1]),
  };

  window.setupMergeGame = setupMergeGame;
})($, _)
