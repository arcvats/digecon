/**
 * BillsController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  estimation:function(req,res){
    res.view('estimation');
  },

  estimations:function(req,res){
    var params = req.allParams();

    Bills.find({}).exec(function(err,data){
      if(err){
        return res.negotiate(err);
      }

      var n=parseInt(data.length);
      var x = 1, y = 0, xy = 0, x2 = 0;
      for(var i = 0;i < n; i++){
        x = eval(x+i);
        y = eval(y+data[i].amount);
        xy = xy + x*y;
        x2 = x2 + x*x;
      }
      var a = ((n*xy)-(x*y))/((n*x2)-(x*x));
      var b = (y-a*x)/n;
      var result1 = eval((a*params.future)+b);
      var result2 = y/n;
      res.send({res1:result1,res2:result2});
    });
  },

  budgetPrediction:function(req,res){

    var params = req.allParams();
    var budget = params.budget;
    console.log(budget);
    var coeff = {
      'ac':0.35,
      'tv':0.25,
      'fan':0.23,
      'light':0.17
    };

    var ind_budget = [];
    for(var key in coeff){
      if(coeff.hasOwnProperty(key))
        ind_budget.push((coeff[key]*budget).toFixed(2));
    }
    console.log(ind_budget);
    res.send({budgets:ind_budget});


  },
  paybill:function(req,res){
    var params = req.allParams();
    Bills.find({}).exec(function(err,response){
      if(err){
        return res.negotiate(err);
      }
      var billamount = 0;
      for(var i=0;i<response.length;i++){
        billamount = billamount + response.amount[i];
      }

    Payments.find({username:'archit'}).exec(function(err,data){
      if(err){
        return res.negotiate(err);
      }
      Payments.update({amount:data.amount},{amount:data.amount-billamount}).where({username:'archit'}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        res.redirect('/profile');
      });
    });
    });
  }
};

