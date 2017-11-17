(function () {

    angular
        .module("app")
        .controller("SiblingOneController", SiblingOneController);

    SiblingOneController.$inject = ['$scope', '$rootScope'];

    function SiblingOneController($scope, $rootScope) {
        var vm = this;
        vm.scopeFunction = scopeFunction;

        // $broadcast
        $scope.$on('parent', function (event, data) {
            console.log("$broadcast siblingone", data);
        });

        // $emit
        function scopeFunction() {
            $scope.$emit('child', 'down to up');
        }

        // $rootscope $emit
        $rootScope.$on('rootScope:emit', function (event, data) {
            console.log("$rootScope $emit siblingone", data);
        });

        // $scope $broadcast
        $scope.$on('rootScope:broadcast', function (event, data) {
            console.log("$scope $broadcast siblingone", data);
        });

        // $rootscope $broadcast
        $rootScope.$on('rootScope:broadcast', function (event, data) {
            console.log("$rootScope $broadcast siblingone", data);
        });
    }
})();