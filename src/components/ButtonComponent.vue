<template>
    <button @click="onClick()" :style="{background: color}" class="btn"> {{ text }} </button>
</template>

<script>
export default {
    name: 'ButtonComponent',
    emits:['click-btn'],
    props: {
        text: String,
        color: String,
    },
    methods: {
        onClick() {
            console.log("Clicked", this.text);
            this.$emit('click-btn')
        },
    },
}
</script>
