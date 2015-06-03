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
                'title': 'News',
                'key': 'news',
                'id': '2',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'QR Loyalty points',
                'key': 'points',
                'id': '3',
                'description':'Lorem ipsum bla bla'
            },
            {
                'title': 'Restaurant Menu',
                'key': 'menu',
                'id': '4',
                'description':'Lorem ipsum bla bla'
            }
        ];

        /*
        modules:[mm,xx,zz]
        admi:true/false;
        userId:xxxx        
        */

        return obj;
}]);