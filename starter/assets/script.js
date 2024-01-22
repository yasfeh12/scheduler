var planWorkday = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
];

var today = dayjs().format("dddd, MMMM, D, YYYY ");
$("#currentDay").text(today);

// Retrieve data from local storage
var storedData = JSON.parse(localStorage.getItem("workDay")) || [];

planWorkday.forEach(function (timeBlock, index) {
    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);
    var storedEvent = storedData[index] ? storedData[index].event : ""; // Get stored event

    var row =
        '<div class="time-block" id="' +
        index +
        '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
        timeLabel +
        '</div><textarea class="form-control ' +
        blockColor +
        '">' +
        storedEvent +
        '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    $(".container").append(row);
});

function colorRow(time) {
    var planNow = dayjs();
    var planEntry = dayjs(time, "h A");
    if (planNow.isBefore(planEntry)) {
        return "future";
    } else if (planNow.isAfter(planEntry)) {
        return "past";
    } else {
        return "present";
    }
}

$(".container").on("click", ".saveBtn", function () {
    var blockID = parseInt(
        $(this).closest(".time-block").attr("id")
    );
    var userEntry = $.trim(
        $(this).parent().siblings("textarea").val()
    );
    planWorkday[blockID].event = userEntry;

    // Update local storage
    localStorage.setItem("workDay", JSON.stringify(planWorkday));
});
