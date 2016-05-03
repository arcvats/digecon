/**
 * BillsController
 *
 * @description :: Server-side logic for managing bills
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	generateBill:function(req,res){
    Bills.find({}).exec(function(err,data){
      if(err){
        return res.negotiate(err);
      }
      res.view('bill',{data_arr:data});
    });
  },

  estimation:function(req,res){
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
      var result = eval((a*8)+b);
    });
  },

  budgetPrediction:function(req,res){
    Bills.find({}).exec(function(err,data){
      if(err){
        return res.negotiate(err);
      }
      var params = req.allParams();
      var budget = params.budget;
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

    });
  }
};

