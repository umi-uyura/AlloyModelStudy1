'use strict';

var memo = Alloy.Collections.memo;

function doOpen() {
  memo.fetch();
}

function addText() {
  var txt = $.memoText.getValue();

  var td = Alloy.createModel('memo', {
    contents: txt
  });

  memo.add(td);
  td.save();
  memo.fetch();
}

$.index.open();
