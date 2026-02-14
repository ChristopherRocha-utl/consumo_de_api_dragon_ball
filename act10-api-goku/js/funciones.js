const inst = Vue.createApp({
    data() {
        return {
            personajes: [],
            personajesFiltrados: [],
            seleccionarCategoria: 'todos'
        }
    },

    created() {
        this.cargarPersonajes();
    },
    
    methods: {
        cargarPersonajes() {
            axios.get("https://dragonball-api.com/api/characters?limit=15").then(respuesta => {
                this.personajes = respuesta.data.items;
                this.personajesFiltrados = this.personajes;
                console.log("Datos cargados", respuesta.data.items);
            });
        },

        filtrarPorCategoria(categoria) {
            this.seleccionarCategoria = categoria;
            if (this.seleccionarCategoria === 'todos') {
                this.personajesFiltrados = this.personajes;
            } else {
                this.personajesFiltrados = this.personajes.filter(personaje => 
                    personaje.race.includes(categoria)
                );
            }
        },
        verDetalles(id) {
            window.open(`detalles.html?id=${id}`, '_blank', 'width=800,height=600');
        }
    }
});

const app = inst.mount("#contenedor");