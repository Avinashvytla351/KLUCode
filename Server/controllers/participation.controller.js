const Participation = require("../models/participation.model.js");
const contests = require("./contest.controller.js");
var moment = require("moment");

exports.create = async (req, res) => {
  req.body.username = req.decoded.username;
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      success: false,
      message: "user Id can not be empty",
    });
  }

  if (!req.body.branch && req.body.username !== "admin") {
    return res.status(400).send({
      success: false,
      message: "user Branch can not be empty",
    });
  }
  if (!req.body.contestId) {
    return res.status(400).send({
      success: false,
      message: "contest Id can not be empty",
    });
  }
  Participation.find({
    participationId: req.body.username + req.body.contestId,
  })
    .then(async (participation) => {
      if (participation.length === 0) {
        let duration = await contests.getDuration(req);
        if (!duration) {
          res.send({ success: false, message: "Error occured" });
        }

        let date = moment();
        let d = duration.duration;
        let endTime = moment(date, "HH:mm:ss").add(d, "minutes");

        // Create a Participation
        const participation = new Participation({
          participationId: req.body.username + req.body.contestId,
          username: req.body.username,
          branch: req.body.branch,
          contestId: req.body.contestId,
          participationTime: date,
          submissionResults: [],
          validTill: endTime,
        });
        // Save participation in the database
        participation
          .save()
          .then((data) => {
            res.send(data);
          })
          .catch((err) => {
            res.status(500).send({
              success: false,
              message: err.message || "Some error occurred while Registering.",
            });
          });
      } else {
        res.send({ success: false, message: "User already participated" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

// Retrieve and return all participations from the database.
exports.findAll = (req, res) => {
  Participation.find()
    .then((participation) => {
      res.send(participation);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

// Retrieve and return all participation details for user in contest.
exports.findUser = (req, res) => {
  Participation.find({
    participationId: req.decoded.username + req.params.contestId,
  })
    .then((participation) => {
      res.send(participation);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};

exports.findAllContestsUser = (req, res) => {
  Participation.find({ username: req.body.username })
    .then((participation) => {
      res.send({
        success: true,
        count: participation.length,
      });
    })
    .catch((err) => {
      res.send({
        success: false,
        count: 0,
      });
    });
};

exports.findUserTime = async (result) => {
  try {
    var participation = await Participation.find({
      participationId: result.participationId,
    });

    if (!participation) {
      throw new Error("Couldn't find participation");
    }
    participation = participation[0];
    return participation;
  } catch (err) {
    if (err.kind === "ObjectId") {
      throw new Error("Couldn't find participation, caught exception");
    }
    throw new Error("Error retrieving data");
  }
};

exports.acceptSubmission = async (sub) => {
  try {
    let participation = await Participation.findOne({
      participationId: sub.participationId,
    });

    let multiset = true;
    if (participation.questions.length !== 0) {
      if (!participation.questions.includes(sub.questionId)) {
        multiset = false;
        return participation;
      }
    }
    if (multiset) {
      let found = false;
      let updated = false;

      if (participation.submissionResults.length !== 0) {
        for (let i = 0; i < participation.submissionResults.length; i++) {
          if (
            participation.submissionResults[i].questionId === sub.questionId
          ) {
            found = true;
            if (participation.submissionResults[i].score < sub.score) {
              // Update higher score
              updated = true;
              await Participation.updateOne(
                {
                  participationId: sub.participationId,
                  "submissionResults.questionId": sub.questionId,
                },
                {
                  $set: {
                    "submissionResults.$.score": sub.score,
                    "submissionResults.$.ipAddress": sub.ipAddress,
                  },
                },
                { new: true }
              );
            }
          }
        }
        if (found && !updated) {
          return participation;
        }
      }

      if (!found) {
        await Participation.findOneAndUpdate(
          { participationId: sub.participationId },
          {
            $addToSet: {
              submissionResults: {
                questionId: sub.questionId,
                score: sub.score,
                ipAddress: sub.ipAddress,
              },
            },
          },
          { new: true }
        );
      }
    }
    return participation;
  } catch (err) {
    throw err;
  }
};

exports.endContest = async (req, res) => {
  let findVal = req.body.username.toLowerCase() + req.body.contestId;
  Participation.findOne({ participationId: findVal })
    .then((participation) => {
      let setVal = participation.participationTime;
      Participation.findOneAndUpdate(
        { participationId: findVal },
        {
          $set: {
            validTill: setVal,
          },
        }
      )
        .then(() => {
          res.send("done");
        })
        .catch((err) => {
          res.send("error");
        });
    })
    .catch((err) => {
      res.send("error");
    });
};

exports.changeValidTime = (req, res) => {
  const username = req.body.username.toLowerCase();
  const contestId = req.body.contestId;
  var participationId = username + contestId;
  Participation.findOne({ participationId: participationId })
    .then((data) => {
      const time = Number(req.body.time);
      var data = new Date(data.validTill);
      data.setTime(data.getTime() + time * 60 * 1000);
      Participation.findOneAndUpdate(
        { participationId: participationId },
        {
          $set: {
            participationId: participationId,
            validTill: data,
            endContest: 0,
          },
        },
        { upsert: true }
      )
        .then((data) => {
          res.status(200).send("Updated Successfully!");
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Error occurred!",
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: err.message || "Error occurred!",
      });
    });
};

// Retrieve and return all participation details.
exports.findContestPart = (req, res) => {
  Participation.find({ contestId: req.body.contestId })
    .then((participation) => {
      res.send(participation);
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message || "Some error occurred while retrieving participation.",
      });
    });
};
