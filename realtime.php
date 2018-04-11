	<div class="container-fluid" style="padding: 20px">
		<div class="row" style="height:400px">
			<div class="col-md-7" style="">
				<div style="" id='panelChart' class="panelBorder">
					<div id="AQI">
						<div class="col-sm-4" id='aqiValue'>
						</div>
						<div class="col-sm-8">
							<div id='trangthaiAQI'>
							</div>
							<div id='chuthichAQIAQI'>
								<p>
									<label>Cập nhật lúc:</label>
									<span id="currentTime">
									</span>
								</p>
							</div>
						</div>
					</div>
					<div id= 'chart-container'>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>PM</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="pm">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25</p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>NO</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="no">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25</p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>NO2</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="no2">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25</p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>SO2</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="so2">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25</p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>O3</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="o3">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25 </p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-2 thongso">
								<div class="col-sm-6 tenthongso">
									<label>GIO</label>
								</div>
								<div class="col-sm-6 current">
									<label>Current</label>
									<p class="currentValue"> 25</p>
								</div>
							</div>
							<div class="col-md-8">
								<div  class="chart" id ="gio">

								</div>
							</div>
							<div class="col-md-2 minmax">
								<div class="col-sm-6">
									<label>Min</label>
									<p class="minValue"> 25</p>
								</div>
								<div class="col-sm-6">
									<label>Max</label>
									<p class="maxValue"> 30</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-5" style=" height:600px">
				<div class="row">
					<div class="col-md-12 panelBorder" id="map-realtime" style="height: 400px;"></div>
					<div class="col-md-12 panelBorder" id="map-realtime" style="height: 200px"><img src="img/giatriAQI.png" style="width:100%;height:100%"></div>
				</div>
			</div>
		</div>
	</div>
	<div class="row" >
		<div class="col-md-12">
			<div  class="panelBorder" id='panelDuBao'>
				<div class="row head-panelDuBao">
					<div class="col-md-8 col-md-push-2">
						<div class="row" style="margin: auto;text-align: center;">
							<div class="totalDuBao" id='ngayDuBao_0'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
							<div class="totalDuBao" id='ngayDuBao_1'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
							<div class="totalDuBao" id='ngayDuBao_2'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
							<div class="totalDuBao" id='ngayDuBao_3'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
							<div class="totalDuBao" id='ngayDuBao_4'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
							<div class="totalDuBao" id='ngayDuBao_5'>
								<span class="glyphicon glyphicon-cloud"></span>
								<label class="tenNgay"></label>
								<div class="tempMin"></div>
								<div class="tempMax"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-1">
						<div style="height: 50px; margin-top: 50px"> 
							Nhiệt độ
						</div>
						<div style="height: 75px; margin-top:35px"> 
							Gió
						</div>
					</div>
					<div class="col-xs-11">
						<div class="row">
							<div class="col-md-2 chartdubao" id="chartDuBao_0">
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_0'>

								</div>
								<div class="chart gio" id="gio_0" style="height: 75px">

								</div>
							</div>
							<div class="col-md-2 chartdubao" id="chartDuBao_1">
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_1'>

								</div>
								<div class="chart gio" id="gio_1" style="height: 75px">

								</div>
							</div>
							<div class="col-md-2 chartdubao" id="chartDuBao_2">
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_2'>

								</div>
								<div class="chart gio" id="gio_2" style="height: 75px">

								</div>
							</div>
							<div class="col-md-2 chartdubao" id="chartDuBao_3">
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_3'>

								</div>
								<div class="chart gio" id="gio_3" style="height: 75px">

								</div>
							</div>
							<div class="col-md-2 chartdubao" id="chartDuBao_4">
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_4'>

								</div>
								<div class="chart gio" id="gio_4" style="height: 75px">

								</div>
							</div>
							<div class="col-md-2 chartdubao" id="chartDuBao_5"> 
								<div class="chart-title"></div>
								<div class="chart temp" id='temp_5'>

								</div>
								<div class="chart gio" id="gio_5" style="height: 75px">

								</div>
							</div>
						</div>
					</div>
				</div>					
			</div>
		</div>
	</div>
<script type="text/javascript" src="Public/realtime/chart.js"></script>
<script type="text/javascript" src="Public/realtime/json.js"></script>
<script type="text/javascript" src="Public/realtime/map.js"></script>
