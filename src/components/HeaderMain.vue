<template>
    <header>
        <h1>{{ title }}</h1>
        <ButtonComponent 
        @click-btn="$emit('toggle-insert')" 
        :text="showAdd ? 'Close' : 'Add Film'"  
        :color="showAdd ? 'red' : 'blue'"
        />
    </header>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';

    export default {
    name: "HeaderMain",
    props: {
        title: String,
        showAdd : Boolean
    },
    components: { ButtonComponent }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>