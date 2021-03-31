const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr(){
    const listado = [];
    Object.keys(this._listado).forEach(key => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor(){
    this._listado = {};
  }

  crearTarea(desc = ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  cargarTareas(tareas = []){
    tareas.forEach(tarea => {
      this._listado[tarea.id] = tarea;
    });
  }

  listadoCompleto(){
    console.log('\n');
    this.listadoArr.forEach((tarea, i) => {
      let index = `${i + 1}`.toString() + '.';
      const {desc, completadoEn} = tarea;
      let status = completadoEn ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${index.green} ${desc} :: ${status}`);
    });
    console.log('\n');
  }

  listadoPendientesCompletas(completadas = true){
    console.log('\n');
    let contador = 0;
    this.listadoArr.forEach((tarea, i) => {
      const {desc, completadoEn} = tarea;
      let status = completadoEn ? 'Completada'.green : 'Pendiente'.red;
      if(completadas){
        if(completadoEn){
          contador += 1;
          console.log(`${(contador + '.').green} ${desc} :: ${completadoEn.green}`);
        }
      }else{
        if(!completadoEn){
          contador += 1;
          console.log(`${(contador + '.').red} ${desc} :: ${status}`);
        }
      }
    });
    console.log('\n');
  }

  borrarTarea(id = ''){
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids = []){
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach(tarea => {
      if(!ids.includes(tarea.id)){
        tarea.completadoEn = null;
      }
    });
  }

}


module.exports = Tareas;
