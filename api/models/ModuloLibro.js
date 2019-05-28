/**
 * ModuloLibro.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
/**
 * Tipos de datos soportados en Sails
 * string
number
boolean
json
ref
 */
module.exports = {
  // datastore: 'alfabetizaweb',
  tableName: 'ModuloLibro',
  attributes: {
    nombreModulo: {
      type: 'string',
      required: true,
      columnName: 'nombreModulo', //sirve para cuando existe una conexion a diferentes bases de datos
      // unique: true
      //defaulsTo:'', establece un valor por defecto
      //columnType: '' //define el tipo de columna del campo de la base de datos
      //allowNull: true //Los tipos de datos string, numbery boolean, no se aceptan nullcomo un valor al crear o actualizar registros.
      //isIn: ['boring', 'too many emails', 'recipes too difficult', 'other'], //la regla isIn  verifica que cualquier nuevo valor almacenado para este atributo debe coincidir exactamente con una de las pocas constantes de código diferente
    },
    descripcion: {
      type: 'string',
      allowNull: true,
      columnName: 'descripcion'
    },
    enlace: {
      type: 'string',
      columnName: 'enlace',
    },
    multimedia: {
      type: 'json',
      required: true,
      columnName: 'multimedia'
    },
    contenidoTiny:{
      type:"string",
      required:false,
      columnName: 'contenidoTiny',
    },

    // submodulos:{ //aqui no van los submodulos, en los submodulos se agrega la referencia al documento de ModuloLibro
    //   type:'ref',
    //   // columnType:'array',
    //   required: false,
    //   // allowNull: true, //no se permite en tipos de datos json y ref
    //   columnName:'submodulos',//modificar esta columna, se necesita una relacion de uno a muchos, cada tema puede tener mas de una sola imagen asociada


    // }
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    curso: { //el nombre de esta propiedad es el definido en el modulo 'Curso'--> propiedad 'moduloLibro', propiedad 'via'    un curso puede tener varios ModulosLibro curso -->ModulosLibro
      model:'curso',
      required: true,
    },
    submodulos: { //Un modulo tiene varios submodulos     modulo-->submodulos
      collection: 'SubmoduloLibro',
      via: 'modulo', //el nombre de l apropiedad que enlazará al modelo SubmoduloLibro con el ModuloLibro

    }
  }


};

