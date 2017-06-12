angular.module('YouApp.router', [])

.config(function($stateProvider, $urlRouterProvider) {

    const APP_ABSTRACT = {
        name: 'app',
        url: '/app',
        abstract: true,
        templateUrl: 'app/shared/menu.html'
    }

    const DASHBOARD = {
        name: 'app.dashboard',
        url: '/dashboard',
        views: {
            'menuContent': {
                templateUrl: 'app/components/dashboard/dashboard.html',
                controller: 'DashboardController as self'
            }
        }
    }

    const LOGIN = {
        name: 'app.login',
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'app/components/login/login.html',
                controller: 'LoginController as self'
            }
        }
    }

    const FINANCEIRO = {
        name: 'app.financeiro',
        url: '/financeiro',
        views: {
            'menuContent': {
                templateUrl: 'app/components/financeiro/financeiro.html',
                controller: 'FinanceiroController as self',
            }
        }
    }

    const ACIONAR_SEGURO = {
        name: 'app.acionamentoSeguro',
        url: '/acionamentoSeguro',
        views: {
            'menuContent': {
                templateUrl: 'app/components/acionarSeguro/acionar-seguro.html',
                controller: 'AcionamentoSeguroController as self',
            }
        }
    }

    const APOLICE = {
        name: 'app.apolice',
        url: '/apolice',
        views: {
            'menuContent': {
                templateUrl: 'app/components/apolice/apolice.html',
                controller: 'ApoliceController as self',
            }
        }
    }

    const SINISTRO = {
        name: 'app.sinistro',
        url: '/sinistro',
        views: {
            'menuContent': {
                templateUrl: 'app/components/sinistro/sinistro.html',
                controller: 'SinistroController as self',
            }
        }
    }

    $stateProvider.state(APP_ABSTRACT);
    $stateProvider.state(LOGIN);
    $stateProvider.state(DASHBOARD);
    // $stateProvider.state(FINANCEIRO);
    // $stateProvider.state(ACIONAR_SEGURO);
    // $stateProvider.state(APOLICE);
    // $stateProvider.state(SINISTRO);
    $urlRouterProvider.otherwise('/app/login');

});
