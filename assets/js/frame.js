
let pathFrame = path.join(__dirname,'../assets/js/classFrame.js')
const validation=require(path.join(__dirname,'../assets/js/validation.js'));
const classFrame = require(pathFrame)

$(() => {
  $('.editEnabled').hide();
  $('.inputFrame').hide();
  $('#outputFrame').hide();
});

var vista;
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
      //restriction: 'parent',
      restriction: document.getElementById("inner-dropzone"),
      
      endOnly: false
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
    overlap: 1,
  
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
      //alert('No puedes sacar el objeto fuera de la zona');
      //event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
      let idFrame = $("#frames option:selected").attr('value');
      //event.relatedTarget.textContent = 'Dropped'
      console.log('x:' +posx + ' y:' + posy);
      //var style = window.getComputedStyle(myElement);
      //console.log('eventdx:',event.dx);
      var target = event.relatedTarget;
      var varid=target.getAttribute('id');
      var zone = document.getElementById('inner-dropzone');
      //var movido=target.getAttribute('movido');
      var objeto=document.getElementById(varid);
      var key= objeto.getAttribute("key");
      var variable=nuevaPlantilla.getVariableByKey(idFrame,key);
      
      //var variable=null;
      console.log('cordenadas izquierda:',objeto.offsetLeft,' coordenadas superiores:',objeto.offsetTop);
      
      console.log('zona iz:', zone.offsetLeft,' zona top:',zone.offsetTop);
      //var divmov='<div id="'+varid+'" class="'+varvar+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar field left" type="text" value="'+infoVar["initial"]+'" size="8"readonly></a></div>';
      //var divmov='<div id="'+varid+'"></div>'
      //$("#movend").append(divmov);
      //if(movido==0){
      if(variable['movido']==0){
        var objcln=objeto.cloneNode(true);
        $('#movend').append(objcln);
        posx=parseInt(objeto.getAttribute('data-x'));
        posy=parseInt(objeto.getAttribute('data-y'));
        console.log('zona iz:', zone.offsetLeft,' zona top:',zone.offsetTop);


        // x=objeto.offsetLeft+posx
        //                          -> dataX=posx+objeto.offsetLeft-clone.offsetLeft
        // x=clone.offsetLeft+dataX
        var x1=posx+objeto.offsetLeft-objcln.offsetLeft;

        // y=objeto.offsetTop+posy
        //                          -> datay=posy+objeto.offsetTop+clone.offsetTop
        // y=datay-clone.offsetTop
        var y1=posy+objeto.offsetTop+objcln.offsetTop;
        
        // translate the element
        objcln.style.webkitTransform =
        objcln.style.transform =
          'translate(' + x1 + 'px, ' + y1 + 'px)'
        // update the posiion attributes
        objcln.setAttribute('data-x', x1)
        objcln.setAttribute('data-y', y1)
        //objcln.setAttribute('movido',1)
        objeto.parentNode.removeChild(objeto);
        console.log('nueva cordenadas izquierda:',objcln.offsetLeft,' nueva coordenadas superiores:',objcln.offsetTop);
      //console.log(varid);
        //let key= objcln.getAttribute("key")
        //variable=nuevaPlantilla.getVariableByKey(idFrame,key);
        variable.setMovido();      
        variable.setPosition(x1,y1);
        
        objeto=document.getElementById(varid);
        posx=x1;
        posy=y1;
      }else{       
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
      createEditPanel(variable.id);

      
      
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
      interact.modifiers.restrict({
        //restriction: 'parent',
        //restriction: [{x: 0, y: 0, width: 441, height: 826}],
        //restriction: '#prueba',
        restriction: document.getElementById("inner-dropzone"),
        endOnly: false
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
    onmove: dragMoveListener,

    onend: function (event) {
      let idFrame = $("#frames option:selected").attr('value');
      let target = event.currentTarget;
      console.log(event);
      let varid=target.getAttribute('id');
      let zone = document.getElementById('inner-dropzone');
      //var movido=target.getAttribute('movido');
      let objeto=document.getElementById(varid);
      let key= objeto.getAttribute("key");
      console.log('id: '+varid+' key: '+key+' frame: '+idFrame);
      let variable=nuevaPlantilla.getVariableByKey(idFrame,key);
      console.log('ancho zona: '+zone.offsetWidth);
      console.log('alto zona: '+zone.offsetHeight);
      let posright=posx+objeto.offsetWidth+objeto.offsetLeft;
      let posbottom=posy+objeto.offsetHeight+objeto.offsetTop;
      if(variable['movido']==0){
        
        //Controlamos las X y las Y
        if(posright>(zone.offsetWidth+zone.offsetLeft) || (objeto.offsetLeft+posx)<zone.offsetLeft || (objeto.offsetTop+posy)<zone.offsetTop || posbottom>(zone.offsetHeight+zone.offsetTop)) {
          console.log('muevelo');
          //let x1 = zone.offsetWidth+zone.offsetLeft - objeto.offsetWidth+objeto.offsetLeft;
          objeto.style.webkitTransform =
          objeto.style.transform =
          'translate(' + 0 + 'px, ' + 0 + 'px)'
          objeto.setAttribute('data-x', 0)
          objeto.setAttribute('data-y', 0)

        }
        //else{
        //  console.log('estamos dentro');
        //}
      }else{
        if(posright>(zone.offsetWidth+zone.offsetLeft) || (objeto.offsetLeft+posx)<zone.offsetLeft || (objeto.offsetTop+posy)<zone.offsetTop || posbottom>(zone.offsetHeight+zone.offsetTop)){
          //objeto.style.webkitTransform =
          //objeto.style.transform =
          //'translate(' + variable['posx'] + 'px, ' + variable['posy'] + 'px)'
          //objeto.setAttribute('data-x', 0)
          //objeto.setAttribute('data-y', 0)

          let datx=(variable["columna"]*9+document.getElementById('inner-dropzone').offsetLeft)-document.getElementById(variable["name"]).offsetLeft;
          let daty=(variable["fila"]*24+document.getElementById('inner-dropzone').offsetTop)-document.getElementById(variable["name"]).offsetTop;
          objeto.setAttribute('data-x', datx);
          objeto.setAttribute('data-y', daty);
          // translate the element
          objeto.style.webkitTransform =
          objeto.style.transform =
            'translate(' + datx + 'px, ' + daty + 'px)'

        }
      }


    }
  })
  
btnAnyadirFrame.addEventListener('click',function(){
  let e = document.getElementById("tipoFrame");
  var tipo= e.options[e.selectedIndex].value;
  let frameInfo = {
    nombre: document.getElementById('nombreFrame').value,
    titulo: document.getElementById('tituloFrame').value,
    tipo: tipo
  }

  validation.validateNewFrame(frameInfo, function(message) { 
    $('.errorFrame').empty();
    if ("Ok" === message) {
      let idFrame = nuevaPlantilla.addFrame(frameInfo['nombre'],frameInfo['titulo'],frameInfo['tipo']); 
      //seleccionamos frame para mostrar
      $('#frames').append('<option value= "'+idFrame+'">'+frameInfo['nombre']+'</option>');
      $("#frames option:selected").removeAttr("selected");
      $('#frames option[value="'+idFrame+'"]').attr("selected",true);
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
  if(varInfo.label == "")
        varInfo.label = varInfo.name;
  let idFrame = $("#frames option:selected").attr('value');
  validation.validateNewVar(varInfo,idFrame, function(message) { 
    $('.errorVar').empty();
    if ("Ok" === message) {
      let idVar = nuevaPlantilla.addVartoFrame(idFrame,varInfo);
      varInfo.id=idVar;
      let obj=nuevaPlantilla.getVariableByKey(idFrame,idVar);
      varInfo.movido=obj.movido;
      let frame = nuevaPlantilla.getFrame(idFrame);
      let vista = frame.getVista();
      if(frame.getTipo() == "output") {
        frame.addVariableOutput(idVar);
        addVisualVarOutput(varInfo);
      }
      else{
        addVisualVar(varInfo, vista);
      }
      
      cerrarModal("#modalNewVar");
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
    $('#lugarFormat').append('<input id="formato" type="text" class="form-control" placeholder="x(8)">');
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
  $('.frameSelected').hide();
  $('.inputFrame').hide();
  $('#outputFrame').hide();
  $("#varsMov").empty();
}
function borrarVariable(idVar){
  let idFrame = $("#frames option:selected").attr('value');
  nuevaPlantilla.deleteVariable(idFrame,idVar);
  let frame = nuevaPlantilla.getFrame(idFrame);
  if(frame.getTipo() == "output"){
    $('#varsOutput').empty();
    cargarPanelVarOutput( idFrame);
  }
  else{ //input frame
    $('#vars').empty();
    $('.var'+idVar+'').remove(); // Borro el arrastrable
  }
  
}
function cargarFrame(idFrame){
  vaciarVariables();
  if(idFrame == 0){
    $('.editEnabled').hide();
    $('.inputFrame').hide();
    $('.frameSelected').hide();
    $('#outputFrame').hide();
  }
  else{
    let frame = nuevaPlantilla.getFrame(idFrame);
    $('.frameSelected').empty();
    $('.frameSelected').append(' <a href="#" class="btnFrame" data-toggle="modal" data-target="#modalFrameEdit"><h6 class="text-dark"><i class="far fa-edit"></i> Editar Frame </h6></a>');
    $('.frameSelected').append(' <a href="#" onclick="borrarFrame('+idFrame+')" class="btnFrame"><h6 class="text-dark"><i class="fas fa-trash-alt"></i> Borrar Frame </h6></a>');
    if(frame.getTipo() == "output") {
      cargarFrameSalida(idFrame);
      cargarPanelEdicionFrame(idFrame);
      cargarPanelVarOutput(idFrame);
    }
    else if (frame.getTipo() == "input"){
      if(frame.getVista() == "display")
        $('.frameSelected').append(' <a href="#" onclick="cambiarVista()" class="btnFrame inputFrame" id ="cambiarVista" ><h6 class="text-dark"><i class="far fa-eye"></i> Cambiar a Vista Update</h6></a>');
      else if(frame.getVista() == "update")
        $('.frameSelected').append(' <a href="#" onclick="cambiarVista()" class="btnFrame inputFrame" id ="cambiarVista" ><h6 class="text-dark"><i class="far fa-eye"></i> Cambiar a Vista Display</h6></a>');
      $('#outputFrame').hide();
      $('.inputFrame').show();
      $('.editEnabled').show();
      $('#tituloFrameActual').empty();
      $('#tituloFrameActual').append(frame.title);
      cargarPanelEdicionFrame(idFrame);
      cargarPanelVar(idFrame);
    }
    $('.frameSelected').show();
  }
}
function cambiarVista(){
  let idFrame = $("#frames option:selected").attr('value');
  let frame = nuevaPlantilla.getFrame(idFrame);
  let vista = frame.getVista();
  if(vista == "update"){
    frame.setVista("display");
  }
  else if(vista == "display"){
    frame.setVista("update");
  }
  cargarFrame(idFrame);
}
function cargarPanelEdicionFrame(idFrame){
  let frame = nuevaPlantilla.getFrame(idFrame);
  $("#eNombreFrame").val(frame["name"]);
  $("#etituloFrame").val(frame["title"]);
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
  let vista = frame.getVista();
  while(value != undefined) {
    //console.log('variables: ', value);
    
    addVisualVar(value[1], vista);
    value = mapIter.next().value;
  }

}
function addVisualVar(infoVar, vista){
  createVisualDraggable(infoVar,vista);
  createEditPanel(infoVar["id"]);
}

function createVisualDraggable(infoVar, vista){
  let stringDiv;
  let tam=8;
  let tipo = infoVar["type"];
  
  if (vista == "update"){
    if(tipo == "character" || tipo=="integer"){    
      if(infoVar["format"]!=null && infoVar["format"]!=""){
        tam=infoVar["format"];
      }  
      stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'" movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar field left" type="text" value="'+infoVar["initial"]+'" size="'+tam+'"readonly></a></div>';
    }else if(tipo == "decimal" || tipo=="date"){
      stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'" movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar field left" type="text" value="'+infoVar["initial"]+'" size="8"readonly></a></div>';
    }else if(tipo=="logical"){
      if(infoVar["format"] == "true"){
        stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'"  movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+'</label><input class ="inputVar field left" type="checkbox" checked="checked"></a></div>';
      }
      else{
        stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'"  movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+'</label><input class ="inputVar field left"  type="checkbox"></a></div>';
      }
    }
  }
  else if (vista == "display"){
    if(tipo == "integer" || tipo == "decimal" || tipo=="character" || tipo=="date" || tipo=="logical"){
      stringDiv = '<div id="'+infoVar["name"]+'" class="drag-drop var'+infoVar["id"]+'" key="'+infoVar["id"]+'" movido="'+infoVar["movido"]+'"><a href="#" onclick="createEditPanel('+infoVar["id"]+')" class="label label-default" title="'+infoVar["name"]+'"><label class ="labelVar">'+infoVar["label"]+':</label>'+infoVar["initial"]+'</a></div>';
    }
  } 
  
  if(infoVar["movido"]==1){
    $("#movend").append(stringDiv);
    
    var zona=document.getElementById('inner-dropzone');
    var objeto=document.getElementById(infoVar["name"]);
    console.log("left: ",objeto.offsetLeft );
    console.log("top: ",objeto.offsetTop );
    if(infoVar["fila"]!=undefined && infoVar["columna"]!=undefined){
      let datx=(infoVar["columna"]*9+zona.offsetLeft)-objeto.offsetLeft;
      let daty=(infoVar["fila"]*24+zona.offsetTop)-objeto.offsetTop;
      objeto.setAttribute('data-x', datx);
      objeto.setAttribute('data-y', daty);
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
  let idFrame = $("#frames option:selected").attr('value');
  let infoVar = nuevaPlantilla.getFrame(idFrame).getVariable(idVar);
  $("#vars").empty();  
  $("#vars").append('<div class="card border-d mb-3 text-center">\
    <div class="card-header text-center">\
      <h5 class="card-title text-dark"> <i class="far fa-edit"></i>'+infoVar["name"]+'</h5>\
      <h6 class="card-title text-dark">Type: '+infoVar["type"]+' Position: row '+infoVar["fila"]+' col '+infoVar["columna"]+'</h5>\
    </div>\
      <div class="card-body text-left">\
      <table class="table table-hover">\
        <tbody>\
          <tr>\
          <td>Nombre:</td>\
          <td><input id="nombreVariableEdit" type="text" class="form-control" value="'+infoVar["name"]+'"></td>\
        </tr>\
          <tr>\
          <td>Formato:</td>\
          <td><input id="formatoVariableEdit" type="text" class="form-control" value="'+infoVar["format"]+'"></td>\
        </tr>\
        <tr>\
          <td>Etiqueta:</td>\
          <td><input id="labelVariableEdit" type="text" class="form-control" value="'+infoVar["label"]+'"></td>\
          </tr>\
          <tr>\
          <td>Valor inicial:</td>\
          <td><input id="initVariableEdit" type="text" class="form-control" value="'+infoVar["initial"]+'"></td>\
          </tr>\
        </tbody>\
      </table>\
      <div id ="editVarBtn" class="text-center"></div>\
    </div>\
  </div>');
  $("#vars").append('<span class="errorEditVar errorMessage"></span>');
  //buttons
  $('#editVarBtn').append(' <a href="#" onclick="editarVariable('+infoVar["id"]+')"class="btnFrame"><h6 class="text-dark"><i class="far fa-edit"></i> Editar </h6></a>');
  $('#editVarBtn').append(' <a href="#" onclick="borrarVariable('+infoVar["id"]+')" class="btnFrame"><h6 class="text-dark"><i class="fas fa-trash-alt"></i> Borrar </h6></a>');
}
function editarVariable(idVar){
  let idFrame = $("#frames option:selected").attr('value');
  let infoVar = nuevaPlantilla.getFrame(idFrame).getVariable(idVar);
  let frame = nuevaPlantilla.getFrame(idFrame);
  let newData;
  if(frame.getTipo() == "output"){
    newData = {
      idVar: idVar,
      name: document.getElementById('nombreVariableEditO').value,
      format: document.getElementById('formatoVariableEditO').value,
      label: document.getElementById('labelVariableEditO').value,
      initial: document.getElementById('initVariableEditO').value
    }
  }
  else{ //Input frame
    newData = {
      idVar: idVar,
      name: document.getElementById('nombreVariableEdit').value,
      format: document.getElementById('formatoVariableEdit').value,
      label: document.getElementById('labelVariableEdit').value,
      initial: document.getElementById('initVariableEdit').value
    }
  }
  // QUITAR
  if(newData.label == "")
    newData.label = newData.name;
  // QUITAR
  let antiguoName= infoVar.name;
  validation.validateEditVar(idFrame,infoVar, newData, function(message) { 
    $('.errorEditVar').empty();
    if ("Ok" === message) {
      nuevaPlantilla.getFrame(idFrame).editVar(newData);
      newData = nuevaPlantilla.getFrame(idFrame).getVariable(idVar);
      cargarFrame(idFrame);
      if(frame.getTipo() == "output"){
        createEditPanelOutput(newData.id);
      }
      else{
        createEditPanel(newData.id);
      }
    }
    else {
      $('.errorEditVar').append(message);
    }
  })
}
function modificarFrame(idFrame){
  let e = document.getElementById("etipoFrame");
  let newData = {
    name: document.getElementById('eNombreFrame').value,
    titulo: document.getElementById('etituloFrame').value
  }
  let frameInfoOld = nuevaPlantilla.getFrame(idFrame);
  validation.validateEditFrame(frameInfoOld, newData, function(message) { 
    $('.errorFrame').empty();
    if ("Ok" === message) {
      newData.tipo = frameInfoOld.getTipo();
      nuevaPlantilla.editFrame(idFrame, newData);
      cargarFrame(idFrame);
      $('#nombreFrame').val("");
      cerrarModal("#modalFrameEdit");
      $("#frames option:selected").text(document.getElementById('eNombreFrame').value);
    } else {
      //mostramos mensaje de error
      $('.errorFrame').append(message);
    }
  })
}   
function borrarMensajeErrorFrame(){
  $('.errorFrame').empty();
}
