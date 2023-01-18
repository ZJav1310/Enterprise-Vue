<template>
    <div v-for="film in films" :key="film.id">
        <div>
            <Film @delete-film="$emit('delete-film', film.id)" @toggle-update="$emit('toggle-update', film.id)"
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
    components: { Film },
    emits: ['delete-film', 'toggle-update'],
}
</script>
