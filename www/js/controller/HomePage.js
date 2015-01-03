
// Some Whami Global Variables for creating tickits
var _baseUrl = "http://dev.tickittaskit.com/flippadoo/mobile/"; //web services 
var _AutoFrequency = 920000; //how often auto updates - the original default was 10000
var _soundAutoAlert = false; //device buzzes when auto fires
var _recipient = "Location Observation";
var _IPAddress = "100.101.102.103"; //TBD we need to get the real device IP address - there is a plugin to do that
var _sendMobileDataUrlAPIKey = "333234567"; //is this needed? If so is it literal? - search for sendMobileDataUrl in createtickit
var _tickitStatusGreen ="8";
var _tickitType ="20";
var _tickitTypeParam =20; //param value cannot be string
var _subject = "Create tickit";
var _timeInterVal = 300000;
var _dumpRequest = "http://qdevinc.com/test/requestDump";
var _debugSound = true;
var _notificationTitle = "Whami tracking|;

ionicApp.controller('HomePagectrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,geoLocationService) {
	$scope.setup = function() {
	$state.transitionTo('tabs.home');
	}
    
    var TimeInterval = localStorage.getItem("timeInterVal");
	 alert(TimeInterval);
	if(TimeInterval == null){
		localStorage.setItem("timeInterVal",_timeInterVal);
		}
    
    $scope.profileData = JSON.parse(localStorage.getItem("user"));
	var gpsAuto = localStorage.getItem("gpsAuto");
	var TimeInterval = localStorage.getItem("timeInterVal");
	if(gpsAuto == 'true'){
	 geoLocationService.start(TimeInterval);
	} else {
		 geoLocationService.stop();
	       }

	$scope.createTickit = function() {
		 $state.transitionTo('tabs.ticket');
	}
	
	$scope.createTickitManual = function(){
		
	$cordovaGeolocation.getCurrentPosition().then(function(position) {
	 console.log("Your latitude is " + position.coords.latitude);
	 console.log("Your latitude is " + position.coords.longitude);
	 var latitudeManual = position.coords.latitude;
	 var longitudeManual = position.coords.longitude;
	 var userId = JSON.parse(localStorage.getItem("user")).userId;						
	 var textapiKeyValue = JSON.parse(localStorage.getItem("user")).apiKey;
	 var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
	
	 var form = new FormData();		
	   form.append('ownerId' , userId);
	   form.append('tickitStatus' , _tickitStatusGreen);
	   form.append('tickitType' , _tickitType );
	   form.append('recipient' , _recipient);
	   form.append('subject' , _subject );
	   form.append('ip' , _IPAddress);
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
