describe("RecordController", function() {
    var weightData;
    var weightController;

    describe("with no data in localStorage", function() {
        beforeEach(function() {
            weightController = App.WeightController.create();
        });

        it("should have default content value", function() {
            expect(weightController.content).toEqual([]);
        });

        it("should indicate that no value has been set yet", function() {
            expect(weightController.get('updatedAgo')).toEqual('Value has not been set yet');
        });

        it("should return undefined as the last data entry", function() {
            expect(weightController.get('previousValue')).toBeUndefined();
        });

        it("should return false for updatedInLessThan24h", function() {
            expect(weightController.updatedInLessThan24h()).not.toBeTruthy();
        });
    });

    describe("with older data in localStorage", function() {
        beforeEach(function() {
            localStorage.setItem('weightData', JSON.stringify([spec.oldRecord]));
            weightController = App.WeightController.create();
        });

        it("should load previous data from localStorage when created", function() {
            expect(weightController.content).toContain(spec.oldRecord);
        });

        it("should return correct time of the last entry in human readable form", function() {
            expect(weightController.get('updatedAgo')).toEqual('2 days ago');
        });

        it("should return correct value of the last data entry", function() {
            expect(weightController.get('previousValue')).toEqual(spec.oldRecord.value);
        });

        it("should not indicate that it was updated in last 24 hours", function() {
            expect(weightController.updatedInLessThan24h()).not.toBeTruthy();
        });
    });

    describe("with recent data in localStorage", function() {
        beforeEach(function() {
            localStorage.setItem('weightData', JSON.stringify([spec.oldRecord, spec.recentRecord]));
            weightController = App.WeightController.create();
        });

        it("should return correct time of the last entry in human readable form", function() {
            expect(weightController.get('updatedAgo')).toEqual('less than a minute ago');
        });

        it("should indicate that it was updated in last 24 hours", function() {
            expect(weightController.updatedInLessThan24h()).toBeTruthy();
        });
    });
});