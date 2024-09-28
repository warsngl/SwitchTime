<template>
  <label for="inputMax">Switch:</label>
  <input id="inputMax" type="number" placeholder="Max Switches count" v-model="maxSwitches"
    @keydown.enter="router.push('/' + maxSwitches)">
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    const maxSwitches = ref(6)
    return { maxSwitches, router }
  },
}
</script>

<style scoped>
input {
  @apply text-black w-14 pl-1 rounded-md
}
label {
  @apply mb-2
}
</style>