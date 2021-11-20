<template>
  <v-container>
    <SeasonWeekSelect @change="updateSeasonWeek" />
    <v-row>
      <v-col cols="6" lg="3">
        <AddRankings />
      </v-col>
      <v-col cols="6" lg="3">
        <AddGames @update="get" />
      </v-col>
      <v-col cols="6" lg="3">
        <CalculateTiebreaker />
      </v-col>
    </v-row>
    <GamesList :season="season" :week="week" :games="games" @update="get" />
    <PickDiffs :games="games" />
  </v-container>
</template>

<script>
import { getGames } from '@/services/api-service';
import AddGames from '../components/AddGames';
import AddRankings from '../components/AddRankings';
import CalculateTiebreaker from '../components/CalculateTiebreaker';
import GamesList from '@/components/GamesList.vue';
import PickDiffs from '../components/PickDiffs';
import SeasonWeekSelect from '../components/SeasonWeekSelect';

export default {
  name: 'Games',
  components: {
    AddGames,
    AddRankings,
    CalculateTiebreaker,
    GamesList,
    PickDiffs,
    SeasonWeekSelect,
  },
  data: () => ({
    season: 2021,
    week: 1,
    games: [],
  }),
  methods: {
    get() {
      return getGames({ season: this.season, week: this.week }).then(games => {
        this.games = games.map(game => {
          let pickability = this.getPickability(game);
          return {
            ...game,
            pickability,
            score: game.score || 'N/A',
            spread: this.getSpread(game.spread),
            suggestedPick: this.getSuggestedPick(game, pickability),
            winner: this.getWinner(game),
          }
        })
      });
    },
    getSpread(spread) {
      return spread > 0 ? `+${spread}` : spread;
    },
    getWinner(game) {
      const { away, home, spread, score } = game;
      if (!score) return 'N/A';
      let scores = score.split('|');
      let actualSpread = scores[0] - scores[1];
      return actualSpread > spread ? away : home;
    },
    getPickability(game) {
      const { awayRank, homeRank, spread } = game;
      const rankDelta = awayRank - homeRank;
      const multiplier = Math.abs(rankDelta) < 1 ? -1 : 1;
      return ((Math.abs(rankDelta) > Math.abs(spread) ? rankDelta / spread : spread / rankDelta) * multiplier).toFixed(2);
    },
    getSuggestedPick(game, pickability) {
      const { away, home, spread } = game;
      return spread * pickability > 0 ? home : away;
    },
    updateSeasonWeek(val) {
      this.season = val.season;
      this.week = val.week;
      this.get();
    },
  },
  mounted() {
    this.get();
  },
}
</script>

<style scoped>

</style>