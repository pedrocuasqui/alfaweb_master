module.exports = {


  friendlyName: 'Publicar curso',


  description: 'Establece el valor del campo PUBLICADO en true',


  inputs: {
    cursoId: {
      type: 'string',
      required: true,
    },
    publicar:{
      type:'boolean',
      required:true,
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    var res= this.res;
    // var cursoRecibido = JSON.parse(inputs.curso);
    console.log('LLEGADA A PUBLICAR CURSO');
    try{
    await Curso
      .update({
        id: inputs.cursoId
      })
      .set({
        publicado: inputs.publicar,
      });
    }catch(e){
      console.log('ERROR AL INTENTAR ACTUALIZAR');
      console.log(e);
      if(e.CODE=='E_UNIQUE'){
        return res.status(409).send({error: e});
      }
      if(e.name=='UsageError'){
        return res.status(400).send({error: e});
      }else{
        return res.status(500).send({err: e});
      }
      
    }

    return res.ok();


  }


};
