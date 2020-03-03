tabla = defineTempTable __ name:tableName __ noUndo __ lines:lines+ "." _ {
  return {name: name, campos: lines}
  }
defineTempTable = "define temp-table" 
tableName = "tt_" n:$[a-zA-Z0-9]+ {
return n;
}
noUndo  = "no-undo"
lines = line+
line
  = field __ v:var __ t:type*__ {
  return {var: v, type: t}
  }

field = "field" / "fields"
var = [a-zA-Z0-9]* {
return text()
}
type = "as" __ t:$defType+ {return t;}
defType = "integer" / "character" / "date" / "logical"

_ "whitespace"
  = [ \t\n\r]*
 
__ "whitespace_mandatory"
  = [ \t\n\r]+

