<template>
  <!-- updating correctly -->
  <div class="container">
    <Header 
    @toggle-insert="toggleInsert"
    title = 'Film' 
    :showAdd = "showAdd"
    />
    <div v-if="showAdd">
      <FormComponent 
      @form-object="addFilm" 
      formText = "Add Film"
      />
    </div>
    <div v-if="showUpdate">
      <FormComponent 
      @form-object="updateFilm" 
      formText = "Update Film"
      />
    </div>
    <Films 
      @update-film="toggleUpdate" 
      @delete-film="deleteFilm" 
      :films="films" 
    />
  </div>
</template>

<script>
import Header from "./components/HeaderMain.vue";
import Films from "./components/FilmsComponent.vue";
import FormComponent from "./components/FormComponent.vue";

export default {
  name: 'App',
  components: {
    Header,
    Films,
    FormComponent
  },
   data () {
    return {
      films: [],
      showAdd : false,
      showUpdate: false,
      formText : '',
    }
   },
   async created(){
    this.films = await this.fetchFilms()
   },
   methods: {
    toggleInsert(){
      this.showAdd = !this.showAdd
      if(this.showUpdate == true){
        this.showUpdate = false;
      }
    },
    toggleUpdate(){
      this.showUpdate = !this.showUpdate
      if(this.showAdd == true){
        this.showAdd = false;
      }
    },
    async deleteFilm(id){
      if(confirm('Are you sure?')){
        const response = await fetch(`api/films/${id}`, {
        method: 'DELETE',
      })

      response.status === 200 ? 
      ( this.films = this.films.filter((film) => film.id !== id) ) : 
      alert('Error deleting film')
            
      }
    },
    async updateFilm(id){
      console.log("Film id:", id);
      // const filmToUpdate = await this.fetchFilm(id);
      // const updatedFilm = {...filmToUpdate, }
     
    },
    async addFilm(film){
      const response = await fetch('api/films', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })

      const data = await response.json()
      response.status === 200 ? (this.films = [...this.films, data]) : alert('Error Adding Film')
    
    },
    async fetchFilms() {
      const response = await fetch('api/films')
      const data = await response.json()

      return data
    },
    async fetchFilm(id) {
      const response = await fetch(`api/films/${id}`)
      const data = await response.json()

      return data
    }
   }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
