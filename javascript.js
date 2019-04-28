var config = {
    apiKey: "AIzaSyDWmuBeL_I-7E89oiXP1k4XF_8Z0ZOVzyQ",
    authDomain: "fir-practice-9a8c9.firebaseapp.com",
    databaseURL: "https://fir-practice-9a8c9.firebaseio.com",
    projectId: "fir-practice-9a8c9",
    storageBucket: "fir-practice-9a8c9.appspot.com",
    messagingSenderId: "353948674469"
};

function updateArrivalTime(arrivalTime, frequency) {
    var now = moment();
    var minutesAway = now.diff(arrivalTime, "minutes");
    var timeAdded = Math.ceil(minutesAway / frequency) * frequency;
    arrivalTime.add(timeAdded, "minutes");

}

firebase.initializeApp(config);
var database = firebase.database();

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();
    console.log("button clicked");
    var trainName = $("#train-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    console.log(trainName);
    var arrivalTime = $("#arrival-input").val().trim(); //format is in military time HH:mm
    var arrivalMoment = moment(arrivalTime, "HH:mm")
    console.log(arrivalTime)



    if (moment().isAfter(arrivalMoment)) {
        arrivalMoment.add(1, 'd');
    }  
    arrivalTime = arrivalMoment.format();

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
    console.log("child_added")
    var trainName = child.val().name;
    var trainDest = child.val().destination;
    var arrivalTime = moment(child.val().time);
    console.log(arrivalTime)
    var trainFreq = child.val().frequency;
    var timeNow = moment()
    console.log("now:" + moment())
    console.log("military time: " + timeNow.format("HH:mm"))

    if (timeNow.isAfter(arrivalTime)) { 
       updateArrivalTime(arrivalTime, trainFreq);
    }

    var minutesAway = arrivalTime.diff(timeNow, "minutes");
    console.log("minutes Away:" + minutesAway);


    var nameCell = $("<td>").text(trainName);
    var destCell = $("<td>").text(trainDest);
    var freqCell = $("<td>").text(trainFreq);
    var arrivalCell = $("<td>").text(arrivalTime.format("HH:mm"));
    var minutesCell = $("<td>").text(minutesAway);

    var newRow = $("<tr>").append(nameCell, destCell, freqCell, arrivalCell, minutesCell)
    $("tbody").append(newRow);

});

