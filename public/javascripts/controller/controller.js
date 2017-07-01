(function(){
    //criação do módulo de nome demo, que possui um controller e um serviço
    angular.module('demo', [])
    .controller('myController', myController)
    .service('MyService', MyService);

    //invoca todas as dependências do controller
    myController.inject=['$scope','$location', '$http','MyService', '$window'];
    //função controller
    function myController($scope, $location, $http,MyService, $window){

        //função que abrirá nova janela        
        $scope.popitup = function(url, target) {
            $window.open(url, target);
        }

        //modelo de um objeto instrument    
        $scope.instrument = {
            id:'',
            name:'',
            price:'',
            detail:''
        };

        //sempre que o usuário atualizar a página, a função que retorna todos os instrumentos será invocada
        $scope.instruments= MyService.getinstruments($http, $scope);

        //função auxiliar que escreve os valores de um objeto aos input fields do form
        $scope.writeinstrument = function(index){

            $scope.instrument.id= $scope.instruments[index].id;
            $scope.instrument.name= $scope.instruments[index].name;
            $scope.instrument.price= $scope.instruments[index].price;
            $scope.instrument.detail= $scope.instruments[index].detail;

        };

        //função da controller que adiciona um novo instrumento
        $scope.addinstrument = function(){
            //a adição é realizada através de um serviço
            MyService.addinstrument($http,$scope, $scope.instrument.id, $scope.instrument.name, $scope.instrument.price, $scope.instrument.detail);
        };

        //função qeu deleta um instrumento
        $scope.deleteinstrument = function(index){
            //a operação de remoção é relaizada por um serviço
            MyService.deleteinstrument($http, $scope, index)
        };

        //função que atualiza um instrumento
        $scope.editinstrument = function(instrumentId, instrumentName, instrumentPrice, instrumentDetail){

            $scope.instrument.id= instrumentId;
            $scope.instrument.name= instrumentName;
            $scope.instrument.price= instrumentPrice;
            $scope.instrument.detail= instrumentDetail;
            console.log($scope.instrument);
            //a atualização ocorre através de um serviço
            MyService.editinstrument($http,$scope,$scope.instrument);
        };
    }

    //criação do serviço
    function MyService(){
        var service = this;
        var instruments=[];

        //serviço invocado pela controller que adiciona um novo instrumento ao banco
        service.addinstrument = function($http,$scope,Id,Name, Price, Detail){
            console.log('id1 eh ',Id);
            data={
                id:Id,
                name:Name,
                price:Price,
                detail:Detail
            };
            //console.log(JSON.stringify(data));
            
            //chama uma operação post com a rota necessária, e o objeto em json
            //$http.post('http://localhost:3000/Instruments/', JSON.stringify(data)).then(function (response) {
            $http.post('https://guitarapi.herokuapp.com/Instruments', JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                    //console.log(response.data);
                    //console.log($scope);
                    //$scope.instruments.push(data);

                    //novo get é invocado para atualizar a view
                     $scope.instruments= service.getinstruments($http, $scope);
    
                }, function (response) {
                    //em caso de erro
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                    //console.log($scope);                    
                });
                
            //o array instruments recebe um novo elemento
            instruments.push(data);
        };

        //serviço que retorna todos os instrumentos do banco
        service.getinstruments = function($http, $scope){
            //operação get
            //$http.get('http://localhost:3000/Instruments').
            $http.get('https://guitarapi.herokuapp.com/Instruments').
            then(function(response){
                //console.log('realizou getAll',response.data);
                $scope.instruments = response.data;
                
            });
            //serviço retorna todos os instrumentos presentes no banco
            return instruments;
        }

        //serviço que deleta um instrumento
        service.deleteinstrument = function($http, $scope, index){

            index = index.id;

            //var url = 'http://localhost:3000/Instruments/'+index, data = 'parameters';
            var url = 'https://guitarapi.herokuapp.com/Instruments/'+index, data = 'parameters';

            //operação delete que deleta um instrumento do banco
            $http.delete(url, data).then(function (response) {
            //console.log('sucesso');
            $scope.instruments= service.getinstruments($http, $scope);
            
        }, function (response) {
            console.log('erro');
            
            });
        }

        //serviço que edita um instrumento
        service.editinstrument = function($http,$scope,instrument){
             //cria modelo com informações do objeto selecionado pelo usuário para edição
             data={
                id:instrument.id,
                name:instrument.name,
                price:instrument.price,
                detail:instrument.detail
            };
            //console.log(JSON.stringify(data));

            //operação put que passa o id do instrumento como parâmetro, e o objeto em json no corpo da requisição
            //$http.put('http://localhost:3000/Instruments/'+data.id, JSON.stringify(data)).then(function (response) {
            $http.put('https://guitarapi.herokuapp.com/Instruments/'+data.id, JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Put Data Submitted Successfully!";
                    //console.log(response.data);
                    //console.log($scope);
                    $scope.instruments= service.getinstruments($http, $scope);
                     
                    //$scope.$digest();
                }, function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                    //console.log($scope);
                    
                });                
        };
    }


})();
