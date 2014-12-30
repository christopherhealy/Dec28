    
/* HomePage.js Dec 30 2014
//  notes:  need to get the IP Address
*/


    ionicApp.controller("HomePagectrl", function(a, b, c, d, e, f, g) {
    a.setup = function() {
        d.transitionTo("tabs.home");
    };
    var h = "Whami Location Observation - manual";
    var i = "Whami Location Observation - auto";

    var MyCurrentIPAddress = "not.ava.ila.ble"; //default

    

    var j = localStorage.getItem("timeInterVal");
    alert(j);
    if (null == j) localStorage.setItem("timeInterVal", 3e5);
    a.profileData = JSON.parse(localStorage.getItem("user"));
    var k = localStorage.getItem("gpsAuto");
    var j = localStorage.getItem("timeInterVal");
    if ("true" == k) g.start(j); else g.stop();
    a.createTickit = function() {
        d.transitionTo("tabs.ticket");
    };
    a.createTickitManual = function() {
        e.getCurrentPosition().then(function(a) {
            console.log("Your latitude is " + a.coords.latitude);
            console.log("Your latitude is " + a.coords.longitude);
            var b = a.coords.latitude;
            var c = a.coords.longitude;
            var d = JSON.parse(localStorage.getItem("user")).userId;
            var e = JSON.parse(localStorage.getItem("user")).apiKey;
            var f = _baseUrl + "tickitService/" + e + "/createTickit";
            var g = new FormData();
            g.append("ownerId", d);
            g.append("tickitStatus", "7");
            g.append("tickitType", "11");
            g.append("recipient", h);
            g.append("subject", "Create ticket");
            g.append("ip", MyCurrentIPAddress);
            g.append("gps", b + ";" + c);
            $.ajax({
                url: f,
                data: g,
                dataType: "text",
                processData: false,
                contentType: false,
                type: "POST",
                success: function(a) {
                    console.log(JSON.stringify(a));
                },
                error: function(a) {
                    console.log(JSON.stringify(a));
                }
            });
        }, function(a) {
            console.log(a);
        });
    };
});
