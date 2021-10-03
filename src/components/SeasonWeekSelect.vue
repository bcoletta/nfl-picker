<template>
  <v-row>
    <v-col cols="6" lg="2">
      <v-select v-model="season" :items="seasons" label="Season" @input="$emit('change', value)" outlined/>
    </v-col>
    <v-col cols="6" lg="2">
      <v-select v-model="week" :items="weeks" label="Week" @input="$emit('change', value)" outlined/>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'SeasonWeekSelect',
  data: () => ({
    seasons: [ 2021 ],
    season: 2021,
    weeks: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ],
    week: 1,
  }),
  computed: {
    value() {
      return { season: this.season, week: this.week };
    },
  },
}
</script>

<style scoped>

</style>