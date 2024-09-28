<template>
  <div class="counter">
    {{ (counter / 1000).toFixed(1) }} seconds
    <span v-if="games !== 0">- avg {{ ((counter / games) / 1000).toFixed(1) }} sec</span>
  </div>
  <div class="errors" :class="{ shake: shakeDisabled }">{{ error }}</div>
  <div class="answer">{{ taskList }}</div>
  <div class="wrapper">
    <TheSwitch v-for="n in nList" :key="n" :n="n" :on="switchList[n]" @handle-switch="onHandleSwitch(n)" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import TheSwitch from "../components/TheSwitch.vue"
export default {
  props: {
    max: Number,
  },
  setup(props) {
    const shakeDisabled = ref(true)
    const games = ref(0)
    const max = (+props.max - props.max == 0) ? +props.max : 6
    const taskList = ref([])
    const time = ref(0)
    function initTaskList() {
      time.value = performance.now()
      initList(taskList, initialList.toSorted((a, b) => Math.random() > 0.5 ? 1 : -1))
    }

    const nList = ref([])
    const initialList = Array(max).fill(0).map((e, i) => (i))
    function initList(arr, list) {
      arr.value = list
    }


    const error = ref("Turn first Switch")
    const errors = { "incorrect": "Incorrect switch, try again", "endGame": "Perfect! Another game. Turn!" }

    const counter = ref(0)
    const nID = ref(0)
    function onHandleSwitch(n) {
      turnSwitch(n, true)
      setTimeout(() => {
        if ((n) !== taskList.value[nID.value]) {
          error.value = errors.incorrect
          turnSwitch(n, false)
        } else {
          nID.value += 1
          counter.value += performance.now() - time.value
          time.value = performance.now()
          //TODO shake error
          error.value = "Turn next Switch"
          turnSwitch(n, true)
        }
        if (nID.value === (taskList.value.length)) {
          error.value = errors.endGame
          shakeDisabled.value = true
          setTimeout(() => {
            shakeDisabled.value = false
          }, 1500)
          initList(nList, initialList)
          initList(switchList, Array(max).fill(false))
          nID.value = 0
          initTaskList()
          games.value += 1
        }
      }, 250)

    }

    const switchList = ref(Array(max).fill(false))
    function turnSwitch(n, state) {
      switchList.value[n] = state
    }

    onMounted(() => {
      initList(nList, initialList)
      initTaskList()
    })

    return { shakeDisabled, max, games, taskList, nList, initList, initialList, counter, onHandleSwitch, error, switchList }
  }
  ,
  components: { TheSwitch }
}
</script>

<style>
.wrapper {
  grid-template-rows: repeat(calc(v-bind(max)/2), minmax(0, 1fr));
  @apply grid lg:grid-cols-1 gap-4 mt-6 grid-flow-col
}

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>