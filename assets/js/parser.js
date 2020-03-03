
var parserTable = require(path.join(__dirname,'../js/tempTable.js'));
var parserForm  = require(path.join(__dirname,'../js/form.js'));

// var parser = peg.generate("start = ('a' / 'b')+");
exports.pruebaParseo = function pruebaParseo(){
    let code = "define temp-table tt_f1 no-undo\nfield v1 as integer\nfield v2 as integer\n.";
    console.log(parserTable.parse(code));
}
