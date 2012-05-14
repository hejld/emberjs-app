var weightData, moodData;

beforeEach(function() {
    weightData = localStorage.weightData;
    moodData = localStorage.moodData;
    localStorage.clear();
});

afterEach(function() {
    localStorage.weightData = weightData;
    localStorage.moodData = moodData;
});


spec = {};

var oldDate = new Date();
oldDate.setDate(oldDate.getDate()-2);
spec.oldRecord = {time: oldDate, value: '194'};

spec.recentRecord = {time: new Date(), value: '201'};