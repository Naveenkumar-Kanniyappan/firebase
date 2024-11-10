import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuOIcKy84KSUUF21iLiewzJ89OiBzHImY",
  authDomain: "fir-v1-441d8.firebaseapp.com",
  databaseURL: "https://fir-v1-441d8-default-rtdb.firebaseio.com",
  projectId: "fir-v1-441d8",
  storageBucket: "fir-v1-441d8.firebasestorage.app",
  messagingSenderId: "829137787494",
  appId: "1:829137787494:web:86ac29e18f13f932862ba7",
  measurementId: "G-TM3E11VR6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

// DOM elements
let fnameInp = document.getElementById('fnameInp');
let lnameInp = document.getElementById('lnameInp');
let deptInp = document.getElementById('deptInp');
let genderInp = document.getElementById('genderInp');
let cnicInp = document.getElementById('cnicInp');

let addBtn = document.getElementById('addBtn');
let retBtn = document.getElementById('retBtn');
let updBtn = document.getElementById('updBtn');
let delBtn = document.getElementById('delBtn');

// Function to add data
function addData() {
    set(ref(db, 'EmployeeSet/' + cnicInp.value), {
        nameofemployee: { firstname: fnameInp.value, lastname: lnameInp.value },
        department: deptInp.value,
        gender: genderInp.value, 
        cnic: Number(cnicInp.value)
    }).then(() => {
        alert("Data added successfully");
    }).catch((error) => {
        alert("Error adding data");
        console.error(error);
    });
}

// Function to retrieve data
function retData() {
    const dbRef = ref(db);
    get(child(dbRef, 'EmployeeSet/' + cnicInp.value)).then((snapshot) => {
        if (snapshot.exists()) {
            fnameInp.value = snapshot.val().nameofemployee.firstname;
            lnameInp.value = snapshot.val().nameofemployee.lastname;
            deptInp.value = snapshot.val().department;
            genderInp.value = snapshot.val().gender;
        } else {
            alert("Employee does not exist");
        }
    }).catch((error) => {
        alert("Error retrieving data");
        console.error(error);
    });
}

// Function to update data
function updateData() {
    update(ref(db, 'EmployeeSet/' + cnicInp.value), {
        nameofemployee: { firstname: fnameInp.value, lastname: lnameInp.value },
        department: deptInp.value,
        gender: genderInp.value,  
    }).then(() => {
        alert("Data updated successfully");
    }).catch((error) => {
        alert("Error updating data");
        console.error(error);
    });
}

// Function to delete data
function deleteData() {
    remove(ref(db, 'EmployeeSet/' + cnicInp.value)).then(() => {
        alert("Data deleted successfully");
    }).catch((error) => {
        alert("Error deleting data");
        console.error(error);
    });
}

// Event listeners
addBtn.addEventListener('click', addData);
retBtn.addEventListener('click', retData);
updBtn.addEventListener('click', updateData);
delBtn.addEventListener('click', deleteData);