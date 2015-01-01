
// Some Whami Global Variables for creating tickits
var _baseUrl = "http://dev.tickittaskit.com/flippadoo/mobile/";
var _recipient = "Location Observation";
var _IPAddress = "192.168.1.217";
var _tickitType = "11";
var _statusGreen = "";
var _statusYellow = "";
var _statusRed = "";

ionicApp.controller('HomePagectrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,geoLocationService) {
	$scope.setup = function() {
		//alert("clicked");
	 $state.transitionTo('tabs.home');
	}
    
    var TimeInterval = localStorage.getItem("timeInterVal");
	 alert(TimeInterval);
	if(TimeInterval == null){
		//alert("ay");
		localStorage.setItem("timeInterVal",300000);
		}
    
    $scope.profileData = JSON.parse(localStorage.getItem("user"));
	var gpsAuto = localStorage.getItem("gpsAuto");
	    //alert(gpsAuto);
	    var TimeInterval = localStorage.getItem("timeInterVal");
	     //alert(TimeInterval);
		if(gpsAuto == 'true'){
			//alert("11");
			 geoLocationService.start(TimeInterval);
			} else {
				 geoLocationService.stop();
			       }

	$scope.createTickit = function() {
		//alert("clicked");
	  $state.transitionTo('tabs.ticket');
	}
	
	$scope.createTickitManual = function(){
		
	$cordovaGeolocation.getCurrentPosition().then(function(position) {
								 console.log("Your latitude is " + position.coords.latitude);
								 console.log("Your latitude is " + position.coords.longitude);
								  var latitudeManual = position.coords.latitude;
								  var longitudeManual = position.coords.longitude;
								// Position here: position.coords.latitude, position.coords.longitude
	var userId = JSON.parse(localStorage.getItem("user")).userId;						
	var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
	var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
	
	var form = new FormData();
		
	   form.append('ownerId' , userId);
	   form.append('tickitStatus' , "7");
	   form.append('tickitType' , "11");
	   form.append('recipient' , _recipient);
	   form.append('subject' , "Create ticket");
	   form.append('ip' , "192.168.1.217");
	   form.append('gps' , latitudeManual + ";" + longitudeManual);
		$.ajax({
			url: manualTickitUrl,
			data: form,
			dataType: 'text',
			processData: false,
			contentType: false,
			type: 'POST',
			success: function(data){
			console.log(JSON.stringify(data));
			},
		error:function(data){
			console.log(JSON.stringify(data));
					}
					  });
			}, function(err) {
			  console.log(err);
			}); 
		}
 
});  
