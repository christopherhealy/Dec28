
/* HomeTabCtrl.js Dec 30 2014
//  notes:
*/

var _baseUrl = "http://dev.tickittaskit.com/flippadoo/mobile/";

ionicApp.controller("MainCtrl", function(a, b, c, d) {
    a.showLoader = function() {
        c.show({
            content: '<h1><i class="icon ion-refreshing"></i></h1>',
            animation: "fade-in",
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 50
        });
    };
    a.hideLoader = function() {
        c.hide();
    };
});

ionicApp.controller("HomeTabCtrl", function(a, b, c, d, e, f, g, h, i, j, k) {
    var l = localStorage.getItem("buttonShow", true);
    if (null == l) {
        a.showFrndDisable = true;
        a.showFrndButton = false;
    } else {
        a.showFrndButton = true;
        a.showFrndDisable = false;
    }
    a.hideback = true;
    a.putAsafeApply = function(a) {
        var b = this.$root.$$phase;
        if ("$apply" == b || "$digest" == b) {
            if (a && "function" === typeof a) a();
        } else this.$apply(a);
    };
    a.login = function() {
        var b = device.uuid;
        var e = 0;
        var f = document.getElementById("validateEmail").value;
        if ("" == f) {
            alert("Please Enter Email Id");
            e = 1;
        } else e = 0;
        if (0 == e) {
            var g = k.getNetwork();
            if ("none" == g) alert("No Network Connection"); else {
                var h = _baseUrl + "userService/" + "333234567" + "/login";
                var i = {};
                i["emailId"] = f;
                i["deviceId"] = b;
                i["deviceType"] = "iPhone";
                console.log(JSON.stringify(i));
                a.$parent.showLoader();
                var j = c.post(h, i, {
                    cache: false
                });
                j.success(function(b, c, e, f) {
                    console.log(JSON.stringify(b));
                    var g = JSON.stringify(b.user);
                    if ("OK" == b.status) {
                        localStorage.setItem("buttonShow", true);
                        localStorage.setItem("networkSet", true);
                        localStorage.setItem("user", g);
                        d.transitionTo("tabs.ticket");
                        a.$parent.hideLoader();
                    } else {
                        alert(b.error);
                        a.$parent.hideLoader();
                    }
                });
                j.error(function(b, c, d, e) {
                    console.log(JSON.stringify(b));
                    alert("Server Error");
                    a.$parent.hideLoader();
                });
            }
        }
    };
    a.showfriends = function() {
        h.query();
    };
});
