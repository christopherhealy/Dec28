ionicApp.controller('HomePagectrl', function($scope,$interval,$http,$state, $cordovaGeolocation,$cordovaDialogs,geoLocationService) {
	$scope.setup = function() {
		//alert("clicked");
	 $state.transitionTo('tabs.home');
	}

    var MyCurrentIPAddress = "not.available'; //default

   if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      MyCurrentIPAddress =$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      MyCurrentIPAddress =$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      MyCurrentIPAddress =$_SERVER['REMOTE_ADDR'];
    }

    var MyRecipientHolderStringManual = "Whami Location Observation - manual";
    var MyRecipientHolderStringAuto = "Whami Location Observation - auto";

   
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
			}else{
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
           form.append('recipient' , MyRecipientHolderStringManual );
           form.append('subject' , "Create ticket");
           form.append('ip' , MyCurrentIPAddress);
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

  
