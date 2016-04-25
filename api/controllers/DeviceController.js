/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  addDevice:function(req,res){
      var params = req.allParams();
      Device.create(params).exec(function(err,created){
        if(err){
          return res.negotiate(err);
        }
      });
      var red='/profile?username='+req.session.username;
      res.redirect(red);
    },

    deleteDevice:function(req,res){

    },

    updateDevice:function(req,res){

    }
};

