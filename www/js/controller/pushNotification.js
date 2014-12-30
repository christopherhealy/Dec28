/*  pushNotification.js Dec 30 2014
//  notes: apiKey is literal ? need to fix that
*/

var friendList = new Array();

ionicApp.controller("sendPushNotificationCtrl", function(a, b, c, d, e) {
    a.friends = b.getList();
    a.selectedfrnd = function() {
        friendList = [];
        $("#frndselect input[type=checkbox]:checked").each(function() {
            friendList.push(Number($(this).val()));
        });
        console.log(JSON.stringify(friendList));
        c.transitionTo("tabs.sendPushNotification");
    };
    a.sendPushNotification = function(b) {
        var e = _baseUrl + "userService/" + "333234567" + "/sendPushNotification";
        var f = JSON.parse(localStorage.getItem("user")).userId;
        var g = JSON.stringify(friendList);
        console.log(g);
        var h = {};
        h["senderId"] = f;
        h["message"] = b;
        h["userId"] = friendList;
        console.log(JSON.stringify(h));
        a.$parent.showLoader();
        var i = d.post(e, h, {
            cache: false
        });
        i.success(function(b, d, e, f) {
            friendList = [];
            console.log(JSON.stringify(b));
            if ("OK" == d) {
                a.$parent.hideLoader();
                function g() {
                    c.transitionTo("tabs.ticket");
                }
                navigator.notification.alert(b.message, g, "Message", "Done");
            } else {
                a.$parent.hideLoader();
                navigator.notification.alert(b.message, g, "Message", "Done");
            }
        });
        i.error(function(b, c, d, e) {
            console.log(JSON.stringify(b));
            a.$parent.hideLoader();
        });
    };
});
