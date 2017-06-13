// angular.module('YouApp.controllers', [])

app.controller('LoginController', function($cordovaCamera, $scope, $cordovaOauth, $state, $ionicHistory, $http, $ionicLoading, $ionicPopup, $ionicModal) {
    var self = this;

    self.objNovoUsuario = {}

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
        $http.post('https://tap-gram.herokuapp.com/authenticate', { username, password })
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

    self.criar = function() {
        self.modal.show();

    }

    $scope.criarConta = function(user) {
        user.profile_image = $scope.img;
        $http.post('https://tap-gram.herokuapp.com/user', user)
            .then(function(res) {
                $scope.closeModaNewPost();
            }, function(err) {
                alert(err.data.msg);
                throw err;
            });
    }
    $scope.closeModaNewPost = function() {
        self.modal.hide();
    };

    $ionicModal.fromTemplateUrl('app/components/login/modalNewUser.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        self.modal = modal;
    });


    $scope.getPhoto = function() {
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: 0,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.img = 'data:image/jpeg;base64,' + imageData;
            self.openModaNewPost();
        }, function(err) {
            throw err;
        });
    };

});