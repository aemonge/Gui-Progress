
var parser = require(path.join(__dirname,'../js/prueba.js'));

// var parser = peg.generate("start = ('a' / 'b')+");
exports.pruebaParseo = function pruebaParseo(){
    console.log(parser.parse("2*(3+4)"));
    console.log(parser.parse("abba"));
    console.log(parser.parse("abca"));
    
}
