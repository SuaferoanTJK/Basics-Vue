<script>
export default {
  name: "Indecision",
  data() {
    return {
      question: null,
      answer: null,
      isValidQuestion: false,
    };
  },
  methods: {
    async getAnswer() {
      try {
        this.answer = "Thinking...";
        const { answer } = await fetch("https://yesno.wtf/api").then(
          (response) => response.json()
        );
        this.answer = answer;
      } catch (error) {
        this.answer = "The API couldn't be loaded";
      }
    },
  },
  watch: {
    question(value) {
      this.isValidQuestion = false;
      if (!value.includes("?")) return;
      this.isValidQuestion = true;
      this.getAnswer();
    },
  },
};
</script>

<template>
  <div class="w-full md:w-1/2 mx-auto mb-5">
    <div class="flex justify-center">
      <img src="../assets/FortuneTeller.png" alt="FT" class="w-80" />
    </div>
    <div class="flex flex-col space-y-10">
      <div class="space-y-2">
        <label for="question" class="font-bold text-white">Question</label>
        <input
          id="question"
          type="text"
          placeholder="Ask me anything"
          v-model="question"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-gray-300 focus:shadow-none"
        />
        <p class="text-sm text-white">End with the question mark (?)</p>
      </div>
      <div
        v-show="isValidQuestion"
        class="text-center text-4xl space-y-5 font-semibold"
      >
        <h1 class="relative top-0 left-0 capitalize text-9xl text-white">
          {{ answer }}
        </h1>
      </div>
    </div>
  </div>
</template>
