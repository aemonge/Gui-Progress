
var peg = require("pegjs");

var parser = peg.generate("start = ('a' / 'b')+");
exports.pruebaParseo = function pruebaParseo(){
    console.log(parser.parse("abba"));
    console.log(parser.parse("abca"));
}
