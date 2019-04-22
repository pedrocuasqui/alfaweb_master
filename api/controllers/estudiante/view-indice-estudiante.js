module.exports = {


  friendlyName: 'View indice estudiante',


  description: 'Display "Indice estudiante" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/estudiante/indice-estudiante'
    }

  },


  fn: async function (inputs, exits) {

    // await ModuloLibro.create(
    //   {
    //     nombreModulo: 'Introduccion al curso', 
    //     descripcion: 'descripcion de la introduccion',
    //     enlace: '',
    //     multimedia: 'images/svg/modulo1-portada.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    //   await ModuloLibro.create({
    //     nombreModulo: 'Módulo 1- La computadora ',
    //     descripcion: 'descripcion la computadora',
    //     enlace: '/m1-computadora',
    //     multimedia: 'images/svg/modulo1-portada.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    //   await ModuloLibro.create({
    //     nombreModulo: 'Módulo 2- Navegacion en escritorio',
    //     descripcion: 'descripcion Navegacion escritorio',
    //     enlace: '/m2-navegacion-escritorio',
    //     multimedia: 'images/svg/buho_bebe.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    //   await ModuloLibro.create({
    //     nombreModulo: 'Módulo 3-Edición de documentos Word',
    //     descripcion: 'Edición de documentos en word parte 1',
    //     enlace: '/',
    //     multimedia: 'images/svg/modulo1-portada.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    //   await ModuloLibro.create({
    //     nombreModulo: 'Módulo 4-Edición de documentos Word',
    //     descripcion: 'Edicion de documentos en word parte 2',
    //     enlace: '/',
    //     multimedia: 'images/svg/modulo1-portada.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    //   await ModuloLibro.create({
    //     nombreModulo: 'Módulo 5- Inserción de imágenes y tablas',
    //     descripcion: 'descripcion edicion de documentos',
    //     enlace: '/',
    //     multimedia: 'images/svg/modulo1-portada.svg',
    //     curso: '5cafa987620c201bf4a2aa2f'
    //   });
    


    //   await Curso.create({
    //     nombre:'reparación de computadoras'
    // });

/*      var moduloLibro = await ModuloLibro.find(); //esta es una instancia de consulta --> es un intento aún no cumplido de obtener registros de la base de datos
    //el resultado solo se observa cuando se usa la palabra await antes de la instancia y se asigna a una variable
    console.log('metodo1:\n'+moduloLibro); //devuelve el arreglo completo --> [object Object]
    console.log('metodo2:\n'+moduloLibro[0]);// devuelve el objeto JSON de la posision 0 --> [object Object]
    console.log('metodo3:\n'+JSON.stringify(moduloLibro)); //usar JSON.stringify para ver el resultado en consola en formato JSON, JSON.parse muestra un error
 */
    var curso= await Curso.find({nombre:'Alfabetizacion informática'}).populate('modulos');
    console.log('Curso\n'+ JSON.stringify(curso) );
    console.log('Curso:'+curso[0].nombre+'- modulos:\n'+ JSON.stringify(curso[0].modulos));

    let moduloLibro= curso[0].modulos;


    return exits.success({
      contenidos: moduloLibro,
      
      // cuando el nombre de la propiedad es igual al nombre del objeto que contiene la información, es posible enviar solo un dato es decir que, pasar, contenidos: contenidos es igual que pasar contenidos
    });


  }


};
