appServices.service('DashboardServices', function($http, $rootScope) {
    var token = JSON.parse(localStorage.getItem('user')).token;
    $http.defaults.headers.common['x-access-token'] = token;
    return {
        newPost: _newPost,
        allPosts: _allPosts
    };

    function _newPost(data) {
        return $http.post('https://fdb22325.ngrok.io/api/post', data);
    }

    function _allPosts(data) {
        return $http.get('https://fdb22325.ngrok.io/api/post', data);
    }
});
