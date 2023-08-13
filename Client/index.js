const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const request = require("request");
const cookieParser = require("cookie-parser");
var path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { cookie } = require("request");
const { response } = require("express");

// Load config
dotenv.config({ path: "../Server/util/config.env" });

let serverRoute = process.env.serverAddress;
let clientRoute = process.env.clientAddress;

const app = express();
app.options("*", cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(cookieParser());

app.use("/", express.static(__dirname + "/"));
app.use("/ide", express.static(path.resolve("../IDE")));

app.use("/contests", express.static(__dirname + "/"));
app.use("/admin", express.static(__dirname + "/"));
app.use("/admin/manageusers", express.static(__dirname + "/"));
app.use("/admin/unverifiedusers", express.static(__dirname + "/"));

let userSessions = [];
let userSessions2 = [];

var defaultUserPic = "./images/defaultuser.png";

let sessionText = fs.readFileSync("./store.txt", "utf-8");

if (sessionText !== "") {
    userSessions2 = sessionText.split("\n");
    for (let i = 0; i < userSessions2.length; i++) {
        userSessions.push({
            username: userSessions2[i].substring(0, 10),
            val: Number(userSessions2[i].substring(10, 11)),
        });
    }
}

let checkSignIn = async (req, res, next) => {
    if (
        userSessions2.includes(req.cookies.user) ||
        Object.keys(req.cookies).length === 0
    ) {
        next(); //If session exists, proceed to page
    } else {
        res.redirect("/logout"); //Error, trying to access unauthorized page!
    }
};

var imageUrl = "";
function imageRetrive(req, res) {
    let imageUrl = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/";
    let rollno = req.cookies.username;
    let branch = req.cookies.branch;
    var testUrl = imageUrl + branch + "/" + rollno + ".jpg";
    return testUrl;
}

app.get("/", async (req, res) => {
    res.render("home", {
        imgUsername: req.cookies.username
    });
});

app.get("/index", async (req, res) => {
    res.render("home", {
        imgUsername: req.cookies.username
    });
});

app.get("/home", checkSignIn, async (req, res, next) => {
    res.render("home", {
        imgUsername: req.cookies.username
    });
});

app.get("/about", async (req, res, next) => {
    res.render("home", {
        imgUsername: req.cookies.username
    });
});

// Auth Related ---------------------------------------------------------------------------------------------------------------

app.get("/login", async (req, res) => {
    let url = {
        url: clientRoute,
    };
    res.render("Auth/login", { data: url });
});

app.post("/login_", async (req, res) => {
    let options = {
        url: serverRoute + "/login",
        method: "post",
        body: {
            username: req.body.username,
            password: req.body.password,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        if (body.success) {
            res.cookie("token", body.token);
            res.cookie("username", body.username);
            res.cookie("branch", body.branch);

            try {
                let userCookie;
                let ind = userSessions.findIndex((e) => e.username === body.username);
                if (ind > -1) {
                    let val = userSessions[ind].val;
                    userSessions[ind].val = ++val;
                    userCookie = body.username + val.toString();
                    userSessions2[ind] = userCookie;
                } else {
                    userSessions.push({
                        username: body.username,
                        val: 1,
                    });
                    userCookie = body.username + "1";
                    userSessions2.push(userCookie);
                }
                res.cookie("user", userCookie);

                fs.writeFile("./store.txt", userSessions2.join("\n"), (err) => {
                    if (err) return res.redirect("/logout");
                });
            } catch (err) {
                userSessions = [];
                userSessions2 = [];
                unlink("./store.txt", (err) => {
                    if (err) console.log("error: delete file");
                });
                console.log("error occurred");
                return res.redirect("/logout");
            }

            if (body.admin) {
                res.clearCookie("branch");
                res.redirect("admin");
            } else {
                let url = {
                    url: clientRoute,
                };
                res.render("temp", { data: url, imgUsername: req.cookies.username });
            }
        } else {
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/logout", async (req, res) => {
    res.clearCookie("token");
    res.clearCookie("username");
    res.clearCookie("contestId");
    res.clearCookie("courseId");
    res.clearCookie("branch");
    res.clearCookie("user");
    res.redirect("/");
});

app.post("/signup_", async (req, res) => {
    // res.render('/home');
    let options = {
        url: serverRoute + "/signup",
        method: "post",
        body: {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            password2: req.body.password2,
            branch: req.body.branch,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        if (body.username && body.password) {
            body.message =
                "Sign up successful, Account verification has been sent to your email";
        }
        body.url = clientRoute;
        res.render("error", { data: body, imgUsername: req.cookies.username });
    });
});

app.get("/forgotpassword_", async (req, res) => {
    let url = {
        url: clientRoute + "/fp",
    };
    res.render("Auth/forgotPassword.ejs", { data: url });
});

app.post("/fp", async (req, res) => {
    let options = {
        url: serverRoute + "/forgotPass",
        method: "post",
        body: {
            username: req.body.username,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        if (body.success) {
            res.render("error", { data: body, imgUsername: req.cookies.username });
        } else {
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/verify", async (req, res) => {
    // res.render('/home');
    let options = {
        url: serverRoute + "/verify",
        method: "post",
        body: {
            email: req.query.email,
            token: req.query.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        res.render("error", { data: body, imgUsername: req.cookies.username });
    });
});

// Auth Related ---------------------------------------------------------------------------------------------------------------

app.get("/profile", checkSignIn, async (req, res, next) => {
    let options = {
        url: serverRoute + "/user/" + req.cookies.username.toLowerCase(),
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        body.branchCaps = body.branch.toUpperCase();
        let options = {
            url: serverRoute + "/findAllContestsUser",
            method: "get",
            headers: {
                authorization: req.cookies.token,
            },
            body: {
                username: req.cookies.username.toLowerCase(),
            },
            json: true,
        };
        request(options, function (err, response, body) {
            body.imgUrl = defaultUserPic;
            body.serverUrl = serverRoute;
            res.render("profile/editProfile.ejs", {
                data: body,
                imgUsername: req.cookies.username,
                contestCount: body.count,
                token: req.cookies.token,
                serverUrl: serverRoute,
            });
        });
    });
});

// QUESTIONS RELATED ----------------------------------------------------------------------------------------------------------

app.get("/admin/add/question", async (req, res) => {
    let url = {
        url: clientRoute,
        serverurl: serverRoute,
    };

    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        if (body.success) {
            res.render("question/questionAdd", { data: url, token: req.cookies.token });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/admin/edit/question", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body1) {
        let body = {};
        body.posturl = clientRoute + "/questionEdit";
        body.url = clientRoute;
        body.method = "POST";
        body.class = "btn-green";
        body.title = "Editing";
        body.subtitle = "Questions";
        body.username = req.cookies.username;
        res.render("search.ejs", { data: body });
    });
});

app.post("/questionEdit", async (req, res) => {
    let questionId = req.body.questionId;
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        if (body.success) {
            let options = {
                url: serverRoute + "/questions/" + questionId,
                method: "get",
                headers: {
                    authorization: req.cookies.token,
                },
                json: true,
            };

            request(options, function (err, response, body) {
                if (!("success" in body)) {
                    body[0].serverUrl = serverRoute;
                    res.render("questionEdit", {
                        data: body[0],
                        token: req.cookies.token,
                    });
                } else {
                    body.message = "Unauthorized access";
                    res.render("error", {
                        data: body,
                        imgUsername: req.cookies.username,
                    });
                }
            });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/admin/delete/question", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        body.posturl = clientRoute + "/questionDelete";
        body.url = clientRoute;
        body.method = "POST";
        body.class = "btn-danger";
        body.title = "Delete";
        body.subtitle = "Questions";
        res.render("dropdown", { data: body });
    });
});

app.post("/questionDelete", async (req, res) => {
    let options = {
        url: serverRoute + "/questions/" + req.body.questionId,
        method: "delete",
        body: {
            questionId: req.body.questionId,
            token: req.cookies.token,
        },
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        res.redirect("/admin/delete/question");
    });
});
//----------------------------------------------------------------------------------------------------------

// Sets Related -----------------------------------------------------------------------------------------------------------

app.get("/admin/add/sets", async (req, res) => {
    let url = {
        url: clientRoute,
        serverurl: serverRoute,
    };

    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        if (body.success) {
            res.render("sets", { data: url, token: req.cookies.token });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/admin/add/set", async (req, res) => {
    let url = {
        url: clientRoute,
        serverurl: serverRoute,
    };

    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        if (body.success) {
            res.render("sets2", { data: url, token: req.cookies.token });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

// ---------------------------------------------------------------------------------------------------------------------


// Contests Related -----------------------------------------------------------------------------------------------------------

app.get("/admin/add/contest", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        let url = {
            url: clientRoute,
            serverurl: serverRoute,
        };
        if (body.success) {
            res.render("contestadd", { data: url, token: req.cookies.token });
        } else {
            body.message = "Unauthorized access";
            console.log("token " + req.cookies.token);
            res.render("error", {
                data: body,
                imgUsername: req.cookies.username,
            });
        }
    });
});

app.get("/admin/edit/contest", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        if (body.success) {
            body.posturl = clientRoute + "/contestEdit";
            body.url = clientRoute;
            body.method = "POST";
            body.class = "btn-green";
            body.title = "Editing";
            body.subtitle = "Contests";
            body.username = req.cookies.username;
            res.render("search", { data: body });
        } else {
            body.message = "Unauthorized access";
            console.log("token " + req.cookies.token);
            res.render("error", {
                data: body,
                imgUsername: req.cookies.username,
            });
        }
    });
});

app.post("/contestEdit", async (req, res) => {
    let contestId = req.body.contestId;
    let options = {
        url: serverRoute + "/isAdmin",

        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        if (body.success) {
            let options = {
                url: serverRoute + "/contests/" + contestId,
                method: "get",
                headers: {
                    authorization: req.cookies.token,
                },
                json: true,
            };

            request(options, function (err, response, body) {
                if (!("success" in body)) {
                    body[0].serverurl = serverRoute;
                    res.render("contestUpdate", {
                        data: body[0],
                        token: req.cookies.token,
                    });
                } else {
                    body.message = "Unauthorized access";
                    res.render("error", {
                        data: body,
                        imgUsername: req.cookies.username,
                    });
                }
            });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/admin/delete/contest", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        body.posturl = clientRoute + "/contestDelete";
        body.url = clientRoute;
        body.method = "POST";
        body.class = "btn-danger";
        body.title = "Delete";
        res.render("dropdown", { data: body });
    });
});

app.post("/contestDelete", async (req, res) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        let options1 = {
            url: serverRoute + "/contests/" + req.body.contestId,
            method: "delete",
            body: {
                contestId: req.body.contestId,
                token: req.cookies.token,
            },
            headers: {
                authorization: req.cookies.token,
            },
            json: true,
        };

        request(options1, function (err, response, body) {
            res.redirect("/admin/delete/contest");
        });
    });
});

app.get("/contest", checkSignIn, async (req, res, next) => {
    let options = {
        url: serverRoute + "/contests/user/" + req.cookies.username.toLowerCase(),
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        body: {
            mcq: false,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        res.clearCookie("courseId");
        res.render("contest/contest", { imgUsername: req.cookies.username, data: body });
    });
});

app.get("/contestPassword/:contestId", checkSignIn, async (req, res) => {
    res.render("contest/contestPassword", {
        imgUsername: req.cookies.username,
        contestId: req.params.contestId,
        token: req.cookies.token,
    });
});

app.post("/checkContestPassword", checkSignIn, async (req, res) => {
    req.body.rollNumber = req.cookies.username;
    let options = {
        url: serverRoute + "/checkContestPassword",
        method: "post",
        headers: {
            authorization: req.cookies.token,
        },
        body: req.body,
        json: true,
    };
    request(options, function (err, response, body) {
        if (body.success) {
            a = "/contests/" + body.contestId;
            res.redirect(a);
        } else {
            res.redirect("/contest");
        }
    });
});

app.get("/contests/:contestId", checkSignIn, async (req, res, next) => {
    // check if contest is open
    console.log("HERE")
    let options = {
        url: serverRoute + "/isOngoing",
        method: "post",
        headers: {
            authorization: req.cookies.token,
        },
        body: {
            contestId: req.params.contestId,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        console.log(body, "2")
        console.log(req.cookies);
        if (body.success) {
            // Add participation
            let options1 = {
                url: serverRoute + "/participations",
                method: "post",
                headers: {
                    authorization: req.cookies.token,
                },
                body: {
                    contestId: req.params.contestId,
                    branch: req.cookies.branch ? req.cookies.branch : "",
                },
                json: true,
            };

            request(options1, function (err, response, body) {
                console.log("came here");
                let options2 = {
                    url: serverRoute + "/questions/contests/" + req.params.contestId,
                    method: "get",
                    headers: {
                        authorization: req.cookies.token,
                    },
                    json: true,
                };
                // Get questions for contest
                request(options2, function (err, response, body) {
                    res.cookie("contestId", req.params.contestId);
                    let options3 = {
                        url: serverRoute + "/participations/" + req.params.contestId,
                        method: "get",
                        headers: {
                            authorization: req.cookies.token,
                        },
                        json: true,
                    };
                    // get participation details
                    request(options3, function (err, response, bodytimer) {
                        bodytimer = bodytimer[0];
                        let questions = [];
                        let scores = [];
                        for (let i = 0; i < body.length; i++) {
                            questions[i] = body[i].questionId;
                        }
                        for (let i = 0; i < questions.length; i++) {
                            let maxScore = 0;
                            for (let j = 0; j < bodytimer.submissionResults.length; j++) {
                                if (
                                    bodytimer.submissionResults[j].questionId === questions[i]
                                ) {
                                    if (maxScore < bodytimer.submissionResults[j].score) {
                                        maxScore = bodytimer.submissionResults[j].score;
                                    }
                                }
                            }
                            scores[i] = maxScore;
                        }
                        for (let i = 0; i < body.length; i++) {
                            for (let j = 0; j < questions.length; j++) {
                                if (body[i].questionId === questions[j]) {
                                    body[i].score = scores[j];
                                }
                            }
                        }
                        for (let i = 0; i < body.length; i++) {
                            if (body[i].score === 100) {
                                body[i].color = "green";
                            } else if (body[i].score === 50) {
                                body[i].color = "orange";
                            } else if (body[i].score === 25) {
                                body[i].color = "red";
                            } else {
                                body[i].color = "black";
                            }
                        }
                        imageUrl = imageRetrive(req, res);
                        body.contestId = req.params.contestId;
                        res.render("questions", {
                            imgUsername: req.cookies.username,
                            data: body,
                            datatimer: bodytimer,
                            imgUrl: imageUrl,
                            serverUrl: serverRoute,
                            token: req.cookies.token,
                        });
                    });
                });
            });
        } else {
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.post("/endContest/:contestId", async (req, res) => {
    let options = {
        url: serverRoute + "/endContest",
        method: "post",
        headers: {
            authorization: req.cookies.token,
        },
        body: {
            contestId: req.params.contestId,
            username: req.cookies.username,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        res.redirect("/contest");
    });
});

app.get(
    "/contests/questions/:questionId",
    checkSignIn,
    async (req, res, next) => {
        let options = {
            url: serverRoute + "/questions/" + req.params.questionId,
            method: "get",
            headers: {
                authorization: req.cookies.token,
            },
            json: true,
        };
        request(options, function (err, response, body) {
            body.url = clientRoute;
            res.render("question/questionDesc", {
                imgUsername: req.cookies.username,
                data: body,
            });
        });
    }
);

// Contests Related -----------------------------------------------------------------------------------------------------------



// Users Related -----------------------------------------------------------------------------------------------------------

app.get("/admin/manageUsers", async (req, res) => {
    let options = {
        url: serverRoute + "/admin/users",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        body.url = clientRoute;
        body.serverurl = serverRoute;
        for (let i = 0; i < body.length; i++) {
            if (!body[i].isVerified) {
                body[i].color = "pink";
            }
        }
        res.render("manageUsers", { data: body });
    });
});

app.get("/admin/unVerifiedUsers", async (req, res) => {
    let options = {
        url: serverRoute + "/admin/users",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        var unverified_users = [];
        for (let i = 0; i < body.length; i++) {
            if (!body[i].isVerified && !body[i].admin) {
                body[i].color = "pink";
                unverified_users.push(body[i]);
            }
        }
        unverified_users.url = clientRoute;
        unverified_users.serverurl = serverRoute;
        res.render("unVerifiedUsers", {
            data: unverified_users,
            token: req.cookies.token,
        });
    });
});

app.get("/admin/deleteuser/:username", async (req, res) => {
    let options = {
        url: serverRoute + "/users/" + req.params.username,
        method: "delete",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };
    request(options, function (err, response, body) {
        res.redirect("/admin/manageUsers");
    });
});

app.get("/userSession/:sessionId", (req, res) => {
    if (userSessions2.includes(req.params.sessionId))
        res.status(200).send({ status: true });
    else res.status(404).send({ status: false, message: "user logged out!" });
});

// Users Related -----------------------------------------------------------------------------------------------------------

// Results Related -----------------------------------------------------------------------------------------------------------

app.get("/admin/results", async (req, res) => {
    let options = {
        url: serverRoute + "/contests",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        body.posturl = clientRoute + "/admin/results/contest";
        body.url = clientRoute;
        body.method = "POST";
        res.render("dropdown", { data: body });
    });
});

app.post("/admin/results/contest", async (req, res) => {
    let options = {
        url: serverRoute + "/participations/all",
        method: "post",
        body: {
            contestId: req.body.contestId,
        },
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, bodyParticipation) {
        console.log(bodyParticipation);
        let options = {
            url: serverRoute + "/questions/contests/" + req.body.contestId,
            method: "get",
            headers: {
                authorization: req.cookies.token,
            },
            json: true,
        };

        request(options, function (err, response, bodyQuestion) {
            let url = {
                url: clientRoute,
            };
            res.render("results", {
                data: url,
                datap: bodyParticipation,
                dataq: bodyQuestion,
            });
        });
    });
});

app.get("/admin/solved", async (req, res) => {
    let options = {
        url: serverRoute + "/getSolvedCount",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        let url = {
            url: clientRoute,
        };
        res.render("solvedCount", {
            data: url,
            solved: body,
        });
    });
});

app.get(
    "/contests/:contestId/leaderboard",
    checkSignIn,
    async (req, res, next) => {
        let options = {
            url: serverRoute + "/participations/all",
            method: "post",
            body: {
                contestId: req.params.contestId,
            },
            headers: {
                authorization: req.cookies.token,
            },
            json: true,
        };
        request(options, function (err, response, bodyparticipation) {
            let options = {
                url: serverRoute + "/questions/contests/" + req.params.contestId,
                method: "get",
                headers: {
                    authorization: req.cookies.token,
                },
                json: true,
            };

            request(options, function (err, response, bodyquestion) {
                let url = {
                    url: clientRoute,
                };
                res.render("results_public2", {
                    data: url,
                    datap: bodyparticipation,
                    dataq: bodyquestion,
                });
            });
        });
    }
);

// Results Related -----------------------------------------------------------------------------------------------------------

app.get("/admin", checkSignIn, async (req, res, next) => {
    let options = {
        url: serverRoute + "/isAdmin",
        method: "get",
        headers: {
            authorization: req.cookies.token,
        },
        json: true,
    };

    request(options, function (err, response, body) {
        let url = {
            url: clientRoute,
            serverurl: serverRoute,
        };
        if (body.success) {
            res.render("contest/contestAdd", { data: url, token: req.cookies.token });
        } else {
            body.message = "Unauthorized access";
            res.render("error", { data: body, imgUsername: req.cookies.username });
        }
    });
});

app.get("/ide/:questionId", checkSignIn, async (req, res, next) => {
    let questionId = req.params.questionId;
    res.sendFile(path.resolve("../IDE/index.html"));
});

app.get("/extendUserTime", async (req, res) => {
    let data = {
        url: clientRoute,
        serverurl: serverRoute,
    };
    res.render("changeValidTill", { data, token: req.cookies.token });
});


app.get("*", async (req, res) => {
    res.render("404page");
});

app.listen(4000);
console.log("Server @ port 4000");


