var friends = require('../data/friends');

module.exports = function (app) {
  app.get('/api/friends', function (req, res) {
    res.json(friends);
  });

  app.post('/api/friends', function (req, res) {
    var bestMatch = {
      name: '',
      photo: '',
      friendDifference: 100
    };

    console.log(req.body);
    // POST and parse user survey
    var userData = req.body;
    var userScores = userData.scores;

    console.log(userScores);
    // Var will calculate score difference between user and database
    var totalDifference = 0;
    // Loop through scores of each friend
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i]);
      totalDifference = 0;
      // Loop through scores of each friend
      for (var j = 0; j < friends[i].scores[j]; j++) {
        // Calculate difference between scores and add them into totalDifference
        totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
        // If sum of difference is less than difference of current best match
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }

    friends.push(userData);
    res.json(bestMatch);
  });
}
