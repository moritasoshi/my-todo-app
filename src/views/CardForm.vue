<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12 class="text-center">
        <h1>カード追加</h1>
      </v-flex>
      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="card.name" label="名前"></v-text-field>
              <v-text-field v-model="card.date" label="期限"></v-text-field>
              <div class="text-center">
                <v-btn @click="$router.push({ name: 'todo' })"
                  >キャンセル</v-btn
                >
                <v-btn color="info" class="ml-2" @click="submit">保存</v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
      this.$router.push({ name: "todo" });
      this.address = [];
    },
  },
};
</script>
