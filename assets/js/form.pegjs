tabla = DefineFrame __ name:Id __ lines:lines+ final:FinalFrame {
return {type:"frame", value:name, lines: lines}
}

DefineFrame = "define frame"


lines=Campo+

Campo
  = identificador:Id opciones:Opcion* __{
  return {id: identificador, opciones: opciones}
  }


Id = !ReservedWord ([a-zA-Z0-9])+ {
return text()
}

ReservedWord = "with" / "define"

   
Opcion = __ opcion:(OpcionLabel/OpcionInit/OpcionFormat/OpcionAt/OpcionRow/OpcionCol) {
return opcion
}
   
OpcionLabel = "label" __ cadena:LiteralCadena {
return { type: "label", label: cadena }
}

OpcionInit = "init" __ result:(LiteralCadena/Integer) {
return { type: "init", value: result }
}

OpcionFormat = "format" __ cadena:LiteralCadena {
return { type: "format", format: cadena }
}
OpcionAt= "at" __ cadena:(OpcionRow/OpcionCol){
return cadena
}

OpcionRow = "row" __ value:(Integer) {
return { type: "row", value: value}
}

OpcionCol = "column" __ value:(Integer) {
return { type: "colum", value: value}
}

LiteralCadena = "\"" texto:([^\"]*) "\"" {
return texto.join("")
}


FinalFrame="with" __ final:(opc)

opc="side-labels"

Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
 
__ "whitespace_mandatory"
  = [ \t\n\r]+