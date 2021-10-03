<template>
  <v-dialog width="50%" v-model="isOpen" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Add Games</v-btn>
    </template>
    <v-card>
      <v-card-title>Add Games</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="add">
          <SeasonWeekSelect @change="updateSeasonWeek" />
          <v-row v-for="(game, i) in games" :key="`game-${i}`">
            <v-col cols="4">
              <v-text-field v-model="game.away" label="Away" outlined></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field v-model="game.home" label="Home" outlined></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field v-model="game.spread" type="number" label="Spread" outlined></v-text-field>
            </v-col>
            <v-col cols="1" v-if="i > 0">
              <v-btn color="red" @click="removeRow(i)">
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-btn @click="addRow" class="mr-2">Add Row</v-btn>
            <v-btn type="submit" color="primary">Add</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import SeasonWeekSelect from './SeasonWeekSelect';
import { addGames } from '../services/api-service';

export default {
  name: 'AddGames',
  components: {
    SeasonWeekSelect,
  },
  data: () => ({
    isOpen: false,
    games: [
      { away: '', home: '', spread: 0 },
    ],
    season: 2021,
    week: 1,
  }),
  computed: {
    payload() {
      return { season: this.season, week: this.week, games: this.games };
    },
  },
  methods: {
    add() {
      return addGames(this.payload).then(() => {
        this.isOpen = false;
        this.$emit('update');
      });
    },
    addRow() {
      this.games.push({ away: '', home: '', spread: 0 });
    },
    removeRow(index) {
      this.games.splice(index, 1);
    },
    updateSeasonWeek(val) {
      this.season = val.season;
      this.week = val.week;
    }
  },
}
</script>
