App.RecordController = Ember.ArrayController.extend({
    localStorageBind: 'recordData',

    init: function() {
        var data = JSON.parse(localStorage.getItem(this.localStorageBind));

        if (data != null && Ember.isArray(data)) {
            for(var i=0; i < data.length; i++) {
                data[i].time = new Date(data[i].time);
            }
            this.content.pushObjects(data);
        }
    },

    updatedAgo: function() {
        if (this.content.length == 0) {
            return "Value has not been set yet";
        } else {
            return jQuery.timeago(this.get('lastObject').time);
        }
    }.property(),

    previousValue: function() {
        if (this.content.length != 0) {
            return this.get('lastObject').value;
        }
    }.property(),

    updatedInLessThan24h: function() {
        if (this.content.length == 0) {
            return false;
        }
        return (new Date() - this.get('lastObject').time) < 24 * 60 * 60 * 1000;
    },

    valueObserver: function() {
        localStorage.setItem(this.localStorageBind, JSON.stringify(this.content));
    }.observes('content.@each')
});

App.WeightController = App.RecordController.extend({
    content: [],
    localStorageBind: 'weightData'
});

App.MoodController = App.RecordController.extend({
    content: [],
    localStorageBind: 'moodData'
});
