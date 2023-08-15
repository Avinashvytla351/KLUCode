let middleware = require("../util/middleware.js");

module.exports = (app) => {
    const contests = require("../controllers/contest.controller.js");
    const sets = require("../controllers/set.controller.js");

    // Create a new contest
    app.post("/contests", middleware.checkTokenAdmin, contests.create);

    // Retrieve all contests
    app.get("/contests", middleware.checkToken, contests.findAll);

    // Retrieve all contests
    app.get("/contests/user/:username", middleware.checkToken, contests.findAllUser);

    // Retrieve a single contest with contestId
    app.get("/contests/:contestId", middleware.checkToken, contests.findOne);

    // Update a contest with contestId
    app.post("/contests/:contestId", middleware.checkTokenAdmin, contests.update);

    // Delete a contest with contestId
    app.delete(
        "/contests/:contestId",
        middleware.checkTokenAdmin,
        contests.delete
    );

    //check pass
    app.post("/checkContestPassword", middleware.checkToken, contests.checkContestPassword);

    //delete a set
    app.get("/deleteSet/:contestId/:setId",middleware.checkTokenAdmin,sets.deleteSet)
};
