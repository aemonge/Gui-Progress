
let pathFrame = path.join(__dirname,'../assets/js/classFrame.js')
const classFrame = require(pathFrame)

$(() => {
  $('.editEnabled').hide();
});


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
    accept: '#yes-drop',
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
      draggableElement.textContent = 'Dragged in'
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target')
      event.relatedTarget.classList.remove('can-drop')
      event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
      event.relatedTarget.textContent = 'Dropped'
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
  

  ipc.on('frameInf', function(event, arg){
    nuevaPlantilla.addFrame(arg['nombre'],arg['borde'],arg['etiqueta']); 
    $('#frames').append('<option value= "'+nuevaPlantilla.lastAsignedId()+'">'+arg['nombre']+'</option>');
    $("#frames option:selected").removeAttr("selected");
    $('#frames option[value="'+nuevaPlantilla.lastAsignedId()+'"]').attr("selected",true);
    cargarFrame(nuevaPlantilla.lastAsignedId());
  })

  function createNewVar(){
    winnewFrame=new BrowserWindow({ 
      width: 400,
      height: 390,
      webPreferences: {
        nodeIntegration: true,
        defaultEncoding: 'UTF-8'
      }
    });
    winnewFrame.loadURL(`file://${__dirname}/newVar.html`);
    winnewFrame.on('close',function(){winnewFrame=null});
    //winnewFrame.show();
    winnewFrame.once('ready-to-show', () => {
      winnewFrame.setMenu(null)
      winnewFrame.show()
    })
  }
  const vars= document.getElementById('vars');
  const varsMov=document.getElementById('varsMov');

  ipc.on('varInf', function(event, arg){
    //vars.innerHTML +='<a id="variable'+nVars+'" class="btn btn-d btn-lg">Variable'+nVars+'</a>';
    let e = document.getElementById("frames");
    let idFrame = e.options[e.selectedIndex].value;
    nuevaPlantilla.addVartoFrame(idFrame,arg);
    addVisualVar(arg);
    //console.log(nuevaPlantilla);
  })
  //AL CAMBIAR DE FRAME CARGAR VISTA DE NUEVO FRAME CON SUS VARIABLES
  $(document).on('change', '#frames', function(event) {
    let id = $("#frames option:selected").attr('value');
    cargarFrame(id);  
});
function borrarFrame(id){
  nuevaPlantilla.deleteFrame(id);
  $('#frames option[value="'+id+'"]').remove();
  $('#frames option[value="0"]').attr("selected",true);
  $('.editEnabled').hide();
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
  console.log("Plantilla: ", nuevaPlantilla);
  console.log("al cargar panel: ", frame);
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
  $("#eEtiqueFrame").append('<option value="1">En columna</option>'); 
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
    addVisualVar(value[1]);
    value = mapIter.next().value;
  }
}
function addVisualVar(infoVar){
  $("#vars").append('<div class="card border-d mb-3 text-center">\
    <div class="card-header">\
      <a id="'+infoVar["name"]+' class="collapsed card-link text-center" data-toggle="collapse" href="#collapse'+infoVar["id"]+'">\
      <h5 class="card-title text-dark"> <i class="far fa-edit"></i>'+infoVar["name"]+'</h5>\
      </a>\
      <h6 class="card-subtitle"> <i class="fas fa-arrows-alt"></i> Arrastrable: </h6>\
      <div id="yes-drop" class="drag-drop"><label class ="labelVar">'+infoVar["label"]+':</label><input class ="inputVar" type="text" value="'+infoVar["initial"]+'" class="field left" size="8"readonly></div>\
    </div>\
    <div id="collapse'+infoVar["id"]+'" class="collapse" data-parent="#accordion">\
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
    </div> </div> </div>');
  $('#collapse'+infoVar["name"]).append('<div class="card-footer text-muted">\
        <a href="#" class="btn btn-sm btn-info"><i class="far fa-save"></i> Guardar Cambios </a>\
      </div>');
  $('#collapse'+infoVar["name"]).append('<div class="card-footer text-muted">\
        <a href="#" class="btn btn-sm btn-info"><i class="fas fa-trash-alt"></i> Borrar </a>\
      </div>');  
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
  nuevaPlantilla.editFrame(idFrame, newData);
  $("#frames option:selected").text(document.getElementById('eNombreFrame').value);
  cargarPanelEdicionFrame(idFrame);
}   
