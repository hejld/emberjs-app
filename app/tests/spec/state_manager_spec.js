describe("StateManager", function() {

    var stateManager;
    var weightData, moodData;

    var initApp = function() {
        App.weightController = App.WeightController.create({content: []});
        App.moodController = App.MoodController.create({content: []});

        stateManager = App.StateManager.create();
    };

    var loadTestData = function() {
        localStorage.setItem('weightData', JSON.stringify([spec.oldRecord]));
        localStorage.setItem('moodData', JSON.stringify([spec.oldRecord]));
    };

    var loadRecentWeightValue = function() {
        localStorage.setItem('weightData', JSON.stringify([spec.oldRecord, spec.recentRecord]));
    };


    describe("without data already inserted", function() {

        beforeEach(function() {
            initApp();
        });

        it("should start with state weightState", function() {
            expect(stateManager.getPath('currentState.name')).toEqual('weightState');
        });


    });

    describe("with some data already inserted", function() {
        beforeEach(function() {
           loadTestData();
           initApp();
        });

        it("should start with state weightState", function() {
            expect(stateManager.getPath('currentState.name')).toEqual('weightState');
        });

    });


    describe("with weight data inserted less than 24 hours ago", function() {
        beforeEach(function() {
            loadTestData();
            loadRecentWeightValue();
            initApp();
        });

        it("should start with state moodState", function() {
            expect(stateManager.getPath('currentState.name')).toEqual('moodState');
        });
    });

});