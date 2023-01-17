<template>
    <div class="film">
        <h3>{{ film.title }}</h3>
        <p>{{ film.year }} / {{ film.director }} / {{ film.stars }}</p>
        <p>{{ film.review }}</p>
        <ButtonComponent @click="onUpdate(film.id)" text="Update" data-toggle="modal" data-target="#modalComp"/>
        <ButtonComponent @click="onDelete(film.id)" text="Delete" />
    </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: "FilmComponent",
    props: {
        film: Object
    },
    methods: {
        onUpdate(id) {
            this.$emit('update-film', id);
        },
        onDelete(id) {
            this.$emit('delete-film', id);
        },
    },
    components: { ButtonComponent }
}
</script>

<style scoped>
.film {
    background: rgb(230, 230, 230);
    margin: 5px;
    padding: 10px 20px;
    border-radius: 15px;
    cursor: pointer;
}

.film h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>