<template>
  <div class="dropdown">
    {{title}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    },
    sortList: {
      type: Array,
      required: true
    },
    currentSortIndex: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
</style>
