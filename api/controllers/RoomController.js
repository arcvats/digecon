/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	  addRoom:function(req,res){
      User.findOne({username:req.session.username}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        var rooms = data.roomcount;
        rooms = rooms + 1;
        User.update({roomcount:data.roomcount},{roomcount:rooms}).where({username:req.session.username}).exec(function(err,data){
          if(err){
            return res.negotiate(err);
          }
          var room_id = 'room'+data[0].roomcount;
          Room.update({visibility:'none'},{visibility:'inline'}).where({roomId:room_id}).exec(function(err,room_data){
            if(err){
              return res.negotiate(err);
            }
            res.send({roomcount:data[0].roomcount,roomId:room_data[0].roomId,visibility:room_data[0].visibility});


          });

        });

      });



    },

    editRoom:function(req,res){
      var params = req.allParams();
      console.log(params);
      Room.findOne({roomId:params.roomid}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        Room.update({name:data.name},{name:params.name}).where({roomId:params.roomid}).exec(function(err,updated){
          if(err){
            return res.negotiate(err);
          }
          Room.update({devices:data.devices},{devices:params.dev}).where({roomId:params.roomid}).exec(function(err,updates){
            if(err){
              return res.negotiate(err);
            }
            console.log("updated");
          });

          console.log("updated");
          res.redirect('/rooms');
        });
      });
    },

    viewRoom:function(req,res){
      Room.find({}).exec(function(err,rooms){
        if(err){
          return res.negotiate(err);
        }
          User.findOne({username:req.session.username}).exec(function(err,data){
            if(err){
              return res.negotiate(err);
            }
            if(data.roomcount>=4){
              res.view('rooms',{rooms_data:rooms,addbutt:'none'});
            }
            if(data.roomcount<4){
              res.view('rooms',{rooms_data:rooms,addbutt:'inline'});

            }
          });

      });
    },

    roomDetails:function(req,res){
      var params = req.allParams();
      console.log(params.roomid);
      console.log(req.session.username);

      Room.findOne({createdBy:req.session.username}).where({roomId:params.roomid}).exec(function(err,data){
        if(err){
          return res.negotiate(err);
        }
        res.view('roomdetails',{username:data.createdBy,name:data.name,devices:data.devices});
      });
    },

    deleteRoom:function(req,res){

    }
};

