describe "RecordController", ->

  describe "with no data in localStorage", ->

    beforeEach ->
      @weightController = App.WeightController.create()

    it "should have default content value", ->
      (expect @weightController.content).toEqual []

    it "should indicate that no value has been set yet", ->
      (expect @weightController.get 'updatedAgo').toEqual 'Value has not been set yet'

    it "should return undefined as the last data entry", ->
      (expect @weightController.get 'previousValue').toBeUndefined()

    it "should return false for updatedInLessThan24h", ->
      (expect @weightController.updatedInLessThan24h()).not.toBeTruthy()

  describe "with older data in localStorage", ->

    beforeEach ->
      localStorage.setItem 'weightData', JSON.stringify([spec.oldRecord])
      @weightController = App.WeightController.create()

    it "should load previous data from localStorage when created", ->
      (expect @weightController.content).toContain spec.oldRecord
      (expect @weightController.content).not.toContain spec.recentRecord

    it "should return correct time of the last entry in human readable form", ->
      (expect @weightController.get 'updatedAgo').toEqual '2 days ago'

    it "should return correct value of the last data entry", ->
      (expect @weightController.get 'previousValue').toEqual spec.oldRecord.value

    it "should not indicate that it was updated in last 24 hours", ->
      (expect @weightController.updatedInLessThan24h()).not.toBeTruthy()

  describe "with recent data in localStorage", ->

    beforeEach ->
      localStorage.setItem('weightData', JSON.stringify([spec.oldRecord, spec.recentRecord]))
      @weightController = App.WeightController.create()

    it "should load previous data from localStorage when created", ->
      (expect @weightController.content).toContain spec.oldRecord
      (expect @weightController.content).toContain spec.recentRecord

    it "should return correct time of the last entry in human readable form", ->
      (expect @weightController.get 'updatedAgo').toEqual 'less than a minute ago'

    it "should return correct value of the last data entry", ->
      (expect @weightController.get 'previousValue').toEqual spec.recentRecord.value

    it "should indicate that it was updated in last 24 hours", ->
      (expect @weightController.updatedInLessThan24h()).toBeTruthy()