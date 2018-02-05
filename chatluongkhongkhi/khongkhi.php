<?php
  $username ='';
  if(isset($_GET['username'])){
    $username= $_GET['username'];
  } 
?>

<div id= " container-map-chart" style="margin-top: 30px">

<div class="col-xs-6" style="height:400PX; " >

<div id="info"> Bạn chưa chọn dữ liệu...</div>

<div id='map' style="height: 300px"></div>
</div>

<!-- Button trigger modal -->
<div  class="col-xs-6" style =" float: right; width: 50%; font-family: itim;" >

  <div  id="tab-option">
      <h3> Bạn vui lòng chọn dữ liệu</h3>
      <div class="container" style="width: 100%; margin-top: 30px ;font-size: 16px">
                
                  <div class="col-xs-6">

                        <div> Thông số</div>
                        <div class="input-group">
                            <span class="input-group-addon"> 
                              <span class=" glyphicon glyphicon-star-empty"></span> 
                            </span>
                            <select class="form-control input-md" id= "lc_ts" style="border-radius: 0px;height:40px; ">
                                
                                <option value="AQI">Chỉ số CLKK AQI</option>
                                <option value="O3">Nồng độ O3</option>
                                <option value="CO">Nồng độ CO</option>
                                <option value="NO2">Nồng độ NO2</option>
                                <option value="NO">Nồng độ NO</option>
                                <option value="SO2">Nồng độ SO2</option>
                             </select>
                        </div>
                        
                      
                  </div>
                  <div class="col-xs-6">
                        <div> Ngày</div>
                        <div class="input-group">
                            <span class="input-group-addon "> 
                                  <span class="glyphicon glyphicon-star-empty"></span>
                            </span>
                            <select class="form-control input-md" id="lc_ngay" style="border-radius: 0px;height:40px; ">                            
                                <option value="01-03-2016">Ngày 01/03/2016</option>
                                <option value="02-03-2016">Ngày 02/03/2016</option>
                                <option value="03-03-2016">Ngày 03/03/2016</option>
                                <option value="04-03-2016">Ngày 04/03/2016</option>
                                <option value="07-03-2016">Ngày 07/03/2016</option>
                                <option value="08-03-2016">Ngày 08/03/2016</option>
                                <option value="09-03-2016">Ngày 09/03/2016</option>
                            </select>
                            
                        </div>
                        
                  </div>


      </div>
      <div style="width:100%; margin-top: 30px; text-align: center;">
                      <button   id="luachon" >
                            Lựa Chọn        
                  
                      </button>
      </div>
      

  </div>
</div>

</div>
</div>


<script type="text/javascript">

$("#luachon").click(function(){
  var  lcts= $('#lc_ts').val();
  var lcngay =$('#lc_ngay').val();
  var name = "<?php echo $username ?>";
  window.location.href = "index-user.php?page=clkhongkhi&ts="+lcts+"&ngay="+lcngay+"&username="+name;
});

</script>

<script type="text/javascript" >


mapboxgl.accessToken = 'pk.eyJ1IjoidHJvbmd0aW5odGwiLCJhIjoiY2lzcXl0c2d5MDI1cDJucGhtem1rMjQ0OSJ9.-Jet1WIy1E-6z5Xv1SVd5A';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/bright-v9',
    maxZoom: 18,
    minZoom: 1,
    zoom: 8,
    center: [106.7, 10.7],
    attributionControl: false,
    preserveDrawingBuffer: true
});


map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}),"top-left");

map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new mapboxgl.NavigationControl(),'top-left');
map.addControl(new mapboxgl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
}),"bottom-right");
var slider = document.getElementById('slider');
var sliderValue = document.getElementById('slider-value');





</script>

<script type="text/javascript">

function Opentab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
} ;






</script>

<script>

$(document).ready(function(){

  $(".ct").css("display", "none");
  $("<?php echo ('#'.$ts) ?>").css("display", "block");
});



Highcharts.chart('highchart', {

    title: {
        text: 'Bạn chưa chọn dữ liệu...'
    },

    xAxis: {
        tickInterval: 1
    },

    yAxis: {
        type: 'logarithmic',
        minorTickInterval: 0.1
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br />',
        pointFormat: 'x = {point.x}, y = {point.y}'
    },

    series: [{
        data: "no data",
        pointStart: 1
    }]
});
    

</script>