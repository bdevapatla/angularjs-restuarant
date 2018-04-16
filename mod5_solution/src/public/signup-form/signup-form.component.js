(function () {
"use strict";

angular.module('public')
.component('signupForm', {
  templateUrl: 'src/public/signup-form/signup-form.html',
  bindings: {
    menuItem: '=' //Two-way binding
  },
  controller: SignupFormController
});

SignupFormController.$inject = ['MenuService','SignupService'];

function SignupFormController(MenuService,SignupService) {
  var reg = this;
  reg.submit = function () {
    MenuService.getFavoriteItem(reg.user.favoriteItemCode)
    .then(function(message){
      console.log(message);
      reg.favoriteItemDoesNotExist = false;
        reg.completed = true;
        reg.user.favoriteItem = message;
        SignupService.createOrUpdateUser(reg.user);
    },function(message){    
      reg.completed = false;
      reg.favoriteItemDoesNotExist = true;
    });
  };
}

})();
