<template>
  <v-container>
    <v-data-table :headers="headers" :items="games" sort-by="pickability" sort-desc disable-pagination>
      <template v-slot:item.suggestedPick="{ item }">
        <v-chip :color="getColor(item)">{{ item.suggestedPick }}</v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <AddScore :item="item" @update="$emit('update')"/>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import AddScore from './AddScore';

export default {
  name: 'GamesList',
  props: {
    week: {
      type: Number,
      default: 1,
    },
    season: {
      type: Number,
      default: 2021,
    },
    games: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    AddScore,
  },
  data: () => ({
    editing: false,
    editingItem: {},
    headers: [
      { text: 'Away Team', value: 'away' },
      { text: 'Away Rank', value: 'awayRank' },
      { text: 'Home Team', value: 'home' },
      { text: 'Home Rank', value: 'homeRank' },
      { text: 'Spread', value: 'spread' },
      { text: 'Pickability', value: 'pickability', sort: (a, b) => Math.abs(a) > Math.abs(b) ? 1 : -1 },
      { text: 'Suggested Pick', value: 'suggestedPick' },
      { text: 'Score', value: 'score' },
      { text: 'Winner', value: 'winner' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  methods: {
    getColor(item) {
      if (item.winner === 'N/A') return '';
      return item.winner === item.suggestedPick ? 'green' : 'red';
    },
  },
}
</script>

<style scoped>
table, th, td {
  border: 1px solid black;
}
</style>
