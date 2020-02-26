
var parser = require(path.join(__dirname,'../js/prueba.js'));

// var parser = peg.generate("start = ('a' / 'b')+");
exports.pruebaParseo = function pruebaParseo(){
    let code = "/* @@TemporalTable */\ndefine temp-table tt_f1 no-undo\nfield v1 as integer\nfield v2 as integer\n.\n/* /@@TemporalTable */";
    console.log(parser.parse(code));
}
