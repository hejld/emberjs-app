describe("WeightView", function() {

    var weightView = App.WeightView.create();

    it("should have default weight value", function() {
        expect(weightView.get('weight')).toEqual('100');
    });

});

describe("MoodView", function() {

    var moodView = App.MoodView.create();

    it("should have default mood value", function() {
        expect(moodView.get('mood')).toEqual('250');
    });

    it("should have default mood label value", function() {
        expect(moodView.get('moodLabel')).toEqual('Ok');
    });

    it("should have correct mood label when mood value changes", function() {
        moodView.set('mood', 120);
        expect(moodView.get('moodLabel')).toEqual('Bad');
        moodView.set('mood', 175);
        expect(moodView.get('moodLabel')).toEqual('Not so bad');
        moodView.set('mood', 240);
        expect(moodView.get('moodLabel')).toEqual('Ok');
        moodView.set('mood', 330);
        expect(moodView.get('moodLabel')).toEqual('Good');
        moodView.set('mood', 375);
        expect(moodView.get('moodLabel')).toEqual('Great');
    });

});