<template>
  <v-container>
    <h2>{{ board.title }}</h2>

    <v-container class="d-flex justify-space-between">
      <v-card
        min-width="300"
        max-width="400"
        class="mx-auto"
        v-for="(tile, index) in board.tiles"
        :key="index"
      >
        <v-app-bar dark color="cyan" dense>
          <v-toolbar-title>{{ tile.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addCard">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>
        <v-container>
          <draggable group="all-tasks" :list="tile.cards">
            <v-col v-for="(card, i) in tile.cards" :key="i" cols="12">
              <v-card width="250" height="70" hover link>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-text v-text="card.name"></v-card-text>
                  </div>
                  <div>
                    <v-btn icon>
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn icon>
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </div>
                </div>
              </v-card>
            </v-col>
          </draggable>
        </v-container>
      </v-card>
    </v-container>
  </v-container>
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
};
</script>

<style scoped></style>
