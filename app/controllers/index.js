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

      Ti.API.debug('Type check = ' + Object.prototype.toString.call(1));
      Ti.API.debug('Type check = ' + Object.prototype.toString.call(itemId));

      if (OS_ANDROID) {
        itemId = parseInt(itemId);
      }

      var m = memos.findWhere({id: itemId});

      Ti.API.debug('m = ' + JSON.stringify(m));

      if (m) {
        Ti.API.debug('model 1 - ' + JSON.stringify(memos));
        Ti.API.debug('model 1-2 - ' + JSON.stringify(m));

        m.destroy();

        Ti.API.debug('model 2 - ' + JSON.stringify(memos));
      }
    }
  });
}

$.index.open();
