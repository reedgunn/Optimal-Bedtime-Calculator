// Source: https://www.sleephealthjournal.org/article/S2352-7218(15)00015-7/fulltext
// Taking results from two-year study done by National Sleep Foundation that was published in 2015, and using it to create a website where the user 
// enters their birthday, how long it takes them to fall asleep, and their desired wake-up time, and outputs their ideal bedtime.

function populateTimeDropdown() {
    const wake_up_time_options = document.getElementById('wakeUpTime');
    for (let hr = 0; hr < 24; hr++) {
        for (let min = 0; min < 60; min += 5) {
            const ampm = hr > 12 ? 'PM' : 'AM';
            const displayHour = hr % 12 == 0 ? '12' : (hr % 12).toString();
            const displayMinute = min.toString().padStart(2, '0');
            const option = document.createElement('option');
            option.value = hr * 60 + min;
            option.text = `${displayHour}:${displayMinute} ${ampm}`;
            if (hr == 6 && min == 30) option.selected = true;
            wake_up_time_options.appendChild(option);
        }
    }
}

window.onload = populateTimeDropdown();

const currentDate = new Date();

function age_to_sleep_needed(age) {
    let res;
    if (age < 0.66667) {
        res = -3 * age + 15.75;
    } else if (age < 2) {
        res = -0.938 * age + 14.376;
    } else if (age < 4.5) {
        res = -0.5 * age + 13.5;
    } else if (age < 10) {
        res = -0.273 * age + 12.48;
    } else if (age < 22) {
        res = -0.125 * age + 11;
    } else if (age < 45.5) {
        res = -0.011 * age + 8.492;
    } else {
        res = -0.028 * age + 9.277;
    }
    return Math.round((res * 60) / 5) * 5;
}

function birthday_to_sleep_needed(birthday) {
    console.log(birthday);
    return age_to_sleep_needed((currentDate - birthday) / 1000 / 60 / 60 / 24 / 365.25);
}

function mins_to_time(mins) {
    let ampm;
    if (mins < 0) {
        mins += 24 * 60;
    }
    if (mins >= 12 * 60) {
        ampm = 'PM';
        mins -= 12 * 60;
    } else {
        ampm = 'AM';
    }
    let time_mins = mins % 60;
    if (time_mins < 10) {
        time_mins = `0${time_mins}`;
    }
    const time_hrs = `${(mins - time_mins) / 60}`;
    return time_hrs + ':' + time_mins + ' ' + ampm;
}

function calculateBedtime() {
    const wakeUpTime = parseInt(document.getElementById('wakeUpTime').value);
    const sleepOnset = parseInt(document.getElementById('sleepOnset').value);
    const sleepNeeded = birthday_to_sleep_needed(new Date(document.getElementById('birthday').value).getTime());
    
    document.getElementById('result').innerText = mins_to_time(wakeUpTime - sleepNeeded - sleepOnset);
}