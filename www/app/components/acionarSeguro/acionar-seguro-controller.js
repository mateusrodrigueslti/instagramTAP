// angular.module('YouApp.controllers', [])

app.controller('AcionamentoSeguroController', function($scope, $ionicModal, $cordovaGeolocation, $ionicPopup, $state) {
  var self = this;

  var posOptions = {timeout: 10000, enableHighAccuracy: true};

  $ionicModal.fromTemplateUrl('app/components/acionarSeguro/modais/modal-escolher-assistencia.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    self.modalAssitencias = modal;
  });

  $ionicModal.fromTemplateUrl('app/components/acionarSeguro/modais/modal-deslocamento.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modalDeslocamento) {
    self.modalDeslocamento = modalDeslocamento;
  });

  $ionicModal.fromTemplateUrl('app/components/acionarSeguro/modais/modal-tempo-estimado.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modalTempoEstimado) {
    self.modalTempoEstimado = modalTempoEstimado;
  });

  self.openModalAssistencias = function() {
    self.modalAssitencias.show();
  };
  self.openModalDeslocamento = function() {
    // self.localizacaoAtual()
    self.modalDeslocamento.show();
  };
  self.openModalTempoEstimado = function() {
    self.modalTempoEstimado.show();
    self.localizacaoAtual()
  };
  self.closeModalTempoEstimado = function() {
    self.modalTempoEstimado.hide();
  };
  self.closeModalAssistencias = function() {
    self.modalAssitencias.hide();
  };
  self.closeModalDeslocamento = function() {
    self.modalDeslocamento.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    self.modalAssitencias.remove();
    self.modalDeslocamento.remove();
  });

  self.localizacaoAtual = function() {
    console.log('localizacaoAtual')
    $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      self.lat  = position.coords.latitude;
      self.long = position.coords.longitude;
    }, function(err) {
      alert('Erro ao recuperar localização')
    });
  };

  self.popupEscolherPane = function () {
    $ionicPopup.show({
    templateUrl: 'app/components/acionarSeguro/modais/popup-pane-carro.html',
    title: 'Consegue nos dizer o que está acontecendo com seu carro?',
    subTitle: 'Marque os itens relacionados',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-dark',
        onTap: function(e) {
          self.openModalDeslocamento();
        }
      }
    ]
  });
  }

  self.popupPneusFurados = function () {
    $ionicPopup.show({
    templateUrl: 'app/components/acionarSeguro/modais/popup-pneus-furados.html',
    title: 'Consegue nos informar quantos pneus estão furados?',
    subTitle: 'Marque os itens relacionados',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-dark',
        onTap: function(e) {
          self.openModalDeslocamento();
        }
      }
    ]
  });
  }

  self.gotoAcionamentoSeguro = function() {
    self.closeModalTempoEstimado()
    $state.go('app.dashboard');
  }
});
