require('colors');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrar,
    mostrarTareasChecklist
} = require('./helpers/inquirer');
const { guardarDB,
    leerDB
} = require('./helpers/guadarArchivo');
const Tareas = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();
                break;

            case '3':
                tareas.listarPendientesCompletas(true);
                break;

            case '4':
                tareas.listarPendientesCompletas(false);
                break;

            case '5':
                // mostrarTareasChecklist
                const ids = await mostrarTareasChecklist(tareas._listadoArr);
                tareas.toggleCompletadas(ids);

                break;

            case '6':
                const id = await listadoTareasBorrar(tareas._listadoArr);
                if (id !== '0') {
                    const ok = await confirmarBorrar('¿Seguro que quieres borrar esta tarea?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea eliminada');
                    }
                }

                // console.log({ok});
                break;

        }

        guardarDB(tareas._listadoArr);

        await pausa();

    } while (opt !== '0');


};

main();