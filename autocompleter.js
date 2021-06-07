Vue.component('v-autocompleter', {
    template: `
    <div class="autocom">
        <div class="tekst">
            <input
            :value="value"
            type="text"
            @input="$emit('input', $event.target.value)"
            @keyup.enter="potwierdz(value)"
            @keyup.down="goTo(podswietlony + 1)" 
            @keyup.up="goTo(podswietlony - 1)"/>
        </div>
        <div class="result-city" v-for="(city, index) in filteredCities"
        :class="{active : pokaz && podswietlony === index}" @click="potwierdz(city.name)">
            <span v-html="city.nameHtml"></span>
        </div>
    </div>`,

    data: function () {
        return {
            cities: window.cities.map((cityData) => {
                cityData.nameLowerCase = cityData.name.toLowerCase();
                return cityData;
            }),
            pokaz: false,
            filteredCities: [],
            podswietlony: 0,
        };
    },

    props: {
        value: {
          type: String,
          default: ""
        },
        options: {
          type: Array,
          default: []
        }
      },

    watch: {
        value() {
            if (this.pokaz) {
                return;
            }
            if (this.value.length === 0) {
                filteredCities = [];
                return;
            }
            let returnedCities = [];
            let searchLowerCase = this.value.toLowerCase();

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
            this.value = this.filteredCities[index].name;
        },
        potwierdz(name) {
            this.pokaz = true;

            if (name) {
                this.value = name;
            }

            this.filteredCities = [];
            this.$nextTick(() => {
                this.pokaz = false;
            });
        },
    },
});

