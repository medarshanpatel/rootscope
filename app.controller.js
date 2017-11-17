(function () {

    angular
        .module("app")
        .controller("RootscopeController", RootscopeController);

    RootscopeController.$init = ['$scope', '$q', '$http'];

    function RootscopeController($scope, $q, $http) {
        var vm = this;
        vm.scopeFunction = scopeFunction;
        vm.printData = printData;
        vm.allFunction = allFunction;
        vm.raceFunction = raceFunction;

        function printData() {
            $scope.$broadcast('myCustomEvent', {
                Email: 'hello@knoxpo.com',
                City: 'Surat',
            });
        }

        $scope.$on('myCustomEvent', function (event, data) {
            vm.data = data;
        });

        // $broadcast
        function scopeFunction() {
            $scope.$broadcast('parent', 'up to down'); // going down!
        }

        // $emit
        $scope.$on('child', function (event, data) {
            console.log("$emit - ", data);
        });
        var promise1 = $http.get('https://samples.openweathermap.org/data/2.5/forecast/daily?id=1255364&appid=b1b15e88fa797225412429c1c50c122a1', true);
        var promise2 = $http.get('https://samples.openweathermap.org/data/2.5/forecast/daily?id=1255364&appid=b1b15e88fa797225412429c1c50c122a1', true); 

        // .all
        function allFunction() {
            $q.all([promise1, promise2])
                .then(function (data) {
                    console.log("all - ", "Success");
                })
                .catch(function () {
                    console.log("all - ", "Error");
                });
        }

        // .race
        function raceFunction() {
            $q.race([promise1, promise2])
                .then(function (data) {
                    console.log("race - ", "Success");
                })
                .catch(function () {
                    console.log("race - ", "Error");
                });
        }

        // $q Promise Handling 
        init();

        function asyncGreet(name) {

            // return $q(function (resolve, reject) {
            //     setTimeout(function () {                                        
            //         if (okToGreet(name)) {
            //             resolve('Hello, ' + name + '!');
            //         } else {
            //             reject('Greeting ' + name + ' is not allowed.');
            //         }
            //     }, 1000);
            // });
            var deferred = $q.defer();
            setTimeout(function () {
                deferred.notify("Action is about to begin.");

                if (okToGreet(name)) {
                    deferred.resolve('Hello, ' + name + '!');
                } else {
                    deferred.reject('Greeting ' + name + ' is not allowed.');
                }
            }, 1000);
            return deferred.promise;
        }

        function okToGreet(arg1) {
            return true;
        }

        function init() {
            // var promise = asyncGreet("Darshan")
            // .then(function (response) {
            //     console.log("response", response);
            // }, function (error) {
            //     console.log("error", error);
            // }, function (notify) {
            //     console.log("notify", notify);
            // });

            var sequenceCall = first("Darshan")
                .then(function (response) {
                    //console.log("First ", response);
                    return second(response);
                })
                .catch(function () {
                    //console.log("Second Call Error");
                })

                .then(function (response) {
                    //console.log("Second ", response);
                    return third(response);
                })
                .catch(function () {
                    //console.log("Third Call Error");
                })

                .then(function (response) {
                    //console.log("Call ended", response);
                })
                .catch(function () {
                    //console.log("Call End Error");
                });

        }

        function first(name) {


            var deferred = $q.defer();

            if (okToGreet(name)) {
                deferred.resolve('Hello, ' + name + '!');
            } else {
                deferred.reject('Greeting ' + name + ' is not allowed.');
            }
            return deferred.promise;

            // setTimeout(function () {
            //     //deferred.notify("Action is about to begin.");
            //     if (okToGreet(name)) {
            //         deferred.resolve('Hello, ' + name + '!');
            //     } else {
            //         deferred.reject('Greeting ' + name + ' is not allowed.');
            //     }
            // }, 1000);

        }

        function second(dataFromFirst) {
            //console.log("second", dataFromFirst);
            return dataFromFirst + "--second ";
        }

        function third(dataFromSecond) {
            //console.log("third", dataFromSecond);
            return dataFromSecond + "--third ";
        }

    }

})();