var config = {
    apiKey: "AIzaSyDWmuBeL_I-7E89oiXP1k4XF_8Z0ZOVzyQ",
    authDomain: "fir-practice-9a8c9.firebaseapp.com",
    databaseURL: "https://fir-practice-9a8c9.firebaseio.com",
    projectId: "fir-practice-9a8c9",
    storageBucket: "fir-practice-9a8c9.appspot.com",
    messagingSenderId: "353948674469"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    console.log("button clicked");
    var trainName = $("#train-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    console.log(trainName);
    var arrivalTime = $("#arrival-input").val().trim();
    var trainFreq = $("#frequency-input").val().trim();

    var nextTrain = {
        name: trainName,
        destination: trainDest,
        time: arrivalTime,
        frequency: trainFreq
    };
    
    database.ref().push(nextTrain);

    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

database.ref().on("child_added", function(child) {
    var trainName = child.val().name;
    var trainDest = child.val().destination;
    var arrivalTime = child.val().time;
    var trainFreq = child.val().frequency;

    // var momentInst = moment(arrivalTime, 'HH:mm')
    // var empMonths = momentInst.diff(moment(), 'months') * -1;
    // var totalBilled = empMonths * empRate;

    var nameCell = $("<td>").text(trainName);
    var destCell = $("<td>").text(trainDest);
    var freqCell = $("<td>").text(trainFreq);
    var arrivalCell = $("<td>").text(arrivalTime);
    // var minutesCell = $("<td>").text(minutesAway);

    var newRow = $("<tr>").append(nameCell, destCell, freqCell, arrivalCell/*, minutesCell*/);
    $("tbody").append(newRow);

});