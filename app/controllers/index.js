'use strict';

var dialogs = require('alloy/dialogs');

var memos = Alloy.Collections.memo;

function doOpen() {
  memos.fetch();
}

function addText() {
  var txt = $.memoText.getValue();

  var td = Alloy.createModel('memo', {
    contents: txt
  });

  memos.add(td);
  td.save();
  memos.fetch();

  $.memoText.setValue('');
}

function clickItem(e) {
  var secIdx = e.sectionIndex;
  var itemIdx = e.itemIndex;
  var itemId = e.itemId;
  var text = $.memoList.sections[e.sectionIndex].items[e.itemIndex].properties.title;

  dialogs.confirm({
    title: 'Delete ok?',
    message: '"' + text + '"',
    callback: function() {
      Ti.API.debug('memo = ' + JSON.stringify(memos));

      Ti.API.debug('Click id = ' + itemId);

      // var m = memos.findWhere({id: itemId});
      var m = memos.findWhere({contents: text});
      // var mdl = Alloy.createModel('memo', {id: itemId});
      // var m = memos.where(mdl);
      Ti.API.debug('m = ' + JSON.stringify(m));

      // for ios
      //
      // Ti.API.debug('m = ' + m[0].id);
      //
      // Ti.API.debug(memos.toJSON());
      //
      // memos.remove(m);
      //
      // Ti.API.debug(memos.toJSON());

      if (m) {
        Ti.API.debug('model 1 - ' + JSON.stringify(memos));
        Ti.API.debug('model 1-2 - ' + JSON.stringify(m));
        // Ti.API.debug('model 1-3 - ' + JSON.stringify(m[0]));
        // Ti.API.debug('model 1-4 - ' + JSON.stringify(m[0].id));

        memos.remove(m);
        //m.destory();

        Ti.API.debug('model 2 - ' + JSON.stringify(memos));
      }
    }
  });
}

$.index.open();
