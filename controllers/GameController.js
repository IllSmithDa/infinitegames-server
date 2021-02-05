const GameObject = require('../models/GameObject');
const gamesData = require('../Database');
const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const addGameObject = (req, res ) => {
    const { title, 
            description, 
            genre, 
            publisher, 
            platform,
            release_date,
            image_url,
            game_url,
            game_ID,
            keywords,
            developer,
            footage
          } = req.body;

    const newGame = new GameObject({  title, 
                                       description, 
                                       genre, 
                                       publisher, 
                                       platform,
                                       release_date,
                                       image_url,
                                       game_url,
                                       game_ID,
                                       keywords,
                                       developer,
                                       footage
                                     })
    newGame
        .save()
        .then(() => {
            res.status(STATUS_OK).json({success: true});
        })
        .catch((err) => {
          console.log(err);
          res.status(STATUS_SERVER_ERROR).json({ error: err.message });
        });
}
const addMultipleGames = (req, res) => {
  
  console.log(gamesData.gamesData);
  const bulkGameData = gamesData.gamesData;

  GameObject.insertMany(bulkGameData, (err, gameData) => {
    if (err) res.status(STATUS_USER_ERROR).json({error: err})
    res.status(STATUS_OK).json(gameData);
  })
}
const getGameListByTitle = (req, res) => {
  GameObject.find({}).sort({title: 1}).limit(20).exec((err, gameData) => {
    console.log(gameData);
    if (err) res.status(STATUS_USER_ERROR).json({error: err});
    res.status(STATUS_OK).json(gameData);
  })
}
const getGameByPlatform = (req, res) => {
  const { platform } = req.body;
  console.log('platform: ' + req.body.platform)

  const searchTest = RegExp(platform ? platform.toUpperCase() : '');
  const searchResults = [];
  GameObject.find({}).sort({title: 1}).exec((err, gameData)=> {

    if (err) res.status(STATUS_USER_ERROR).json({error: err.message})
    for (let i = 0; i < gameData.length; i++) {
      if (searchTest.test(gameData[i].platform.toUpperCase())) {
        searchResults.push(gameData [i]);
      }
    }
    res.status(STATUS_OK).json(searchResults);

  })
}
const searchGamesByTitle = (req, res) => {
  const { searchTerm } = req.body;
  const searchTest = RegExp(searchTerm ? searchTerm.toUpperCase() : '');
  const searchResults = [];
  GameObject.find({}).sort({title: 1}).exec((err, gameData)=> {

    if (err) res.status(STATUS_USER_ERROR).json({error: err.message})
    for (let i = 0; i < gameData.length; i++) {
      if (searchTest.test(gameData[i].title.toUpperCase())) {
        searchResults.push(gameData [i]);
      }
    }
    res.status(STATUS_OK).json(searchResults);

  })
}

gameSearchByKeywords = (req, res) => {
  const { searchTerm } = req.body;
  const searchTest = RegExp(searchTerm ? searchTerm.toUpperCase() : '');
  const searchResults = [];
  GameObject.find({}).sort({title: 1}).exec((err, gameData)=> {

    if (err) res.status(STATUS_USER_ERROR).json({error: err.message})
    for (let i = 0; i < gameData.length; i++) {
      for (let k = 0; k < gameData[i].keywords.length; k++) {
        if (searchTest.test(gameData[i].keywords[k].toUpperCase())) {
          searchResults.push(gameData [i]);
          break;
        }
      }
    }
    res.status(STATUS_OK).json(searchResults);

  })
}

module.exports = {
    addGameObject,
    addMultipleGames,
    getGameListByTitle,
    getGameByPlatform,
    searchGamesByTitle,
    gameSearchByKeywords 
};