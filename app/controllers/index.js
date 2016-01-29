'use strict';

var dialogs = require('alloy/dialogs');

var memos = Alloy.Collections.memo;

function doOpen() {
  memos.fetch();
}

function addText() {
  var txt = $.memoText.getValue();

  var m = Alloy.createModel('memo', {
    contents: txt
  });

  m.save();
  memos.add(m);
  memos.fetch();

  $.memoText.setValue('');
}

function clickItem(e) {
  var secIdx = e.sectionIndex;
  var itemIdx = e.itemIndex;
  var itemId = e.itemId;
  var text = $.memoList.sections[e.sectionIndex].items[e.itemIndex].properties.title;

  dialogs.confirm({
    title: 'Do you want to delete ?',
    message: '"' + text + '"',
    callback: function() {
      Ti.API.debug('memos = ' + JSON.stringify(memos));

      Ti.API.debug('Click id = ' + itemId);
      Ti.API.debug('Type check = ' + Object.prototype.toString.call(itemId));

      if (OS_ANDROID) {
        itemId = parseInt(itemId);
      }

      var m = memos.where({id: itemId});

      Ti.API.debug('m = ' + JSON.stringify(m));

      if (m.length) {
        m[0].destroy();

        Ti.API.debug('memos = ' + JSON.stringify(memos));
      }
    }
  });
}

$.index.open();
