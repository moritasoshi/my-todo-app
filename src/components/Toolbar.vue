<template>
  <v-app-bar app color="cyan darken-1" dark dense>
    <v-app-bar-nav-icon @click.stop="toggleSideMenu"></v-app-bar-nav-icon>
    <v-toolbar-items>
      <v-btn icon @click="toHome">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>

    <v-toolbar-title dark>
      My Board App
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="$store.state.login_user">
      <v-btn text @click="logout">ログアウト</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    toHome() {
      if (this.$router.currentRoute.name !== "home") {
        this.$router.push({ name: "home" }); // -> /
      }
    },
  },
};
</script>

<style></style>
