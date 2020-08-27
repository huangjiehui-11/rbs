/**
 * RbsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    // json function
    json: async function(req, res) {

        var rbs = await Rbs.find({
            where: { highlighted: true },
            sort: 'updatedAt DESC',
        });
        return res.json(rbs);
    },

    getall: async function(req, res) {

        var rbs = await Rbs.find({
            sort: 'updatedAt DESC',
        });
        return res.json(rbs);
    },

    mybookings: async function(req, res) {
        if (req.method == "GET") {

            userId = parseInt(req.query.userId);
            if (userId == undefined || isNaN(userId)) {
                userId = req.session.userid
            };

            if (userId != undefined) {

                const thatUser = await User.findOne(userId).populate("supervises");

                return res.json(thatUser.supervises);
            }
        }
        return res.forbidden();
    },

    reservation: async function(req, res) {
        if (req.method == "GET") return res.forbidden();

        console.log(req.body);

        userId = parseInt(req.body.userId);
        if (userId == undefined || isNaN(userId)) {
            userId = req.session.userid
        };

        resId = parseInt(req.body.resId)

        var thatRes = await Rbs.findOne(resId).populate("worksFor");
        available_books = thatRes.maxbooking - thatRes.worksFor.length;
        if (available_books <= 0) {
            return res.send("Full");
        }

        await User.addToCollection(userId, "supervises").members(resId);
        return res.send('Operation completed.');
    },

    create: async function(req, res) {
        if (req.method == "GET") {
            return res.view('rbs/create');
        }
        // console.log(req.body);
        if (!req.body)
            return res.badRequest("Form-data not received.");

        var model = req.body;
        if (!model.highlighted) {
            model.highlighted = false;
        } else {
            model.highlighted = true;
        }
        // console.log(model);

        await Rbs.create(model);

        return res.ok("Successfully created!");
    },

    // action - index
    index: async function(req, res) {
        var models = await Rbs.find({
            where: { highlighted: true },
            sort: 'updatedAt DESC',
            limit: 4,
        });

        // console.log(req.session.role);

        return res.view('rbs/index', { rbs: models });
    },

    // action - detail
    detail: async function(req, res) {

        var item = await Rbs.findOne(req.params.id);

        if (!item) return res.notFound();
        //console.log(model.location);
        return res.view('rbs/detail', { rbs: item });
    },

    admin: async function(req, res) {
        var items = await Rbs.find();
        return res.view('rbs/admin', { models: items });
    },

    // action - update
    update: async function(req, res) {


        if (req.method == "GET") {

            var model = await Rbs.findOne(req.params.id);

            if (!model) return res.notFound();

            //console.log('MODEL', model);

            return res.view('rbs/update', { rbs: model });


        } else {

            //console.log('BODY', req.body);

            if (!req.body.Rbs)
                return res.badRequest("Form-data not received.");

            var models = await Rbs.update(req.params.id).set({
                name: req.body.Rbs.name,
                discription: req.body.Rbs.discription,
                location: req.body.Rbs.location,
                cuisine: req.body.Rbs.cuisine,
                imageURL: req.body.Rbs.imageURL,
                rating: req.body.Rbs.rating,
                min: req.body.Rbs.min,
                max: req.body.Rbs.max,
                maxbooking: req.body.Rbs.maxbooking,
                highlighted: req.body.Rbs.highlighted,
            }).fetch();

            if (models.length == 0) return res.notFound();

            return res.ok("Record updated");

        }
    },

    // action - delete 
    delete: async function(req, res) {

        if (req.method == "GET") return res.forbidden();

        var models = await Rbs.destroy(req.params.id).fetch();

        if (models.length == 0) return res.notFound();
        return res.ok("Restaurant Deleted.");


    },

    search: async function(req, res) {
        if (req.method == "GET") {
            const qPage = Math.max(req.query.page - 1, 0) || 0;
            const numOfItemsPerPage = 2;
            if (req.query.searchBody != undefined) {
                var items_count = await Rbs.count({});
                var items = await Rbs.find({
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });
                var numOfPage = Math.ceil(await items_count / numOfItemsPerPage);
            } else {
                var items = await Rbs.find({
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });
                var newtext = "";
                var numOfPage = Math.ceil(await Rbs.count() / numOfItemsPerPage);
            }

            return res.view('rbs/search', { models: items, count: numOfPage });
        }
        return res.badRequest("Wrong Method.");
    },

    search_items: async function(req, res) {
        //console.log("IF1");
        if (req.method == "POST") {

            //console.log("IF1");
            const qPage = Math.max(req.query.page - 1, 0) || 0;
            const numOfItemsPerPage = 2;

            console.log(req.body)
            var model = req.body.searchBody


            // var test1 = await Rbs.find({
            //     where: {
            //         location: { contains: model.location },
            //         name: { contains: model.name },
            //         cuisine: { contains: model.cuisine },
            //         min: { "<=": parseInt(model.price_max) },
            //         max: { ">=": parseInt(model.price_min) },
            //         rating: { ">=": parseInt(model.rating_min), "<=": parseInt(model.rating_max) }
            //     },
            // });
            // console.log("TSET", test1.length);
            //console.log("IF2");
            if (req.body.searchBody != undefined) {
                //console.log("IF2");
                var items_count = await Rbs.count({
                    where: {
                        location: { contains: model.location },
                        name: { contains: model.name },
                        cuisine: { contains: model.cuisine },
                        min: { "<=": parseInt(model.price_max) },
                        max: { ">=": parseInt(model.price_min) },
                        rating: { ">=": parseInt(model.rating_min), "<=": parseInt(model.rating_max) }
                    },
                });
                //console.log("ITEMS_COUNT1");
                var items = await Rbs.find({
                    where: {
                        location: { contains: model.location },
                        name: { contains: model.name },
                        cuisine: { contains: model.cuisine },
                        min: { "<=": parseInt(model.price_max) },
                        max: { ">=": parseInt(model.price_min) },
                        rating: { ">=": parseInt(model.rating_min), "<=": parseInt(model.rating_max) }
                    },
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });
                //console.log("IIII2");
                var numOfPage = Math.ceil(await items_count / numOfItemsPerPage);
                //console.log("NUMofpage", numOfPage);
            } else {
                var items = await Rbs.find({
                    limit: numOfItemsPerPage,
                    skip: numOfItemsPerPage * qPage
                });
                //console.log("3")
                //var newtext = "";
                var numOfPage = Math.ceil(await Rbs.count() / numOfItemsPerPage);
            }

            return res.view('rbs/search_items', { models: items, count: numOfPage, rbs: model });

        }
        return res.badRequest("Wrong Method.");
    },

    bookStatus: async function(req, res) {
        if (req.method == "GET") {

            userId = parseInt(req.query.userId);
            if (userId == undefined || isNaN(userId)) {
                userId = req.session.userid
            };

            // if (!await User.findOne(userId)) {
            //     return res.status(401).send("user not found");
            // }

            resId = parseInt(req.query.resId);

            // if (!await RealEstateCell.findOne(estateId)) {
            //     return res.status(401).send("estate not found");
            // }

            const thatUser = await User.findOne(userId).populate("supervises", { id: resId });

            if (thatUser.supervises.length) {
                return res.send("Booked");
            } else {
                return res.send("unBooked");
            }
        }
        return res.forbidden();
    },

    add_book: async function(req, res) {
        if (req.method == "GET") return res.forbidden();

        console.log(req.body);

        userId = parseInt(req.body.userId);
        if (userId == undefined || isNaN(userId)) {
            userId = req.session.userid
        };

        // if (!await User.findOne(userId)) {
        //     return res.status(401).send("user not found");
        // }

        resId = parseInt(req.body.resId)

        // if (!await Rbs.findOne(resId)) {
        //     return res.status(401).send("restaurant not found");
        // }

        // const thatUser = await User.findOne(userId).populate("supervises", { id: resId });

        // if (thatUser.supervises.length) {
        //     return res.send("Allready Booked");
        // }

        var thatRes = await Rbs.findOne(resId).populate("worksFor");
        available_books = thatRes.maxbooking - thatRes.worksFor.length;
        if (available_books <= 0) {
            return res.send("Full");
        }

        await User.addToCollection(userId, "supervises").members(resId);
        return res.send('Operation completed.');
    },

    delete_book: async function(req, res) {
        if (req.method == "GET") return res.forbidden();

        userId = parseInt(req.params.userId);
        if (userId == undefined || isNaN(userId)) {
            userId = req.session.userid
        };

        // if (!await User.findOne(userId)) {
        //     return res.status(401).send("user not found");
        // }

        resId = parseInt(req.params.resId)
        if (resId == undefined || isNaN(resId)) {
            resId = parseInt(req.body.resId);
        }
        // if (!await Rbs.findOne(resId)) {
        //     return res.status(401).send("restaurant not found");
        // }

        const thatUser = await User.findOne(userId).populate("supervises", { id: resId });

        if (!thatUser.supervises.length) {
            return res.send("Nothing to delete.");
        }

        await User.removeFromCollection(userId, "supervises").members(resId);

        return res.ok('Operation completed.');
    },

    bookState: async function(req, res) {
        if (req.method == "GET") {
            // console.log(req.query);

            userId = parseInt(req.query.userId);
            if (userId == undefined || isNaN(userId)) {
                userId = req.session.userid
            };

            if (userId != undefined) {
                if (!await User.findOne(userId)) {
                    return res.status(401).send("user not found");
                }

                const thatUser = await User.findOne(userId).populate("supervises");

                // console.log(thatUser);

                return res.view('Rbs/myBooking', { models: thatUser });
            }
        }
        return res.forbidden();
    },

    bookings: async function(req, res) {
        if (req.method == "GET") {
            // console.log(req.query);

            resId = parseInt(req.query.resId)
            if (!await Rbs.findOne(resId)) {
                return res.status(401).send("Restaurant not found");
            }

            const items = await Rbs.findOne(resId).populate("worksFor");

            // console.log(thatEstate.rented);

            return res.view('Rbs/bookings', { model: items });
        }
        return res.forbidden();
    },



};