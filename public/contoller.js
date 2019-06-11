




var app=angular.module('ecomApp',['ngRoute','ngStorage']);
app.config(function($routeProvider){
	$routeProvider
		.when('/home', {
			templateUrl: 'Computers.html',
			controller : 'productController'
			
		})
		
		    .when('/search',{
					templateUrl : 'search.html',
					controller : 'productController'
				})
		
		
		
				.when('/login',{
					templateUrl : 'login.html',
					controller : 'ecomController'
				})
				.when('/signup',{
					templateUrl : 'signup.html',
					controller : 'ecomSignUpController'
				})
				.when('/item1',{
					templateUrl : 'item.html',
					
				})
				.when('/cart',{
					templateUrl : 'CartShoppie.html'
					
					
				})
				.when('/checkout',{
					templateUrl : 'checkoutShoppie.html',
					
				})
				 .when('/Account',{
					templateUrl : 'MyAccount.html',
					controller : 'accountController'
					
				})
					.otherwise({
			redirectTo: '/home'
		});
});

   var itemArray=[];var finalItem=[];var address=[];var userInfo=[];

window.onload = function(){
	
	
if(localStorage.logged=="live"){
	document.getElementById("userName").innerHTML ="Welcome	"+ localStorage.userDetails.toUpperCase();
	document.getElementById("userName").style ="color:#52ACF2;"
document.getElementById('Logout').style.display = 'block';
document.getElementById('Login').style.display = 'none';

}
else {
	
	document.getElementById('Login').style.display = 'block';
	
	document.getElementById("Logout").style.display = 'none';
	
}
};



function logout(){
	localStorage.setItem("logged","no");
	alert("Thank you for visiting our site..!")
	window.location="https://ecomapplication.herokuapp.com/";
	
};




var passWord;var Name;
var accname;
app.controller('ecomController',function($rootScope,$location,$scope,$http,$localStorage){


$http.get('/ecomController').success(function(response){
    
	var users =response;
   
	$scope.login=function(){
        var name=document.myForm["userName"].value;
        var pass=document.myForm["passWord"].value;
	var i;
	var correctCounter=0;
	var incorrectCounter=0;
	for( i=0;i<users.length;i++){
		if($scope.userName==users[i].name && $scope.passWord==users[i].pass){
			correctCounter++;
            
			
			$scope.accname=users[i].name;
			$localStorage.logged="live";
             
			
		}
		else{
			incorrectCounter++;
			localStorage.logged="no";
	
	
	}
    
	
	}
	if(correctCounter ==1)
	{		 
			$rootScope.Name=$scope.accname;
			
			
			 $localStorage.userDetails=$rootScope.Name;
		localStorage.logged='live';
		localStorage.userDetails=$localStorage.userDetails;
			
			alert("Login Suucessful");
			
			
			window.location="https://ecomapplication.herokuapp.com/";
	}
	else {
		
        if(name.length==0||pass.length==0){
            alert('please fill the fields...');
        }else{
		alert("Invalid user...please signUp!!");
        }
		
	}
        
	 


	
};
     
  
	
});

	
	
	
$scope.signup=function(){
alert('welcome from signup');
};
});
var email;
var passwordPattern= "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$";
var CPassWord;

app.controller('ecomSignUpController',function($scope,$http,$rootScope,$location){
	
	
	$scope.validatePassword=function()
	{ 
		$scope.passWord=document.myForm["passWord"].value;
	
		if($scope.passWord.match(passwordPattern))
		{
			
			document.getElementById("statusP").style="color:green";
			document.getElementById("statusP").innerHTML="strong!!";
	
			
		}
		else
		{
			
			document.getElementById("statusP").innerHTML="*must include one special character,one numeric,one Uppercase and one Lowercase";
		}
	};

	$scope.validateConfirmPassword=function()
	{
		CPassWord=document.myForm["confirmPassword"].value;
 
		if(CPassWord.match($scope.passWord))
		{
			document.getElementById("statusC").innerHTML="matched";
			document.getElementById("statusC").style="color:green";
			
		}
		else
		{
			document.getElementById("statusC").innerHTML="didn't match...write again!";
			document.getElementById("statusC").style="color:red";

 
		}
		
	}

	$scope.validateemail=function(evt){
					var emailElement=document.forms["myForm"]["email"];
				var email=emailElement.value;
				var emailpattern="^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$";
				if(email.match(emailpattern)){
					document.getElementById("statusE").innerHTML="valid";
                    document.getElementById("statusE").style="color:green";
                        }
				else{
					document.getElementById("statusE").innerHTML="invalid EmailId";
                    document.getElementById("statusE").style="color:red";
				}	

	};

	
	$scope.submit=function(){
        var emailElement=document.forms["myForm"]["email"].value;
       var CPassWord=document.myForm["confirmPassword"].value;
        var passWord=document.myForm["passWord"].value;
         var addLine1=document.myForm["addLine1"].value;
         var addLine2=document.myForm["addLine2"].value;
         var city=document.myForm["city"].value;
         var state=document.myForm["state"].value;
        var pc=document.myForm["pc"].value;
         var name=document.myForm["userName"].value;
       var country=document.myForm["country"].value;
		
		
    if((name.length==0)||(passWord.length==0)||(emailElement.length==0)||(addLine1.length==0)||(addLine2.length==0)||(state.length==0)||(pc.length==0)||(country.length==0)){
        alert("enter the fields");
	}
    else{
        if(passWord==CPassWord){
            
            
            alert('user is registerd successfully !!!!');
            var users={name:name,pass:passWord,email:emailElement,addLine1:addLine1,addLine2:addLine2,city:city,state:state,country:country};
		
		
		$http.post('/ecomSignUpController',users);
            window.location="https://ecomapplication.herokuapp.com/#/login";
            
                    }
        else{
             alert("password did nt match");
        }
            
        }
    }
    
});

var product;
app.controller('productController',function($rootScope,$location,$scope,$http){
	
   
	$scope.view=function(category){
		
		
		
		$http.post('/product',({subcategory: category})
		).success(function(response){
			$scope.product=response;
			$scope.category=category;
		});
		
	};

	$scope.productview=function(cat){
		
		
		$http.post('/productDetails',({productName: cat})
		).success(function(response){
			$rootScope.cat=response;
			
		});
	};
	$http.post('/recitems')
		.success(function(response){
			$scope.recommended=response;
			
		});
		
		$scope.search=function(){
			$location.path("/home"); 
			if($scope.searchItem){
				
			
		var item=$scope.searchItem;
		
		
		
		

		$http.post('/searchItem',{"itemName":item}).success(function(response){
			
            if(response.results.length==0){
              
                $location.path("/search");
                     $rootScope.noProductAvailable="OOPS!! we dont have Any product with this name"
            }
            else{
			$location.path("/search");
			$rootScope.product=response.results;
       
			$scope.searchItem='';
            }
			
		});
            }
                else
                {
                  $location.path("/home");  
                }
		
		
		
	}; 
	$scope.assign=function(){
		
		$scope.product=$rootScope.product;
		
		
		
	}
		
	$scope.addToCart=function(item){
        
       

		
       
        itemArray.push({productName:item.productName,price:item.price,productId:item._id,quantity:item.quantity});
        
		$rootScope.current = itemArray;
        
        
        
	};
    
        $scope.assignCurrent = function(){
        $scope.current = $rootScope.current;
        $scope.deleteDisable=false;
        $scope.remove=function(prodName){
           
            $rootScope.delProdName=prodName;
            $scope.current.splice(prodName, 1);
            
            
        };
        var isAddressOpen=false;
        var isInvoiceOpen=false;
        var totalPrice=0;
        $scope.orderDisable=false;
        $scope.checkout=function(prodName,quant){
            
            
              if(localStorage.logged=='no' ){
                  alert('please login for proceeding with placing order request.............')
              }else{
            
			
			var user=Name;
			
			
            if(quant==null){
                alert('please specify quantity');
            }else{
           
            var checkVar={prodName:prodName,prodQuantity:quant,user:localStorage.userDetails};
            $http.post('/checkout',checkVar).success(function(response){
                
                
                address={
                            add1:response.userDetail.addLine1,
                            add2:response.userDetail.addLine2,
                            city:response.userDetail.city,
                            state:response.userDetail.state,
                            country:response.userDetail.country
                        };
                 $rootScope.addRess=address;
                userInfo.push({address:address,name:localStorage.userDetails,email:response.userDetail.email});
                $rootScope.userInfo=userInfo;
                finalItem.push({productName:response.itemDetail.productName,price:response.itemDetail.price,quantity:response.quantityOrdered});
                
               
                $rootScope.finalAr=finalItem;
                
                delProdName=$rootScope.delProdName;
                
                totalPrice=totalPrice+response.itemDetail.price*response.quantityOrdered;
                $scope.totalPrice=totalPrice;
                
                  alert('this item is ordered...for further details click on invoice button');
                
                 $rootScope.delProdName=prodName;
                $scope.current.splice(prodName, 1);
            
            
                 
               
            });
                
                $scope.addressConfirm=function(){
                    $scope.isAddressOpen=true;
                };
                
                $scope.invoiceOpen=function(){
                    $scope.isInvoiceOpen=true;
                    $scope.orderDisable=true;
                    
                   
                };
                
            }
            
        }
            }
        
       
    
        
    }
    
       
	
});

app.controller('accountController',function($scope,$rootScope,$http){
    
     $scope.myAccount=function(){
         var orders=[];
            
          $scope.userInfo={name:localStorage.userDetails,email:$rootScope.email,address:'asdfgh'};
       
         $http.post('/account',{name:localStorage.userDetails}).success(function(response){
             
             for(var i=0;i<response.length;i++){
                 orders.push(response[i].itemDetail);
             }
             
             $scope.userInfo=response[0].userDetail;
             $scope.orders=orders;
         });
        };
});


