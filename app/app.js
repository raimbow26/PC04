new Vue({
    el: '#app',
    data: {
        titulo: 'Lista de entrenadores Pokémon',
        entrenadores: [],
        entrenadoresSeleccionados: [],
        mensajeCombate: ''
    },
    mounted() {
        this.cargarEntrenadores();
    },
    methods: {
        cargarEntrenadores() {
            fetch('app/json/entrenadores.json')
                .then(response => response.json())
                .then(data => {
                    this.entrenadores = data;
                    this.entrenadores.forEach(entrenador => {
                        this.$set(entrenador, 'mostrarPokemones', false);
                    });
                })
                .catch(error => {
                    console.error('Error al cargar los datos de los entrenadores:', error);
                });
        },
        verPokemon(entrenador) {
            entrenador.mostrarPokemones = !entrenador.mostrarPokemones;
        },
        seleccionarEntrenador(entrenador) {
            if (this.entrenadoresSeleccionados.includes(entrenador)) {
                this.entrenadoresSeleccionados = this.entrenadoresSeleccionados.filter(e => e !== entrenador);
            } else if (this.entrenadoresSeleccionados.length < 2) {
                this.entrenadoresSeleccionados.push(entrenador);
                this.mostrarMensajeEntrenadorSeleccionado(entrenador);
            }
        },
        mostrarMensajeEntrenadorSeleccionado(entrenador) {
            alert(`¡Has seleccionado a ${entrenador.nombre} para el combate!`);
        },
        nuevoCombate() {
            if (this.entrenadoresSeleccionados.length === 2) {
                this.mensajeCombate = this.generarMensajeCombate();
                alert(this.mensajeCombate);
                this.resetearSeleccion();
            }
        },
        generarMensajeCombate() {
            return `Se realizará un combate pokemon entre ${this.entrenadoresSeleccionados[0].nombre} vs ${this.entrenadoresSeleccionados[1].nombre}`;
        },
        resetearSeleccion() {
            this.entrenadoresSeleccionados = [];
        }
    }
});