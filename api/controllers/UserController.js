/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getLogin:function(req,res){
        res.view('login');
    },

    login:function(req,res){
        var params = req.allParams();
        User.findOne({username:params.username,password:params.password}).exec(function(err,user){
            if(err){
                return res.negotiate(err);
            }
            req.session.username=user.username;
          var red='/profile?username='+req.session.username;
          res.redirect(red);
        });


    },

    viewProfile:function(req,res){
      var params = req.allParams();
      User.findOne({username:params.username}).exec(function(err,user){
        if(err){
          return res.negotiate(err);
        }
        Room.count({createdBy:user.username}).exec(function(err,found_rooms){
          Device.count({createdBy:user.username}).exec(function(err,found_devices){

            res.view('profile',{username:user.username,email:user.email,address:user.address,phone:user.phone,roomsno:found_rooms,devicesno:found_devices});

          });

        });
      });
    },

    getRegister:function(req,res){
        res.view('register');
    },

    register:function(req,res){
        var params = req.allParams();
        User.create(params).exec(function(err,user){
            if(err){
                req.session.flash = {
                    err: err
                }
                return res.negotiate(err);
            }
          Room.create([
            {name:"Room One",createdBy:user.username,roomId:"room1",visibility:"none",devices:['none']},
            {name:"Room Two",createdBy:user.username,roomId:"room2",visibility:"none",devices:['none']},
            {name:"Room Three",createdBy:user.username,roomId:"room3",visibility:"none",devices:['none']},
            {name:"Room Four",createdBy:user.username,roomId:"room4",visibility:"none",devices:['none']}
          ]).exec(function(err,rooms){
            if(err){
              return res.negotiate(err);

            }
            console.log("created rooms");
          });

            res.view('login');
        });
    },

    update:function(req,res){
      var params = req.allParams();
      User.findOne({username:params.username}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        User.update({phone:data.phone},{phone:params.phone}).where({username:params.username}).exec(function(err,updated){
          if(err){
            return res.negotiate(err);
          }
          User.update({password:data.password},{password:params.password}).where({username:params.username}).exec(function(err,updates){
            if(err){
              return res.negotiate(err);
            }
          });
        });

      });
      res.redirect('/login');
    },

    logout:function(req,res){
        res.logout();
    }
};

