import axios from 'axios';

const instance = axios.create({
  baseURL: "https://burger-builder-76bee.firebaseio.com"
})

export default instance
