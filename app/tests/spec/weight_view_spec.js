// Generated by CoffeeScript 1.3.3
(function() {

  describe("WeightView", function() {
    beforeEach(function() {
      return this.weightView = App.WeightView.create();
    });
    return it("should have default weight value", function() {
      return (expect(this.weightView.get('weight'))).toEqual('100');
    });
  });

}).call(this);
