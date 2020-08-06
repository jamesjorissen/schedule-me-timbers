// This Function will insert today's date //
function todaysDate() {
    var todaysDate = moment().format("MMMM Do YYYY, h:mm:ss a");
    $("#currentDay").text(todaysDate);
}
todaysDate();

$(document).ready(function () {
    if (!localStorage.getItem("businessHours")) {
        updateCalendarTasks(businessHours);
    } else {
        updateCalendarTasks(JSON.parse(localStorage.getItem('businessHours')));
    }
})

let businessHours = {
    "8am": "",
    "9am": "",
    "10am": "",
    "11am": "",
    "Noon": "",
    "1pm": "",
    "2pm": "",
    "3pm": "",
    "4pm": "",
    "5pm": "",
    "6pm": "",
};

let counter = 1;
for (const property in businessHours) {
    let textEntered = "#text-entered" + counter;
    $(textEntered).text(businessHours[property]);
    let timeIdentifier = "#time" + counter;
    let currentTime = moment().hour();
    let timeList = $(timeIdentifier).text();
    let timeValue = returnedHour(timeList);

    if (timeValue < currentTime) {
        $(textEntered).addClass("before");
    } else if (timeValue === currentTime) {
        $(textEntered).removeClass("before");
        $(textEntered).addClass("now");
    } else {
        $(textEntered).removeClass("before");
        $(textEntered).removeClass("now");
        $(textEntered).addClass("after");
    }
    counter++;
}

$("button").click(function () {
    value = $(this).siblings("textarea").val();
    hourList = $(this).siblings("div").text();

    saveSchedule(hourList, value);
});

function returnedHour(hourList) {
    switch (hourList) {
        case "8am": return 8;
        case "9am": return 9;
        case "10am": return 10;
        case "11am": return 11;
        case "Noon": return 12;
        case "1pm": return 13;
        case "2pm": return 14;
        case "3pm": return 15;
        case "4pm": return 16;
        case "5pm": return 17;
        case "6pm": return 18;
    }
}


function loadData() {
    result = localStorage.getItem("businessHours")
    return (result ? result : businessHours);
}

function initialize() {
    localStorage.setItem("businessHours", JSON.stringify(businessHours));
};

function saveToLocalStorage(selectDay) {
    localStorage.setItem("businessHours", JSON.stringify(selectDay));
}

function saveSchedule(hourList, val) {
    if (!localStorage.getItem("businessHours")) {
        initialize();
    }

    let hoursWorked = JSON.parse(localStorage.getItem("businessHours"));
    hoursWorked[hourList] = val

    saveToLocalStorage(hoursWorked);
}


function updateCalendarTasks(dayGiven) {
    $(".row").each(function (index) {
        let res = $(this).children("div");
        $(this).children("textarea").text(dayGiven[res.text()]);
    })
};