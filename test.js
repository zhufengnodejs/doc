var mongoose = require("mongoose");
mongoose.connect("mongodb://123.57.143.189:27017/zfpx");
var PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0},
    time: {type: Date, default: Date.now()},
    email: {type: String, default: ''}
});
var PersonSchema = new mongoose.Schema({
    address: {
        country: String,
        province: String,
        area: String
    }
});
PersonSchema.virtual('name.address').get(function () {
    return this.name.country + ' ' + this.name.province + ' ' + this.name.area;
});
var PersonModel = mongoose.model('Person', PersonSchema);
var zfpx = new PersonModel({
    name: {country: '中国', province: '北京', area: '昌平'}
});

console.log(zfpx.name.country + ' ' + zfpx.name.province + ' ' + zfpx.name.area);
console.log(zfpx.address);



