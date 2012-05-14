// During controller creation the previous data from localStorage are loaded
App.weightController = App.WeightController.create();
App.moodController = App.MoodController.create();

// During state manager creation the init state is evaluated
App.stateManager = App.StateManager.create();