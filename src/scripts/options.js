
////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////

$('button').on('click',function(){
    chrome.storage.sync.set(
      {
        "value1": $('input').val()
      }
    );
});

chrome.storage.sync.get("value1", function(items) {
    // alert(items.value1);
});
