$(() => {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

function cargarFrameSalida(idFrame){
    $('.inputFrame').hide();
    $('.outputFrame').show();
    $('#outputFrame').show();
}

function cargarPanelVarOutput(idFrame){
  $("#varsOut").empty();
  $("#varsOut").append('<small><div id="container" style="width:100%;"><div id="accordion" style="width:100%;"></small>');
  let frame = nuevaPlantilla.getFrame(idFrame);
  let elemV;
  $("#sortable").empty();
  frame.getVariablesOutput().forEach(function (elemento, indice) {
    elemV = frame.getVariable(parseInt(elemento));
    addVisualVarOutput(elemV);
  });
}
function addVisualVarOutput(infoVar){
  createVisualOutput(infoVar);
  createEditPanelOutput(infoVar["id"]);
}

function createVisualOutput(infoVar){
  //Creamos un list con los datos de la variable en el ul
  $("#sortable").append('<li id = "' + infoVar["id"] + '" class="list-group-item"><i class="fas fa-sort"></i><a href="#" onclick="createEditPanelOutput('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'">' + infoVar["label"] + ' </a></li>');
}
function createEditPanelOutput(idVar){
  let idFrame = $("#frames option:selected").attr('value');
  let infoVar = nuevaPlantilla.getFrame(idFrame).getVariable(idVar);
  $("#varsOutput").empty();  
  $("#varsOutput").append('<div class="card border-d mb-3 text-center">\
    <div class="card-header text-center">\
      <h5 class="card-title text-dark"> <i class="far fa-edit"></i>'+infoVar["name"]+'</h5>\
      <h6 class="card-title text-dark">Type: '+infoVar["type"]+' Position: '+nuevaPlantilla.getFrame(idFrame).getPosicionOutput(infoVar["id"])+'</h5>\
    </div>\
      <div class="card-body text-left">\
      <table class="table table-hover">\
        <tbody>\
          <tr>\
            <td>Nombre:</td>\
            <td><input id="nombreVariableEditO" type="text" class="form-control" value="'+infoVar["name"]+'"></td>\
          </tr>\
          <tr>\
            <td>Formato:</td>\
            <td><input id="formatoVariableEditO" type="text" class="form-control" value="'+infoVar["format"]+'"></td>\
          </tr>\
          <tr>\
            <td>Etiqueta:</td>\
            <td><input id="labelVariableEditO" type="text" class="form-control" value="'+infoVar["label"]+'"></td>\
          </tr>\
          <tr>\
            <td>Valor inicial:</td>\
            <td><input id="initVariableEditO" type="text" class="form-control" value="'+infoVar["initial"]+'"></td>\
          </tr>\
        </tbody>\
      </table>\
      <div id ="editVarBtnO" class="text-center"></div>\
    </div>\
  </div>');
  $("#varsOutput").append('<span class="errorEditVar errorMessage"></span>');
  //buttons
  $('#editVarBtnO').append(' <a href="#" onclick="editarVariable('+infoVar["id"]+')"class="btnFrame"><h6 class="text-dark"><i class="far fa-edit"></i> Editar </h6></a>');
  $('#editVarBtnO').append(' <a href="#" onclick="borrarVariable('+infoVar["id"]+')" class="btnFrame"><h6 class="text-dark"><i class="fas fa-trash-alt"></i> Borrar </h6></a>');
}

$( "#sortable" ).on( "sortstop", function( event, ui ) {
  let idFrame = $("#frames option:selected").attr('value');
  let frame = nuevaPlantilla.getFrame(idFrame);
  frame.actualizarPosiciones($( "#sortable" ).sortable( "toArray" )); 
  let idVar = $(ui.item[0]).attr("id")
  createEditPanelOutput(idVar)
} );