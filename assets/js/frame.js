
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
    $('#frames').append('<option value= "frame'+nFrames+'">Frame '+arg['nombre']+'</option>');
    console.log(arg);
    //<a id= "frame'+nFrames+'" onclick="seleccionarFrame("frame'+nFrames+'")">Frame'+nFrames+' </a>
    nFrames++;
    let framePrueba = new classFrame.Frame(nFrames,arg['nombre'],arg['borde'],arg['posicion']);
    console.log(framePrueba);
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
    //vars.innerHTML +='<a id="variable'+nVars+'" class="btn btn-info btn-lg">Variable'+nVars+'</a>';
    vars.innerHTML += '<div class="card border-info mb-3 text-center">\
                              <div class="card-header">\
                                <a id="variable'+nVars+' class="collapsed card-link text-center" data-toggle="collapse" href="#collapse'+nVars+'">\
                                <h6 class="card-title text-dark"> <i class="far fa-edit"></i> Variable'+nVars+'</h6>\
                              </a>\
                              </div>\
                              <div id="collapse'+nVars+'" class="collapse" data-parent="#accordion">\
                                <div class="card-body text-left">\
                                <table class="table table-hover group table-striped">\
                                  <tbody>\
                                    <tr>\
                                    <td>Nombre:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                    <tr>\
                                    <td>Tipo:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                    <tr>\
                                    <td>Formato:</td>\
                                    <td>Value</td>\
                                   </tr>\
                                   <tr>\
                                    <td>Etiqueta:</td>\
                                    <td>Value</td>\
                                    </tr>\
                                    <tr>\
                                    <td>Valor inicial:</td>\
                                    <td>Value</td>\
                                    </tr>\
                                  </tbody>\
                                </table>\
                              </div> </div> </div>';
    $('#collapse'+nVars).append('<div class="card-footer text-muted">\
                                  <a href="#" class="btn btn-sm btn-info"><i class="far fa-save"></i> Guardar Cambios </a>\
                                </div>');
    $('#collapse'+nVars).append('<div class="card-footer text-muted">\
                                  <a href="#" class="btn btn-sm btn-info"><i class="fas fa-trash-alt"></i> Borrar </a>\
                                </div>');  
    varsMov.innerHTML +='<div id="yes-drop" class="drag-drop"> variable'+ nVars +'</div>';
    nVars++;
  })
  //AL CAMBIAR DE FRAME CARGAR VISTA DE NUEVO FRAME CON SUS VARIABLES
  $(document).on('change', '#frames', function(event) {
    let id = $("#frames option:selected").text();
    if($("#frames option:selected").attr('value') == 0){
      $('.editEnabled').hide();
    }
    else{
      $('.frameSelected').empty();
      $('.frameSelected').append(' <a href="#" class="card-link"><h6 class="text-dark"><i class="far fa-edit"></i> '+id+'</h6></a>');
      $('.editEnabled').show();
    }
    
});

    
