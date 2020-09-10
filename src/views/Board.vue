<template>
  <v-app>
    <h2>{{ board.board_name }}</h2>

    <!-- 既存ボード -->
    <v-container class="d-flex">
      <v-card
        width="230"
        class="mx-1"
        v-for="(tile, index) in board.tiles"
        :key="index"
      >
        <v-app-bar dark color="cyan" dense>
          <v-toolbar-title>{{ tile.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
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

          <!-- カード追加 -->
          <!-- <v-text-field
            v-model="tile.cards.name"
            label="+ カードを追加"
            outlined
            required
            color="green"
            @keydown.enter="addCard(tile.name)"
          ></v-text-field> -->
          <v-btn @click="addCard(tile.name)">Add</v-btn>
        </v-container>
      </v-card>

      <!-- ボード追加 -->
      <v-text-field
        @keydown.enter="addTile"
        v-model="newTile.name"
        label="+ リストを追加"
        outlined
        required
        color="green"
      ></v-text-field>
    </v-container>
    {{ this.board }}
  </v-app>
</template>

<script>
import Draggable from "vuedraggable";
import { mapActions } from "vuex";

export default {
  components: {
    Draggable,
  },
  data() {
    return {
      board: {},
      newTile: {
        name: null,
        cards: [],
      },
      newCard: {
        name: "new card",
      },
    };
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  created() {
    this.board = this.$store.state.boards.find(
      (board) => board.board_name === this.slug
    );
  },
  methods: {
    addCard(tileName) {
      this.board.tiles
        .find((tile) => tile.name === tileName)
        .cards.push(this.newCard);
      this.updateBoard(this.board);
    },
    addTile() {
      this.board.tiles.push(this.newTile);
      this.updateBoard(this.board);
      this.newTile = {
        name: null,
        cards: [],
      };
    },
    ...mapActions(["updateBoard"]),
  },
};
</script>

<style scoped>
.my-card {
  margin: 10px 0;
}
.new-tile-title {
  font-size: 14px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
