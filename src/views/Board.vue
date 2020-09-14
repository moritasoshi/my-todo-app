<template>
  <v-app>
    <v-container class="d-flex">
      <h2>{{ board.board_name }}</h2>

      <template>
        <v-btn color="green lighten-2" class="mx-5" icon @click="showBoard()">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <template>
        <v-btn icon @click="deleteThisBoard">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-spacer></v-spacer>
    </v-container>

    <!-- 既存ボード -->
    <v-container class="d-flex">
      <v-card
        width="230"
        class="mx-1"
        v-for="(tile, index) in board.tiles"
        :key="index"
      >
        <v-app-bar dark color="grey" dense>
          <v-toolbar-title>{{ tile.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <template>
            <v-btn
              color="white"
              class="ma-2"
              icon
              @click="
                showTile({
                  tileId: tile.id,
                  tileName: tile.name,
                })
              "
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template>
            <v-btn
              icon
              @click="
                deleteTile({
                  tileId: tile.id,
                })
              "
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-app-bar>
        <v-container>
          <draggable group="all-tasks" :list="tile.cards">
            <v-card
              v-for="(card, i) in tile.cards"
              :key="i"
              width="220"
              hover
              class="d-flex my-card"
            >
              <v-card-text color="black" v-text="card.name"></v-card-text>
              <v-card-actions>
                <template>
                  <v-btn
                    color="green lighten-2"
                    class="ma-2"
                    icon
                    @click="
                      showCard({
                        cardId: card.id,
                        cardName: card.name,
                        tileName: tile.name,
                      })
                    "
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <v-btn
                  icon
                  @click="
                    deleteCard({
                      tileId: tile.id,
                      cardId: card.id,
                    })
                  "
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </draggable>
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
        class="shrink"
      ></v-text-field>
    </v-container>

    <!-- トランジション関連 -->
    <!-- ボード名変更 -->
    <v-container v-show="boardShow">
      <v-text-field
        label="ボード名を入力"
        color="grey"
        v-model="targetBoardName"
      ></v-text-field>
      <v-btn color="green lighten-2" dark class="ml-2" @click="editBoard"
        >ボード名を変更</v-btn
      >
    </v-container>
    <!-- リスト名変更 -->
    <v-container v-show="tileShow">
      <v-text-field
        label="リスト名を入力"
        color="grey"
        v-model="targetTile.name"
      ></v-text-field>
      <v-btn color="green lighten-2" dark class="ml-2" @click="editTile"
        >リスト名を変更</v-btn
      >
    </v-container>
    <!-- カード名変更 -->
    <v-container v-show="cardShow">
      <v-text-field
        label="カード名を入力"
        color="grey"
        v-model="targetCard.name"
      ></v-text-field>
      <v-btn color="green lighten-2" dark class="ml-2" @click="editCard"
        >カード名を変更</v-btn
      >
    </v-container>
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
      tileShow: false,
      boardShow: false,
      cardShow: false,
      targetBoardName: "",
      targetTile: {
        id: "",
        name: "",
      },
      targetCard: {
        id: "",
        name: "",
        tileName: "",
      },

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

  computed: {
    board() {
      return this.$store.state.boards.find(
        (board) => board.board_name === this.slug
      );
    },
  },
  watch: {
    "board.tiles": {
      handler: function() {
        console.log("watched");
        this.$store.dispatch("updateBoard", this.board);
      },
      deep: true,
    },
  },
  methods: {
    showBoard() {
      this.boardShow = !this.boardShow;
    },
    showTile({ tileId, tileName }) {
      this.tileShow = !this.tileShow;
      this.targetTile.id = tileId;
      this.targetTile.name = tileName;
    },
    showCard({ cardId, cardName, tileName }) {
      this.cardShow = !this.cardShow;
      this.targetCard.id = cardId;
      this.targetCard.name = cardName;
      this.targetCard.tileName = tileName;
    },
    editBoard() {
      this.board.board_name = this.targetBoardName;
      this.updateBoard(this.board);
      this.$router.push({
        name: "board",
        params: { slug: this.targetBoardName },
      });
      this.targetBoardName = "";
      this.boardShow = false;
    },
    editTile() {
      this.board.tiles.find(
        (tile) => tile.id === this.targetTile.id
      ).name = this.targetTile.name;
      this.updateBoard(this.board);
      this.targetTile = {
        id: "",
        name: "",
      };
      this.tileShow = false;
    },
    editCard() {
      this.board.tiles
        .find((tile) => tile.name === this.targetCard.tileName)
        .cards.find(
          (card) => card.id === this.targetCard.id
        ).name = this.targetCard.name;
      this.updateBoard(this.board);
      this.targetCard = {
        id: "",
        name: "",
        tileName: "",
      };
      this.cardShow = false;
    },
    addCard(tileName) {
      this.newCard.id = this.uuid();
      this.board.tiles
        .find((tile) => tile.name === tileName)
        .cards.push(this.newCard);
      this.newCard = {
        name: "new card",
      };
      this.updateBoard(this.board);
    },
    addTile() {
      this.newTile.id = this.uuid();
      this.board.tiles.push(this.newTile);
      this.updateBoard(this.board);
      this.newTile = {
        name: null,
        cards: [],
      };
    },
    deleteThisBoard() {
      alert(
        this.board.board_name +
          " : 現在のボードを削除してもよろしいですか？\n※このリスト内の全てのリスト・カードも削除されます"
      );
      this.$store.dispatch("deleteBoard", this.board);
      this.$router.push({
        name: "home",
      });
    },
    deleteTile({ tileId }) {
      const tileIndex = this.board.tiles.findIndex(
        (tile) => tile.id === tileId
      );
      alert(
        this.board.tiles[tileIndex].name +
          " : このリストを削除してもよろしいですか？\n※このリスト内の全てのカードも削除されます"
      );
      this.board.tiles.splice(tileIndex, 1);
    },
    deleteCard({ tileId, cardId }) {
      const tileIndex = this.board.tiles.findIndex(
        (tile) => tile.id === tileId
      );
      const cardIndex = this.board.tiles[tileIndex].cards.findIndex(
        (card) => card.id === cardId
      );
      this.board.tiles[tileIndex].cards.splice(cardIndex, 1);
    },
    uuid() {
      return "xxxxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    ...mapActions(["updateBoard", "deleteBoard"]),
  },
};
</script>

<style scoped>
.my-card {
  margin: 10px 0;
}
</style>
