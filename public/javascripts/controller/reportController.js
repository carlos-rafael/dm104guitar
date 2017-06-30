(function(){
    //criação do módulo de nome demo, controller e serviço
    angular.module('demo', [])
    .controller('myController', myController)
    .service('MyService', MyService);

    //inserção das dependências
    myController.inject=['$scope','$location', '$http','MyService', '$window'];
    //função controller
    function myController($scope, $location, $http,MyService, $window){
        
        //controller chama serviço que invoca todos os instrumentos
        $scope.soma= MyService.getinstruments($http, $scope);
        console.log("aifjaoifejaoeifjaoeif", $scope.soma);
        $scope.writeinstrument = function(index){
            $scope.instrument.id= $scope.instruments[index].id;
            $scope.instrument.name= $scope.instruments[index].name;
            $scope.instrument.price= $scope.instruments[index].price;
            $scope.instrument.detail= $scope.instruments[index].detail;
        };
   }
    //função serviço
    function MyService(){
        var service = this;
        var instruments=[];

        //serviço que retorna todos os intrumentos
        service.getinstruments = function($http, $scope){
            //variáveis de controle
            $scope.soma = 0;
            $scope.count = 0;
            $scope.nomeMaiorPreco = '';
            $scope.nomeMenorPreco = '';
            var maior = -1;
            var menor =99999999;
            var quant=0;
            var nomeMaiorP = '';
            var nomeMenorP = '';

            //operação GET
            $http.get('http://localhost:3000/Instruments').
            then(function(response){

                //varre todos os instrumentos, e lista o valor total de todos os instrumentos, o nome do mais e menos valioso, com seus respectivos preços
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
                //console.log($scope.maior);
                $scope.count=response.data.length;
                //console.log('count eh ',$scope.count);

                $scope.nomeMaiorPreco = nomeMaiorP;
                $scope.nomeMenorPreco = nomeMenorP;
                //console.log($scope.nomeMaiorPreco); 
                //console.log($scope.nomeMenorPreco);
                return $scope.soma;
            });

            return $scope.soma;
        }
    }


})();
