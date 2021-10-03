import axios from 'axios';

const BASEURL = 'https://hzvasvr1a7.execute-api.us-east-2.amazonaws.com/dev';

export const getGames = ({ season, week }) => {
  let url = `${BASEURL}/games?season=${season}&week=${week}`;
  return axios.get(url).then(res => res.data);
};

export const updateGame = (payload) => {
  return axios.post(`${BASEURL}/games`, payload).then(res => {
    console.log(res);
  });
};

export const addGames = (payload) => {
  return axios.put(`${BASEURL}/games`, payload);
};

export const addRankings = (payload) => {
  return axios.put(`${BASEURL}/rankings`, payload).then(res => {
    console.log(res);
  })
};