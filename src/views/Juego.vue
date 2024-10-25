<template>
    <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Adivina el animal</h1>
        <h2 class="text-l">Te quedan {{ intentos }} intentos</h2>
        <input type="text" v-model="guess" placeholder="Perro, gato, etc" class="input input-bordered w-full max-w-xs"
            @keyup.enter="buscarAnimal" />
        <button class="btn btn-outline btn-success" @click="buscarAnimal()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            Buscar</button>
        <div class="overflow-x-auto">
            <table class="table table-zebra" v-if="encontrados.length > 0">
                <thead>
                    <tr>
                        <th>Dirección</th>
                        <th>Posición</th>
                        <th>Animal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(animal, index) in sortedEncontrados" :key="index">
                        <td v-if="animal.posicion < 0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </td>
                        <td v-else-if="animal.posicion > 0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                            </svg>
                        </td>
                        <td v-else-if="animal.posicion == 0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </td>
                        <td>{{ animal.posicion }}</td>
                        <td>{{ animal.animal }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
//Para usar axios, primero hay que instalarlo usando: 'npm install axios'
//import axios from "axios";

export default {
    //Nombre del componente
    name: "Juego",

    data() {
        return {
            guess: '',
            selected: '',
            selectedIndex: '',
            randomIndex: '',
            encontrados: [],
            animales: [
                "Abeja",
                "Águila",
                "Alce",
                "Antílope",
                "Ardilla",
                "Avestruz",
                "Ballena",
                "Bisonte",
                "Búfalo",
                "Burro",
                "Búho",
                "Buitre",
                "Caballo",
                "Caballito de mar",
                "Cabra",
                "Caimán",
                "Calamar",
                "Camaleón",
                "Camello",
                "Canario",
                "Caracol",
                "Cangrejo",
                "Canguro",
                "Capibara",
                "Castor",
                "Cebra",
                "Cerdo",
                "Ciervo",
                "Cisne",
                "Cocodrilo",
                "Cóndor",
                "Conejo",
                "Coral",
                "Cormorán",
                "Cuervo",
                "Chacal",
                "Chimpancé",
                "Chinchilla",
                "Cigüeña",
                "Delfín",
                "Dingo",
                "Dromedario",
                "Elefante",
                "Erizo",
                "Escarabajo",
                "Escorpión",
                "Estrella de mar",
                "Faisán",
                "Flamenco",
                "Foca",
                "Gacela",
                "Gallina",
                "Gallo",
                "Ganso",
                "Gato",
                "Gavilán",
                "Gaviota",
                "Golondrina",
                "Gorila",
                "Grulla",
                "Guacamayo",
                "Halcón",
                "Hamster",
                "Hiena",
                "Hipopótamo",
                "Hurón",
                "Iguana",
                "Impala",
                "Jaguar",
                "Jirafa",
                "Kakapo",
                "Kiwi",
                "Koala",
                "Krill",
                "Langosta",
                "Lechuza",
                "Lémur",
                "León",
                "Leopardo",
                "Libélula",
                "Lince",
                "Lobo",
                "Lombriz",
                "Loro",
                "Luciérnaga",
                "Mamut",
                "Mandril",
                "Manatí",
                "Mantis religiosa",
                "Mapache",
                "Mariposa",
                "Medusa",
                "Meerkat",
                "Mofeta",
                "Mono",
                "Morsa",
                "Mosca",
                "Mosquito",
                "Murciélago",
                "Narval",
                "Nandú",
                "Nutria",
                "Ñandú",
                "Ñu",
                "Ocelote",
                "Oso",
                "Oso hormiguero",
                "Oso panda",
                "Oso pardo",
                "Ostra",
                "Ovibos",
                "Oveja",
                "Paloma",
                "Pantera",
                "Pato",
                "Pavo",
                "Pavo real",
                "Pecarí",
                "Perro",
                "Pez espada",
                "Pez globo",
                "Pez león",
                "Pingüino",
                "Piraña",
                "Polilla",
                "Pony",
                "Puercoespín",
                "Pulpo",
                "Puma",
                "Quetzal",
                "Rana",
                "Raya",
                "Reno",
                "Rinoceronte",
                "Salamandra",
                "Saltamontes",
                "Sapo",
                "Serpiente",
                "Simpio",
                "Suricata",
                "Tarántula",
                "Tiburón",
                "Tigre",
                "Tigre blanco",
                "Topillo",
                "Toro",
                "Tortuga",
                "Trucha",
                "Tucán",
                "Urraca",
                "Vaca",
                "Varano",
                "Venado",
                "Víboras",
                "Wallaby",
                "Walabi",
                "Wapití",
                "Yacaré",
                "Yegua",
                "Yeti",
                "Zancudo",
                "Zarigüeya",
                "Zebra",
                "Zopilote",
                "Zorro",
                "Zorrillo"
            ],
            intentos: 8,
        };
    },

    computed: {
        sortedEncontrados() {
            return this.encontrados.sort((a, b) => a.posicion - b.posicion); // Ordena por posición de menor a mayor
        },
    },

    methods: {
        selectRandomIndex() {
            this.randomIndex = Math.floor(Math.random() * 166); // Genera un número entre 0 y 165 (La cantidad de animales)
            this.selected = this.animales[this.randomIndex]
            console.log('El animal es: ' + this.selected)
        },
        buscarAnimal() {
            const normalizedGuess = this.guess.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); // Normaliza el texto
            const foundIndex = this.animales.findIndex(animal =>
                animal.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === normalizedGuess
            ); // Obtiene el índice del animal encontrado
            const foundAnimal = foundIndex !== -1 ? this.animales[foundIndex] : null; // Obtiene el animal si se encontró

            if (foundAnimal) {
                console.log(foundAnimal);
                console.log(foundIndex); // Muestra el índice encontrado
                // Modificación: se guarda el animal y su índice como un objeto
                this.encontrados.push({ animal: foundAnimal, posicion: foundIndex - this.randomIndex }); // Agrega el objeto al array 'encontrados'

                // Nueva lógica para limitar el tamaño del array 'encontrados' basada en this.intentos
                this.intentos -= 1; // Reduce los intentos restantes en 1
                if (this.intentos === 0) {
                    alert('Perdiste! El animal era: ' + this.animales[this.randomIndex]);
                    this.encontrados = []; // Reinicia el array
                    this.intentos = 8
                }

                if (foundIndex == this.randomIndex) {
                    alert('Ganaste! La respuesta era: ' + foundAnimal)
                }

                this.guess = ''
            } else {
                alert('Este animal no está en la lista');
                this.intentos -= 1; // Reduce los intentos restantes en 1
                if (this.intentos === 0) {
                    alert('Perdiste! El animal era: ' + this.animales[this.randomIndex]);
                    this.encontrados = []; // Reinicia el array
                    this.intentos = 8
                }

                this.guess = ''
            }
        },
    },

    mounted() {
        this.selectRandomIndex()
    },
}
</script>
