<template>

  <div class="container">

    <Header @toggle-insert="toggleInsert" title='Film' :showAdd="showAdd" v-model:search-bar="search" />


    <div class="btn-group p-1" role="group" aria-label="return format">
      <button type="button" class="btn btn-outline-primary" @click="requestedFormat('application/json')">JSON</button>
      <button type="button" class="btn btn-outline-primary" @click="requestedFormat('application/xml')">XML</button>
    </div>

    <div class="btn-group p-1" role="group" aria-label="Search bar format">
      <button type="button" class="btn btn-primary" @click="setSearchType('title')">Title</button>
      <button type="button" class="btn btn-primary" @click="setSearchType('stars')">Stars</button>
      <button type="button" class="btn btn-primary" @click="setSearchType('director')">Director</button>
    </div>
    <div>
      <Films @toggle-update="toggleUpdate" @delete-film="deleteFilm" :films="filteredList" @click="showModal = true" />
    </div>
  </div>

  <!-- Modal that will contain the form, this can be changed to a component -->
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

const { XMLParser, /*XMLBuilder*/ } = require("fast-xml-parser");

export default {
  name: 'App',
  components: {
    Header,
    Films,
    FormComponent,
  },
  data() {
    return {
      // promisedItems: [],
      films: [],
      showAdd: false,
      showUpdate: false,
      showModal: true,
      formText: '',
      id: '',
      incFilm: String,
      search: '',
      formatSet: '',
      searchRequest: 'title',
    }
  },
  async created() {
    this.films = await this.fetchFilms()
  },
  // TODO:  This does not handle if I add a new record since issues with waiting for the item from API
  //        Instead of using fetch and await on its own, I could await into variable? once that is done
  //        then do whatever it is needing to be done? have an array of promised items and then an array
  //        of completed items.
  computed: {
    filteredList() {
      var filter;
      if (this.searchRequest === 'title') {
        filter = this.films.filter(film => {
          return film.title.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      if (this.searchRequest === 'stars') {
        filter = this.films.filter(film => {
          return film.stars.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      if (this.searchRequest === 'director') {
        filter = this.films.filter(film => {
          return film.director.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return filter
    },
  },
  methods: {
    async requestedFormat(format) {
      this.formatSet = format
      this.films = await this.fetchFilms()
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
      //console.log(this.id)
      //console.log("incoming film in toggleUpdate:", this.incFilm)
    },
    setSearchType(input) {
      this.searchRequest = input
      console.log("Search type", input)
    },
    reloadPage() {
      window.location.reload();
    },
    async deleteFilm(id) {
      console.log(id)
      if (confirm('Are you sure?')) {
        const response = await fetch(`/FilmAPIServlet?id=${id}`, {
          method: 'DELETE',
        })
        response.status === 200 ?
          (this.films = this.films.filter((film) => film.id !== id)) :
          alert('Error deleting film')
      }
    },
    async updateFilm(film) {
      // var x = this.builderXml(film)
      // var y = this.parseXml(x)

      // console.log(y)
      // film = y
      const response = await fetch(`/FilmAPIServlet`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })

      const data = await response.json()
      console.log("check", data)

      if (response.status === 200) {
        this.films = this.films.filter((film) => film.id !== this.id)
        // this.films = [...this.films, film]
        this.films = [film, ...this.films]
        console.log("Updated film in UpdateFilm:", film)
        // this.incFilm = null
      } else {
        alert('Error Adding Film')
      }
    },
    async addFilm(film) {
      console.log("addFilm:", film)
      const response = await fetch('/FilmAPIServlet', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(film)
      })

      const data = await response.json()

      const p = Promise.resolve(data);
      p.then((v) => {
        console.log("-addfilm-", v);
      });
      console.log("what is this in add film", p)

      if (response.status === 201) {
        this.films = [...this.films, film]

        // Need to force refresh to return the new id of this record
        this.reloadPage()
        alert('Film added')
      } else {
        alert('Error Adding Film')
      }

    },
    async fetchFilms() {
      // const response = await fetch(`/FilmAPIServlet`)
      // if (response.status === 200) {
      //   const data = await response.json
      //   const p = Promise.resolve(data);
      //   p.then((v) => {
      //     console.log("All films from fetchFilms", v);
      //   });
      //   return p
      // }
      var data;

      if (this.formatSet === "application/json") {
        data = this.fetchFromJson()
      }
      else if (this.formatSet === "application/xml") {
        data = this.fetchFromXml()
      } else (
        //Default
        data = this.fetchFromJson()
      )
      return data
    },
    async fetchFilm(id) {
      const response = await fetch(`/FilmAPIServlet?id=${id}`)
      const data = await response.json()
      return data
    },
    getFilm(id) {
      return this.films.find(film => film.id == id)
    },
    async fetchFromXml() {
      const parser = new XMLParser();
      var output = await fetch(`/FilmAPIServlet`, {
        method: 'GET',
        headers: {
          'Accept': 'application/xml',
        },
      }).then((response) => response.text())
        .then((data) => (parser.parse(data)["Models.Film-array"]["Models.Film"]))

      console.log("Fetched from XML", output)
      return output
    },
    async fetchFromJson() {
      const response = await fetch(`/FilmAPIServlet`)
      const data = await response.json()
      console.log("Fetched from JSON", data)
      return data
    },
  }
}
</script>

