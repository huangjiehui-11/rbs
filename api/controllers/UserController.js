/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    applogin: async function(req, res) {

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails_bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function(err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            //req.session.role = user.role;
            req.session.userid = user.id;

            // return res.ok("Login successfully.");
            // return res.json({url: req.headers.referer, message: "Login successfully."});
            return res.json(user);
        });
    },

    applogout: async function(req, res) {

        req.session.destroy(function(err) {
            if (err) return res.serverError(err);

            // return res.ok("Log out successfully.");
            return res.json({ message: "Log out successfully." });
        });
    },

    login: async function(req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails_bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function(err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.role = user.role;
            req.session.userid = user.id;

            sails.log("[Session] ", req.session);

            // return res.ok("Login successfully.");
            // return res.json({url: req.headers.referer, message: "Login successfully."});
            return res.json({ message: "Login successfully." });
        });
    },

    logout: async function(req, res) {

        req.session.destroy(function(err) {
            if (err) return res.serverError(err);

            // return res.ok("Log out successfully.");
            return res.json({ message: "Log out successfully." });
        });
    },


};