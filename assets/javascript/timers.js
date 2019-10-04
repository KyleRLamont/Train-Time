$(document).ready(function () {    
    var firebaseConfig = {
        apiKey: "AIzaSyBmsABkkrmFEfFN_Vtc6aApmMoFtfEhYjA",
        authDomain: "fir-hmwkbootcamp.firebaseapp.com",
        databaseURL: "https://fir-hmwkbootcamp.firebaseio.com",
        projectId: "fir-hmwkbootcamp",
        storageBucket: "fir-hmwkbootcamp.appspot.com",
        messagingSenderId: "200793547529",
        appId: "1:200793547529:web:78952dbdd27fd750a2a9d8"
    };

    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        var trainname = $("#name-input").val().trim();
        var traindest = $("#destination-input").val().trim();
        var traintime = $("#time-input").val().trim();
        var trainfreq = $("#freq-input").val().trim();

        var newtrain = {
            name: trainname,
            dest: traindest,
            time: traintime,
            freq: trainfreq
        };

        database.ref().push(newtrain);

        console.log(newtrain.name);
        console.log(newtrain.dest);
        console.log(newtrain.time);
        console.log(newtrain.freq);

        alert("Train successfully added");

        $("#name-input").val("");
        $("#destination-input").val("");
        $("#time-input").val("");
        $("#freq-input").val("");
    });

    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());

        var trainname = childSnapshot.val().name;
        var traindest = childSnapshot.val().dest;
        var traintime = childSnapshot.val().time;
        var trainfreq = childSnapshot.val().freq;

        console.log(trainname);
        console.log(traindest);
        console.log(traintime);
        console.log(trainfreq);

        var firstTime = traintime

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % trainfreq;
        console.log(tRemainder);

        var tMinutesTillTrain = trainfreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var newRow = $("<tr>").append(
            $("<td class='bg-transparent'>").text(trainname),
            $("<td class='bg-transparent'>").text(traindest),
            $("<td class='bg-transparent'>").text(trainfreq),
            $("<td class='bg-transparent'>").text(moment(nextTrain).format("hh:mm A")),
            $("<td class='bg-transparent'>").text(tMinutesTillTrain),
        );

        $("#train-table > tbody").append(newRow);
    });
});