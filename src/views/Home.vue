<template>
  <v-container>
    <h2>Your board list</h2>
    <div v-for="(board, index) in boards" :key="index">
      <router-link
        :to="{
          name: 'board',
          params: { slug: board.board_name },
        }"
      >
        <h2>{{ board.board_name }}</h2>
      </router-link>
    </div>
    <BoardForm />
  </v-container>
</template>

<script>
import BoardForm from "@/components/BoardForm.vue";
export default {
  components: {
    BoardForm,
  },
  data() {
    return {};
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
};
</script>
