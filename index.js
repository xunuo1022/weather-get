$(function () {
  $(document).ready(function () {
    if (localStorage.getItem('city')) $('#ipt-city').val(localStorage.getItem('city'));
  });
  $('#get-weather').on('click', function () {
    if ($('#ipt-city').val().length != 0) {
      var city = $('#ipt-city').val();
      var url = 'http://wthrcdn.etouch.cn/weather_mini?city=' + city;
      $.ajax({
        type: 'GET',
        url: url,
        success: function (res) {
          var result = JSON.parse(res);
          if (result['status'] != 1002) {
            localStorage.setItem('city', $('#ipt-city').val());
            $('.yesterday').text('昨天：' + result['data']['yesterday']['date'] +
              '  ' + result['data']['yesterday']['high'] + result['data']['yesterday']['low'] +
              '  天气是：' + result['data']['yesterday']['type']
            );
            $('.today').text('今天：' + result['data']['forecast'][0]['date'] +
              '  ' + result['data']['forecast'][0]['high'] +
              '  ' + result['data']['forecast'][0]['low'] +
              '  天气是：' + result['data']['forecast'][0]['type']
            );
            $('.tip').text('提示：' + result['data']['ganmao']);
          } else alert('输入城市名称错误');
        }
      })
    } else alert('请输入城市名');
  });
})
