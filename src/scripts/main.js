// chrome.storage.sync.get("value1", function(items) {
    // alert(items.value1);
// });
console.log( chrome.i18n.getMessage("locale") );
console.log( chrome.i18n.getMessage("test") );

$('#chrome-link a').on('click',function(){
    chrome.tabs.update({ url: 'chrome://'+$(this).attr('href') });
});

////////////////////////////////////////////////////////////////
// FORM
////////////////////////////////////////////////////////////////
// show favicon
$('#form ul button').each(function(){
    if( $(this).attr('url') == '%s' ){
        $(this).prepend('<img src="images/url.ico">');
    }else{
        var domain = $(this).attr('url').match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
        // console.log(domain);
        domain = domain[2]+domain[3];
        if(domain=='www.google.co.jp' || domain=='www.google.com')
            domain = 'google.com';
        $(this).prepend('<img src="http://www.google.com/s2/favicons?domain='+domain+'">');
    }
});

// start search
$('#form ul button').on('click',function(){
    var q = $('#form textarea').val();
    var url =$(this).attr('url').replace(/%s/g, q);
    location.href= url;
    // console.log(url);
});

// Web Speech API
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var rec = new webkitSpeechRecognition();
rec.lang = 'ja';
rec.interimResults = true;
// 開始用関数
function record(){
    rec.start();
    $('#form .rec').html('<i class="material-icons">mic</i>')
}
$('#form .rec').on('click',function(){ record(); });
// 入力中の処理
rec.onsoundstart = function(){
    $('#form .rec').html('<i class="material-icons inputting">mic</i>')
};
rec.onnomatch = function(){ $('#form .rec').html('try again') };
rec.onerror= function(){ $('#form .rec').html('error') };
rec.onsoundend = function(){
    $('#form .rec').html('<i class="material-icons">mic_none</i>')
};
// 入力処理
rec.onresult = function(event){
    var results = event.results;
    for (var i = event.resultIndex; i<results.length; i++){
        if(results[i].isFinal)
            $('#form textarea').text(results[i][0].transcript);
        else
            $('#form textarea').text(results[i][0].transcript)
    }
};


// Short Cut Key
$(window).keydown(function(e){
    if(event.altKey){
        $('#form textarea').blur(); //altキーが押されたらフォーカスを外す
        if( 49 <= e.keyCode && e.keyCode <= 57 ){
            var key = event.keyCode - 49;
            $('#form ul button:eq('+key+')').click();
        }else if(e.keyCode == 48){
            record();
        }
    }else if(e.keyCode === 13){
        // Enterが押された場合
        if( $('#form textarea').val().match(/^(https?|ftp):\u002f\u002f.+$/) )
            //URLが入力されていた場合
            location.href = $('#form textarea').val();
        else
            $('#form ul button:eq(0)').click();
    }
});
$(window).keyup(function(e){
    if(e.keyCode == 18)
        $('#form textarea').focus();
        //altキーが離されたらフォーカスを戻す
});




////////////////////////////////////////////////////////////////
// footer
////////////////////////////////////////////////////////////////
// clock

var date = { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit' };
var time = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

// $('#clock .date').html( Intl.DateTimeFormat('en-US', date).format( new Date() ) );
$('#clock .date').html( Intl.DateTimeFormat('ja-JP', date).format( new Date() ) );

setInterval(function(){
    // $('#clock .time').html( Intl.DateTimeFormat('en-US', time).format( new Date() ) );
    $('#clock .time').html( Intl.DateTimeFormat('ja-JP', time).format( new Date() ) );
}, 1000);

// weather
// var apiKey = '58a0ba5dce685a8b6193c166e4c20bfd';
// if( navigator.geolocation ){
//
//     navigator.geolocation.getCurrentPosition(
//
//         function( position ){
//
//             var data = position.coords ;
//             var lat = data.latitude ;
//             var lng = data.longitude ;
//
//             // window.open('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&APPID='+apiKey);
//         }
//     );
// }
