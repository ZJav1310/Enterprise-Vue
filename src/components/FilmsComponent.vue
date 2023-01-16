<template>
    <div v-for="film in films" :key="film.id">
        <Film 
        @delete-film="$emit('delete-film', film.id)" @update-film="$emit('update-film', film.id)" 
        :film="film"/>
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
    emits: ['delete-film', 'update-film'],
}
</script>
