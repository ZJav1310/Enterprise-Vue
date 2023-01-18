<template>

  <div class="search-wrapper">
    <input type="text" v-model="search" placeholder="Search title.." />
    <label>Search title:</label>
  </div>
  {{ search }}
  <div class="container">
    <Header @requested-format="requestedFormat" @toggle-insert="toggleInsert" title='Film' :showAdd="showAdd" />
    <div>
      <Films @toggle-update="toggleUpdate" @delete-film="deleteFilm" :films="films" @click="showModal = true" />
    </div>
  </div>

  <div v-if="showModal">
    <!-- Modal for forms -->
    <div class="modal fade" id="modalComp" tabindex="-1" role="dialog" aria-labelledby="modalCompLabel"
      aria-hidden="true" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalCompLabel"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="showModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="showModal">
              <div v-if="showUpdate">
                <FormComponent @form-object="updateFilm" formText="Update Film" :idtag="this.id"
                  :incFilm="this.incFilm" />
              </div>
              <div v-if="showAdd">
                <FormComponent @form-object="addFilm" formText="Add Film" :incFilm="null" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Header from "./components/HeaderMain.vue";
import Films from "./components/FilmsComponent.vue";
import FormComponent from "./components/FormComponent.vue";
// import ButtonComponent from "./components/ButtonComponent.vue";

export default {
  name: 'App',
  components: {
    Header,
    Films,
    FormComponent,
    // ButtonComponent
  },
  emits: ['showAdd', 'films',],

  data() {
    return {
      films: [],
      showAdd: false,
      showUpdate: false,
      showModal: true,
      formText: '',
      id: '',
      incFilm: String,
      search: ''
    }
  },
  async created() {
    this.films = await this.fetchFilms()
  },
  computed: {
    // filterList() {
    //   return this.films.filter((film) => { return film.title.toLowerCase().includes(this.search.toLowerCase()) })

    //   // return this.films.filter((film) => film.title.toLowerCase().includes(input.toLowerCase()))
    // },
    computed: {
      filteredList() {
        return this.films.filter(film => {
          return film.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    }
  },
  methods: {
    requestedFormat(format) {
      console.log(format)
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleInsert() {
      this.incFilm = null
      this.showModal = true
      this.showUpdate = false
      this.showAdd = true
      this.id = ''

    },
    toggleUpdate(id) {
      this.incFilm = null
      this.showUpdate = true
      this.showAdd = false
      this.showModal = true
      this.id = id
      this.incFilm = this.getFilm(this.id)
      console.log(this.id)
      console.log("incoming film in toggleUpdate:", this.incFilm)
    },
    async deleteFilm(id) {
      console.log(id)
      if (confirm('Are you sure?')) {
        const response = await fetch(`api/films/${id}`, {
          method: 'DELETE',
        })

        response.status === 200 ?
          (this.films = this.films.filter((film) => film.id !== id)) :
          alert('Error deleting film')

      }
    },
    async updateFilm(film) {
      const response = await fetch(`api/films/${this.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })
      const data = await response.json()
      if (response.status === 200) {
        this.films = this.films.filter((film) => film.id !== this.id)
        this.films = [...this.films, data]
        console.log("Updated film in UpdateFilm:", film)

        // this.incFilm = null
      } else {
        alert('Error Adding Film')
      }
    },
    async addFilm(film) {
      console.log("addFilm:", film)
      const response = await fetch('api/films', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })

      const data = await response.json()
      if (response.status === 201) {
        this.films = [...this.films, data]
      } else {
        alert('Error Adding Film')
      }

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
    },
    getFilm(id) {
      return this.films.find(film => film.id == id)
    },
  }
}
</script>

