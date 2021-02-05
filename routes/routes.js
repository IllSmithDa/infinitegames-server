const GameController = require('../controllers/GameController');

module.exports = (server) => {
    server.route('/addGameObject')
        .post(GameController.addGameObject);
    server.route('/addGameList') 
        .post(GameController.addMultipleGames);
    server.route('/getGamesByTitle')
        .get(GameController.getGameListByTitle);
    server.route('/getGameByPlatform')
        .post(GameController.getGameByPlatform);
    server.route('/searchGamesByTitle')
        .post(GameController.searchGamesByTitle);
    server.route('/searchGamesByKeywords')
        .post(GameController.gameSearchByKeywords)
}