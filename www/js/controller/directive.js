
/* directive.js Dec 30 2014
//  notes:
*/
ionicApp.service("geoLocationService", [ "$interval", "$cordovaDialogs", "$cordovaGeolocation", "$http", function(a, b, c, d) {
    var e;
    var f;
    return {
        start: function() {
            console.log("started");
            e = a(function() {
                c.getCurrentPosition({
                    maximumAge: 7e3,
                    timeout: 15e3,
                    enableHighAccuracy: true
                }).then(function(a) {
                    console.log("Your latitude is " + a.coords.latitude);
                    console.log("Your latitude is " + a.coords.longitude);
                    var b = a.coords.latitude;
                    var d = a.coords.longitude;
                    var e = JSON.parse(localStorage.getItem("user")).userId;
                    var g = JSON.parse(localStorage.getItem("user")).apiKey;
                    var h = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
                    var i = new Date();
                    var j = i.getHours();
                    var k = i.getMinutes();
                    var l = i.getSeconds();
                    if (j < 10) j = "0" + j;
                    if (k < 10) k = "0" + k;
                    if (l < 10) l = "0" + l;
                    var m = j + ":" + k + ":" + l;
                    console.log(m);
                    var n = localStorage.getItem("lat");
                    var o = localStorage.getItem("long");
                    var p = parseFloat(b).toFixed(3);
                    var q = parseFloat(d).toFixed(3);
                    var r = parseFloat(n).toFixed(3);
                    var s = parseFloat(o).toFixed(3);
                    if (p == r && q == s) f = 0; else f = 1;
                    var t = c.watchPosition({
                        frequency: 6e4
                    });
                    t.promise.then(function() {}, function(a) {}, function(a) {});
                    if (1 == f) {
                        localStorage.setItem("lat", b);
                        localStorage.setItem("long", d);
                        var u = _baseUrl + "tickitService/" + g + "/createTickit";
                        var v = new FormData();
                        v.append("ownerId", e);
                        v.append("tickitStatus", "7");
                        v.append("msgBody", h);
                        v.append("tickitType", "20");
                        v.append("recipient", MyRecipientHolderStringManual);
                        v.append("subject", m);
                        v.append("ip", MyCurrentIPAddress);
                        v.append("gps", b + ";" + d);
                        $.ajax({
                            url: u,
                            data: v,
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
                    }
                }, function(a) {
                    console.log(a);
                });
            }, 15e3);
        },
        stop: function() {
            console.log("stoped");
            if (e) a.cancel(e);
        }
    };
} ]);

ionicApp.factory("friendlist", function(a, b, c) {
    var d = {};
    var e = {
        query: function() {
            var e = JSON.parse(localStorage.getItem("user")).apiKey;
            var f = _baseUrl + "userService/" + 333234567 + "/fetchUsers";
            var g = {};
            c.show({
                content: '<h1><i class="icon ion-refreshing"></i></h1>',
                animation: "fade-in",
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 50
            });
            var h = a.get(f, g, {
                cache: false
            }).then(function(a) {
                d = a.data.userList;
                b.transitionTo("tabs.friendlist");
                c.hide();
            }, function(a) {
                c.hide();
                alert("Error: No data returned");
                console.log(JSON.stringify(a));
            });
        },
        getList: function() {
            return d;
        }
    };
    return e;
});

ionicApp.service("backGeoLocationService", [ "$cordovaGeolocation", "$http", function(a, b) {
    "use strict";
    var c;
    return {
        configureBackgroundGeoLocation: function() {
            console.log("configureBackgroundGeoLocation");
            window.navigator.geolocation.getCurrentPosition(function(a) {
                console.log("Location from Phonegap");
            });
            var a = window.plugins.backgroundGeoLocation;
            var b = function(b) {
                a.finish();
            };
            var c = function(a) {
                console.log("[js] BackgroundGeoLocation callback: " + a.latitude + "," + a.longitude);
                var c = _baseUrl + "tickitService/" + "333234567" + "/createTickit";
                var d = JSON.parse(localStorage.getItem("user")).userId;
                var e = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
                var f = new Date();
                var g = f.getHours();
                var h = f.getMinutes();
                var i = f.getSeconds();
                if (g < 10) g = "0" + g;
                if (h < 10) h = "0" + h;
                if (i < 10) i = "0" + i;
                var j = g + ":" + h + ":" + i;
                console.log(j);
                var k = new FormData();
                k.append("ownerId", d);
                k.append("tickitStatus", "8");
                k.append("msgBody", e);
                k.append("tickitType", "20");
                k.append("recipient", MyRecipientHolderStringAuto);
                k.append("subject", j);
                k.append("ip", MyRecipientHolderStringManual);
                k.append("gps", a.latitude + ";" + a.longitude);
                $.ajax({
                    url: c,
                    data: k,
                    dataType: "text",
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function(a) {},
                    error: function(a) {}
                });
                $.ajax({
                    url: "http://qdevinc.com/test/requestDump",
                    type: "POST",
                    dataType: "text",
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: k,
                    success: function(a, b, c) {},
                    error: function(a, b, c) {},
                    complete: function() {}
                });
                b.call(this);
            };
            var d = function(a) {
                console.log("BackgroundGeoLocation error");
            };
            a.configure(c, d, {
                url: "http://qdevinc.com/test/requestDump",
                params: {
                    auth_token: "user_secret_auth_token",
                    foo: "bar"
                },
                headers: {
                    "X-Foo": "BAR"
                },
                desiredAccuracy: 50,
                stationaryRadius: 20,
                distanceFilter: 30,
                notificationTitle: "WHAMI Tracking",
                notificationText: "Enabled",
                activityType: "AutomotiveNavigation",
                debug: true
            });
        },
        startTracking: function() {
            console.log("startTracking");
            var a = window.plugins.backgroundGeoLocation;
            a.start();
        },
        stopTracking: function() {
            console.log("stopTracking");
            var a = window.plugins.backgroundGeoLocation;
            a.stop();
        }
    };
} ]);
