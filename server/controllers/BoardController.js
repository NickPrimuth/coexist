//database stuff
const db = require('../db/models');
const queries = require('../db/queries');

const BoardController = {};

BoardController.getStickies = (req, res, next) => {
  db.query({ text: queries.getStickies, values: [req.body.boardId] })
    .then(result => {
      console.log('made through', result.rows[0]);
      res.locals.stickies = result.rows[0];
      return next();
    })
    .catch(err => {
      console.log(err.error, 'err');
      next({
        log: 'Error in middleware BoardController.getStickies' + err,
      });
    });
};

BoardController.postSticky = (req, res, next) => {
  db.query({
    text: queries.addSticky,
    values: [req.body.name, req.body.boardId],
  })
    .then(result => {
      console.log(result.rows[0]);
      res.locals.stickyId = result.rows[0];
      return next();
    })
    .catch(err => {
      next({
        log: 'Error in middleware BoardController.postStickies' + err,
      });
    });
};

BoardController.updateSticky = (req, res, next) => {
  db.query({
    text: queries.editSticky,
    values: [req.body.name, req.body.sticky_id],
  })
    .then(result => {
      console.log('success', result);
      res.locals.sticky = result;
      return next();
    })
    .catch(err => {
      next({
        log: 'Error in middleware BoardController.postStickies' + err,
      });
    });
};

BoardController.deleteSticky = (req, res, next) => {
  db.query({
    text: queries.deleteSticky,
    values: [req.body.sticky_id],
  })
    .then(result => {
      console.log('success');
      return next();
    })
    .catch(err => {
      next({
        log: 'Error in middleware BoardController.postStickies' + err,
      });
    });
};

module.exports = BoardController;
