Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
var PM =[96, 84, 105, 91, 51, 85, 78, 69, 91, 102, 56, 57, 62, 70, 77, 47, 44, 100, 96, 52, 78, 101, 65, 81, 55, 86, 106, 83, 96, 71, 77, 58, 41, 75, 109, 42, 89, 103, 101, 66, 44, 82, 69, 100, 51, 46, 45, 67, 42, 89, 70, 87, 69, 92, 104, 62, 50, 107, 57, 60, 60, 87, 109, 44, 52, 71, 72, 64, 64, 72, 99, 70];
function returnPlotLines(now){
    var res = [];
    for (var i = - 47; i <= 0; i ++) {
        var dt = now + i * 60*60*1000;
        var date = new Date(dt);
        var hour = date.getHours();
        if ( hour == 0) {
            res.push({
                time : dt,                
                hour :hour
            });
        } else if(date.getHours() == 12){
            res.push({
                time :dt,                
                hour : hour
            });
        }
    }
    return res;
}


function AddChart(id, minV, maxV){
    var pointWidth = (document.getElementById(id).offsetWidth)/48;
    var now = (new Date()).getTime();
    var plotLine = returnPlotLines(now);
    var dulieu =[];
    if (id == 'pm') {
       dulieu = PM; 
    } else{
        for (var i = 0; i <= 72; i++) {
            dulieu.push(Math.floor(Math.random()*maxV) + minV);
        }
    };    

    Highcharts.chart( id, {
        chart: {
            type: 'column',
            animation: Highcharts.svg, // don't animate in old IE
            events: {
                load: function () {
                    var series = this.series[0];
                    // setInterval(function () {
                    //     var x = (new Date()).getTime(),// current time
                    //     y = Math.random();
                    //     console.log(x);
                    //     series.addPoint([x, y], true, true);
                    // }, 3600000);
                }
            },
            marginTop: (id =='pm') ? 25 : 1,
            marginLeft:-1,
            marginRight:0,
            marginBottom: 0
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            plotLines:(function(){
                var data =[];
                var Day = ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
                for (var i=0; i < plotLine.length ; i++ ){
                    if (plotLine[i].hour == 0) {
                        data.push({
                            color:'#808080',
                            value: plotLine[i].time ,
                            dashStyle:'ShortDash',
                            label: {
                                text: Day[(new Date(plotLine[i].time)).getDay()],
                                verticalAlign:'top',
                                align:'center',
                                rotation:0,
                                y: -5,
                            },
                            width:1,
                        });
                    } else{
                        data.push({
                            color:'green',
                            label:{
                                text: '12:00',
                                verticalAlign:'top',
                                align:'center',
                                rotation:0,
                                y: -5,
                            },
                            value: plotLine[i].time ,
                            dashStyle:'Dot',
                            width:1,
                        })
                    }
                }
                return data;
            }())
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
        var obj = returnValue(AQI);
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



function addAxis(){
    var pointWidth = (document.getElementById('axis').offsetWidth)/48;
    var now = (new Date()).getTime();
 
    Highcharts.chart( 'axis', {
        chart: {
            type: 'column',
            animation: Highcharts.svg, // don't animate in old IE
            events: {
                load: function () {
                    var series = this.series[0];
                }
            },
            marginTop:0,
            marginLeft:-1,
            marginRight:0,
            marginBottom: 40
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
            // plotLines:[
            //     {
            //         color:'red',
            //         value:1,
            //         width:2,
            //         zIndex:4
            //     },
            // ]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
            data: (function () {
                var data = [],
                time = (new Date()).getTime(),
                i; 
                for (i = - 47; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 60*60*1000,
                        y: 0
                    });
                }
                return data;
            }())
        }],
        plotOptions:{
            column:{                
                pointPadding:0,
                borderWidth:0.5,
                pointWidth: pointWidth
            }            
        }
    });
}
AddChart('pm',20,110);
AddChart('no',50,160);
AddChart('no2',5,110);
AddChart('so2',70,160);
AddChart('o3',20,100);
AddChart('gio',30,100);
addAxis();