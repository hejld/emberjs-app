describe "StateManager", ->

  initApp = ->
    App.weightController = App.WeightController.create {content: []}
    App.moodController = App.MoodController.create {content: []}

  loadTestData = ->
    localStorage.setItem 'weightData', JSON.stringify [spec.oldRecord]
    localStorage.setItem 'moodData', JSON.stringify [spec.oldRecord]

  loadRecentWeightValue = ->
    localStorage.setItem 'weightData', JSON.stringify [spec.oldRecord, spec.recentRecord]
    localStorage.setItem 'moodData', JSON.stringify [spec.oldRecord]

  describe "without data already inserted", ->

    beforeEach ->
      initApp()
      @stateManager = App.StateManager.create()

    it "should start with state weightState", ->
      (expect @stateManager.getPath 'currentState.name').toEqual 'weightState'

  describe "with some data already inserted", ->

    beforeEach ->
      loadTestData()
      initApp()
      @stateManager = App.StateManager.create()

    it "should start with state weightState", ->
      (expect @stateManager.getPath 'currentState.name').toEqual 'weightState'

  describe "with weight data inserted less than 24 hours ago", ->

    beforeEach ->
      loadRecentWeightValue()
      initApp()
      @stateManager = App.StateManager.create()

    it "should start with state moodState", ->
      (expect @stateManager.getPath 'currentState.name').toEqual 'moodState'