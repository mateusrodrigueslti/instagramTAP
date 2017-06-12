app.controller('SinistroController', function($cordovaCamera, $cordovaContacts, $cordovaSpinnerDialog, $cordovaOauth) {
  var self = this;

  self.contatos = [];

  self.openCamera = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(_sucessoCamera, _erroCamera)
  }

  self.todosOsContatos = function() {
    $cordovaSpinnerDialog.show("Aguarde !","Procurando contatos", true);
    $cordovaContacts.find({fields:  [ 'displayName', 'name' ]}).then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      self.contatos = allContacts;
      console.log(self.contatos);
      $cordovaSpinnerDialog.hide();
    }, function () {
      alert('erro')
    });
  };

  function _sucessoCamera(imageData) {
    console.log(imageData);
  }
  function _erroCamera() {
    alert('Erro ao inicializar camera')
  }
});
