/*  map.js Dec 30 2014
//  notes:showing the apiKey as a literal (333?) need to look at that
*/

ionicApp.controller("mapctrl", [ "$stateParams", "$scope", "leafletEvents", "$http", "$state", function(a, b, c, d, e) {
    var f = 5;
    b.homePage = function() {
        e.transitionTo("tabs.ticket");
    };
    function g() {
        var c = _baseUrl + "userService/" + "333234567" + "/fetchUserLatLng?userId=" + a.contactId + "&lastNLatLng=" + f;
        var e = d.get(c, {
            cache: false
        });
        e.success(function(a, c, d, e) {
            console.log(JSON.stringify(a));
            var f = a.geolocationList;
            b.markers = new Array();
            for (var g = 0; g < f.length; g++) {
                console.log(f[g].latitude);
                console.log(f[g].longitude);
                var h = f[g].tickitStatusModel.label;
                console.log(h);
                if ("Completed" == h) var i = {
                    iconUrl: "img/pin_blue.png",
                    iconSize: [ 38, 45 ],
                    shadowSize: [ 50, 64 ],
                    iconAnchor: [ 22, 94 ],
                    shadowAnchor: [ 4, 62 ],
                    popupAnchor: [ -3, -76 ]
                };
                if ("rejected" == h) var i = {
                    iconUrl: "img/pin_red.png",
                    iconSize: [ 38, 45 ],
                    shadowSize: [ 50, 64 ],
                    iconAnchor: [ 22, 94 ],
                    shadowAnchor: [ 4, 62 ],
                    popupAnchor: [ -3, -76 ]
                };
                if ("Unassigned" == h) var i = {
                    iconUrl: "img/pin_yellow.png",
                    iconSize: [ 38, 45 ],
                    shadowSize: [ 50, 64 ],
                    iconAnchor: [ 22, 94 ],
                    shadowAnchor: [ 4, 62 ],
                    popupAnchor: [ -3, -76 ]
                };
                if ("Verified" == h) var i = {
                    iconUrl: "img/pin_green.png",
                    iconSize: [ 38, 45 ],
                    shadowSize: [ 50, 64 ],
                    iconAnchor: [ 22, 94 ],
                    shadowAnchor: [ 4, 62 ],
                    popupAnchor: [ -3, -76 ]
                };
                b.markers.push({
                    lat: Number(f[g].latitude),
                    lng: Number(f[g].longitude),
                    icon: i,
                    focus: true,
                    message: f[g].tickitSubject
                });
            }
            var j = f.length / 2;
            j = parseInt(j);
            console.log(j);
            b.berlin = {
                lat: Number(f[j].latitude),
                lng: Number(f[j].longitude),
                zoom: 12
            };
        });
        e.error(function(a, b, c, d) {
            console.log(JSON.stringify(a));
        });
    }
    g();
    b.showMoreLocation = function() {
        f += 5;
        g();
    };
    angular.extend(b, {
        berlin: {},
        markers: {},
        layers: {
            baselayers: {
                osm: {
                    name: "OpenStreetMap",
                    url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    type: "xyz"
                }
            }
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
} ]);
