/**
 * Created by juancarlosnavarrete on 3/13/17.
 */

var DEBUG = false;
var ONLOAD = true;

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




$("#myButton").on("click", function (event) {
    /**
     * This onclick event gathers all the information that was entered by the user and saves the data onto firebase.
     * @method onClick
     */
    event.preventDefault();
    var train = $("#trainName").val().trim();
    var Destination = $("#Destination").val().trim();
    var FirstTrain = $("#FirstTrain").val().trim();
    var Frequency = $("#Frequency").val().trim();

    console.log(train + ' ' + Destination + " " + FirstTrain + " " + Frequency);

    database.ref().push({
        aTrainName: train,
        destination: Destination,
        firstTrain: FirstTrain,
        frequency: Frequency
    });
    $("#trainName").val('');
    $("#Destination").val('');
    $("#FirstTrain").val('');
    $("#Frequency").val('');
});

function myNextTrain(initial,interval){
    /**
     * This function calculates the next arrival time of the bus in Military time
     * @method myNextTrain
     * @param int(initial), int(interval)
     */
    var arr = [];
    // var currentHour = moment().get('hour');
    // var currentMin  = moment().get('minute');
    var dt = new Date();
    var hours = dt.getHours();
    var mins = dt.getMinutes();
    // console.log(currentHour, hours);
    // console.log(currentMin, mins);
    var totalMinutes = (hours * 60) + mins;
    var initialMinutes = initial * 60;


    while (initialMinutes < totalMinutes){
        // add interval to start
        initialMinutes += interval;
    }
    var nextHour = parseInt(initialMinutes /60);
    var minAway = initialMinutes - totalMinutes;
    var nextMin = initialMinutes - (nextHour * 60);
    arr.push(String(nextHour)+ ":" + String(nextMin));
    arr.push(minAway);
    return arr;
}


function buildLine(obj){
    /**
     * This function calculates the next arrival time of the bus in Military time
     * @method myNextTrain
     * @param int(initial), int(interval)
     */

    var scheduletimes =myNextTrain(parseInt(obj.firstTrain), parseInt(obj.frequency));
    var arr = [];
    arr.push(obj.aTrainName);
    arr.push(obj.destination);
    arr.push(obj.frequency);
    arr.push(scheduletimes[0]);
    arr.push(scheduletimes[1]);

    //build The line tr that would append into tbody
    var newTr = $("<tr>");
    for(var i = 0; i< arr.length; i++){
        var newTd = $("<td>").html(arr[i]);
        newTd.appendTo(newTr);
    }
    $('tBody').prepend(newTr);

}


database.ref().on("value", function(snapshot) {
    /**
     * This on value function retrieves the most recent database
     * @method onValue
     * @param obj(snapshot)
     */
    //any changes on database we want to update our html

    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Getting an array of each key In the snapshot object
    var svArr = Object.keys(sv);

    // Finding the last user's key
    var lastIndex = svArr.length - 1;

    var lastKey = svArr[lastIndex];

    // Using the last user's key to access the last added user object
    var lastObj = sv[lastKey];

    if(DEBUG) {
        // Console.loging the last user's data
        console.log('this is the last object: ');
        console.log(lastObj.aTrainName);
        console.log(lastObj.destination);
        console.log(lastObj.firstTrain);
        console.log(lastObj.frequency);
    }
    if(ONLOAD){
        for (var i = 0; i < svArr.length; i++) {
            //console.log(sv[svArr[i]]);
            buildLine(sv[svArr[i]]);
        }
        ONLOAD = false;
    }else {
        buildLine(lastObj);
    }

    // Handle the errors
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

