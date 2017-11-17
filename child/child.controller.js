(function () {

    angular
        .module("app")
        .controller("ChildController", ChildController);

    ChildController.$inject = ['$rootScope'];

    function ChildController($rootScope) {
        var vm = this;
        vm.scopeFunction = scopeFunction;

        // $rootscope $emit
        function scopeFunction() {
            $rootScope.$emit('rootScope:emit', 'Emit! Rootscope'); // $rootScope.$on
            $rootScope.$broadcast('rootScope:broadcast', 'Broadcast! Rootscope'); // $rootScope.$on && $scope.$on
        }

    }

})();