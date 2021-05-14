Vue.component('v-autocompleter', {
    data: function () {
        return {
            googleSearch: "",
            wyszukaj: "",
            cities: window.cities,
            pokaz: 0,
            licznik: 0,
        }
    },
    computed: {
        filtredCities() {
            let result = this.cities.filter(miasto => miasto.name.startsWith(this.googleSearch) || miasto.name.toLowerCase().startsWith(this.googleSearch));
            if (this.googleSearch.length > 0) {
                return result.slice(0, 10);
            }
        }
    },
    watch: {
        strzalki() {
            if (googleSearch.length() > 0) {
                document.addEventListener('keydown', this.wdol);
                document.lista.addEventListener('keyup', this.wgore);
            }
        }
    },
    methods: {
        potwierdz() {

            this.wyszukaj = this.googleSearch;
            this.pokaz = 0;
        },
        uzupelnij(miasto) {

            this.googleSearch = miasto.name;
            this.wyszukaj = this.googleSearch;
            this.pokaz = 0;
        },
        rozwin() {
            this.pokaz = 1;
        },
        wdol() {
            licznik++;
            if (!licznik == lista.length) {
                this.googleSearch = this.miasto[licznik].name;
                // tu jakiś hover
            }
        },
        wgore() {
            licznik--;
            if (!licznik == 0) {
                licznik++;
                this.googleSearch = this.miasto[licznik].name;
                // tu jakiś hover
            }
        },
    }
})

var app = new Vue({
    el: "#app",
    props: ['options'] = filtredCities,
})