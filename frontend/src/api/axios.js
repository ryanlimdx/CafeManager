import axios from 'axios';

 export default axios.create({
  baseURL: 'https://cafemanager-zgjk.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});
