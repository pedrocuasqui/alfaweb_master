parasails.registerPage('administrar-home', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    breadcrumb: [{ id: '', texto: 'indice', enlace: '#' },  ],
    // cursos:Object, //esta variable será sobreescrita con el contenido de Windows.SAILS_LOCALS.cursos //vue no reconoce la variable cuando no está declarada
    cursoEliminar:{
      nombre:'',
      id:''
    },
    cursos: Object,
    editarCurso:false,
    formErrors:{},
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    // console.log(window.SAILS_LOCALS);
    this.cursos=SAILS_LOCALS.cursos;
  },
  mounted: async function() {

    this.asignarEventoClick();

    
    
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    asignarEventoClick(){

      var _this= this;
      this.cursos.forEach(element=>{
        console.log('iteracion de elemento');
        console.log(element.id);
        document.getElementById(element.id).addEventListener("click", abrir=function (){_this.abrirCurso(element.id);},false);
      })
      
  
      // elementosBtn.forEach(elemento =>{
      //   elemento.addEventListener("click", this.abrirCurso);
      // });
      
    },
    seleccionaCursoEliminar(curso){
      this.cursoEliminar=curso;
      $(function () {
        $('#modalConfirmaEliminar').modal('show');
      });
    },
    eliminarDocumento(){
      var _this=this;
      axios.get('/eliminar-curso', {
        params: {
          cursoId: this.cursoEliminar.id,
        }
      })
      .then(function (response) {
        console.log("respuesta de eliminacion\n"+response);          
        _this.consultarCursos();
      })
      .catch(function (error) {
        console.log(error);
      });

    },

    consultarCursos(){
      var _this=this;
      axios.get('/consulta-cursos') //llamada a la ruta curso por defecto
      .then(function (response) {
        console.log('archivos encontrados');
        _this.cursos=response.data;
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    abrirCurso (cursoId){
      window.location.href='/administrar-indice/?cursoId='+cursoId;

    },
    mostrarEditarCurso(cursoId){
      // event.cancelBubble = true;
      // if(event.stopPropagation) event.stopPropagation();
   
      var _this= this;
      console.log(cursoId);
      this.editarCurso = true;
      // var abrir= function(){};
      console.log(document.getElementById(cursoId));
      document.getElementById(cursoId).removeEventListener("click", abrir,false);
      

    },
    validarCampos(curso){
      this.formErrors= {};

      if(curso.nombre==''){
        this.formErrors.nombre= true;
      }
      if(curso.descripcion==''){
        this.formErrors.descripcion= true;
      }

      if(Object.keys(this.formErrors).length>0){
        return false;
      }else{
        this.guardarCurso(curso);  
      }

      
    },
    guardarCurso(curso){
      var _this= this;
      console.log('guardar curso');
      this.editarCurso= false;

      // PROCESO PARA GUARDAR EL CURSO
      var formData= new FormData();
      formData.append('cursoId',curso.id);
      formData.append('nombreCurso',curso.nombre);
      formData.append('descripcionCurso', curso.descripcion);
      axios({
        method:'post',
        url:'/actualizar-curso',
        data:formData
      })
      .then(
        (response)=>{
          console.log('curso modificado');
          console.log(response.data)
        }
        )
      .catch(
        (err)=>{
          console.log('error devuelto');
          console.log(err)
        }
      );

      // finalmente habilitar el evento click nuevamente
      document.getElementById(curso.id).addEventListener("click",abrir=function(){_this.abrirCurso(curso.id)},false);
    },


  }
});
