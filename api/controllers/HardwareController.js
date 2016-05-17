/**
 * HardwareController
 *
 * @description :: Server-side logic for managing hardwares
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var five = require("johnny-five");


module.exports = {

  connect:function(req,res){

  },



  prepaidusage:function(req,res){
    board = new five.Board();

    board.on("ready", function() {
      led = new five.Led(13);

      led1=new five.Led(12);

      temperature = new five.Thermometer({
        controller: "DS18B20",
        pin: 2
      });

      // This will grant access to the led instance
      // from within the REPL that's created when
      // running this program.
      this.repl.inject({
        led: led
      });
      this.repl.inject({
        led1: led1
      });
      this.repl.inject({
        temperature:temperature
      });
    });
    res.view('hardware');
  },

  toggle:function(req,res){

    var params = req.allParams();
    if(params.ledvalue=="off"){
      led.on();
      return res.send({'message': 'LightOff'});
    }
    if(params.ledvalue=="on"){
      led.off();
      return res.send({'message': 'LightOn'});

    }



  },

  turnonac:function(req,res){
    led1.on();
    return res.send({'mess':'On'});
  },

  turnacoff:function(req,res){
    led1.off();
    return res.send({'mess':'On'});
  },

  temp:function(req,res){

    temp = temperature.celsius;
    return res.send({'temper': temp, 'msg': 'OK'});
  }


};

