(function () {
"use strict";

angular.module('common')
.service('SignupService', SignupService);

function SignupService() {
  var service = this;
  var users = [];
  service.createOrUpdateUser = function (_user_) {
    if(users.length === 0){
      users.push(_user_);
    }
    else {
      var tempUser = users.find(function(user) {
        return (user.email === _user_.email);//Email is the primary key
      });
      if(tempUser){
      tempUser.firstname = _user_.firstname;
      tempUser.lastname = _user_.lastname;
      tempUser.phone = _user_.phone;
      tempUser.favoriteItem = _user_.favoriteItem;
    }
    else {
        users.push(_user_);
    }
    }
  };

  service.getUserInfo = function () {
    return users.length === 0 ? new Object():users[users.length-1];//Always get the latest registratin info per session
  };
}
}
)();
