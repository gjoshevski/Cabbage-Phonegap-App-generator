'use strict';

angular.module('applications').factory('Config', ['$http',
 function ($http) {

        var obj = {
            modules: null
        };


        obj.modules = [
            {
                'title': 'Business Card',
                'key': 'bcard',
                'id': '1',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'news',
                'key': 'news',
                'id': '2',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'QR Loyalty points',
                'key': 'qrpoints',
                'id': '3',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'Restaurant Menu',
                'key': 'restoranmenus',
                'id': '4',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'Restaurant Menu Admin',
                'key': 'restoranmenus-admin',
                'id': '5',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'Business Card Admin',
                'key': 'binfo-admin',
                'id': '6',
                'description':'Lorem ipsum bla bla'
            }
        ];



        return obj;
}]);