//database stuff
const db = require('../db/models');
const queries = require('../db/queries');

const BoardController = {};

BoardController.getStickies = (req, res, next) => {
  db.query({ text: queries.getStickies, values: [req.body.boardId] })
    // { id: 11, username: 'Nicky', name: "Nicky's Board" } <--- Nicky's board with id of 11
    .then(result => {
      console.log(result.rows);
      res.locals.stickies = result.rows;
      return next();
    })
    .catch(err => {
      next({
        log: 'Error in middleware BoardController.getStickies',
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
      console.log('success', result.rows[0]);
      res.locals.sticky = result.rows[0];
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
      console.log('success', result.rows);
      return next();
    })
    .catch(err => {
      next({
        log: 'Error in middleware BoardController.postStickies' + err,
      });
    });
};

module.exports = BoardController;
