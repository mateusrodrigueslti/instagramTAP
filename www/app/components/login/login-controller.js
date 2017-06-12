// angular.module('YouApp.controllers', [])

app.controller('LoginController', function($cordovaOauth, $state, $ionicHistory, $http, $ionicLoading, $ionicPopup) {
    var self = this;

    self.logarFacebook = function() {
        $cordovaOauth.facebook('1191213624249171', ["email"]).then(_sucessoFacebook, _erroFacebook);
    }
    self.logarGoogle = function() {
        $cordovaOauth.google('280351177861-2jm15phqolarjujhvuaiil516o1secm5.apps.googleusercontent.com', ["email"]).then(_sucessoGoogle, _erroGoogle);
    }

    self.logar = function(username, password) {
        var username = username;
        var password = password;
        $ionicLoading.show({
            template: 'Realizando login. Aguarde...',
            hideOnStateChange: true
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        $http.post('https://fdb22325.ngrok.io/authenticate', { username, password })
            .then(function(res) {
                localStorage.setItem('user', JSON.stringify(res.data));
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $state.go('app.dashboard');
            }, function(err) {
                $ionicLoading.hide().then(function() {
                    console.log("The loading indicator is now hidden");
                });
                var alertPopup = $ionicPopup.alert({
                    title: 'Ops',
                    template: err.data.msg
                });

                alertPopup.then(function(res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
                throw err;
            });
    };

    function _sucessoFacebook(objetoRetorno) {
        console.log(objetoRetorno);
        toDashboard();
    }

    function _erroFacebook(objetoRetorno) {
        alert('Para entrar voce precisa se autenticar');
    }

    function _sucessoGoogle(objetoRetorno) {
        console.log(objetoRetorno);
        toDashboard();
    }

    function _erroGoogle(objetoRetorno) {
        alert('Para entrar voce precisa se autenticar');
        console.log(objetoRetorno);
    }

    function toDashboard() {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('app.dashboard');
    }

});
