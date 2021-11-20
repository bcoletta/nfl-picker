<template>
  <v-dialog v-model="isOpen">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on">Calculate Tiebreaker</v-btn>
    </template>
    <v-card>
      <v-card-title>Calculate Tiebreaker</v-card-title>
      <v-card-text>
        <h4 class="text-h5 font-weight-bold">Tiebreaker: {{ tiebreaker }}</h4>

        <v-form @submit.prevent="() => {}">
          <v-text-field v-model="awayPF" type="number" label="Away PF" autofocus></v-text-field>
          <v-text-field v-model="awayPA" type="number" label="Away PA"></v-text-field>
          <v-text-field v-model="homePF" type="number" label="Home PF"></v-text-field>
          <v-text-field v-model="homePA" type="number" label="Home PA"></v-text-field>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'CalculateTiebreaker',
  data: () => ({
    isOpen: false,
    awayPF: 0,
    awayPA: 0,
    homePF: 0,
    homePA: 0,
  }),
  computed: {
    tiebreaker() {
      return this.average(this.awayPF, this.homePA) + this.average(this.awayPA, this.homePF);
    },
  },
  methods: {
    average(n1, n2) {
      return (parseFloat(n1) + parseFloat(n2)) / 2;
    },
  },
}
</script>

<style scoped>

</style>