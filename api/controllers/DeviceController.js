/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  addDevice:function(req,res){
      var params = req.allParams();
      Room.findOne({name:params.roomId}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        params.roomId = data.roomId;
        var amount = 0,totalamount = 0;
        var usage;
        if(params.unittype=='w'){
          amount = params.unit/1000;
        }
        if(params.unittype=='kw'){
          amount = params.unit;
        }
        usage = params.usage.split('h')[0];

        totalamount = eval(amount*usage*4.9);

        params.dailyamount = totalamount;

        Device.create(params).exec(function(err,created){
          if(err){
            return res.negotiate(err);
          }
        });
        var red='/roomDetails?roomid='+data.roomId;
        res.redirect(red);
      });

    },

    getReports:function(req,res){
      Device.find({createdBy:req.session.username}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        var devices = [];
        for(var i=0;i<data.length;i++){
          if(data[i].roomId=='room1'){
            devices.push(data[i]);
          }
        }
        for(var i=0;i<data.length;i++){
          if(data[i].roomId=='room2'){
            devices.push(data[i]);
          }
        }
        for(var i=0;i<data.length;i++){
          if(data[i].roomId=='room3'){
            devices.push(data[i]);
          }
        }
        for(var i=0;i<data.length;i++){
          if(data[i].roomId=='room4'){
            devices.push(data[i]);
          }
        }
        res.view('report',{data_arr:devices});

      });
    },

    deleteDevice:function(req,res){

    },

    updateDevice:function(req,res){

    }
};

