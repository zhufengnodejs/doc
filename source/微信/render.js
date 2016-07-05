var complied = require('./tmpl');
module.exports = function(){
    return function* (next){
        var content = this.body;
        var xml = complied(content);
        this.status = 200;
        this.type = 'application/xml';
        this.body = xml;
        console.log(this.body);
    }
}