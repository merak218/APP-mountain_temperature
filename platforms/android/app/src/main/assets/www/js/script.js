$(document).ready(function() {

    //選擇縣市 select city button function .btn_city_select
    $(".btn_city_select").click(function(){
		var city_select = $(this).text();
		console.log(city_select);
		getTaiwanWeather(city_select);
        $(".collapse").collapse("hide");  // hide collapse 收起
    });
	$("input").keyup(function(){
	  var input=$('input:text').val();
	  getTaiwanWeather(input);
	});
	function getTaiwanWeather(city_name) {
		console.log(city_name);
		//Weather Forecast Open Data API
		var Your_Weather_API_key = "CWB-27697910-0F8D-4AAF-8E1C-E467DB86E10F";  //IMPORTANT, replace it with your weather API Authkey 中央氣象局授權碼
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API 全部縣市
		var url_all = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-031?Authorization=" + Your_Weather_API_key + "&format=JSON";
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API by 縣市
		var url_city = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-031?Authorization=" + Your_Weather_API_key + "&format=JSON&locationName=";
		var jqxhr = $.getJSON(url_city + city_name, function() {
			//console.log("Get Mountain weather success.");
		})
		.done(function(arr) {
			// var outStr = JSON.stringify(arr);
			var test=city(city_name);
			
			console.log(test);
			console.log(arr.cwbopendata.dataset.locations.location[test]);
			var time_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[0].startTime.substr(5,8).replace("-","/") + "時";
			var time_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[1].startTime.substr(5,8).replace("-","/") + "時";
			var time_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[2].startTime.substr(5,8).replace("-","/") + "時";
			var time_4 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[3].startTime.substr(5,8).replace("-","/") + "時";
			var time_5 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[4].startTime.substr(5,8).replace("-","/") + "時";
			var time_6 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[5].startTime.substr(5,8).replace("-","/") + "時";
			var time_7 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[6].startTime.substr(5,8).replace("-","/") + "時";
			//主時間 Day 2, 3, 4 時間資料 #date, #day2, day3, day4
			$("#city").text(city_name);
			$("#date").text(time_1.substr(0,5));
			$("#day2").text(time_1.substr(0,5));
			$("#day3").text(time_2.substr(0,5));
			$("#day4").text(time_3.substr(0,5));
			$("#day5").text(time_4.substr(0,5));
			$("#day6").text(time_5.substr(0,5));
			$("#day7").text(time_6.substr(0,5));
			
			//天氣現象 #Wx
			var weather_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[0].elementValue[0].value;
			var weather_value_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[0].elementValue[1].value.substr(1,1);
			var weather_value_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[1].elementValue[1].value.substr(1,1);
			var weather_value_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[2].elementValue[1].value.substr(1,1);
			var weather_value_4 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[3].elementValue[1].value.substr(1,1);
			var weather_value_5 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[4].elementValue[1].value.substr(1,1);
			var weather_value_6 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[5].elementValue[1].value.substr(1,1);
			var weather_value_7 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[6].elementValue[1].value.substr(1,1);
            $("#weather-description").text(weather_1);

			var weather_dict = {1:"clear-day",2:"partly-cloudy-day",3:"partly-cloudy-day",4:"partly-cloudy-day",5:"cloudy",6:"cloudy",7:"cloudy",8:"rain",9:"rain"};
			
			var skycons = new Skycons({"color": "rgb(255,213,55)"});
			skycons.set("weather-icon-day1", weather_dict[weather_value_1]);
			skycons.set("weather-icon-day2", weather_dict[weather_value_2]);
			skycons.set("weather-icon-day3", weather_dict[weather_value_3]);
			skycons.set("weather-icon-day4", weather_dict[weather_value_4]);
			skycons.set("weather-icon-day5", weather_dict[weather_value_5]);
			skycons.set("weather-icon-day6", weather_dict[weather_value_6]);
			skycons.set("weather-icon-day7", weather_dict[weather_value_7]);
			skycons.play();
			
            //風向 #WD
			var WD_value = arr.cwbopendata.dataset.locations.location[test].weatherElement[10].time[0].elementValue.value;
			var WD_measures = arr.cwbopendata.dataset.locations.location[test].weatherElement[10].time[0].elementValue.measures;
			var WD_1=WD_value+WD_measures;
			$("#WD").text(WD_1);

			//風速 #WS
			var WS_value = arr.cwbopendata.dataset.locations.location[test].weatherElement[11].time[0].elementValue[0].value;
			var WS_measures = arr.cwbopendata.dataset.locations.location[test].weatherElement[11].time[0].elementValue[0].measures;
			var WS_1=WS_value+WS_measures;
			$("#WS").text(WS_1);
			
			//體感溫度 #AVG-AT #day1-AT-high-low, day2-AT-high-low, day3-AT-high-low
            var minAT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[6].time[0].elementValue.value;
			var maxAT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[5].time[0].elementValue.value;
			console.log(maxAT_1);
			console.log(minAT_1);
			$("#day1-AT-low").text(minAT_1 + "°C");
			$("#day1-AT-high").text(maxAT_1 + "°C");

			//最高最低溫度 #temp #day2-high-low, day3-high-low, day4-high-low
            var minT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[4].time[0].elementValue.value;
			var maxT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[3].time[0].elementValue.value;
			$("#temp").text(Math.round((Number(minT_1) + Number(maxT_1)) / 2) + "°");
			console.log(maxT_1);
			console.log(minT_1);
			$("#day1-high").text( maxT_1 + "°C");
			$("#day1-low").text(minT_1 + "°C");

			//溫度 
            var temp1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[0].elementValue.value;
			var temp2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[1].elementValue.value;
			var temp3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[2].elementValue.value;
			var temp4 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[3].elementValue.value;
			var temp5 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[4].elementValue.value;
			var temp6 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[5].elementValue.value;
			var temp7 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[6].elementValue.value;

			console.log(temp1);
			console.log(temp2);
			$("#temp1").text( temp1 + "°C");
			$("#temp2").text( temp2 + "°C");
			$("#temp3").text( temp3 + "°C");
			$("#temp4").text( temp4 + "°C");
			$("#temp5").text( temp5 + "°C");
			$("#temp6").text( temp6 + "°C");
			$("#temp7").text( temp7 + "°C");
			
			//降雨機率 #day2-precip, day3-precip, day4-precip
			var rain_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[9].time[0].elementValue.value;
			console.log(rain_1);
			$("#day1-precip").text(rain_1 + "%");
		})

		.fail(function() {
			console.log("Get Taiwan weather fail!");
		})
		.always(function() {
			// console.log("Get Taiwan weather complete.");
		});
	}

	function city(city_name){
		if ( city_name =="中央尖山" ) {
			return test =0;
		}
		else if ( city_name=="巴巴山" ) {
			return test =1;
		}
		else if ( city_name=="南湖大山" ) {
			return test =2;
		}
		else if ( city_name=="南湖大山南峰" ) {
			return test =3;
		}
		else if ( city_name=="雪山北峰" ) {
			return test =4;
		}
		else if ( city_name=="雪山東峰" ) {
			return test =5;
		}
		else if ( city_name=="頭鷹山" ) {
			return test =6;
		}
		else if ( city_name=="小霸尖山" ) {
			return test =7;
		}
		else if ( city_name=="品田山" ) {
			return test =8;
		}
		else if ( city_name=="大劍山" ) {
			return test =9;
		}
		else if ( city_name=="甘薯峰" ) {
			return test =10;
		}
		else if ( city_name=="志佳陽大山" ) {
			return test =11;
		}
		else if ( city_name=="佳陽山" ) {
			return test =12;
		}
		else if ( city_name=="南湖大山南峰" ) {
			return test =13;
		}
		else if ( city_name=="閂山" ) {
			return test =14;
		}
		else if ( city_name=="無明山" ) {
			return test =15;
		}
		else if ( city_name=="鈴鳴山" ) {
			return test =16;
		}
		else if ( city_name=="劍山" ) {
			return test =17;
		}
		else if ( city_name=="南湖北山" ) {
			return test =18;
		}
		else if ( city_name=="馬比杉山" ) {
			return test =19;
		}
		else if ( city_name=="審馬陣山" ) {
			return test =20;
		}
		else if ( city_name=="阿玉山" ) {
			return test =21;
		}
		else if ( city_name=="盆盆山" ) {
			return test =22;
		}
		else if ( city_name=="唐穗山" ) {
			return test =23;
		}
		else if ( city_name=="望洋山" ) {
			return test =24;
		}
		else if ( city_name=="銅山" ) {
			return test =25;
		}
		else if ( city_name=="馬望來山" ) {
			return test =26;
		}
		else if ( city_name=="多加神山" ) {
			return test =27;
		}
		else if ( city_name=="太魯閣大山" ) {
			return test =28;
		}
		else if ( city_name=="立霧主山" ) {
			return test =29;
		}
		else if ( city_name=="安東軍山" ) {
			return test =30;
		}
		else if ( city_name=="奇萊主山北峰" ) {
			return test =31;
		}
		else if ( city_name=="奇萊主峰" ) {
			return test =32;
		}
		else if ( city_name=="帕托魯山" ) {
			return test =33;
		}
		else if ( city_name=="屏風山" ) {
			return test =34;
		}
		else if ( city_name=="磐石山" ) {
			return test =35;
		}
		else if ( city_name=="內嶺爾山" ) {
			return test =36;
		}
		else if ( city_name=="石門山" ) {
			return test =37;
		}
		else if ( city_name=="合歡山北峰" ) {
			return test =38;
		}
		else if ( city_name=="羊頭山" ) {
			return test =39;
		}
		else if ( city_name=="布拉克桑山" ) {
			return test =40;
		}
		else if ( city_name=="馬西山" ) {
			return test =41;
		}
		else if ( city_name=="喀西帕南山" ) {
			return test =42;
		}
		else if ( city_name=="新康山" ) {
			return test =43;
		}
		else if ( city_name=="白石山" ) {
			return test =44;
		}
		else if ( city_name=="光頭山" ) {
			return test =45;
		}
		else if ( city_name=="奇萊主山南峰" ) {
			return test =46;
		}
		else if ( city_name=="能高山南峰" ) {
			return test =47;
		}
		else if ( city_name=="八通關山" ) {
			return test =48;
		}
		else if ( city_name=="大水窟山" ) {
			return test =49;
		}
		else if ( city_name=="干卓萬山" ) {
			return test =50;
		}
		else if ( city_name=="丹大山" ) {
			return test =51;
		}
		else if ( city_name=="六順山" ) {
			return test =52;
		}
		else if ( city_name=="玉山北峰" ) {
			return test =53;
		}
		else if ( city_name=="合歡山" ) {
			return test =54;
		}
		else if ( city_name=="合歡山東峰" ) {
			return test =55;
		}
		else if ( city_name=="秀姑巒山" ) {
			return test =56;
		}
		else if ( city_name=="卓社大山" ) {
			return test =57;
		}
		else if ( city_name=="東郡大山" ) {
			return test =58;
		}
		else if ( city_name=="東巒大山" ) {
			return test =59;
		}
		else if ( city_name=="牧山" ) {
			return test =60;
		}
		else if ( city_name=="能高山主峰" ) {
			return test =61;
		}
		else if ( city_name=="能高北峰" ) {
			return test =62;
		}
		else if ( city_name=="郡大山" ) {
			return test =63;
		}
		else if ( city_name=="馬利加南山" ) {
			return test =64;
		}
		else if ( city_name=="馬博拉斯山" ) {
			return test =65;
		}
		else if ( city_name=="無雙山" ) {
			return test =66;
		}
		else if ( city_name=="萬東山西峰" ) {
			return test =67;
		}
		else if ( city_name=="義西請馬至山" ) {
			return test =68;
		}
		else if ( city_name=="駒盆山" ) {
			return test =69;
		}
		else if ( city_name=="西巒大山" ) {
			return test =70;
		}
		else if ( city_name=="南大水窟山" ) {
			return test =71;
		}
		else if ( city_name=="達芬尖山" ) {
			return test =72;
		}
		else if ( city_name=="玉山西峰" ) {
			return test =73;
		}
		else if ( city_name=="玉山東峰" ) {
			return test =74;
		}
		else if ( city_name=="玉山前峰" ) {
			return test =75;
		}
		else if ( city_name=="白姑大山" ) {
			return test =76;
		}
		else if ( city_name=="合歡山西峰" ) {
			return test =77;
		}
		else if ( city_name=="畢祿山" ) {
			return test =78;
		}
		else if ( city_name=="南玉山" ) {
			return test =79;
		}
		else if ( city_name=="南雙頭山" ) {
			return test =80;
		}
		else if ( city_name=="三叉山" ) {
			return test =81;
		}
		else if ( city_name=="小關山" ) {
			return test =82;
		}
		else if ( city_name=="玉山南峰" ) {
			return test =83;
		}
		else if ( city_name=="向陽山" ) {
			return test =84;
		}
		else if ( city_name=="卑南主山" ) {
			return test =85;
		}
		else if ( city_name=="東小南山" ) {
			return test =86;
		}
		else if ( city_name=="庫哈諾辛山" ) {
			return test =87;
		}
		else if ( city_name=="海諾南山" ) {
			return test =88;
		}
		else if ( city_name=="鹿山" ) {
			return test =89;
		}
		else if ( city_name=="雲峰" ) {
			return test =90;
		}
		else if ( city_name=="塔芬山" ) {
			return test =91;
		}
		else if ( city_name=="塔關山" ) {
			return test =92;
		}
		else if ( city_name=="轆轆山" ) {
			return test =93;
		}
		else if ( city_name=="關山" ) {
			return test =94;
		}
		else if ( city_name=="關山嶺山" ) {
			return test =95;
		}
		else if ( city_name=="大武山" ) {
			return test =96;
		}
		else if ( city_name=="大雪山" ) {
			return test =97;
		}
		else if ( city_name=="中雪山" ) {
			return test =98;
		}
		else if ( city_name=="火石山" ) {
			return test =99;
		}
		else if ( city_name=="加利山" ) {
			return test =100;
		}
		else if ( city_name=="大霸尖山" ) {
			return test =101;
		}
		else if ( city_name=="雪山" ) {
			return test =102;
		}
		else if ( city_name=="班山" ) {
			return test =103;
		}
		else if ( city_name=="馬那邦山" ) {
			return test =104;
		}
		else if ( city_name=="加里山" ) {
			return test =105;
		}
		else if ( city_name=="北坑山" ) {
			return test =106;
		}
		else if ( city_name=="老松山" ) {
			return test =107;
		}
		else if ( city_name=="東陽山" ) {
			return test =108;
		}
		else if ( city_name=="佳仁山" ) {
			return test =109;
		}
		else if ( city_name=="能甲山" ) {
			return test =110;
		}
		else if ( city_name=="伊澤山" ) {
			return test =111;
		}
		else if ( city_name=="池有山" ) {
			return test =112;
		}
		else if ( city_name=="桃山" ) {
			return test =113;
		}
		else if ( city_name=="喀拉業山" ) {
			return test =114;
		}
		else if ( city_name=="向天湖山" ) {
			return test =115;
		}
		else if ( city_name=="霞山" ) {
			return test =116;
		}
		else if ( city_name=="霞喀羅大山" ) {
			return test =117;
		}
		else if ( city_name=="虎禮山" ) {
			return test =118;
		}
		else if ( city_name=="李棟山" ) {
			return test =119;
		}
		else if ( city_name=="烏來山" ) {
			return test =120;
		}
		else if ( city_name=="玉山" ) {
			return test =121;
		}
		else if ( city_name=="大屯山" ) {
			return test =122;
		}
		else if ( city_name=="紗帽山" ) {
			return test =123;
		}
		else if ( city_name=="劍潭山" ) {
			return test =124;
		}
		else if ( city_name=="蟾蜍山" ) {
			return test =125;
		}
		else if ( city_name=="七星山" ) {
			return test =126;
		}
		else if ( city_name=="山豬窟山" ) {
			return test =127;
		}
		else if ( city_name=="南港山" ) {
			return test =128;
		}
		else if ( city_name=="石尖山" ) {
			return test =129;
		}
		else if ( city_name=="五分山" ) {
			return test =130;
		}
		else if ( city_name=="竹子山" ) {
			return test =131;
		}
		else if ( city_name=="磺嘴山" ) {
			return test =132;
		}
		else if ( city_name=="大桶山" ) {
			return test =133;
		}
		else if ( city_name=="波路山" ) {
			return test =134;
		}
		else if ( city_name=="三貂嶺" ) {
			return test =135;
		}
		else if ( city_name=="三角崙山" ) {
			return test =136;
		}
		else if ( city_name=="燦光寮山" ) {
			return test =137;
		}
		else if ( city_name=="基隆山" ) {
			return test =138;
		}
		else if ( city_name=="檜山" ) {
			return test =139;
		}
		else if ( city_name=="石牛山" ) {
			return test =140;
		}
		else if ( city_name=="金面山" ) {
			return test =141;
		}
		else if ( city_name=="夫婦山" ) {
			return test =142;
		}
		else if ( city_name=="低陸山" ) {
			return test =143;
		}
		else if ( city_name=="良羽鳥山" ) {
			return test =144;
		}
		else if ( city_name=="拉拉山" ) {
			return test =145;
		}
		else if ( city_name=="東眼山" ) {
			return test =146;
		}
		else if ( city_name=="馬望曾呂山" ) {
			return test =147;
		}
		else if ( city_name=="插天山" ) {
			return test =148;
		}
		else if ( city_name=="塔曼山" ) {
			return test =149;
		}
		else if ( city_name=="十八尖山" ) {
			return test =150;
		}
	}

	//Get present location city name 取得使用者所在縣市
	function getLocationCity() {
		if (navigator.geolocation) {
			var options={timeout:10000};
            navigator.geolocation.getCurrentPosition(getPosition, showError, options);
        } else {
            alert("Your device doesn't support Geolocation service.");
        }
		

		function showError(error) {
			switch(error.code) {
				case error.PERMISSION_DENIED:
					alert("User denied the request for Geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					alert("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					alert("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					alert("An unknown error occurred.");
					break;
			}			
		}

		
	}//end getLocationCity()

});//end ready