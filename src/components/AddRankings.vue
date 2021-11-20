<template>
  <v-dialog v-model="isOpen">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Add Power Rankings</v-btn>
    </template>
    <v-card>
      <v-card-title>Calculate Rankings</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="add">
          <SeasonWeekSelect @change="updateSeasonWeek" />
          <v-file-input label="Upload JSON" @change="uploadFile"/>
          <v-btn type="submit" color="primary">Calculate</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { addRankings } from '../services/api-service';
import SeasonWeekSelect from './SeasonWeekSelect';

export default {
  name: 'AddRankings',
  components: {
    SeasonWeekSelect,
  },
  data: () => ({
    isOpen: false,
    season: 2021,
    week: 1,
    teamJSON: null,
  }),
  computed: {
    payload() {
      if (!this.teamJSON || this.teamJSON.length === 0) return null;
      let teams = this.teamJSON.map(team => ({
        name: team.abbrev,
        rank: team.rank,
      }));

      return {
        season: this.season,
        week: this.week,
        teams,
      };
    },
  },
  methods: {
    add() {
      return addRankings(this.payload).then(() => {
        this.isOpen = false;
      });
    },
    updateSeasonWeek(val) {
      this.season = val.season;
      this.week = val.week;
    },
    uploadFile(file) {
      let reader = new FileReader();
      reader.onload = () => {
        this.teamJSON = JSON.parse(reader.result);
      }
      reader.readAsText(file);
    },
  },
}
</script>

<style scoped>

</style>