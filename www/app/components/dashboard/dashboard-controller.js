app.controller('DashboardController', function($scope, $state, $cordovaCamera, $ionicModal, DashboardServices, $ionicLoading) {
    var self = this;

    self.user = JSON.parse(localStorage.getItem('user'));

    self.getPhoto = function() {
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

    self.openModaNewPost = function() {
        self.modal.show();
    };

    self.allPosts = function() {
        $ionicLoading.show({
            template: 'Buscando Publicações',
            hideOnStateChange: true
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        DashboardServices.allPosts()
            .then(
                function(res) {
                    self.allPosts = res.data;
                    $ionicLoading.hide().then(function() {
                        console.log("The loading indicator is now hidden");
                    });
                },
                function(err) {
                    $ionicLoading.hide().then(function() {
                        console.log("The loading indicator is now hidden");
                    });
                    throw err;
                });
    };

    $scope.allPosts = function() {
        $ionicLoading.show({
            template: 'Buscando Publicações',
            hideOnStateChange: true
        }).then(function() {
            console.log("The loading indicator is now displayed");
        });
        DashboardServices.allPosts()
            .then(
                function(res) {
                    self.allPosts = res.data;
                    $ionicLoading.hide().then(function() {
                        console.log("The loading indicator is now hidden");
                    });
                },
                function(err) {
                    $ionicLoading.hide().then(function() {
                        console.log("The loading indicator is now hidden");
                    });
                    throw err;
                });
    };

    self.closeModaNewPost = function() {
        self.modal.hide();
    };
    $scope.closeModaNewPost = function() {
        self.modal.hide();
    };

    // MODAL DE POST
    $scope.post = function(post_picture, status) {
        let postObj = {
            post_picture: post_picture,
            status: status
        };

        DashboardServices.newPost(postObj)
            .then(
                function(res) {
                    $scope.allPosts();
                    $scope.closeModaNewPost();
                },
                function(err) {
                    throw err;
                });
    };

    $ionicModal.fromTemplateUrl('app/components/dashboard/modalNewPost.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        self.modal = modal;
    });
});
