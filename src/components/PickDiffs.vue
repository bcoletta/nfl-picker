<template>
  <v-data-table :headers="headers" :items="items"></v-data-table>
</template>

<script>
export default {
  name: 'PickDiffs',
  props: {
    games: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data: () => ({
    headers: [
      { text: 'Basic', value: 'basicPct' },
      { text: 'Basic Top 7', value: 'basicTop7' },
      { text: 'Basic Bottom', value: 'basicBottom' },
      { text: 'Advanced', value: 'advancedPct' },
      { text: 'Advanced Top 7', value: 'advancedTop7' },
      { text: 'Advanced Bottom', value: 'advancedBottom' },
    ],
  }),
  computed: {
    mappedGames() {
      return this.games.map(game => {
        let basicPickability = this.getBasic(game);
        return {
          home: game.home,
          away: game.away,
          winner: game.winner,
          basic: basicPickability,
          basicPick: this.getBasicPick(game, basicPickability),
          advanced: game.pickability,
          advancedPick: game.suggestedPick,
        }
      })
    },
    sortedAdvancedGames() {
      return [ ...this.mappedGames ].sort((a, b) => Math.abs(a.advanced) < Math.abs(b.advanced) ? 1 : -1);
    },
    advancedPct() {
      let filtered = this.sortedAdvancedGames.filter(game => game.advancedPick === game.winner);
      return (filtered.length * 100 / this.sortedAdvancedGames.length).toFixed(2);
    },
    top7AdvancedGames() {
      return [ ...this.sortedAdvancedGames ].splice(0, 7);
    },
    top7AdvancedPct() {
      let filtered = this.top7AdvancedGames.filter(game => game.advancedPick === game.winner);
      return (filtered.length * 100 / 7).toFixed(2);
    },
    bottomAdvancedGames() {
      return [ ...this.sortedAdvancedGames ].splice(7);
    },
    bottomAdvancedPct() {
      let filtered = this.bottomAdvancedGames.filter(game => game.advancedPick === game.winner);
      return (filtered.length * 100 / this.bottomAdvancedGames.length).toFixed(2);
    },
    sortedBasicGames() {
      return [ ...this.mappedGames ].sort((a, b) => Math.abs(a.basic) < Math.abs(b.basic) ? 1 : -1);
    },
    basicPct() {
      let filtered = this.sortedBasicGames.filter(game => game.basicPick === game.winner);
      return (filtered.length * 100 / this.sortedBasicGames.length).toFixed(2);
    },
    top7BasicGames() {
      return [ ...this.sortedBasicGames ].splice(0, 7);
    },
    top7BasicPct() {
      let filtered = this.top7BasicGames.filter(game => game.basicPick === game.winner);
      return (filtered.length * 100 / 7).toFixed(2);
    },
    bottomBasicGames() {
      return [ ...this.sortedBasicGames ].splice(7);
    },
    bottomBasicPct() {
      let filtered = this.bottomBasicGames.filter(game => game.basicPick === game.winner);
      return (filtered.length * 100 / this.bottomBasicGames.length).toFixed(2);
    },
    items() {
      return [ {
        basicPct: this.basicPct,
        basicTop7: this.top7BasicPct,
        basicBottom: this.bottomBasicPct,
        advancedPct: this.advancedPct,
        advancedTop7: this.top7AdvancedPct,
        advancedBottom: this.bottomAdvancedPct,
      } ]
    },
  },
  methods: {
    getBasic(game) {
      const { awayRank, homeRank, spread } = game;
      const rankDelta = awayRank - homeRank;
      return (rankDelta / spread).toFixed(2);
    },
    getBasicPick(game, pickability) {
      const { away, home, spread } = game;
      return spread * pickability > 0 ? home : away;
    },
  },
}
</script>

<style scoped>

</style>