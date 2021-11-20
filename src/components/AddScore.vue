<template>
  <v-dialog v-model="isOpen">
    <template v-slot:activator="{ on, attrs }">
      <v-icon small class="mr-2" v-bind="attrs" v-on="on">mdi-pencil</v-icon>
    </template>
    <v-card>
      <v-card-title>Edit Score</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="update">
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="away" :label="item.away" autofocus></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="home" :label="item.home"></v-text-field>
            </v-col>
          </v-row>
          <button type="submit" class="d-none">Submit</button>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="update">Submit</v-btn>
        <v-btn @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { updateGame } from '@/services/api-service';

export default {
  name: 'AddScore',
  props: {
    item: {
      type: Object,
    },
  },
  data: () => ({
    isOpen: false,
    away: '',
    home: '',
  }),
  methods: {
    close() {
      this.isOpen = false;
    },
    update() {
      let score = `${this.away}|${this.home}`;
      let payload = {
        season: this.item.season,
        week: this.item.week,
        away: this.item.away,
        home: this.item.home,
        payload: {
          score,
        },
      };
      return updateGame(payload).then(() => {
        this.$emit('update');
        this.close();
      });
    },
  },
}
</script>
