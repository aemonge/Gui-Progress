variables = variable+
variable = _ defineVar __ line:line _ noUndo _ "."_{
  return {vars: line}
  }
defineVar = "define variable" 
noUndo  = "no-undo"
line = v:var _ opciones:Opcion+ _{
  return {name: v, opciones: opciones}
  }
var = !(reservedWords __) ("_" / [a-zA-Z0-9] / "-")*  {
return text()
}
reservedWords = "field" / defType / "temp-table" / noUndo / "as " / "init " / "format "

Opcion = _ opcion:(type/OpcionLabel/OpcionInit/OpcionFormat) {
return opcion
}
type = "as" __ t:$defType {
return { type:"type", value: t}
}
defType = "integer" / "character" / "date" / "logical" / "decimal"
OpcionLabel = "label" __ cadena:LiteralCadena {
return { type: "label", label: cadena }
}

OpcionInit = "init" __ result:(LiteralCadena/Integer) {
return { type: "init", value: result }
}

OpcionFormat = "format" __ cadena:LiteralCadena {
return { type: "format", format: cadena }
}

LiteralCadena = "\"" texto:([^\"]*) "\"" {
return texto.join("")
}
Integer "integer"
  = _ [0-9]+ { return parseInt(text(), 10); }

_ "whitespace"
  = [ \t\n\r]*
 
__ "whitespace_mandatory"
  = [ \t\n\r]+