
function  addChartWind(id, dataWind){

   Highcharts.chart(id, {
      title: {
         text: ''
      },
      chart:{
         marginLeft:0,
         marginRight:0,
         marginTop:0,
         marginBottom:40
      },
      xAxis: {
         type: 'datetime',
         offset: 40
      },

      plotOptions: {
         series: {
            // pointStart: Date.UTC(2017, 0, 29),
            pointInterval: 36e5,
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
            keys: ['y', 'rotation'], // rotation is not used here
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

function returnWeatherDay(long, lat){
   if (long && lat) {
      $.ajax({
         url: 'https://api.openweathermap.org/data/2.5/forecast/daily',
         processData: false,
         contentType: false,
         data: {
            lon: long,
            lat:lat,
            cnt:10,
            APPID: 'bd5e378503939ddaee76f12ad7a97608'
         },
         success: function(WeatherDay){
            returnWeatherHours(WeatherDay,106.669,10.75);
         }
      });
   }  
};


function returnWeatherHours(dataDay, long,lat){
  if (long && lat) {
      $.ajax({
         url: 'https://api.openweathermap.org/data/2.5/forecast',
         processData: false,
          contentType: false,
         data: {
            lon: long,
            lat:lat,
            APPID: 'bd5e378503939ddaee76f12ad7a97608'
         },
         success: function(dataHour){
            loadChart(dataDay, dataHour);
         }
      });
   }
}
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
}

function convertCelsius(kelvin){
   if (kelvin) {
      var celsius = Math.round((kelvin - 273.15),2);
      return celsius + "\xB0C";
   }
   return null;
}

returnWeatherDay(106.669,10.75);


function loadChart(dataDay, dataHour){
   if (dataDay && dataDay.list) {
   dataDay.list.forEach(function(item, index){
      if (index <= 5) {
         var date = convertDate(item.dt);
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
         }
         //Vẽ biễu đồ

         if (dataHour && dataHour.list ) {
            var dataWind = [];  
            var dataTemp =[];  
            dataHour.list.forEach(function(giatri, stt ){
               var ngay = new Date(giatri.dt * 1000).getDate();
               if ( ngay == date.Date) {
                  var objWind = giatri.wind;
                  objWind.time = giatri.dt;
                  dataWind.push(objWind);

                  var temp =  Math.round((giatri.main.temp - 273.15),2);
                  dataTemp.push({
                     x: giatri.dt*1000,
                     y: temp
                  })
               }
            });
            addChartWind(`gio_${index}`, dataWind);
            addChartTemp(`temp_${index}`, dataTemp);
         }
      }
   })
};
}










