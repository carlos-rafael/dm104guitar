(function(){

    angular.module('demo', [])
    .controller('myController', myController)
    .service('MyService', MyService);

    myController.inject=['$scope','$location', '$http','MyService', '$window'];
    function myController($scope, $location, $http,MyService, $window){
  
        $scope.soma= MyService.getinstruments($http, $scope);
        console.log("aifjaoifejaoeifjaoeif", $scope.soma);
        $scope.writeinstrument = function(index){
            console.log('aaa',index);
            $scope.instrument.id= $scope.instruments[index].id;
            $scope.instrument.name= $scope.instruments[index].name;
            $scope.instrument.price= $scope.instruments[index].price;
            $scope.instrument.detail= $scope.instruments[index].detail;

//            MyService.editinstrument($http,$scope,$scope.instrument);
        };
   }

    function MyService(){
        var service = this;
        var instruments=[];

        service.getinstruments = function($http, $scope){
            $scope.soma = 0;
            $scope.count = 0;
            $scope.nomeMaiorPreco = '';
            $scope.nomeMenorPreco = '';
            var maior = -1;
            var menor =99999999;
            var quant=0;
            var nomeMaiorP = '';
            var nomeMenorP = '';
            $http.get('http://localhost:3000/Instruments').
            then(function(response){
                console.log('dsdsdsd',response.data.length);
                console.log('realizou getAll',response.data);

                for(var i=0;i< response.data.length;i++){
                    
                    quant = parseInt(response.data[i].price);

                    if(quant>=maior){
                        nomeMaiorP = response.data[i].name;
                        maior = quant;
                    }

                    if(quant<=menor){
                        nomeMenorP = response.data[i].name;
                        menor=quant;
                    }

                    $scope.soma += quant;
                    console.log('soma eh ', $scope.soma);


                }
                $scope.maior = maior;
                $scope.menor = menor;
                console.log($scope.maior);
                $scope.count=response.data.length;
                console.log('count eh ',$scope.count);

                $scope.nomeMaiorPreco = nomeMaiorP;
                $scope.nomeMenorPreco = nomeMenorP;
                console.log($scope.nomeMaiorPreco); 
                console.log($scope.nomeMenorPreco);
                return $scope.soma;
            });

            return $scope.soma;
        }

    }


})();
