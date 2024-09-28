<template>
  <label class="inline-flex items-center cursor-pointer">
    <input type="checkbox" :value="on" :checked="on" class="sr-only peer" @click="onHandleSwitch">
    <div
      class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
    </div>
    <span class="ms-3 text-sm font-medium">{{ n }}</span>
  </label>

</template>

<script>
export default {
  props: {
    n: Number,
    on:Boolean
  },
  emits: ['handle-switch',],
  setup(props, { emit }) {
    function onHandleSwitch() {
      emit('handle-switch', props.n)
    }
    return { onHandleSwitch }
  },
}
</script>