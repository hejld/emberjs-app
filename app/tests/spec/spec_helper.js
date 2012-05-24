// Generated by CoffeeScript 1.3.3
(function() {
  var oldDate;

  beforeEach(function() {
    this.weightData = localStorage.weightData;
    this.moodData = localStorage.moodData;
    return localStorage.clear();
  });

  afterEach(function() {
    localStorage.weightData = this.weightData;
    return localStorage.moodData = this.moodData;
  });

  window.spec = {};

  oldDate = new Date();

  oldDate.setDate(oldDate.getDate() - 2);

  window.spec.oldRecord = {
    time: oldDate,
    value: '194'
  };

  window.spec.recentRecord = {
    time: new Date(),
    value: '201'
  };

}).call(this);
