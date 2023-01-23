<template>
    <div class="btn-group p-1" role="group" aria-label="Page">
        <button type="button" class="btn btn-outline-primary" @click="pagination('down')">page down</button>
        <button type="button" class="btn btn-outline-primary" @click="pagination('up')">page up</button>    
    </div>
    <!-- <div v-for="(film) in films" :key="film.id">
        <div>
            <Film @delete-film="$emit('delete-film', film.id)" @toggle-update="$emit('toggle-update', film.id)"
                :film="film" />
        </div>
    </div> -->
    <!-- <div v-for="index in perPage" :key="index">
        <div>
            <Film @delete-film="$emit('delete-film', films[index].id)" @toggle-update="$emit('toggle-update', films[index].id)"
                :film="films[index]" />
        </div>
    </div> -->
    <!-- <div v-for="(film) in filteredItems" :key="film.id">
        <div>
            <Film @delete-film="$emit('delete-film', film.id)" @toggle-update="$emit('toggle-update', film.id)"
                :film="film" />
        </div>
    </div> -->

    <div v-for="(film) in filteredItems" :key="film.id">
        <div>
            <Film 
                @delete-film="$emit('delete-film', film.id)" 
                @toggle-update="$emit('toggle-update', film.id)"
                :film="film" />
        </div>
    </div>

</template>

<script>
import Film from './FilmComponent.vue';

export default {
    name: "FilmsComponent",
    props: {
        films: Array,
    },
    data() {
        return {
            page: 0,
            perPage: 10,
            start: 0,
            end: 9,
        }
    },
    components: { Film },
    emits: ['delete-film', 'toggle-update'],
    computed: {
        filteredItems() {
            return this.films.slice(this.start, this.end)
        },
    },
    watch: {
        films(newF, oldF) {
            if (newF.length != oldF.length) {
                console.log("Watching films")
                this.start = 0
                this.end = 9
                this.page = 0
            }
        },
    },
    methods: {
        pagination(input) {
            const x = 0
            const y = 9

            if ((input === 'up') && (this.page < (Math.round(this.films.length / this.perPage))-1)) {
                this.page = this.page + 1
            }
            if ((input === 'down') && (this.page > 0)) {
                this.page = this.page - 1
            }

            this.start = x + (this.perPage * this.page)
            this.end = y + (this.perPage * this.page)

            console.log("Number of pages", Math.round(this.films.length / this.perPage)-1)
            console.log("current page number", this.page)
        }
    },
}
</script>
