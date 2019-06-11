
var express=require('express');
var app=express();
var mongojs=require('mongojs');

var db = mongojs('mongodb://admin:admin@ds117909.mlab.com:17909/heroku_034x5vbz', ['users'])
var db1=mongojs('mongodb://admin:admin@ds117909.mlab.com:17909/heroku_034x5vbz',['product']);
var db2=mongojs('mongodb://admin:admin@ds117909.mlab.com:17909/heroku_034x5vbz',['recommendedItems']);
var db3=mongojs('mongodb://admin:admin@ds117909.mlab.com:17909/heroku_034x5vbz',['cartCollection']);

var bodyParser=require('body-parser');


app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.get('/ecomController',function(req,res){
	
	db.users.find(function(err,docs){
		
		res.json(docs);
	});
	
});

app.post('/ecomSignUpController',function(req,res){
	
	db.users.insert(req.body,function(err,doc){
		res.json(doc);
	});
	
});
app.post('/product',function(req,res){
	
	db1.product.find({subcategory:req.body.subcategory},function(err,docs){
		
		res.json(docs);
	});
		
});
app.post('/productDetails',function(req,res){
	
	db1.product.find({productName:req.body.productName},function(err,docs){
		
		res.json(docs);
	});
		
});
app.post('/searchItem',function(req,res){
	
	var searchName=req.body.itemName;
	
	db1.product.find({$or:[{category:searchName},{subcategory:searchName},{productName: new RegExp(searchName,"i")}]},function(err,docs){
		
       var data={
           "results":docs
       };
		res.json(data);

	
});
   });
app.post('/recitems',function(req,res){
	
	db2.recommendedItems.find(function(err,docs){
		
		res.json(docs);
	});
		
});


 
 

app.post('/searchproductDetails',function(req,res){
	
	db1.product.find({productName:req.body.productName},function(err,docs){
		
		res.json(docs);
	});
		
});
app.post('/checkout',function(req,res){
   
    var userDetails;
    var itemDetails;
    db.users.findOne({name:req.body.user},function(err,doc){
       
       
        userDetails=doc;
       
        
        db1.product.update({productName:req.body.prodName},{$set:{count:req.body.prodQuantity}});
        db1.product.findOne({productName:req.body.prodName},function(err,doc){
            
        itemDetails=doc;
        
       
            db3.cartCollection.insert({userDetail:userDetails,itemDetail:itemDetails,quantityOrdered:req.body.prodQuantity,uname:req.body.user},function(err,docs){
           
                res.json(docs);
        });
       
        });
    });
       
    });

app.post('/account',function(req,res){
    
    db3.cartCollection.find({uname:req.body.name},function(err,doc){
        
        
        res.json(doc);
    });
});


app.listen(process.env.PORT||5000,function(err)
{
	console.log("running server on port ");
	
}); 