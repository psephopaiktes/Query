
// CLOCK
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

    $('#clock .time').text( h+' : '+m+' : '+s );
    $('#clock .date').text( W+', '+M+'/'+D );

}, 1000);

// FORM
$('#form button').on('click',function(){
    var q = $('#form textarea').val();
    var url =$(this).attr('url').replace(/%s/g, q);
    location.href= url;
});
// Short Cut Key
$(window).keydown(function(e){
    if(event.altKey){
        $('#form textarea').blur();
        if( 48 <= e.keyCode && e.keyCode <= 57 ){
            var key = event.keyCode - 49;
            $('#form button:eq('+key+')').click();
        }
    }else if(e.keyCode === 13){
        $('#form button:eq(0)').click();
    }
});
