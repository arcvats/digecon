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
    var parmamsx = [
      {date:"11-12-2015",amount:123.5,status:active,trend:0.1},
      {date:"11-13-2015",amount:20.8,status:active,trend:0.1},
      {date:"11-14-2015",amount:34.9,status:active,trend:0.1},
      {date:"11-15-2015",amount:32.6,status:active,trend:0.1},
      {date:"11-16-2015",amount:56.6,status:active,trend:0.1},
      {date:"11-17-2015",amount:12.3,status:active,trend:0.1},
      {date:"11-18-2015",amount:100.9,status:active,trend:0.1},
      {date:"11-19-2015",amount:45.5,status:active,trend:0.1}
    ];
    Bills.create(parmamsx).exec(function (err,data) {
      if(err){
        return res.negotiate(err);
      }
    });
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


  }
};

