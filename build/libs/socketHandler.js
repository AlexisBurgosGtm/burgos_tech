var socket = io();



socket.on('nuevo_pedido', function(tipo,msn){
  
      try {
          if(GlobalSelectedForm=='SUPERVISOR'){
              funciones.Aviso(`Nuevo pedido: Vendedor: ${tipo} ${msn}`);
          }
          
      } catch (error) {
        console.log('Previo: ' +  error);
      }
      
});


socket.on('nueva_cotizacion', function(tipo,msn){
  
  try {
      if(GlobalSelectedForm=='SUPERVISOR'){
        funciones.Aviso(`Nueva Cotización: Vendedor: ${tipo} ${msn}`);
      }
  } catch (error) {
    console.log('Previo: ' +  error);
  }
  
});


