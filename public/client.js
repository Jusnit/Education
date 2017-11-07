$(function() {
    $('button').on('click', function() {
        var score_sum = 0;
        $('div input:checked').each(function() {
            score_sum += Number($(this).attr('value'));
        });
        //現在score_sum就是勾選的checkbox 分數總合
        console.log("sum", score_sum);
        //result from 1-5;
        var result = 0;
        if (score_sum < 2) {
            result = 1;
        } else if (score_sum < 4) {
            result = 2;
        } else if (score_sum < 6) {
            result = 3;
        } else if (score_sum < 8) {
            result = 4;
        } else {
            result = 5;
        }
        $('progress').attr('value', Number($('progress').attr('value')) + 1);
        $.ajax({
            type: 'POST',
            url: '/send',
            data: 'type=' + result + '&score=' + score_sum
        }).done(function(res) {
            console.log('Result :', result);
        }).fail(function() {
            console.log('sending data fail...');
        });
    });
    // $("form.signup").on('submit',function(event){
    //   event.preventDefault();
    //   alert('click submit...');
    //   var form = $(this);
    //   var blockdata = form.serialize();
    //   $.ajax({
    //     type:'POST', url: '/signup', data:blockdata
    //   }).done(function(res){
    //     alert(res);
    //   }).fail(function(){
    //     alert('sign up fail...., please try again.')
    //   })
    // });
    // $('form.login').on('submit', function(event){
    //   event.preventDefault();
    //   var form = $(this);
    //   var data = form.serialize();
    //   $.ajax({
    //     type:'POST', url:'/login', data:data
    //   }).done(function(res){
    //     if(res == 0){
    //       alert('帳號或密碼錯誤');
    //     }else{
    //       location.href='/';
    //     }
    //   }).fail(function(){
    //     alert('帳號或密碼錯誤...');
    //   });
    // })
    // $('.dropdown-menu li a').click(function(event){
    //   //$(this) can be replaced with $(event.target)
    //   $(this).closest('.dropdown').find('.btn').text($(this).text());
    //   // $(".btn:first").text($(this).text());
    //   // $(".btn:first").val($(this).text());
    // });
    // $('button.gorecord').click(function(event){
    //   // event.preventDefault();
    //   $.ajax({
    //     type:'GET', url:'/record'
    //   }).done(function(res){
    //     // if(res.redirect){
    //     //   console.log('in res.redirect');
    //     //   window.location.href=res.redirect;
    //     // }
    //     $('html').html(res);
    //   });
    // });
    // $('.login').click(function(event){
    //   event.preventDefault();
    //   $.ajax({
    //     type:'POST', url:'/login', data:"user=new7@gmail.com&password=123456"
    //   });
    // });
    // $('#addnewrecord').click(function(){
    //   var eventname = $('#event-btn').text();
    //   var hour = $('#hour-btn').text();
    //   var minute = $('#minute-btn').text();
    //   var timespend = Number(hour) * 60 + Number(minute);
    //   console.log('hour:' + hour + ', timespend:' + timespend);
    //   var totaltime = 60 * 24;
    //   if(eventname === '選擇一項活動' || hour === '請選擇' || minute === '請選擇'){
    //     alert("好像遺漏了什麼項目!");
    //   }else{
    //     //insert new row into table.
    //     var markup = '<tr><td>' + eventname + '</td><td>' + '<span>'+hour+'</span>' +'小時' + '<span>'+minute+'</span>' + '分鐘</td></tr>';
    //     $('#event-time-tb').append(markup);
    //     //This block of code can extract value from the head row of table.
    //     // var keys = [];
    //     // $.each($('#event-time-tb').find('tr:first').find('th'), function(){
    //     //   keys.push($.trim($(this).text()));
    //     //   console.log($.trim($(this).text()));
    //     // });
    //     var datastring = 'event=' + eventname + '&' + 'time=' + timespend;
    //     $.ajax({
    //       type:'POST', url:'record', data:datastring
    //     }).done(function(res){
    //       alert('成功更新活動紀錄');
    //     }).fail(function(){
    //       alert('更新紀錄失敗');
    //     });
    //     var minutesum = Number(hour)*60 + Number(minute);
    //     var other = totaltime - minutesum;
    //     showPie([minutesum, other], [eventname, '其他']);
    //   }
    // })
    // function showPie(datas, labels){
    //   var data = {
    //   labels: labels,
    //   series: datas
    //   };

    //   var options = {
    //     labelInterpolationFnc: function(value) {
    //       return value[0]
    //     }
    //   };

    //   var responsiveOptions = [
    //     ['screen and (min-width: 640px)', {
    //       chartPadding: 30,
    //       labelOffset: 100,
    //       labelDirection: 'explode',
    //       labelInterpolationFnc: function(value) {
    //         return value;
    //       }
    //     }],
    //     ['screen and (min-width: 1024px)', {
    //       labelOffset: 10,
    //       chartPadding: 0
    //     }]
    //   ];

    // new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
    // // new Chartist.Pie('.ct-chart', {
    // //   //datas = []
    // // labels: labels,
    // // series: datas
    // // }, {
    // //   donut: true,
    // //   donutWidth: pieWidth,
    // //   startAngle: 270,
    // //   total: total,
    // //   showLabel: true
    // // });


});