App.WeightView = Em.View.extend({
    templateName: 'weight',
    weight: "100",

    done: function(event) {
        App.weightController.addObject({ time: new Date(), value: this.weight });

        if ('weightToMoodState' == App.stateManager.getPath('currentState.name')) {
            App.stateManager.goToState('moodState');
        } else {
            App.stateManager.goToState('graphState');
        }
    },

    cancel: function(event) {
        App.stateManager.goToState('graphState');
    }
});

App.MoodView = Em.View.extend({
    templateName: 'mood',
    mood: "250",

    moodLabel: function() {
        if(160 > this.mood) {
            return "Bad";
        } else if(220 > this.mood) {
            return "Not so bad";
        } else if(280 > this.mood) {
            return "Ok";
        } else if(340 > this.mood) {
            return "Good";
        } else {
            return "Great";
        }
    }.property('mood'),

    done: function(event) {
        App.moodController.addObject({ time: new Date(), value: this.mood });
        App.stateManager.goToState('graphState');
    },

    cancel: function(event) {
        App.stateManager.goToState('graphState');
    }
});

App.GraphView = Em.View.extend({
    templateName: 'graph',

    date: new Date().toLocaleDateString(),

    editWeight: function(event) {
        App.stateManager.goToState('weightState');
    },

    editMood: function(event) {
        App.stateManager.goToState('moodState');
    }
});

App.Graph = Em.View.extend({
    elementId: "graph",

    didInsertElement: function() {
        if (App.weightController.content.length < 2 && App.moodController.content.length < 2) {
            $('#graph').append("<div class=\"no-data\">Input more data to see the graph with real data</div>");
            createBlankSlateGraph();
        } else {
            createGraph(App.weightController.content, App.moodController.content);
        }
    }
});

//
// UI Components
//
App.WeightField = Ember.TextField.extend({
    attributeBindings: ['type', 'value', 'size', 'min', 'max', 'autofocus'],
    type: "number",
    min: 100,
    max: 400,
    autofocus: true,

    valueBinding: 'App.WeightView.weight'
});

App.MoodField = Ember.TextField.extend({
    attributeBindings: ['type', 'value', 'size', 'min', 'max', 'autofocus'],
    type: "range",
    min:  100,
    max:  400,
    autofocus: true,

    valueBinding: 'App.MoodView.mood'
});