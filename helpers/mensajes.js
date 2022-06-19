require('colors');

const mostrarMenu = () => {

    return new Promise(resolve => {
        console.clear();
        console.log('========================'.green);
        console.log('   Opciones del menú'.green);
        console.log('========================\n'.green);

        console.log(` ${'1.'.magenta} Crear tarea`);
        console.log(` ${'2.'.magenta} Listar tareas`);
        console.log(` ${'3.'.magenta} Listar tareas completadas`);
        console.log(` ${'4.'.magenta} Listar tareas pendientes`);
        console.log(` ${'5.'.magenta} Competar tarea(s)`);
        console.log(` ${'6.'.magenta} Borrar tarea`);
        console.log(` ${'0.'.magenta} Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Selecciona una opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });

}

const pausa = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPresiona ${'ENTER'.green} para continuar.\n`, (opt) => {
            readline.close();
            resolve();
        });
    });
    
}


module.exports = {
    mostrarMenu,
    pausa
}