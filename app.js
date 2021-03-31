require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
  inquirerMenu, 
  pausa,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoChecklist,
  confirmar
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();
const main = async() => {
  let opt = '';

  const tareas = new Tareas();
  const tareasDB = leerDB();
  
  if(tareasDB){
    tareas.cargarTareas(tareasDB);
  }
  
  do {
    opt = await inquirerMenu();
    switch (opt) {
      case '1':
        // crear opcion
        const desc = await leerInput('Descripción: ');
        tareas.crearTarea(desc);
        break;
      case '2':
        tareas.listadoCompleto();
        //console.log(tareas.listadoArr);
        break;
      case '3':
        tareas.listadoPendientesCompletas() ;
        //console.log(tareas.listadoArr);
        break;
      case '4':
        tareas.listadoPendientesCompletas(false);
        //console.log(tareas.listadoArr);
        break;
      case '5': // completado | pendiente
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        console.log(ids);
        tareas.toggleCompletadas(ids);
        //console.log(tareas.listadoArr);
        break;
      case '6':
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id !== '0'){
          const ok = await confirmar('¿Estás seguro?');
          if(ok){
            tareas.borrarTarea(id);
            console.log('Tarea borrada');
          }
        }
        
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
    
  } while (opt !== '0');
  

}

main();

