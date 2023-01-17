<template>
  <!-- <div v-if="showAdd">
    <ModalComponent>
      <FormComponent @form-object="addFilm" formText="Add Film" />
    </ModalComponent>
  </div> -->
  <!-- <div v-if="showModal" aria-hidden="true">
    <ModalComponent @close-modal="toggleModal">
      <div v-if="showUpdate">
        <FormComponent @form-object="updateFilm" formText="Update Film" />
      </div>
      <div v-if="showAdd">
        <FormComponent @form-object="addFilm" formText="Add Film" />
      </div>
    </ModalComponent>
  </div> -->
  <div class="container">
    <Header @requested-format="requestedFormat" @toggle-insert="toggleInsert" title='Film' :showAdd="showAdd" />
    <Films @update-film="toggleUpdate" @delete-film="deleteFilm" :films="films" />
  </div>

  <!-- Modal -->
  <div class="modal fade" id="modalComp" tabindex="-1" role="dialog" aria-labelledby="modalCompLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalComp
      Label">xxx</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="showUpdate">
            <FormComponent @form-object="updateFilm" formText="Update Film" />
          </div>
          <div v-if="showAdd">
            <FormComponent @form-object="addFilm" formText="Add Film" />
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
// import ModalComponent from "./components/ModalComponent.vue";

export default {
  name: 'App',
  components: {
    Header,
    Films,
    FormComponent,
    // ModalComponent,
  },
  data() {
    return {
      films: [],
      showAdd: false,
      showUpdate: false,
      showModal: false,
      formText: '',
      id: ''
    }
  },
  async created() {
    this.films = await this.fetchFilms()
  },
  methods: {
    requestedFormat(format) {
      console.log(format)
    },
    toggleModal() {
      this.showModal = !this.showModal
    },
    toggleInsert() {
      this.toggleModal();
      this.showAdd = true
      this.id = ''
      if (this.showUpdate == true) {
        this.showUpdate = false;
      }
    },
    toggleUpdate(id) {
      this.toggleModal();
      this.showUpdate = true
      this.id = id
      if (this.showAdd == true) {
        this.showAdd = false;
      }
      console.log(id)
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
      // this.films = this.films.filter((film) => film.id !== this.id)
      // response.status === 200 ? (this.films = [...this.films, data]) : alert('Error Adding Film')
      if (response.status === 200) {
        this.films = this.films.filter((film) => film.id !== this.id)
        this.films = [...this.films, data]
        this.toggleModal()
      } else {
        alert('Error Adding Film')
      }
    },
    async addFilm(film) {
      const response = await fetch('api/films', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })

      const data = await response.json()
      // response.status === 201 ? (this.films = [...this.films, data]) : alert('Error Adding Film')
      // this.toggleModal()
      if (response.status === 201) {
        this.films = [...this.films, data]
        this.toggleModal()
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
    }
  }
}
</script>

