angular.module('YouApp', ['ionic', 'YouApp.controllers', 'YouApp.services', 'YouApp.router', 'ngCordova', 'ngMap', 'ngCordovaOauth'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function($cordovaStatusbar) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        var notificationOpenedCallback = function(jsonData) {
            console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        // window.plugins.OneSignal
        //     .startInit("57601c5d-33e0-4a95-bf1e-171944ff28d4", "280351177861")
        //     .handleNotificationOpened(notificationOpenedCallback)
        //     .endInit();
    });


})

var app = angular.module('YouApp.controllers', []);
var appServices = angular.module('YouApp.services', []);
