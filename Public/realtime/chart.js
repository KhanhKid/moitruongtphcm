Highcharts.setOptions({
    global: {
        useUTC: false
    }
});



function AddChart(id, minV, maxV){
    var pointWidth = (document.getElementById(id).offsetWidth)/48;
    var dulieu =[];
    for (var i = 0; i <= 72; i++) {
        dulieu.push(Math.floor(Math.random()*maxV) + minV);
    }

    Highcharts.chart( id, {
        chart: {
            type: 'column',
            animation: Highcharts.svg, // don't animate in old IE
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    // setInterval(function () {
                    //     var x = (new Date()).getTime(),// current time
                    //     y = Math.random();
                    //     console.log(x);
                    //     series.addPoint([x, y], true, true);
                    // }, 3600000);
                }
            },
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
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
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
            name: id,
            data: (function () {
                // generate an array of random data
                var data = [],
                time = (new Date()).getTime(),
                hour = (new Date()).getHours(),
                i; 
                for (i = - 47; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 60*60*1000,
                        y: dulieu[i+48+(24-hour)]
                    });
                }
                return data;
            }())
        }],
        plotOptions:{
            column:{
                zones:[
                    {
                        value:50,
                        color: '#009966'
                    },
                    {
                        value:100,
                        color: '#FFDE33'
                    },
                    {
                        value:150,
                        color: '#FF9933'
                    },
                    {
                        value:200,
                        color: '#CC0033'
                    },
                    {
                        value:300,
                        color: '#660099'
                    },
                    {
                        color: '#7E0023'
                    }
                ],
                pointPadding:0,
                borderWidth:0.5,
                pointWidth: pointWidth

            }
            
        }

    });
    var div =  $(`#${id}`);
    var chart = div.highcharts();

    var maxValue = Highcharts.numberFormat(chart.yAxis[0].dataMax, 0);
    var minValue = Highcharts.numberFormat(chart.yAxis[0].dataMin, 0);

    var data = chart.yAxis[0].series[0].processedYData;
    var currentValue = Highcharts.numberFormat(data[data.length -1],0);
    div.parent().parent().find('.minValue').text(minValue);
    div.parent().parent().find('.maxValue').text(maxValue);
    div.parent().parent().find('.currentValue').text(currentValue);

    if (id =='pm') {
        var data = chart.yAxis[0].series[0].processedYData;
        var AQI = Highcharts.numberFormat(data[data.length -1],0);
        $("#aqiValue").text(AQI);
        var date =  chart.xAxis[0];
        console.log(date);
        var obj = returnValue(AQI);
        console.log(obj);
        if (obj) {
            $("#trangthaiAQI").text(obj.trangThai);
            $("#trangthaiAQI").css("color",obj.color);
            $("#aqiValue").css("background-color",obj.color);
        }
    }

}

function returnValue(AQI){
    var value = parseInt(AQI);
    if ( value < 50) {
        return {
            trangThai:"Tốt",
            color:"#009966"
        };
    } else if(51 < value && value <100){
        return {
            trangThai:"Trung bình",
            color:'#FFDE33'
        };
    } else if(101 < value && value <150){
        return {
            trangThai:"Kém",
            color:'#FF9933'
        }
    } else if(151 < value && value <200){
        return {
            trangThai:"Xấu",
            color:'#CC0033'
        }
    } else if(201 < value && value <300){
        return {
            trangThai:"Rất xấu",
            color:'#660099'
        }
    } else{
         return {
            trangThai:"Nguy hại",
            color:'#7E0023'
        }
    }

}

AddChart('pm',20,110);
AddChart('no',50,160);
AddChart('no2',5,110);
AddChart('so2',70,160);
AddChart('o3',20,100);
AddChart('gio',30,100);