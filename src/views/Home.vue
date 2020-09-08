<template>
  <v-container>
    <h2>Your board list</h2>
    <router-link
      :to="{
        name: 'board',
        params: { slug: board.board_name },
      }"
    >
    <h2>{{ board.board_name }}</h2>
    </router-link>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      board: null,
    };
  },
  created() {
    this.board = this.$store.state.board;
  },
};
</script>
