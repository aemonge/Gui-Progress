
var parserTable = require(path.join(__dirname,'../js/tempTable.js'));
var parserForm  = require(path.join(__dirname,'../js/form.js'));

// var parser = peg.generate("start = ('a' / 'b')+");
exports.parserCode = function parserCode(code){
    //let code = "define temp-table tt_f1 no-undo\nfield v1 as integer\nfield v2 as integer\n.";
    
    //Encontrar la temp-table y llamar al parserTable
    console.log(parserTable.parse(code));
    //encontrar el form y llamar al parserForm
}
