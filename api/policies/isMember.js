module.exports = async function(req, res, proceed) {

    var user = await User.findOne({ username: req.session.username });

    if (user) {
        if (user.role == 'member') {
            return proceed();
        }
    }

    //--•
    // Otherwise, this request did not come from a logged-in user.
    return res.forbidden();

};