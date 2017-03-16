/**
 * Created by juancarlosnavarrete on 3/13/17.
 */


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBkNYK1qbtw2PaJImn5gt3hur--vh_esJo",
    authDomain: "workschedule-f74bd.firebaseapp.com",
    databaseURL: "https://workschedule-f74bd.firebaseio.com",
    storageBucket: "workschedule-f74bd.appspot.com",
    messagingSenderId: "63306085380"
};
firebase.initializeApp(config);

var database = firebase.database();

// Initial Values
var name = "";
var email = "";
var age = 0;
var comment = "";

$("#myButton").on("click", function (event) {
    event.preventDefault();
    var name = $("#name").val().trim();
    var role = $("#role").val().trim();
    var date = $("#date").val().trim();
    var rate = $("#monthlyRate").val().trim();

    console.log(name + ' ' + role + " " + date + " " + rate);

    database.ref().push({
        name: name,
        role: role,
        date: date,
        rate: rate
    });
    $("#name").val('');
    $("#role").val('');
    $("#date").val('');
    $("#monthlyRate").val('');
    //dateAdded: firebase.database.serverValue.TIMESTAMP
});

function buildLine(obj){

    var newTr = $("<tr>");


    var name = obj.name;
    var role = obj.role;
    var date = obj.date;
    var rate = obj.rate;
    console.log(obj.date);
    var current = moment().calendar();

    console.log(moment().format('MMMM Do YYYY'));
    console.log(moment('2010-10-20').isBefore('2010-12-31', 'year'));
    console.log(moment("20111031", "YYYYMMDD").fromNow());


}



database.ref().on("value", function(snapshot) {
    //any changes on database we want to update our html

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Getting an array of each key In the snapshot object
    var svArr = Object.keys(sv);

    // Finding the last user's key
    var lastIndex = svArr.length - 1;

    var lastKey = svArr[lastIndex];

    // Using the last user's key to access the last added user object
    var lastObj = sv[lastKey]

    // Console.loging the last user's data
    console.log(lastObj.name);
    console.log(lastObj.role);
    console.log(lastObj.date);
    console.log(lastObj.rate);


    buildLine(lastObj);


    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
