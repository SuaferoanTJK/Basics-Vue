<script>
import Counter from "./components/Counter.vue";
import Indecision from "./components/Indecision.vue";

export default {
  name: "App",
  components: {
    Counter,
    Indecision,
  },
  data() {
    return {
      view: "Indecision",
    };
  },
  methods: {
    viewCounter() {
      this.view = "Counter";
    },
    viewIndecision() {
      this.view = "Indecision";
    },
  },
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center bg-slate-600">
    <div class="ml-2 flex gap-1 absolute top-1 left-1">
      <button @click="viewIndecision" class="text-white hover:underline p-2">
        Indecision
      </button>
      <button @click="viewCounter" class="text-white hover:underline p-2">
        <p>Counter</p>
      </button>
    </div>
    <div class="flex flex-col items-center px-4">
      <Indecision v-if="view === 'Indecision'" />
      <Counter :start="15" v-if="view === 'Counter'" />
    </div>
  </div>
</template>
