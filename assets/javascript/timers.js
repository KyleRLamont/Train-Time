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
        var traintime = moment($("#time-input").val().trim(), "HH:mm").format("X");
        var trainfreq = $("#freq-input").val();

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

        //var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        //var empMonths = moment().diff(moment(empStart, "X"), "months");
        //console.log(empMonths);

        // Calculate the total billed rate
        //var empBilled = empMonths * empRate;
        //console.log(empBilled);

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td class='bg-transparent'>").text(trainname),
            $("<td class='bg-transparent'>").text(traindest),
            $("<td class='bg-transparent'>").text(trainfreq),
            //$("<td>").text(traintime),
            //$("<td>").text(trainmin),
        );

        // Append the new row to the table
        $("#train-table > tbody").append(newRow);
    });
});