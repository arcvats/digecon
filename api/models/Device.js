/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name:{
      type:'string',
      required:true
    },
    unit:{
      type:'integer',
      required:true
    },
    unittype:{
      type:'string',
      required:true
    },
    status:{
      type:'string'
    },
    usage:{
      type:'string'
    },
    createdBy:{
      type:'string'
    },
    dailyamount:{
      type:'float'
    },
    roomId:{
      type:'string'
    }
  }
};

