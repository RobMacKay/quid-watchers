import axios from 'axios';

export const createNewBudgetTracker = async (title) => {
  const result = await axios.post(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets`,
    {
      title: title,
    }
  );

  if (result.status === 200) {
    return result.data['_id'];
  } else if (result.status === 404) {
    console.error(result.statusText);
    return false;
  }
};

export const getUser = async (userId) => {
  const result = await axios.get(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets/${userId}`
  );

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false;
  }
};

export const getAllMonthlySheets = async (userId) => {
  const result = await axios.get(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets/${userId}/all-sheets`
  );

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false;
  }
};

export const setHasTutoed = async (userId) => {
  const result = await axios.put(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets/${userId}/set-tutoed`
  );

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false;
  }
};

export const addSpending = async (userId, month, category, amount) => {
  const result = await axios.put(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets/${userId}/spendings`,
    {
      month: month,
      category: category,
      amount: amount,
    }
  );

  if (result.status === 200) {
    return result.data;
  } else {
    console.error(result);
    return false;
  }
};

export const createNewMonthlySheet = async (userId, accountInformation) => {
  const {
    month,
    categories,
    debts,
    netIncome,
    netMinusOverspent,
    overspentLastMonth,
    savings,
    totalDistributed,
  } = accountInformation;

  const result = await axios.put(
    `https://quid-watchers-api-6dz7f.ondigitalocean.app/api/monthly-sheets/${userId}/`,
    {
      month,
      categories,
      debts,
      netIncome,
      netMinusOverspent,
      overspentLastMonth,
      savings,
      totalDistributed,
    }
  );

  if (result.status === 200) {
    return result;
  } else {
    console.error(result);
    return false;
  }
};
