<template>
  <div class="modal" >
  <div class="modal-content">
    <div class="modal modal-sheet position-static d-block py-5" tabindex="-1" role="dialog" id="modalSheet" ref="modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content rounded-4 shadow">
          <div class="modal-header border-bottom-0">
            <h1 class="modal-title fs-5"></h1>
            <button @click="onClick()" type="button" class="btn-close" data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body py-0">
            HELLO
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>

<script>
export default {
  name: "Modal",
  props:{
    modalId : String
  },
  methods: {
    onClick() {
      this.$emit('close-modal')
    }
  }
}
</script>
