beforeEach ->
  @weightData = localStorage.weightData;
  @moodData = localStorage.moodData;
  localStorage.clear();

afterEach ->
  localStorage.weightData = @weightData;
  localStorage.moodData = @moodData;

window.spec = {};

oldDate = new Date()
oldDate.setDate(oldDate.getDate()-2)

window.spec.oldRecord = {time: oldDate, value: '194'}
window.spec.recentRecord = {time: new Date(), value: '201'}