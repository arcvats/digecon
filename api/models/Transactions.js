/**
 * Transactions.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    transactionid:{
      type:'string'
    },
    date:{
      type:'date'
    },
    username:{
      type:'string'
    },
    card:{
      type:'string'
    },
    amount:{
      type:'float'
    }

  }
};

