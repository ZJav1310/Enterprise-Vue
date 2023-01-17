<template>
  <div class="modal-content" v-if="modalOpen">
    <div class="modal modal-sheet position-static d-block py-5" tabindex="-1" role="dialog" id="modalSheet">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0">
            <h1 class="modal-title fs-5"></h1>
            <button @click="onClick()" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body py-0">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      modalOpen: true,
    }
  },
  methods: {
    onClick() {
      this.modalOpen = false
      this.$emit('toggle-modal')
    }
  }
}
</script>
