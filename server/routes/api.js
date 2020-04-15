const express = require('express');

const apiRouter = express.Router();

const BoardController = require('../controllers/BoardController');

//get all stickies
apiRouter.get('/stickies', BoardController.getStickies, (req, res) => {
  //get all stickies for current board
  res.status(200).json(res.locals);
});

//post new sticky
apiRouter.post('/stickies', BoardController.postSticky, (req, res) => {
  res.status(200).json(res.locals);
});

//edit a sticky
apiRouter.patch('/stickies', BoardController.updateSticky, (req, res) => {
  res.status(200);
  // .json(res.locals.sticky);
});

//delete a sticky
apiRouter.delete('/stickies', BoardController.deleteSticky, (req, res) => {
  res.status(200);
});

module.exports = apiRouter;
