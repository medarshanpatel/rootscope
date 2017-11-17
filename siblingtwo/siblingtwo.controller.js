(function () {

    angular
        .module("app")
        .controller("SiblingTwoController", SiblingTwoController);

    SiblingTwoController.$inject = ['$scope'];

    function SiblingTwoController($scope) {
        var vm = this;
    }

})();