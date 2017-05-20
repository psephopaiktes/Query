
////////////////////////////////////////////////////////////////
// FORM
////////////////////////////////////////////////////////////////
// show favicon
$('#form ul button').each(function(){
    var domain = $(this).attr('url').match(/^(.*?:\/\/)(.*?)([a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})[\:[0-9]*]?([\/].*?)?$/i);
    console.log(domain);
    domain = domain[2]+domain[3];
    if(domain=='www.google.co.jp' || domain=='www.google.com')
        domain = 'google.com';
    $(this).prepend('<img src="http://www.google.com/s2/favicons?domain='+domain+'">');
});
// start search
$('#form button').on('click',function(){
    var q = $('#form textarea').val();
    var url =$(this).attr('url').replace(/%s/g, q);
    location.href= url;
});
// Web Speech API
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var rec = new webkitSpeechRecognition();
rec.lang = 'ja';
function record(){ rec.start(); }
rec.addEventListener('result', function(event){
    $("#form textarea").val(event.results.item(0).item(0).transcript);
}, false);

// Short Cut Key
$(window).keydown(function(e){
    if(event.altKey){
        $('#form textarea').blur(); //altキーが押されたらフォーカスを外す
        if( 49 <= e.keyCode && e.keyCode <= 57 ){
            var key = event.keyCode - 49;
            $('#form button:eq('+key+')').click();
        }else if(e.keyCode == 48){
            record();
        }
    }else if(e.keyCode === 13){
        $('#form button:eq(0)').click();
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
var day = new Array("Sun","Mon","Thu","Wed","Thr","Fri","Sat");
setInterval(function(){

    var now = new Date();
    var M = now.getMonth() + 1;
    var D = now.getDate();
    var W = day[now.getDay()];
    var h = now.getHours();
    var m = now.getMinutes();
    var s = now.getSeconds();

    if(M<10) M = "0" + M;
    if(D<10) D = "0" + D;
    if(h<10) h = "0" + h;
    if(m<10) m = "0" + m;
    if(s<10) s = "0" + s;

    $('#clock .time').html( h+':'+m+':'+s );
    $('#clock .date').html( W+', '+M+'/'+D );

}, 1000);
