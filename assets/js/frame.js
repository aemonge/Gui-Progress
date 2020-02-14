
let pathFrame = path.join(__dirname,'../assets/js/classFrame.js')
const validation=require(path.join(__dirname,'../assets/js/validation.js'));
const classFrame = require(pathFrame)

$(() => {
  $('.editEnabled').hide();
});


let posx=0;
let posy=0;
let oldx=0;

/* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */
// target elements with the "draggable" class
interact('.draggable')
.draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: 'parent',
      endOnly: true
    })
  ],
  // enable autoScroll
  autoScroll: true,

  // call this function on every dragmove event
  onmove: dragMoveListener,
  // call this function on every dragend event
  onend: function (event) {
    var textEl = event.target.querySelector('p')

    textEl && (textEl.textContent =
      'moved a distance of ' +
      (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                  Math.pow(event.pageY - event.y0, 2) | 0))
        .toFixed(2) + 'px')
  }
})

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  posx=x;
  posy=y;
  // translate the element
  target.style.webkitTransform =
  target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
  }

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

 // enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    //accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active')
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget
      var dropzoneElement = event.target
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target')
      draggableElement.classList.add('can-drop')
      //draggableElement.textContent = 'Dragged in'
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      //event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
      //event.relatedTarget.textContent = 'Dropped'
      console.log('x:' +posx + ' y:' + posy);
      //console.log('eventdx:',event.dx);
      var target = event.relatedTarget;
      var varid=target.getAttribute('id');
      var zone = document.getElementById('inner-dropzone');
      var movido=target.getAttribute('movido');
      var objeto=document.getElementById(varid);
      var variable=null;
      console.log('cordenadas izquierda:',objeto.offsetLeft,' coordenadas superiores:',objeto.offsetTop);
      
      console.log('zona iz:', zone.offsetLeft,' zona top:',zone.offsetTop);
      //var divmov='<div id="'+varid+'" class="'+varvar+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar field left" type="text" value="'+infoVar["initial"]+'" size="8"readonly></a></div>';
      //var divmov='<div id="'+varid+'"></div>'
      //$("#movend").append(divmov);
      if(movido==0){
        var objcln=objeto.cloneNode(true);
        $('#movend').append(objcln);
        posx=parseInt(objeto.getAttribute('data-x'));
        posy=parseInt(objeto.getAttribute('data-y'));
        console.log('zona iz:', zone.offsetLeft,' zona top:',zone.offsetTop);

        var x1=posx+objeto.offsetLeft-objcln.offsetLeft;
        var y1=posy+objeto.offsetTop+objcln.offsetTop;
        
        // translate the element
        objcln.style.webkitTransform =
        objcln.style.transform =
          'translate(' + x1 + 'px, ' + y1 + 'px)'
        // update the posiion attributes
        objcln.setAttribute('data-x', x1)
        objcln.setAttribute('data-y', y1)
        objcln.setAttribute('movido',1)
        objeto.parentNode.removeChild(objeto);
        console.log('nueva cordenadas izquierda:',objcln.offsetLeft,' nueva coordenadas superiores:',objcln.offsetTop);
      //console.log(varid);
        let idFrame = $("#frames option:selected").attr('value');
        let key= objcln.getAttribute("key")
        variable=nuevaPlantilla.getVariableByKey(idFrame,key);
        variable.setMovido();      
        variable.setPosition(x1,y1);
        
        objeto=document.getElementById(varid);
        posx=x1;
        posy=y1;
      }else{
        let idFrame = $("#frames option:selected").attr('value');
        let key= objeto.getAttribute("key")
        variable=nuevaPlantilla.getVariableByKey(idFrame,key);
      
        variable.setPosition(posx,posy);
        //console.log(variable);
      }
      //calculo columna y fila
      var col=Math.round((objeto.offsetLeft+posx-zone.offsetLeft)/9);
      var fil=Math.round((objeto.offsetTop+posy-zone.offsetTop)/24);
      console.log('fila:',fil,'col:',col);
      variable.setFilaCol(fil,col);
      console.log(variable);
      
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active')
      event.target.classList.remove('drop-target')
    }
})
var x = 0; var y = 0
interact('.drag-drop')
  .draggable({
    
    modifiers: [
      interact.modifiers.restrictRect({
        //restriction: 'parent',
        endOnly: true
      }),
      interact.modifiers.snap({
        targets: [
          interact.createSnapGrid({ x: 9, y: 24 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      })
    ],
    inertia: true,
    //autoScroll: true,
    // dragMoveListener from the dragging demo above
    onmove: dragMoveListener
  })


  /*interact(element)
  .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.createSnapGrid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      }),
      interact.modifiers.restrict({
        restriction: element.parentNode,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        endOnly: true
      })
    ],
    inertia: true
  })

  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.webkitTransform =
    event.target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)'
  })*/
  
btnAnyadirFrame.addEventListener('click',function(){
  let e = document.getElementById("bordeFrame");
  var border = e.options[e.selectedIndex].value;
  e=document.getElementById("etiqueFrame");
  var etiqueta= e.options[e.selectedIndex].value;
  let frameInfo = {
    nombre: document.getElementById('nombreFrame').value,
    borde: border,
    etiqueta: etiqueta
  }

  validation.validateNewFrame(frameInfo, function(message) { 
    $('.errorFrame').empty();
    if ("Ok" === message) {
      let idFrame = nuevaPlantilla.addFrame(frameInfo['nombre'],frameInfo['borde'],frameInfo['etiqueta']); 
      //seleccionamos frame para mostrar
      $('#frames').append('<option value= "'+idFrame+'">'+frameInfo['nombre']+'</option>');
      $("#frames option:selected").removeAttr("selected");
      $('#frames option[value="'+idFrame+'"]').attr("selected",true);
      vaciarVariables();
      //cargamos datos del frame
      cargarFrame(idFrame);
      $('#nombreFrame').val("");
      cerrarModal("#modalNewFrame");
    } else {
      //mostramos mensaje de error
      $('.errorFrame').append(message);
    }
  })
})
function vaciarVariables(){
   //borramos datos del frame anterior
  $('#movend').empty();
  $('#varsMov').empty();
}

function cerrarModal(idModal){
  $(idModal).modal('hide');//ocultamos el modal
  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal

}
//AL CAMBIAR DE FRAME CARGAR VISTA DE NUEVO FRAME CON SUS VARIABLES
$(document).on('change', '#frames', function(event) {
  let id = $("#frames option:selected").attr('value');
  vaciarVariables();
  cargarFrame(id);  
});
btnAnyadirVar.addEventListener('click',function(){
  let tipo = $("#tipoVar option:selected").attr('value');
  let varInfo;
  if(tipo == "integer" || tipo == "decimal" || tipo=="character"){
    varInfo = {
      name: document.getElementById('nombreVariable').value,
      type: tipo,
      label: document.getElementById('labelVariable').value,
      initial: document.getElementById('valorInicial').value,
      format:document.getElementById('formato').value
    }
  }
  else if(tipo=="logical"){
    varInfo = {
      name: document.getElementById('nombreVariable').value,
      type: tipo,
      label: document.getElementById('labelVariable').value,
      initial: $("#fLogical option:selected").attr('value'),
      format: ""
    }
  }
  else if(tipo=="date"){
    varInfo = {
      name: document.getElementById('nombreVariable').value,
      type: tipo,
      label: document.getElementById('labelVariable').value,
      initial: document.getElementById('valorInicial').value,
      format: $("#fDate option:selected").attr('value')
    }
  }
  let idFrame = $("#frames option:selected").attr('value');
  validation.validateNewVar(varInfo,idFrame, function(message) { 
    $('.errorVar').empty();
    if ("Ok" === message) {
      let idVar = nuevaPlantilla.addVartoFrame(idFrame,varInfo);
      varInfo.id=idVar;
      let obj=nuevaPlantilla.getVariableByKey(idFrame,idVar);
      varInfo.movido=obj.movido;
      addVisualVar(varInfo);
      cerrarModal("#modalNewVar");
      console.log(nuevaPlantilla);
    } else {
      //mostramos mensaje de error
      $('.errorVar').append(message);
    }
  })
})
//AL CAMBIAR DE FORMATO DE VAR AJUSTAMOS EL FORMATO Y EL INIT
$(document).on('change', '#tipoVar', function(event) {
  let tipo = $("#tipoVar option:selected").attr('value');
  //siempre nos cargamos el formato y el init y lo cargamos como debamos en función del tipo
  $('#lugarFormat').empty();
  $('#lugarFormatYear').empty();
  $('#lugarInit').empty();
  if(tipo == "integer" || tipo == "decimal"){// ponemos inicio = 0, dejamos el formato vacío por el momento
    $('#lugarFormat').append('<label>Formato:</label>');
    $('#lugarFormat').append('<input id="formato" type="text" class="form-control">');
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<input id="valorInicial" type="text" class="form-control" placeholder="0">');
  }
  else if(tipo=="character"){// Dejamos el formato vacío por el momento, por defecto ponemos 8
    $('#lugarFormat').append('<label>Longitud caracter (Format):</label>');
    $('#lugarFormat').append('<input id="formato" type="text" class="form-control" placeholder="8">');
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<input id="valorInicial" type="text" class="form-control" placeholder="abcdefg1">');
  }
  else if(tipo=="date"){ // Añadimos opción de year en 2 o 4 digitos y escribimos todos los formatos en un select
    $('#lugarFormatYear').append('<label>Formato año:</label>');
    $('#lugarFormatYear').append('<select id="fYear" class="form-control" name="selectAño">\
                                  <option value="2Digitos">2 dígitos (yy)</option>\
                                  <option value="4Digitos">4 dígitos (yyyy)</option></select>');
    $('#lugarFormat').append('<label>Formato:</label>');
    $('#lugarFormat').append('<select id="fDate" class="form-control" name="selectDate">\
                              <option value="mm/dd/yy">mm/dd/yy</option>\
                              <option value="dd/mm/yy">dd/mm/yy</option>\
                              <option value="yy/mm/dd">yy/mm/dd</option></select>');
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<input id="valorInicial" type="text" class="form-control"  placeholder=" / / ">');
  }
  else if(tipo=="logical"){
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<select id="fLogical" class="form-control">\
                            <option value="false">No seleccionado (False)</option>\
                            <option value="true">Seleccionado (True)</option></select>');
  }
});
//AL CAMBIAR DE FORMATO DE AÑO AJUSTAMOS EL FORMATO Y EL INIT
$(document).on('change', '#fYear', function(event) {
  let format = $("#fYear option:selected").attr('value');
  $('#lugarFormat').empty();
  $('#lugarInit').empty();
  if(format =="2Digitos"){
    $('#lugarFormat').append('<label>Formato:</label>');
    $('#lugarFormat').append('<select id="fDate" class="form-control" name="selectDate">\
                              <option value="mm/dd/yy">mm/dd/yy</option>\
                              <option value="dd/mm/yy">dd/mm/yy</option>\
                              <option value="yy/mm/dd">yy/mm/dd</option></select>');
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<input id="valorInicial" type="text" class="form-control"  placeholder=" / / ">');
  }
  else if(format =="4Digitos"){
    $('#lugarFormat').append('<label>Formato:</label>');
    $('#lugarFormat').append('<select id="fDate" class="form-control" name="selectDate">\
                              <option value="mm/dd/yyyy">mm/dd/yyyy</option>\
                              <option value="dd/mm/yyyy">dd/mm/yyyy</option>\
                              <option value="yyyy/mm/dd">yyyy/mm/dd</option></select>');
    $('#lugarInit').append('<label>Valor Inicial:</label>');
    $('#lugarInit').append('<input id="valorInicial" type="text" class="form-control"  placeholder=" / / ">');
  }
});
function borrarFrame(id){
  nuevaPlantilla.deleteFrame(id);
  $('#frames option[value="'+id+'"]').remove();
  $('#frames option[value="0"]').attr("selected",true);
  $('.editEnabled').hide();
  $("#varsMov").empty();
}
function borrarVariable(idVar){
  
  let idFrame = $("#frames option:selected").attr('value');
  nuevaPlantilla.deleteVariable(idFrame,idVar);
  $('#vars').empty();
  $('.var'+idVar+'').remove(); // Borro el arrastrable
  //cargarPanelVar(idFrame);
}
function cargarFrame(idFrame){
  if(idFrame == 0){
    $('.editEnabled').hide();
  }
  else{
    $('.frameSelected').empty();
    $('.frameSelected').append(' <a href="#" class="btnFrame" data-toggle="modal" data-target="#modalFrameEdit"><h6 class="text-dark"><i class="far fa-edit"></i> Editar Frame </h6></a>');
    $('.frameSelected').append(' <a href="#" onclick="borrarFrame('+idFrame+')" class="btnFrame"><h6 class="text-dark"><i class="fas fa-trash-alt"></i> Borrar Frame </h6></a>');
    $('.editEnabled').show();
    cargarPanelEdicionFrame(idFrame);
    cargarPanelVar(idFrame);
  }
}
function cargarPanelEdicionFrame(idFrame){
  
  let frame = nuevaPlantilla.getFrame(idFrame);
  $("#eNombreFrame").val(frame["name"]);

  //Creamos de nuevo los select para evitar conflictos con el seleccionado
  //Select borde
  $("#lugarBorde").empty();
  $("#lugarBorde").append("<label>Borde:</label>");
  $("#lugarBorde").append('<select id="eBordeFrame" class="form-control" name="bordeFrame"></select>');
  $("#eBordeFrame").append('<option value="0">No</option>');
  $("#eBordeFrame").append('<option value="1">Si</option>'); 
  $('#eBordeFrame option[value='+frame["borde"]+']').attr("selected",true);
  //Select etiqueta
  $("#lugarEtiqueta").empty();
  $("#lugarEtiqueta").append("<label>Etiquetas:</label>");
  $("#lugarEtiqueta").append('<select id="eEtiqueFrame" class="form-control" name="etiquetaFrame"></select>');
  $("#eEtiqueFrame").append('<option value="0">En fila</option>');
  $("#eEtiqueFrame").append('<option value="1">Sin etiquetas</option>'); 
  $('#eEtiqueFrame option[value='+frame["etiqueta"]+']').attr("selected",true);
  //Botón guardar
  $("#btnEditarFrame").removeAttr("onclick");
  $("#btnEditarFrame").attr("onclick", 'modificarFrame('+idFrame+')');
}
function cargarPanelVar(idFrame){
  $("#vars").empty();
  
  $("#vars").append('<small><div id="container" style="width:100%;"><div id="accordion" style="width:100%;"></small>');
  let frame = nuevaPlantilla.getFrame(idFrame);
  let mapIter = frame.getVariables().entries();
  let value = mapIter.next().value;
  while(value != undefined) {
    console.log('variables: ', value);
    
    addVisualVar(value[1]);
    value = mapIter.next().value;
  }

}
function addVisualVar(infoVar){
  createVisualDraggable(infoVar);
  createEditPanel(infoVar["id"]);
}

function createVisualDraggable(infoVar){
  let stringDiv;
  let tipo = infoVar["type"];

  
  
  if(tipo == "integer" || tipo == "decimal" || tipo=="character" || tipo=="date"){
    stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'" movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar field left" type="text" value="'+infoVar["initial"]+'" size="8"readonly></a></div>';
  }
  else if(tipo=="logical"){
    if(infoVar["format"] == "true"){
      stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'"  movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+'</label><input class ="inputVar field left" type="checkbox" checked="checked"></a></div>';
    }
    else{
      stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'"  movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+'</label><input class ="inputVar field left"  type="checkbox"></a></div>';
    }
  }
  if(infoVar["movido"]==1){
    $("#movend").append(stringDiv);
    if(infoVar["fila"]!=undefined && infoVar["columna"]!=undefined){
      let datx=(infoVar["columna"]*9+document.getElementById('inner-dropzone').offsetLeft)-document.getElementById(infoVar["name"]).offsetLeft;
      let daty=(infoVar["fila"]*24+document.getElementById('inner-dropzone').offsetTop)-document.getElementById(infoVar["name"]).offsetTop;
      document.getElementById(infoVar["name"]).setAttribute('data-x', datx);
      document.getElementById(infoVar["name"]).setAttribute('data-y', daty);
      // translate the element
      document.getElementById(infoVar["name"]).style.webkitTransform =
      document.getElementById(infoVar["name"]).style.transform =
        'translate(' + datx + 'px, ' + daty + 'px)'
    }


  }else{
    $("#varsMov").append(stringDiv);
  }

  
  
}
function createEditPanel(idVar){
  // CAMBIAR
  /* No es necesario, simplemente rellenar los campos en el panel de variable ya existente */
  let idFrame = $("#frames option:selected").attr('value');
  let infoVar = nuevaPlantilla.getFrame(idFrame).getVariable(idVar);
  $("#vars").empty();
  /* PRUEBA CON FORM NO BORRAR
  $("#vars").append('<div class="card border-d mb-3 text-center">\
    <div class="card-header">\
      <h5 class="card-title text-dark"> <i class="far fa-edit"></i>'+infoVar["name"]+'</h5>\
    </div>\
      <div class="card-body text-left form-sec">\
      <form>\
        <div class="form-group">\
          <label>Nombre:</label>\
          <input id="eNombreVariable" type="text" class="form-control NombreVariable" placeholder="Var1">\
        </div>\
        <div class="form-group">\
          <label>Tipo de variable:</label>\
          <select id="eTipoVar" class="form-control tipoVar" name="select">\
            <option value="integer">Integer</option>\
            <option value="decimal">Decimal</option> \
            <option value="logical">Logical</option>\
            <option value="character">Character</option>\
            <option value="date">Date</option>\
          </select>\
        </div>       \
        <div class="form-group">\
          <label>Label:</label>\
          <input id="eLabelVariable" type="text" class="form-control labelVariable" placeholder="Variable 1">\
        </div>\
        <div class="form-group lugarFormatYear" id="eLugarFormatYear">\
        </div>\
        <div class="form-group lugarFormat" id="eLugarFormat">\
          <label>Formato:</label>\
          <input id="eFormato" type="text" class="form-control formato">\
        </div>\
        <div class="form-group lugarInit" id="eLugarInit">\
          <label>Valor Inicial:</label>\
          <input id="eValorInicial" type="text" class="form-control valorInicial" placeholder="0">\
        </div>\
        <div id ="editVarBtn" class="text-center">\
        </div>\
      </form>\
    </div>\
  </div>');
  */
  
  $("#vars").append('<div class="card border-d mb-3 text-center">\
    <div class="card-header">\
      <h5 class="card-title text-dark"> <i class="far fa-edit"></i>'+infoVar["name"]+'</h5>\
    </div>\
      <div class="card-body text-left">\
      <table class="table table-hover group table-striped">\
        <tbody>\
          <tr>\
          <td>Nombre:</td>\
          <td>'+infoVar["name"]+'</td>\
        </tr>\
          <tr>\
          <td>Tipo:</td>\
          <td>'+infoVar["type"]+'</td>\
        </tr>\
          <tr>\
          <td>Formato:</td>\
          <td>'+infoVar["format"]+'</td>\
        </tr>\
        <tr>\
          <td>Etiqueta:</td>\
          <td>'+infoVar["label"]+'</td>\
          </tr>\
          <tr>\
          <td>Valor inicial:</td>\
          <td>'+infoVar["initial"]+'</td>\
          </tr>\
        </tbody>\
      </table>\
      <div id ="editVarBtn" class="text-center"></div>\
    </div>\
  </div>');
 
  $('#editVarBtn').append(' <a href="#" class="btnFrame"><h6 class="text-dark"><i class="far fa-edit"></i> Editar </h6></a>');
  $('#editVarBtn').append(' <a href="#" onclick="borrarVariable('+infoVar["id"]+')" class="btnFrame"><h6 class="text-dark"><i class="fas fa-trash-alt"></i> Borrar </h6></a>');
}
function modificarFrame(idFrame){
  let e = document.getElementById("eBordeFrame");
  let border = e.options[e.selectedIndex].value;
  e=document.getElementById("eEtiqueFrame");
  let etiqueta= e.options[e.selectedIndex].value;
  let newData = {
    name: document.getElementById('eNombreFrame').value,
    borde: border,
    etiqueta: etiqueta
  }
  let frameInfoOld = nuevaPlantilla.getFrame(idFrame);
  validation.validateEditFrame(frameInfoOld, newData, function(message) { 
    $('.errorFrame').empty();
    if ("Ok" === message) {
      nuevaPlantilla.editFrame(idFrame, newData);
      $("#frames option:selected").text(document.getElementById('eNombreFrame').value);
      cargarPanelEdicionFrame(idFrame);
      cerrarModal("#modalFrameEdit");
    } else {
      //mostramos mensaje de error
      $('.errorFrame').append(message);
    }
  })
}   
function borrarMensajeErrorFrame(){
  $('.errorFrame').empty();
}
