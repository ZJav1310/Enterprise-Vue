<template>
    
    <h3>{{ formText }}</h3>
    <form @submit="onSubmit">
        
        <label>Title:</label><br />
        <input type="text" required v-model="title"><br/>

        <label>Director:</label><br>
        <input type="text" required v-model="director"><br />

        <label>Stars:</label><br />
        <input type="text" required v-model="stars"><br />

        <label>Year:</label><br />
        <input type="text" required v-model="year"><br />

        <label>Review:</label><br />
        <textarea type="text" required v-model="review"></textarea><br />

        <ButtonComponent text="Submit" />
    </form>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
    export default{
    name: "FormComponent",
    props: {
        formText : String
    },
    data() {
        return {
            title: "",
            director: "",
            year: "",
            stars: "",
            review: "",
            text: this.buttonText
        };
    },
    emits: ["film-object"],
    methods: {
        onSubmit(e) {
            e.preventDefault();
            if (!this.validateFields()) {
                alert("You are missing stuffs.");
                return;
            }
            //TODO add check for id
            const formObject = {
                title: this.title,
                year: this.year,
                director: this.director,
                stars: this.stars,
                review: this.review,
                text: this.text
            };
            
            this.$emit("form-object", formObject);

            this.title = "";
            this.director= "";
            this.year= "";
            this.stars= "";
            this.review= "";
        },
        validateFields() {
            if (this.title && this.director && this.year && this.stars && this.review) {
                return true;
            }
            else {
                return false;
            }
        },
    },
    components: { ButtonComponent }
}
</script>