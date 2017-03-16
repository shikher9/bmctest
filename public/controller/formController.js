/**
 * Created by shikh on 14-Mar-17.
 */



formApp.controller("formController", function ($scope, DataService) {

    $scope.displaySuggestions = false
    $scope.showPriority = false;
    $scope.priorityStyle = null;
    var selectedUser = null;
    $scope.formSubmittedMessage = "Form Submitted Successfully";


    $scope.getSuggestions = function () {
        var inputtext = $scope.userquery;
        if (inputtext !== undefined && inputtext.length >= 3) {
            DataService.getData(inputtext, function (resdata) {
                if (resdata.data.length > 0) {
                    $scope.users = resdata.data;
                    $scope.displaySuggestions = true;
                } else {
                    $scope.displaySuggestions = false;
                }
            });
        } else {
            $scope.displaySuggestions = false;
        }
    };

    $scope.userSelect = function (index) {
        selectedUser = $scope.users[index];
        document.getElementById("companyname").value = selectedUser.company;
        document.getElementById("username").value = selectedUser.name;
        $scope.displaySuggestions = false;

        //set priority color based on user
        if (selectedUser.priority === "High") {
            $scope.priorityStyle = {'background-color': 'red'};
        } else if (selectedUser.priority === "Medium") {
            $scope.priorityStyle = {'background-color': 'yellow'};
        } else if (selectedUser.priority === "Low") {
            $scope.priorityStyle = {'background-color': 'green'};
        }


        $scope.showPriority = true;
    };


    /**
     * This function does validation and submits the data to the server
     */
    $scope.submitForm = function () {
        var affecteduser = document.getElementById("companyname").value;
        var affectedcompany = document.getElementById("username").value;
        var incidentTitle = $scope.incidentTitle;
        var incidentTemplate = $scope.incidentTemplate;

        if (affecteduser === undefined || affectedcompany === undefined || incidentTitle === undefined || incidentTemplate === undefined) {
            return;
        }


        // checking for empty spaces
        if (affecteduser.replace(/\s+/, "").length == 0 ||
            affectedcompany.replace(/\s+/, "").length == 0 ||
            incidentTitle.replace(/\s+/, "").length == 0 ||
            incidentTemplate.replace(/\s+/, "").length == 0) {
            return;
        }

        if (affecteduser.length > 0 && affectedcompany.length > 0 && incidentTemplate.length > 0 && incidentTitle.length > 0) {
            DataService.submitData(affecteduser, affectedcompany, incidentTemplate, incidentTitle);
        }

        var loader = document.getElementById("loader");
        loader.style.display = "block";


        /**
         * After two seconds the form will be submitted, just a simulation , no data is being submitted to the actual server
         */
        setTimeout(function () {
            loader.style.display = "none";
            var notification = document.getElementById("notification")
            notification.className = "visible";
            setTimeout(function () {
                notification.className = notification.className.replace("visible", "");
            }, 3000);
        }, 2000);
    };
});