var mongoose = require('mongoose');

mongoose.connect('mongodb://green101:37017/hybrid,green102:37017/hybrid,green103:37017/hybrid');
var db = mongoose.connection;

db.on('error', function (err){
	console.log(err.message);
});

db.once('open', function callback (){
	console.log('db opened mongo')
});

var Schema = mongoose.Schema;

var tokenShema = new Schema({
	AccessToken: {type: String, required: true},
	ExpiredIn: {type: Number, required: true},
	ReceivingDate: {type: Date, required: true},
	TokenType: {type: Number, required: true}
});


var tokenDB = mongoose.model('TargetMailToken', tokenShema, 'TargetMailToken');


module.exports.tokenDB = tokenDB;