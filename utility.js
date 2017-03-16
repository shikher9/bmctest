/**
 * Created by shikh on 14-Mar-17.
 */



function Utility() {

    this.filterData = function (userinput, userdata) {
        var result = [];
        var usersarr = userdata.users;
        for (var i = 0; i < usersarr.length; i++) {
            if (usersarr[i].name.substring(0, userinput.length).toLowerCase() === userinput.toLowerCase()) {
                result.push(usersarr[i]);
            }
        }
        return result;
    };
}


module.exports = Utility;