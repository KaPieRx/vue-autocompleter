Vue.component('v-autocompleter', {
    template: `
    <div class="autocom">
        <div class="tekst">
            <img class="lupa" src="lupa.png" @click="potwierdz()" title="Szukaj">
            <input
            :value="value"
            type="text"
            @input="$emit('input', $event.target.value)"
            @keyup.enter="potwierdz()"
            @keyup.down="goTo(podswietlony + 1)" 
            @keyup.up="goTo(podswietlony - 1)"/>
            <img class="klaw" src="klawiatura.png" title="Narzędzia do wprowadzania tekstu">
            <img class="mikro" src="mikro.png" title="Wyszukiwanie głosowe">
        </div>
        <div class="result-city" v-for="(city, index) in filteredCities"
        :class="{active : pokaz && podswietlony === index}" @click="potwierdz(city.name)">
            <img class="lupa" src="lupa.png" title="Szukaj">
            <span v-html="city.nameHtml"></span>
        </div>
    </div>`,

    data: function () {
        return {
            isOnResults: false,
            googleSearch_temp: "",
            wyszukaj: "",
            cities: window.cities.map((cityData) => {
                cityData.nameLowerCase = cityData.name.toLowerCase();
                return cityData;
            }),
            pokaz: false,
            filteredCities: [],
            podswietlony: 0,
        };
    },

    props: ['value', 'options'],

    watch: {
        googleSearch_temp() {
            if (this.pokaz) {
                return;
            }
            if (this.googleSearch_temp.length === 0) {
                filteredCities = [];
                return;
            }
            let returnedCities = [];
            let searchLowerCase = this.googleSearch_temp.toLowerCase();

            this.cities.forEach((cityData) => {
                if (returnedCities.length === 10 || !cityData.nameLowerCase.includes(searchLowerCase)) {
                    return;
                }
                returnedCities.push({
                    name: cityData.name,
                    nameHtml: cityData.nameLowerCase.replace(searchLowerCase, (match) => {
                        return '<span class="bold">' + match + '</span>';
                    })
                })
            });

            this.filteredCities = returnedCities;
        }
    },

    methods: {
        goTo(index) {
            if (!this.pokaz) {
                index = 0;
            }

            if (index > this.filteredCities.length - 1) {
                index = 0;
            } else if (index < 0) {
                index = this.filteredCities.length - 1;
            }

            this.pokaz = true;
            this.podswietlony = index;
            this.googleSearch_temp = this.filteredCities[index].name;
        },
        potwierdz(name) {
            this.pokaz = true;

            if (name) {
                this.googleSearch_temp = name;
            }

            this.isOnResults = true;
            this.filteredCities = [];
            this.$nextTick(() => {
                this.pokaz = false;
            });
        },
    },
});

