App.StateManager = Em.StateManager.extend({

    rootElement: '#content',

    initialState: function() {
        if (App.weightController.updatedInLessThan24h()) {
            return 'moodState';
        } else {
            return 'weightToMoodState';
        }
    }.property(),

    weightToMoodState: Ember.ViewState.create({
        view: App.WeightView
    }),

    weightState: Ember.ViewState.create({
        view: App.WeightView
    }),

    moodState: Ember.ViewState.create({
        view: App.MoodView
    }),

    graphState: Ember.ViewState.create({
        view: App.GraphView
    })

});