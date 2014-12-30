/* gpsController.js Dec 30 2014
//  notes:
*/

ionicApp.controller("gpsControler", function(a, b, c, d, e) {
    var f = localStorage.getItem("startDate");
    var g = localStorage.getItem("endDate");
    a.startDate = f;
    a.endDate = g;
    a.colors = [ {
        name: "5 Minute",
        value: 3e5
    }, {
        name: "10 Minute",
        shade: 6e5
    }, {
        name: "15 Minute",
        shade: 9e5
    }, {
        name: "20 Minute",
        shade: 12e5
    }, {
        name: "25 Minute",
        shade: 15e5
    } ];
    a.saveDates = function(a, b) {
        var d = $("#timeInterVal").val();
        localStorage.setItem("timeInterVal", d);
        if (angular.isDefined(a)) localStorage.setItem("startDate", a); 
          else localStorage.setItem("startDate", false);
        if (angular.isDefined(b)) localStorage.setItem("endDate", b); 
          else localStorage.setItem("endDate", false);
        var f = {};
        f["endDate"] = b;
        f["startDate"] = a;
        c.$broadcast("gpsSettingsChanged", f);
        e.stop();
    };
});
