
parasails.registerComponent('boton-curso', {
    props: {

        curso: Object,
    },
    data() {
        return {
            editarCurso: false,
            formErrors: {},
        };
    },
    mounted() {
        var _this = this;
        //se aniade el evento mediante javascript porque el evento @click no permite diferenciar a que boton se le dio click 
        document.getElementById(this.curso.id).addEventListener("click", abrir = function () { _this.abrirCurso(_this.curso.id); }, false);
    },
    template://html
        `  
<div>
    <button :id="curso.id" type="button" class=" button list-group-item list-group-item-action flex-column align-items-start">
    <!-- @click="abrirCurso(curso.id)"> -->
    <div class="d-flex w-100 justify-content-between">
      <input :id="'input'+curso.id" v-if="editarCurso" type="text" v-model="curso.nombre" :class="[formErrors.nombre ? 'is-invalid' : '']">
      <h5 v-else class="mb-1">{{curso.nombre}}</h5>
      <div class="invalid-feedback" v-if="formErrors.nombre">El campo no puede estar vacío</div>
      <!--span hace que los contenidos se presenten en linea-->
      <span>
        <!--EDITAR CURSO-->
        <a v-if="habilitarEdicion" @click.stop="validarCampos()" title="Editar Curso"><i
            class="fas fa-save"></i></a>
        <a v-else-if="noEsInforBasica" @click.stop="mostrarEditarCurso(curso.id)" data-placement="top" title="Editar Curso"> <i
            class="fas fa-edit"></i> </a>
        <!--PUBLICAR Y OCULTAR CURSO-->
        <a v-if="cursoPublicado" @click.stop="ocultarCurso(curso.id)" data-placement="top" title="Ocultar Curso"> <i class="fas fa-lock-open"></i> </a>
        <a v-else-if="noEsInforBasica" @click.stop="publicarCurso(curso.id)" data-placement="top" title="Publicar Curso"> <i class="fas fa-lock"></i> </a>
       <!--ELIMINAR CURSO-->
        <a v-if="noEsInforBasica" data-toggle="modal" data-target="#modalConfirmaEliminar"
          @click.stop="$emit('selecciona-curso-eliminar',curso)" data-placement="top" title="Eliminar Curso"><i
            class="fas fa-trash-alt"></i></a>
      </span>
    </div>
    <input v-if="editarCurso" type="text" v-model="curso.descripcion">
    <p v-else class="mb-1">{{curso.descripcion}}</p>
    <div class="invalid-feedback" v-if="formErrors.descripcion">El campo no puede estar vacío</div>
  </button>
</div>
    `,
    methods: {
        mostrarEditarCurso(cursoId) {

            this.editarCurso = true;
            document.getElementById(cursoId).removeEventListener("click", abrir, false);

        },
        validarCampos() {
            this.formErrors = {};

            if (this.curso.nombre == '') {
                this.formErrors.nombre = true;
            }
            if (this.curso.descripcion == '') {
                this.formErrors.descripcion = true;
            }

            if (Object.keys(this.formErrors).length > 0) {
                return false;
            } else {
                //   this.guardarCurso(curso);  
                this.editarCurso = false;
                this.$emit('guardar-curso', this.curso);
            }


        }
        ,
        abrirCurso(cursoId) {
            window.location.href = '/administrar-indice/?cursoId=' + cursoId;

        },
        seleccionaCursoEliminar(curso) {
            this.$emit('selecciona-curso-eliminar', curso);
        },
        publicarCurso(cursoId) {

            axios({
                url: `/publicar-curso/${cursoId}`,
                method: 'PUT',
                data: { publicar: true }
            }).then(response => {
                this.curso.publicado = true;
                alert('Curso publicado');

            }).catch(err => {
                alert('Error: no se ha podido publicar el curso');
            });


        },
        ocultarCurso(cursoId) {
            this.curso.publicado = false;
            axios({
                url: `/publicar-curso/${cursoId}`,
                method: 'PUT',
                data: { publicar: false }
            }).then(response => {
                this.curso.publicado = false;
                alert('Se ha ocultado el curso a los estudiantes');

            }).catch(err => {
                alert('Error: intente más tarde');
            });

        }

    },
    computed: {
        noEsInforBasica() {
            //si el nombre del curso es "Alfabetización informática" entonces no se mostrará el botón eliminar, no se debe por ninguna razón eliminar el curso, en caso de hacerlo, se debe reiniciar el servidor para que se vuelva a crear el curso por defecto, aunque las páginas  html del contenido permanecerán siempre intactas
            let respuesta = this.curso.nombre != 'Alfabetización informática';
            return respuesta;
        },
        habilitarEdicion() {

            let respuesta = this.editarCurso;
            return respuesta
        },
        deshabilitarEdicion() {

        },
        cursoPublicado() {
            let respuesta = this.curso.publicado && this.curso.nombre != 'Alfabetización informática';
            return respuesta;
        }


    }

});