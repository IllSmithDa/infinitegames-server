const mongoose = require('mongoose');

const GameScheme = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description:  {
        type: String,
    },
    genre:  {
        type: String,
    },
    publisher:  {
        type: String,
    },
    platform:  {
        type: String,
    },
    release_date:  {
        type: String,
    },
    image_url:  {
        type: String,
    },
    game_url:  {
        type: String,
    },
    game_ID:  {
        type: Number,
        required: true,
        unique: true
    },
    keywords: [{
        type: String
    }],
    developer: {
        type: String,
    },
    footage: [{
        type: String
    }]
}, {usePushEach: true})

module.exports = mongoose.model('GameObject', GameScheme);