<template>
  <v-container class="d-flex flex-no-wrap justify-space-between">
    <v-card max-width="400" class="mx-auto">
      <v-app-bar dark color="warning">
        <v-toolbar-title>List1</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container>
        <v-row dense>
          <draggable :list="items">
            <v-col v-for="(item, i) in items" :key="i" cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.date"></v-card-subtitle>
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
        </v-row>
      </v-container>
    </v-card>

    <v-card max-width="400" class="mx-auto">
      <v-app-bar dark color="warning">
        <v-toolbar-title>List2</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container>
        <v-row dense>
          <draggable :list="dones">
            <v-col v-for="(item, i) in dones" :key="i" cols="12">
              <v-card>
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div>
                    <v-card-title
                      class="headline"
                      v-text="item.title"
                    ></v-card-title>

                    <v-card-subtitle v-text="item.date"></v-card-subtitle>
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
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  data: () => ({
    items: [
      {
        title: "Vuexの勉強",
        date: "2020/09/08",
      },
      {
        title: "REST API",
        date: "2020/09/09",
      },
    ],
    dones: [
      {
        title: "HTMLの勉強",
        date: "2020/09/01",
      },
      {
        title: "買い物",
        date: "2020/09/02",
      },
    ],
  }),
};
</script>
