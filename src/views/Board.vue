<template>
  <v-app>
    <h2>{{ board.board_name }}</h2>

    <v-container class="d-flex">
      <v-card
        max-width="260"
        class="mx-1"
        v-for="(tile, index) in board.tiles"
        :key="index"
      >
        <v-app-bar dark color="cyan" dense>
          <v-toolbar-title>{{ tile.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn icon @click="addCard">
            <v-icon>mdi-plus</v-icon>
          </v-btn> -->
        </v-app-bar>
        <v-container>
          <draggable group="all-tasks" :list="tile.cards">
            <v-card
              v-for="(card, i) in tile.cards"
              :key="i"
              width="220"
              hover
              link
              class="d-flex my-card"
            >
              <v-card-text color="black" v-text="card.name"></v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </draggable>
          <v-btn text color="grey" @click="addCard">
            <v-icon>mdi-plus</v-icon>
            カードを追加
          </v-btn>
        </v-container>
      </v-card>
      <v-card width="260" height="50" outlined>
        <v-app-bar dark color="white" dense flat>
          <v-btn text @click="addTile" color="cyan">
            <v-icon>mdi-plus</v-icon>リストを追加
          </v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  data() {
    return {};
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  computed: {
    board() {
      return this.$store.state.boards.find(
        (board) => board.board_name === this.slug
      );
    },
  },
  methods: {
    addCard() {},
    addTile() {},
  },
};
</script>

<style scoped>
.my-card {
  margin: 10px 0;
}
</style>
