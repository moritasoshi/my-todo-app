<template>
  <v-container>
    <h2>Your boards</h2>
    <v-container class="d-flex">
      <v-card
        v-for="(board, index) in boards"
        :key="index"
        :to="{
          name: 'board',
          params: { slug: board.board_name },
        }"
        class="ma-2"
        width="200"
        height="125"
        hover
        dark
        link
        color="cyan lighten-2"
      >
        <v-card-title v-text="board.board_name"></v-card-title>
      </v-card>
    </v-container>
    <h2>Create a new board</h2>
    <v-container>
      <v-flex xs4 mt-5>
        <v-card height="125">
          <v-card-text>
            <v-form>
              <v-text-field
                outlined
                required
                v-model="newBoard.board_name"
                label="ボードタイトルを追加"
                color="grey"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-container>
    <v-container>
      <v-btn
        :disabled="
          this.newBoard.board_name == null || this.newBoard.board_name == ''
        "
        color="green lighten-2"
        dark
        class="ml-2"
        @click="createNewBoard"
        >新しいボードを作成</v-btn
      >
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      newBoard: {
        board_name: null,
        tiles: [],
      },
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
  },
  methods: {
    createNewBoard() {
      this.addBoard(this.newBoard);
      // 初期化
      this.newBoard = {
        board_name: null,
        tiles: [],
      };
    },
    ...mapActions(["addBoard"]),
  },
};
</script>
