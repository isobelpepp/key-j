const getTracks = require('../src/api/get_tracks');
const audioFeatures = require('../src/api/get_track_audio_features');

exports.root = (req, res) => {
  getTracks(req.body.songName).then(data => {
    res.json({
      songs: data,
    });
  });
};

exports.trackAudio = (req, res) => {
  audioFeatures(req.body.songId).then(data => {
    res.json({
      audioFeatures: data,
    });
  });
};
