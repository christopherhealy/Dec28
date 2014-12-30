/* createtickit.js Dec 30 2014
/  notes:
*/

var flagNetwork = 0;

ionicApp.controller("createTickitCtrl", function(a, b, c, d, e, f, g, h, i, j, k, l) {
    p();
    a.statussucess = false;
    a.stausFail = false;
    function m() {
        var b = new Date();
        var c = b.getHours();
        var d = b.getMinutes();
        var e = b.getSeconds();
        if (c < 10) c = "0" + c;
        if (d < 10) d = "0" + d;
        if (e < 10) e = "0" + e;
        var f = c + ":" + d + ":" + e;
        a.statusTime = f;
    }
    a.backToHome = function() {
        d.transitionTo("tabs.home");
    };
    var n = localStorage.getItem("whamiAuto");
    if (null == n || "true" == n) {
        localStorage.removeItem("whamiAuto");
        localStorage.setItem("whamiAuto", true);
        o();
    }
    function o() {
        a.main.pushNotification = {
            checked: true
        };
        i.start();
        l.startTracking();
    }
    a.main.pushNotificationChange = function() {
        var a = localStorage.getItem("whamiAuto");
        if ("true" == a) {
            i.stop();
            l.stopTracking();
            localStorage.removeItem("whamiAuto");
            localStorage.setItem("whamiAuto", false);
        } else {
            i.start();
            l.startTracking();
            localStorage.setItem("whamiAuto", true);
        }
    };
    a.$on("deviceReady", function(b, c) {
        a.wifiAvailable = false;
        a.noNetwork = false;
        a.twoG = false;
        a.threeG = false;
        a.fourG = false;
        a.ethernet = false;
        a.unknown = false;
        var e = k.getNetwork();
        var f = k.isOnline();
        var g = k.isOffline();
        var h = {};
        h[Connection.UNKNOWN] = "unknown";
        h[Connection.ETHERNET] = "ethernet";
        h[Connection.WIFI] = "wiFi";
        h[Connection.CELL_2G] = "twoG";
        h[Connection.CELL_3G] = "threeG";
        h[Connection.CELL_4G] = "fourG";
        h[Connection.NONE] = "noNetwork";
        document.addEventListener("offline", j, false);
        document.addEventListener("online", l, true);
        var i = h[e];
        if ("wiFi" == i) a.wifiAvailable = true;
        if ("noNetwork" == i) a.noNetwork = true;
        if ("twoG" == i) a.twoG = true;
        if ("threeG" == i) a.threeG = true;
        if ("fourG" == i) a.fourG = true;
        if ("ethernet" == i) a.ethernet = true;
        if ("unknown" == i) a.unknown = true;
        function j() {
            flagNetwork = 1;
            d.go(d.$current, null, {
                reload: true
            });
        }
        function l() {
            flagNetwork = 2;
            d.go(d.$current, null, {
                reload: true
            });
        }
    });
    function p() {
        var b = localStorage.getItem("networkSet");
        if ("true" == b) {
            a.wifiAvailable = false;
            a.noNetwork = false;
            a.twoG = false;
            a.threeG = false;
            a.fourG = false;
            a.ethernet = false;
            a.unknown = false;
            var c = k.getNetwork();
            var e = k.isOnline();
            var f = k.isOffline();
            var g = {};
            g[Connection.UNKNOWN] = "unknown";
            g[Connection.ETHERNET] = "ethernet";
            g[Connection.WIFI] = "wiFi";
            g[Connection.CELL_2G] = "twoG";
            g[Connection.CELL_3G] = "threeG";
            g[Connection.CELL_4G] = "fourG";
            g[Connection.NONE] = "noNetwork";
            var h = g[c];
            document.addEventListener("offline", i, false);
            document.addEventListener("online", j, true);
            if ("wiFi" == h) a.wifiAvailable = true;
            if ("noNetwork" == h) a.noNetwork = true;
            if ("twoG" == h) a.twoG = true;
            if ("threeG" == h) a.threeG = true;
            if ("fourG" == h) a.fourG = true;
            if ("ethernet" == h) a.ethernet = true;
            if ("unknown" == h) a.unknown = true;
            function i() {
                flagNetwork = 1;
                d.go(d.$current, null, {
                    reload: true
                });
            }
            function j() {
                flagNetwork = 2;
                d.go(d.$current, null, {
                    reload: true
                });
            }
        }
        localStorage.removeItem("networkSet");
    }
    if (1 == flagNetwork) {
        a.wifiAvailable = false;
        a.noNetwork = true;
        a.twoG = false;
        a.threeG = false;
        a.fourG = false;
        a.ethernet = false;
        a.unknown = false;
    }
    if (2 == flagNetwork) {
        a.wifiAvailable = false;
        a.noNetwork = false;
        a.twoG = false;
        a.threeG = false;
        a.fourG = false;
        a.ethernet = false;
        a.unknown = false;
        var q = k.getNetwork();
        var r = {};
        r[Connection.UNKNOWN] = "unknown";
        r[Connection.ETHERNET] = "ethernet";
        r[Connection.WIFI] = "wiFi";
        r[Connection.CELL_2G] = "twoG";
        r[Connection.CELL_3G] = "threeG";
        r[Connection.CELL_4G] = "fourG";
        r[Connection.NONE] = "noNetwork";
        var s = r[q];
        if ("wiFi" == s) a.wifiAvailable = true;
        if ("noNetwork" == s) a.noNetwork = true;
        if ("twoG" == s) a.twoG = true;
        if ("threeG" == s) a.threeG = true;
        if ("fourG" == s) a.fourG = true;
        if ("ethernet" == s) a.ethernet = true;
        if ("unknown" == s) a.unknown = true;
    }
    var t = _baseUrl + "userService/" + "333234567" + "/saveDeviceAppId";
    var u;
    if (localStorage.getItem("deviceAppId")) u = localStorage.getItem("deviceAppId");
    var v = JSON.parse(localStorage.getItem("user")).userId;
    var w = {};
    w["userId"] = v;
    w["deviceAppId"] = u;
    w["deviceType"] = "iphone";
    console.log(JSON.stringify(w));
    var x = c.post(t, w, {
        cache: false
    });
    x.success(function(a, b, c, d) {
        console.log(JSON.stringify(a));
    });
    x.error(function(a, b, c, d) {
        console.log(JSON.stringify(a));
    });
    a.profileData = JSON.parse(localStorage.getItem("user"));
    a.imageAvailable = false;
    a.takePicture = function() {
        var b = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: true,
            correctOrientation: true
        };
        var c;
        g.getPicture(b).then(function(b) {
            var d = document.getElementById("imagetaken");
            d.src = b;
            a.imageAvailable = true;
            c = b;
            a.shareImage = function() {
                j.shareViaTwitter("message", b, null).then(function(a) {
                    console.log(a);
                }, function(a) {
                    console.log(a);
                });
            };
            a.sendImage = function(c) {
                var d = k.getNetwork();
                if ("none" == d) alert("No Network Connection"); else {
                    var f = c;
                    var g = document.getElementById("subject").value;
                    var h = document.getElementById("msgbody").value;
                    var i = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
                    var j = new Date();
                    var l = j.getHours();
                    var m = j.getMinutes();
                    var n = j.getSeconds();
                    if (l < 10) l = "0" + l;
                    if (m < 10) m = "0" + m;
                    if (n < 10) n = "0" + n;
                    var o = l + ":" + m + ":" + n;
                    if ("" == g) g = o;
                    if ("" == h) h = i;
                    e.getCurrentPosition({
                        maximumAge: 7e3,
                        timeout: 15e3,
                        enableHighAccuracy: true
                    }).then(function(c) {
                        console.log("Your Locations ");
                        console.log("Your latitude is " + c.coords.latitude);
                        var d = c.coords.latitude + ";" + c.coords.longitude;
                        var e = new FileUploadOptions();
                        e.fileKey = "tickitFile";
                        e.fileName = b.substr(b.lastIndexOf("/") + 1);
                        e.contentType = "multipart/form-data";
                        e.chunkedMode = false;
                        e.mimeType = "image/jpeg";
                        e.httpMethod = "POST";
                        e.headers = {
                            Connection: "close"
                        };
                        var i = JSON.parse(localStorage.getItem("user")).userId;
                        var j = JSON.parse(localStorage.getItem("user")).apiKey;
                        var k = _baseUrl + "tickitService/" + j + "/createTickit";
                        console.log(k);
                        var l = new Object();
                        l.ownerId = i;
                        l.tickitStatus = f;
                        l.tickitType = 20;
                        l.recipient = MyRecipientHolderStringManual + "-cs";
                        l.subject = g;
                        l.ip = MyCurrentIPAddress;
                        l.msgBody = h;
                        l.gps = d;
                        e.params = l;
                        console.log(JSON.stringify(e));
                        var m = new FileTransfer();
                        a.$parent.showLoader();
                        m.upload(b, k, y, z, e);
                    }, function(a) {
                        console.log(a);
                    });
                }
            };
        }, function(a) {});
    };
    a.deleteImage = function() {
        a.imageAvailable = false;
    };
    a.ticketupload = function(b) {
        var c = k.getNetwork();
        if ("none" == c) alert("No Network Connection"); else {
            var d = b;
            var f = document.getElementById("subject").value;
            var g = document.getElementById("msgbody").value;
            var h = JSON.parse(localStorage.getItem("user")).firstName + " " + JSON.parse(localStorage.getItem("user")).lastName;
            var i = new Date();
            var j = i.getHours();
            var l = i.getMinutes();
            var n = i.getSeconds();
            if (j < 10) j = "0" + j;
            if (l < 10) l = "0" + l;
            if (n < 10) n = "0" + n;
            var o = j + ":" + l + ":" + n;
            var p = 0;
            if ("" == f) f = o;
            if ("" == g) g = h;
            e.getCurrentPosition({
                desiredAccuracy: 10,
                maxWait: 15e3,
                enableHighAccuracy: true
            }).then(function(b) {
                console.log("Your latitude is " + b.coords.latitude);
                console.log("Your latitude is " + b.coords.longitude);
                var c = b.coords.latitude;
                var e = b.coords.longitude;
                var h = JSON.parse(localStorage.getItem("user")).userId;
                var i = JSON.parse(localStorage.getItem("user")).apiKey;
                var j = _baseUrl + "tickitService/" + i + "/createTickit";
                var k = new FormData();
                k.append("ownerId", h);
                k.append("tickitStatus", d);
                k.append("msgBody", g);
                k.append("tickitType", "20");
                k.append("recipient", MyRecipientHolderStringManual);
                k.append("subject", f);
                k.append("ip", MyCurrentIPAddress);
                k.append("gps", c + ";" + e);
                a.$parent.showLoader();
                $.ajax({
                    url: j,
                    data: k,
                    dataType: "text",
                    processData: false,
                    contentType: false,
                    type: "POST",
                    success: function(b) {
                        m();
                        a.$parent.hideLoader();
                        a.statussucess = true;
                        a.imageAvailable = false;
                        a.main.sub = "";
                        a.main.msg = "";
                        console.log(JSON.stringify(b));
                    },
                    error: function(b) {
                        a.$parent.hideLoader();
                        a.stausFail = true;
                        console.log(JSON.stringify(b));
                    }
                });
            }, function(a) {
                console.log(a);
            });
        }
    };
    function y(b) {
        m();
        a.statussucess = true;
        a.$parent.hideLoader();
        a.imageAvailable = false;
        a.main.sub = "";
        a.main.msg = "";
        console.log("Code = " + b.responseCode);
        console.log("Response = " + b.response);
        console.log("Sent = " + b.bytesSent);
        console.log(b.response);
    }
    function z(b) {
        a.$parent.hideLoader();
        a.stausFail = true;
        alert("An error has occurred: Code = " + b.code);
        console.log(JSON.stringify(b));
    }
});
