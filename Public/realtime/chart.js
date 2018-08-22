Highcharts.setOptions({
    global: {
        useUTC: false
    }
});
function random(max, min){
    var a = [];
    for (var i = 0; i <= 72; i++) {
            a.push(Math.floor(Math.random()*(max - min)) + min);
    }
    console.log(a.join(", "));
};
random(110,40);
var PM =[96, 84, 105, 91, 51, 85, 78, 69, 91, 102, 56, 57, 62, 70, 77, 47, 44, 100, 96, 52, 78, 101, 65, 81, 55, 86, 106, 83, 96, 71, 77, 58, 41, 75, 109, 42, 89, 103, 101, 66, 44, 82, 69, 100, 51, 46, 45, 67, 42, 89, 70, 87, 69, 92, 104, 62, 50, 107, 57, 60, 60, 87, 109, 44, 52, 71, 72, 64, 64, 72, 99, 70];
var NO =[79, 57, 73, 54, 58, 53, 56, 75, 97, 64, 94, 61, 56, 63, 75, 64, 55, 71, 71, 56, 64, 55, 84, 73, 63, 61, 50, 60, 57, 77, 53, 95, 64, 70, 93, 69, 63, 85, 54, 79, 73, 65, 97, 99, 61, 97, 92, 96, 67, 72, 51, 51, 61, 73, 53, 88, 86, 52, 79, 69, 66, 83, 78, 94, 54, 86, 81, 83, 67, 53, 84, 55, 84];
var NO2 = [22, 55, 57, 25, 37, 27, 22, 33, 29, 53, 24, 34, 32, 59, 57, 41, 25, 41, 31, 35, 21, 39, 53, 52, 53, 27, 22, 54, 49, 58, 53, 48, 41, 50, 47, 26, 50, 51, 55, 56, 35, 40, 40, 22, 32, 37, 31, 31, 26, 22, 24, 25, 33, 42, 34, 50, 32, 54, 59, 29, 38, 58, 58, 54, 51, 46, 20, 28, 22, 24, 30, 38, 46];
var SO2 =[83, 102, 108, 78, 115, 110, 60, 69, 70, 91, 82, 88, 78, 85, 100, 90, 98, 103, 62, 86, 103, 111, 63, 78, 79, 75, 112, 108, 99, 61, 70, 69, 100, 102, 107, 71, 64, 101, 101, 94, 103, 113, 92, 98, 60, 81, 63, 83, 107, 116, 104, 70, 105, 66, 73, 75, 102, 72, 80, 106, 100, 82, 67, 94, 91, 72, 103, 89, 108, 117, 77, 69, 65];
var O3=[106, 59, 51, 90, 68, 79, 56, 72, 100, 57, 93, 91, 78, 73, 98, 78, 96, 88, 64, 78, 55, 73, 105, 97, 105, 87, 83, 70, 98, 108, 53, 62, 89, 70, 53, 95, 96, 58, 87, 57, 79, 56, 92, 105, 101, 54, 91, 98, 84, 84, 61, 96, 86, 64, 90, 87, 82, 102, 71, 92, 56, 93, 65, 104, 96, 105, 92, 100, 89, 79, 103, 101, 79];
var GIO=[105, 52, 75, 103, 90, 87, 46, 66, 100, 63, 87, 74, 52, 41, 65, 78, 80, 42, 103, 86, 47, 73, 76, 40, 56, 74, 77, 76, 94, 50, 73, 78, 101, 104, 65, 69, 109, 81, 70, 58, 86, 48, 105, 73, 48, 78, 51, 85, 55, 70, 83, 44, 82, 41, 109, 106, 87, 59, 98, 54, 54, 102, 81, 99, 101, 85, 87, 99, 75, 47, 64, 68, 108];
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


function AddChart(id, indexChange){
    var pointWidth = (document.getElementById(id).offsetWidth)/48;
    var now = (new Date()).getTime();
    var plotLine = returnPlotLines(now);
    var dulieu =[];
    switch(id){
        case 'pm': 
            dulieu = PM; 
            break;
        case 'no':
            dulieu = NO; 
            break;
        case 'no2':
            dulieu = NO2;
            break;
        case 'so2':
            dulieu = SO2;
            break;
        case 'o3':
            dulieu = O3;
            break;
        case 'gio':
            dulieu = GIO;
            break;
    }      

    dulieu = dulieu.map(function(value, index){
        return parseInt(value) + parseInt(indexChange);
    })
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
                        value:200,
                        color: '#FF9933'
                    },
                    {
                        value:300,
                        color: '#CC0033'
                    },
                    {
                       
                        color: '#660099'
                    },
                   
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
    } else if(101 < value && value <200){
        return {
            trangThai:"Kém",
            color:'#FF9933'
        }
    } else if(201< value && value <300){
        return {
            trangThai:"Xấu",
            color:'#CC0033'
        }
    } else{
        return {
            trangThai:"Rất xấu",
            color:'#660099'
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

function getDateTimeForLable(){
    var newDate = new Date();
    var day = newDate.getDate();
    var month = newDate.getMonth() + 1 ;
    var year = newDate.getFullYear();
    var hour = newDate.getHours();

    var text =  `${day}/${month}/${year} ${hour}h`;

    $("#lableTime").html(text);
};

AddChart('pm',0);
AddChart('no',0);
AddChart('no2',0);
AddChart('so2',0);
AddChart('o3',0);
AddChart('gio',0);
addAxis();
getDateTimeForLable();