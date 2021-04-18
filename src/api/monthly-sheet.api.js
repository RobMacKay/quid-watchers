import axios from 'axios';

export const createNewBudgetTracker = async (title) => {
  const result = await axios.post(`http://localhost:5000/api/monthly-sheets`, {
    title: title
  });

  if (result.status === 200) {
    return result.data['_id'];
  } else if (result.status === 404) {
    console.error(result.statusText);
    return false;
  }
}

export const getUser = async (userId) => {
  const result = await axios.get(`http://localhost:5000/api/monthly-sheets/${userId}`);

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false
  }
}

export const setHasTutoed = async (userId) => {
  const result = await axios.put(`http://localhost:5000/api/monthly-sheets/${userId}/set-tutoed`);

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false
  }
}