import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyClfwAmeoxlCbDeJdcOQ82GLoDXOD9cxbk",
  authDomain: "quid-watchers.firebaseapp.com",
  databaseURL: "https://quid-watchers.firebaseio.com",
  projectId: "quid-watchers",
  storageBucket: "quid-watchers.appspot.com",
  messagingSenderId: "262384506668",
  appId: "1:262384506668:web:c4928b3844dbc1d8debe89"
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();

export default firebase;

export const createNewBudgetTracker = async (title) => {
  if(!title) return;

  const newBudgetTracker = await firestore.collection('budgetTrackers').add({
    title: title,
    hasAlreadyTutoed: false,
  });

  return newBudgetTracker.id;
}

export const setHasTutoed = async (userId) => {
  if(!userId) return false;

  try {
    await firestore.collection('budgetTrackers').doc(userId).update({
      hasAlreadyTutoed: true,
    })

    const userDoc = await firestore.collection('budgetTrackers').doc(userId).get();

    return userDoc.data();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getUser = async (userId) => {
  if(!userId) return false;

  try {
    const userDoc = await firestore.collection('budgetTrackers').doc(userId).get();

    return userDoc.data();
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const createNewMonthlySheet = async (userId, accountInformation) => {
  if(!accountInformation) return false;

  const dateSheet = new Date();
  const monthAndYear = accountInformation.month === undefined ? dateSheet.toLocaleString('default', { month: 'long', year: 'numeric' }) : accountInformation.month;
  const monthlyDocument = await firestore.collection('budgetTrackers').doc(userId).collection('monthlySheets').doc(monthAndYear).get();

  if(monthlyDocument.exists) {
    return monthlyDocument.data();
  }

  try {
    await firestore.collection('budgetTrackers').doc(userId).collection('monthlySheets').doc(monthAndYear).set({
      accountInformation
    })

    return true;
  } catch (error) {
    console.error(error);
    return false
  }
}


export const getAllMonthlySheets = async (userId) => {
  if(!userId) return false;
  try {
    const sheets = await firestore.collection('budgetTrackers').doc(userId).collection('monthlySheets').get();

    let sheetList = [];

    sheets.docs.forEach(sheet => {
      // let accountInfo = sheet.data().accountInformation;
      // accountInfo = {
      //   ...accountInfo, 
      //   id: sheet.id
      // }
      sheetList = [...sheetList, sheet.id];
    })

    return sheetList;
  } catch (error) {
    console.error(error);
  }
}

export const getOneMonthlySheet = async (userId, sheetId) => {
  if(!userId || !sheetId) return false;
  try {
    const sheet = await firestore.collection('budgetTrackers').doc(userId).collection('monthlySheets').doc(sheetId).get();

    let accountInfo = sheet.data().accountInformation;

    accountInfo = {
      ...accountInfo, 
      id: sheet.id
    }

    return accountInfo;
  } catch (error) {
    console.error(error);
  }
}