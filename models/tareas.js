const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get _listadoArr() {

        const listado = [];
        // object.keys devuelve un array con todas las keys (propiedades y métodos) 
        // de un objeto
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') { // id = '' és opcional

        if(this._listado[id]) {
            delete this._listado[id];
        }
    }
    

    cargarTareasFromArray(tareas = []) {
        // repasar perquè no ho acab d'entendre. Vídeo 55-56
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;

        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        this._listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea; //desestructuració objectes-> repassar
            const estado = (completadoEn)
                ? 'Completada'.green // true
                : 'Pendiente'.red;  // false (null és false)
            console.log(`${idx} ${desc} :: ${estado}`);
        })

    }

    listarPendientesCompletas(completadas = true) {

        let contador = 0;

        this._listadoArr.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            let estado = (completadoEn)
                ? 'Completada'.green // true
                : 'Pendiente'.red;  // false (null és false)

            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green} ${desc} :: ${completadoEn.green}`);
                }
            } else {

                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().red} ${desc} :: ${estado}`);
                }
            }

        });

    }

    toggleCompletadas (ids = []) {

        ids.forEach( id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });


        // per desmarcar com a completada:
        this._listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });

    }
}


module.exports = Tareas;