<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>ボード追加</h1>
      </v-flex>
      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="board.board_name"
                label="名前"
              ></v-text-field>
              <div class="text-center">
                <v-btn color="info" class="ml-2" @click="createNewBoard"
                  >作成</v-btn
                >
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      board: {},
    };
  },
  methods: {
    createNewBoard() {
      this.addBoard(this.board);
      // this.$router.push({ name: "home" });
      this.board = {};
    },
    ...mapActions(["addBoard"]),
  },
};
</script>
