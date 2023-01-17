<template>

    <h3>{{ formText }}</h3>

    <form @submit="onSubmit">
        <div class="form-row">
            <div class="col-md-4 mb-3 w-100">
                <label for="inputTitle">Title</label>
                <input type="text" v-model="title" class="form-control" id="inputTitle" placeholder="Title" required>
            </div>
            <div class="col-md-4 mb-3 w-100">
                <label for="inputDirector">Director</label>
                <input type="text" v-model="director" class="form-control" id="inputDirector" placeholder="Director"
                    required>
            </div>
            <div class="col-md-4 mb-3 w-100">
                <label for="inputStars">Stars</label>
                <div class="input-group">
                    <input type="text" v-model="stars" class="form-control" id="inputStars" placeholder="Stars"
                        aria-describedby="inputGroupPrepend2" required>
                </div>
            </div>
            <div class="col-md-4 mb-3 w-100">
                <label for="inputStars">Year</label>
                <div class="input-group">
                    <input type="text" v-model="year" class="form-control" id="inputYear" placeholder="Year"
                        aria-describedby="inputGroupPrepend3" required>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="reviewTextArea">Review</label>
            <textarea class="form-control" id="reviewTextArea" rows="3" type="text" required
                v-model="review">Placement Review</textarea>
        </div>

        <div class="flex-column border-top-0">
            <ButtonComponent class="btn btn-lg btn-primary w-100 mx-0 mb-3 mt-4" text="Save Changes" />
        </div>
    </form>

</template>

<script>
import ButtonComponent from './ButtonComponent.vue';
export default {
    name: "FormComponent",
    props: {
        formText: String
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
            this.director = "";
            this.year = "";
            this.stars = "";
            this.review = "";
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