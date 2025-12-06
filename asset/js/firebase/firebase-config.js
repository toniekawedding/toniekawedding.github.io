// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBiDILlr6bMn4JnAxUpUgDDiOpOCYSGBbc",
  authDomain: "wedding-toni-eka.firebaseapp.com",
  databaseURL: "https://wedding-toni-eka-default-rtdb.firebaseio.com",
  projectId: "wedding-toni-eka",
  storageBucket: "wedding-toni-eka.appspot.com",
  messagingSenderId: "586714033422",
  appId: "1:586714033422:web:b20e36a00fc224c7dcbb5f",
  measurementId: "G-9WSL5ZV8Q1",
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Shortcuts
window.db = firebase.database();

window.refDB = function (path) {
  return firebase.database().ref(path);
};

window.pushDB = function (path, data) {
  return firebase.database().ref(path).push(data);
};

window.onValueDB = function (path, callback) {
  firebase.database().ref(path).on("value", callback);
};
