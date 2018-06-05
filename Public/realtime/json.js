
function returnWeatherDay(long, lat){
   if (long && lat) {
      $.ajax({
         url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
         data: {
            lon: long,
            lat:lat,
            cnt:10,
            APPID: 'bd5e378503939ddaee76f12ad7a97608'
         },
         success: function(data){
            return data
         }
      });
   } 
};


function returnWeatherHours(long,lat){
  if (long && lat) {
      $.ajax({
         url: 'https://api.openweathermap.org/data/2.5/forecast',
         data: {
            lon: long,
            lat:lat,
            APPID: 'bd5e378503939ddaee76f12ad7a97608'
         },
         success: function(data){
            return data
         }
      });
   }   
};

function convertDate(time){
   if (time) {
      var date = new Date(time*1000);
      var Day =['SUN', 'MON','TUE','WEB','THU','FRI','SAT'];
      var FullDay =["Chủ nhật","Thứ Hai","Thứ Ba","Thứ Tư","Thứ Năm","Thứ Sáu","Thứ Bảy"];
      return{
         Day: Day[date.getDay()],
         FullDay: FullDay[date.getDay()],
         Date: date.getDate(),
         Month: date.getMonth(),
         Year: date.getFullYear()
      }
   }
   return null;
};

function convertCelsius(kelvin){
   if (kelvin) {
      var celsius = Math.round((kelvin - 273.15),2);
      return celsius + "\xB0C";
   }
   return null;
};

var data = returnWeatherDay(106.669,10.75);
console.log(data)
var dataHour = returnWeatherHours(106.669,10.75);
console.log(dataHour);
if (data && data.list) {
   data.list.forEach(function(item, index){
      if (index <= 5) {
         var date = convertDate(item.dt);
         var startHour = new Date(date.Year, date.Month, date.Date, 1);
         
         var divNgay  = $(`#ngayDuBao_${index}`);
         var divChart = $(`#chartDuBao_${index}`);
         //Bind dữ liệu ngày
         if (date && divNgay && divChart) {
            divNgay.find('.tenNgay').text(date.Day + " " + date.Date);
            var tempMin = convertCelsius(item.temp.min);
            var tempMax = convertCelsius(item.temp.max);
            divNgay.find('.tempMin').text(tempMin);
            divNgay.find('.tempMax').text(tempMax);

            divChart.find('.chart-title').text(date.FullDay + " " + date.Date);

            var chart = $("#pm").highcharts();
            var data = chart.yAxis[0].series[0].processedYData;
            var currentAQI = Highcharts.numberFormat(data[data.length -1],0);
            var intAQI = parseInt(currentAQI);
            var random = Math.floor(Math.random()*(intAQI+10)) + (intAQI-10);
            var obj = returnValue(random);
            divNgay.find("span.glyphicon").css("color",obj.color);

            var weather = item.weather[0];
            console.log(weather);
            divChart.find('.weather').append("<img src='img/"+weather.icon+".png'></img>");
            divChart.find('.weather').append("<p>"+ tranlateWeather(weather.description)+"</p>")

         }
         //Vẽ biễu đồ

         if (dataHour && dataHour.list ) {
            var dataWind = [];  
            var dataTemp =[]; 
            dataHour.list.forEach(function(giatri, stt ){
               var ngay = new Date(giatri.dt * 1000).getDate();
               if ( ngay == date.Date) { 
                  var objWind = giatri.wind;
                  objWind.time = giatri.dt*1000;
                  dataWind.push(objWind);

                  var temp =  Math.round((giatri.main.temp - 273.15),2);
                  dataTemp.push({
                     x: giatri.dt*1000,
                     y: temp
                  })
               }
            });
            addChartWind(`gio_${index}`, setupDataWind(dataWind, startHour));
            addChartTemp(`temp_${index}`, setupDataTemp(dataTemp, startHour));
         }
         //Bind Weather
        
      }
   })
};

function setupDataTemp(dataTemp, startHour){
   var res =[];
   for (var i = 0 ; i < 8; i++) {
      var time = startHour.getTime() + i * 3*60*60*1000;
      var value;
      for(var j =0; j< dataTemp.length; j++){
         if (time == dataTemp[j].x ) {
            value = dataTemp[j].y
            break;
         } else{
            value = null;
         }
      }      
      res.push({
         x: time,
         y: value
      })
   }
   return res;
}

function setupDataWind(dataWind, startHour){
   var res =[];
   for (var i = 0 ; i < 8; i++) {
      var time = startHour.getTime() + i * 3*60*60*1000;
      var speed, deg;
      for(var j =0; j< dataWind.length; j++){
         if (time == dataWind[j].time) {
            speed = dataWind[j].speed;
            deg = dataWind[j].deg;
            break;
         } else{
            speed = null;
            deg = null;
         }
      }      
      res.push({
         speed: speed,
         deg: deg,
         time: time
      })
   }
   console.log(res)
   return res;
}
function  addChartWind(id, dataWind){
   Highcharts.chart(id, {
      title: {
         text: ''
      },
      chart:{
         marginLeft:0,
         marginRight:0,
         marginTop:0,
         marginBottom:35
      },
      xAxis: {
         type: 'datetime',
         offset: 35
      },

      plotOptions: {
         series: {
            pointStart: dataWind[0].time,
            pointInterval: 3*36e5,
            marker:{
               enabled:false
            }
         }
      },

      series: [
         {
            type: 'windbarb',
            data: (function(){
              var data = [];
               for (var i = 0; i < dataWind.length; i++ ) {
                  data.push([dataWind[i].speed, dataWind[i].deg ])
               }
               return data;
            }()),
            name: 'Wind',
            color: Highcharts.getOptions().colors[1],
            showInLegend: false,
            tooltip: {
               valueSuffix: ' m/s'
            }
         }, 
         {
            type: 'area',
            keys: ['y', 'x'], // rotation is not used here
            data:(function(){
               var data = [];
               for (var i = 0; i < dataWind.length; i++ ) {
                  data.push([dataWind[i].speed, dataWind[i].time ])
               }
               return data;
            }()),
            showInLegend: false,
            color: Highcharts.getOptions().colors[0],
            fillColor: {
               linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
               stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [
                       1,
                       Highcharts.color(Highcharts.getOptions().colors[0])
                           .setOpacity(0.25).get()
                  ]
               ]
            },
            name: 'Wind speed',
            tooltip: {
               valueSuffix: ' m/s'
            }
         }
      ]
   });
}


function addChartTemp(id, dataTemp){
   var pointWidth = (document.getElementById(id).offsetWidth)/8;
   Highcharts.chart( id, {
        chart: {
            type: 'areaspline',           
            marginTop:0,
            marginLeft:-1,
            marginRight:0,
            marginBottom:0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: ''
            },          
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                Highcharts.dateFormat('%Y-%m-%d %Hh', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Nhiệt độ',
            data: dataTemp,
            fillColor: {
               linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
               stops: [
                  [0, '#FF9933'],
                  [
                       1,
                       Highcharts.color('#FF9933')
                           .setOpacity(0.25).get()
                  ]
               ]
            },
            color:'#CC0033'
        }],
        plotOptions: {
         series: {
            // pointStart: Date.UTC(2017, 0, 29),

            marker:{
               enabled:false
            },
         },

      },

    });

}

function tranlateWeather(en){
   var res;
   switch (en){
      case 'light rain':
         res =  'Mưa nhỏ';
         break;
      case 'moderate rain':
         res = 'Mưa vừa';
         break;
      case 'heavy intensity rain':
         res = 'Mưa nặng hạt';
         break;
      case 'very heavy rain':
         res = 'Mưa rất to';
         break;
      case 'shower rain':
         res = 'Mưa phùn';
         break;
      case 'ragged shower rain':
         res = 'Mưa rãi rác vài nơi';
         break;
      case 'shower rain':
         res = 'Mưa phùn';
         break;
      case 'clear sky':
         res = 'Trời trong';
         break;
      case 'few clouds':
         res = 'Ít mây';
         break;
      case 'scattered clouds':
         res = 'Mây phân tán';
         break;
      case 'overcast clouds':
         res = 'Có mây đen';
         break;
      case 'tornado':
         res = 'Có lốc xoáy';
         break;
      case 'tropical storm':
         res = 'Có bão';
         break;
      case 'd clouds':
         res = 'Ít mây';
         break;
      default:
         res = en;
         break;
   }
    return res;
}



