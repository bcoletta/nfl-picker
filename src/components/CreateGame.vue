<template>
  <v-form @submit.prevent="createGame">
    <input type="text" v-model="away_team" placeholder="Away Team">
    <input type="text" v-model="home_team" placeholder="Home Team">
    <input type="number" v-model="spread" placeholder="Spread">
    <button type="submit">Create</button>
  </v-form>
</template>

<script>

export default {
  name: 'CreateGame',
  data: () => ({
    away_team: '',
    home_team: '',
    spread: 0,
  }),
  methods: {
    createGame() {
      console.log('test');
    },
  },
}
</script>
