'use strict';

angular.module('applications').factory('Config', ['$http',
 function ($http) {

        var obj = {
            modules: null
        };


        obj.modules = [
            {
                'title': 'Bcard',
                'id': '1',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'news',
                'id': '2',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'qrpoints',
                'id': '3',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'restoranmenus',
                'id': '4',
                'description':'Lorem ipsum bla bla'
            }
        ];



        return obj;
}]);