(function(){

    angular.module('demo', [])
    .controller('myController', myController)
    .service('MyService', MyService);

    myController.inject=['$scope','$location', '$http','MyService', '$window'];
    function myController($scope, $location, $http,MyService, $window){
        
 $scope.popitup = function(url, target) {
  $window.open(url, target);
}

        
        $scope.instrument = {
            id:'',
            name:'',
            price:'',
            detail:''
        };

        $scope.instruments= MyService.getinstruments($http, $scope);

        $scope.writeinstrument = function(index){
            console.log('aaa',index);
            $scope.instrument.id= $scope.instruments[index].id;
            $scope.instrument.name= $scope.instruments[index].name;
            $scope.instrument.price= $scope.instruments[index].price;
            $scope.instrument.detail= $scope.instruments[index].detail;

//            MyService.editinstrument($http,$scope,$scope.instrument);
        };


        $scope.addinstrument = function(){
            MyService.addinstrument($http,$scope, $scope.instrument.id, $scope.instrument.name, $scope.instrument.price, $scope.instrument.detail);
            console.log('chamou a addinstrument()');
        };

        $scope.deleteinstrument = function(index){
            console.log('agora eh ', index);
            MyService.deleteinstrument($http, $scope, index)
        };

  

        $scope.editinstrument = function(instrumentId, instrumentName, instrumentPrice, instrumentDetail){

            $scope.instrument.id= instrumentId;
            $scope.instrument.name= instrumentName;
            $scope.instrument.price= instrumentPrice;
            $scope.instrument.detail= instrumentDetail;
            console.log($scope.instrument);
            MyService.editinstrument($http,$scope,$scope.instrument);
        };


    }

    function MyService(){
        var service = this;
        var instruments=[];

        service.addinstrument = function($http,$scope,Id,Name, Price, Detail){
            console.log('id1 eh ',Id);
            data={
                id:Id,
                name:Name,
                price:Price,
                detail:Detail
            };
            console.log(JSON.stringify(data));
            $http.post('http://localhost:3000/Instruments/', JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Post Data Submitted Successfully!";
                    console.log(response.data);
                    console.log($scope);
//                    $scope.instruments.push(data);
                     $scope.instruments= service.getinstruments($http, $scope);
                     

                    //$scope.$digest();
                }, function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                    console.log($scope);
//                    window.location.href = '/instruments'
                    
                });
                
            
            instruments.push(data);
        };

        service.getinstruments = function($http, $scope){

            $http.get('http://localhost:3000/Instruments').
            then(function(response){
                console.log('realizou getAll',response.data);
                $scope.instruments = response.data;
                
            });

            return instruments;
        }

        

        service.deleteinstrument = function($http, $scope, index){
            // Simple Delete request example:
            index = index.id;
            console.log('ssasas'+index);
            var url = 'http://localhost:3000/Instruments/'+index, data = 'parameters';
            $http.delete(url, data).then(function (response) {
                console.log('sucesso');
                $scope.instruments= service.getinstruments($http, $scope);
            // This function handles success
        }, function (response) {
            console.log('erro');
            // this function handles error
            });
        }

        service.editinstrument = function($http,$scope,instrument){
            console.log('id1 eh ',instrument);
            data={
                id:instrument.id,
                name:instrument.name,
                price:instrument.price,
                detail:instrument.detail
            };
            console.log(JSON.stringify(data));

            $http.put('http://localhost:3000/Instruments/'+data.id, JSON.stringify(data)).then(function (response) {
                if (response.data)
                    $scope.msg = "Put Data Submitted Successfully!";
                    console.log(response.data);
                    console.log($scope);
//                    $scope.instruments.push(data);
                     $scope.instruments= service.getinstruments($http, $scope);
                     
                    //$scope.$digest();
                }, function (response) {
                    $scope.msg = "Service not Exists";
                    $scope.statusval = response.status;
                    $scope.statustext = response.statusText;
                    $scope.headers = response.headers();
                    console.log($scope);
//                    window.location.href = '/instruments'
                    
                });
                
            
        //    instruments.push(data);
        };

    }


})();
