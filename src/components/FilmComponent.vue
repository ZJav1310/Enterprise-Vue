<template>
    <div class="card bg-light mb-3">
        <h5 class="card-header">
            {{ film.title }}
        </h5>
        <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">{{ film.year }} / {{ film.director }} / {{ film.stars }}</h6>
        <p class="card-text">{{ film.review }}</p>

        <div>
            <ButtonComponent @click="onUpdate(film.id)" text="Update" data-toggle="modal" data-target="#modalComp"/>
            <ButtonComponent @click="onDelete(film.id)" text="Delete" />
        </div>
    </div>
    </div>
    
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: "FilmComponent",
    props: {
        film: Object
    },
    emits: ['toggle-update', 'delete-film'],
    methods: {
        onUpdate(id) {
            this.$emit('toggle-update', id);
        },
        onDelete(id) {
            this.$emit('delete-film', id);
        },
    },
    components: { ButtonComponent }
}
</script>

<!-- <style scoped>
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
} -->
<!-- </style> -->