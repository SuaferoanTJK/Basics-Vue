<script>
export default {
  props: {
    title: String,
    start: {
      type: Number,
      default: 100,
      validator(value) {
        return value > 0 ? true : false;
      },
    },
  },
  name: "Counter",
  data() {
    return {
      counter: this.start,
      exp: 3,
    };
  },
  methods: {
    increase() {
      this.counter++;
    },
    decrease() {
      this.counter--;
    },
  },
  computed: {
    squareCounted() {
      return Math.pow(this.counter, this.exp);
    },
    customTitle() {
      return this.title ? this.title : "Counter";
    },
  },
};
</script>

<template>
  <img class="w-80" src="../assets/logo.png" alt="Vue logo" />
  <h2 data-test="title" class="text-3xl font-bold text-white">
    {{ customTitle }}
  </h2>
  <p data-test="counter" class="text-xl text-white">
    {{ counter }} <sup>{{ exp }}</sup> = {{ squareCounted }}
  </p>
  <div class="flex gap-2 mt-2">
    <button
      @click="decrease"
      class="rounded bg-slate-300 hover:bg-slate-400 p-2"
    >
      Decrease
    </button>
    <button
      @click="increase"
      class="rounded bg-slate-300 hover:bg-slate-400 p-2"
    >
      Increase
    </button>
  </div>
</template>
