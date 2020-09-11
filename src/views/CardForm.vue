<template>
  <v-container text-xs-center>
    <!-- カード追加 -->
    <v-text-field
      v-model="tile.cards.name"
      label="+ カードを追加"
      outlined
      required
      color="green"
      @keydown.enter="addCard(tile.name)"
    ></v-text-field>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      card: [],
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("addCard", this.card);
      this.$router.push({ name: "home" });
      this.card = [];
    },
  },
};
</script>
