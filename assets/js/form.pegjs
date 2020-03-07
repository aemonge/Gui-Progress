frame = _ DefineFrame __ name:Id __ lines:lines* final:FinalFrame _ "." _ {
return {dataFrame:{final, name:name},lines: lines}
}

DefineFrame = "define frame"


lines=identificador:Id opciones:Opcion* __{
  return {id: identificador, opciones: opciones}
  }


Id = !ReservedWord ("_" / [a-zA-Z0-9] / "-")+ {
return text()
}
ReservedWord = "with" / "define"

Opcion = __ opcion:(OpcionLabel/OpcionAt/OpcionRow/OpcionCol) {
return opcion
}
   
OpcionLabel = "label" __ value:LiteralCadena {
return { type: "label", value: value }
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


FinalFrame="with" __ l:opclabel _ b:opcBox {
return {etiquetas:l , borde:b}
}

opclabel=$("side-labels" / "no-label")
opcBox = $"no-box"
Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
 
__ "whitespace_mandatory"
  = [ \t\n\r]+