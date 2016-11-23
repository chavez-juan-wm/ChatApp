/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index: function (req, res) {
        res.view();
    },
    signup: function (req, res) {
        var username = req.param("username");
        var password = req.param("password");

        Users.find(username).done(function(err, usr){
            if (err) {
                res.send(500, { error: "DB Error" });
            } else if (usr) {
                res.send(400, {error: "Username already Taken"});
            } else {
                var hasher = require("password-hash");
                password = hasher.generate(password);

                Users.create({username: username, password: password}).done(function(error, user) {
                    if (error) {
                        res.send(500, {error: "DB Error"});
                    } else {
                        req.session.user = user;
                        res.send(user);
                    }
                });
            }
        });
    },
    login: function (req, res) {

    },
    chat: function (req, res) {

    }
};