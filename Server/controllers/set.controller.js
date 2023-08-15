const Contest = require("../models/contest.model.js");
const contests = require("../controllers/contest.controller.js");
const setController = require("../controllers/set.controller.js");

exports.updateSet = async (set) => {
    try {
        const contest = await Contest.findOne({ contestId: req.params.contestId });
        console.log(contest);
        let sets = contest.sets || [];
        if (contest.sets) {
            sets.push(set);
        }
        try {
            let modifiedSets = await contests.updateOneSet(req, sets);
            res.status(200).send({ success: true, message: "The update Sets are ", modifiedData: modifiedSets });
        } catch (err) {
            res.status(500).send({ success: false, message: "Error occurred while modifying sets of Contest with id " + req.params.contestId });
        }
    } catch (err) {
        res.status(500).send({ success: false, message: "Error occurred while fetching Contest with id " + req.params.contestId });
    }
};


exports.deleteSet = async (req, res) => {
    let contestId = req.params.contestId;
    let setId = Number(req.params.setId) - 1;
    try {
        const contest = await Contest.findOne({ contestId: req.params.contestId });
        console.log(contest,"del");
        let sets = contest.sets;
        if (sets.length === 0 || setId >= sets.length || setId < 0) {
            return res.status(500).send({ success: false, message: "Sets are empty or given SetId is invalid for Contest with id " + contestId });
        }
        sets.splice(setId, 1);
        try {
            let modifiedSets = await contests.updateOneSet(req, sets);
            return res.status(200).send({ success: true, message: "The update Sets are ", modifiedData: modifiedSets });
        } catch (err) {
            return res.status(500).send({ success: false, message: "Error occurred while modifying sets of Contest with id " + req.params.contestId });
        }
    } catch (err) {
        return res.status(500).send({ success: false, message: "Error occurred while fetching Contest with id " + req.params.contestId });
    }
}