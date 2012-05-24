describe "WeightView", ->

  beforeEach ->
    @weightView = App.WeightView.create()

  it "should have default weight value", ->
    (expect @weightView.get 'weight').toEqual '100'