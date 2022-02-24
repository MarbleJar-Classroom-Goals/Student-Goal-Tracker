const { Goal } = require('../models/goalModel');

const goalController = {};

goalController.findStudentGoals = (req, res, next) => {
  // to get req.params to work we need to invoke bodyParser() in server.js file

  const { studentID } = req.params;

  Goal.find({ studentID: studentID }, (err, result) => {
    if (err) {
      return next({
        log: err.message,
        status: 400,
        message: { err: err.message},
      });
    }
    res.locals.goalsResponse = result;
    return next();
  });
}

goalController.addGoals = (req, res, next) => {
  // deconstruct req.body which will have userID, title, description, dueDate, status
  const { title, description, dueDate } = req.body;
  const { studentID } = req.params;
    // syntax for the userID?
  // default status = false
  // mongoDB request (create) which will add the new goal
  Goal.create({title, description, dueDate, status: false, studentID}, (err, result) => {
     if (err) {
      return next({
        log: err.message,
        status: 400,
        message: { err: err.message },
      });
    }
    return next();
  });
    // check for an error, if not then next()
}

goalController.switchStatus = (req, res, next) => {
  let { _id, status } = req.body // what is the title of this in mongoDB?
  status === false ? status=true : status=false;
  //console.log('new status', status);
  Goal.updateOne( { _id}, {
      $set: {
        status: status
      }
    }, (err, data) => {
      if (err) return next("messed up switching")
      return next();
  })
}

goalController.deleteGoal = (req, res, next) => {
  console.log('delete goal middleware reached');
  const { _id } = req.body;
  Goal.findOneAndDelete({_id}, (err, data) =>{
    if (err) return next('failed to delete goal');
    return next();
  })
}


module.exports = goalController;