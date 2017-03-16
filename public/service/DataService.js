/**
 * Created by shikh on 14-Mar-17.
 */

"use strict";

formApp.factory("DataService", function ($http, $log) {
    return {
        getData: function (userinput, callback) {
            $http({method: "GET", url: "/api/data/" + userinput}).then(function successCallback(response) {
                callback(response.data);
            }, function errorCallback(response) {
                $log.error("Error Fetching User Data : " + response.status + " " + response.statusText);
            });
        },
        submitData: function (affecteduser, affectedcompany, incidenttemplate, incidenttitle) {
            //SAVE DETAILS TO SERVER
        }
    }
});