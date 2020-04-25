$(() => {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });

function cargarFrameSalida(idFrame){
    $('.inputFrame').hide();
    $('.outputFrame').show();
    $('#outputFrame').show();
}