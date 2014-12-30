/* friendlist.js Dec 30 2014
//  notes:
*/

ionicApp.controller("friendlistctrl", function(a, b, c, d, e) {
    a.sendMail = function(b, c) {
        a.personName = c;
        window.plugin.email.isServiceAvailable(function(a) {
            var d = JSON.parse(localStorage.getItem("user")).emailId;
            var e = "<p>Hi  " + c + ",</p><p>I am using Whami - a fun and free app that enables you to find me on a map.</p><p>If you want to know where I am, use this map link:</p><p><a href='http://dev.tickittaskit.com/flippadoo/app/findMe/ " + d + "'>http://dev.tickittaskit.com/flippadoo/app/findMe/" + d + "</a></p><p>Thanks for following me</p>";
            if (a) window.plugin.email.open({
                to: [ b ],
                cc: [ "" ],
                bcc: [ "" ],
                subject: "Please follow me on Whami",
                body: e,
                isHtml: true
            }); else alert("do not support");
        });
    };
    i();
    var f = [];
    var g = [];
    var h = [];
    a.friends = b.getList();
    function i() {
        var c = [];
        a.friends = b.getList();
        var d = a.friends;
        var e = JSON.parse(localStorage.getItem("user")).emailId;
        angular.forEach(d, function(b) {
            var d = JSON.parse(localStorage.getItem("user")).emailId;
            console.log(b.emailId);
            if (d === b.emailId) c.push(b);
            a.whamiUserdetail = c;
        });
    }
    a.showLocation = function(b) {
        alert(b);
        a.$broadcast("map:userId", b);
        c.transitionTo("tabs.map");
    };
    var j;
    var k = {
        fields: [ "emails", "phoneNumbers", "name" ],
        multiple: true
    };
    d.find(k).then(function(b) {
        console.log(JSON.stringify(b));
        a.phoneContact = b;
        j = a.phoneContact;
        l();
    }, function(a) {
        console.log(a);
    });
    function l() {
        var b = a.friends;
        var c = j;
        angular.forEach(c, function(a) {
            angular.forEach(b, function(b) {
                if (a.emails) {
                    var d = a.emails[0].value.toLowerCase();
                    var e = b.emailId.toLowerCase();
                    if (d === e) {
                        console.log(a.emails[0].value);
                        b.firstName = a.name.givenName;
                        b.lastName = a.name.familyName;
                        g.push(b);
                        c = jQuery.grep(c, function(b) {
                            return b != a;
                        });
                    }
                }
            });
        });
        a.nonWhamiUser = c;
        a.whamiUser = g;
    }
    a.doRefresh = function() {
        console.log("Refreshing!");
        e(function() {
            c.go(c.$current, null, {
                reload: true
            });
            a.$broadcast("scroll.refreshComplete");
        }, 1e3);
    };
    a.selectFriend = function() {
        c.transitionTo("tabs.selectFriend");
    };
    a.settingPage = function() {
        c.transitionTo("tabs.setting");
    };
    a.inviteFrnd = function() {
        c.transitionTo("tabs.inviteFriend");
    };
    a.backTofriend = function() {
        c.transitionTo("tabs.friendlist");
    };
    a.toHome = function() {
        c.transitionTo("tabs.home");
    };
});
