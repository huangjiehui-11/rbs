/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    //'/': { view: 'pages/homepage' },
    '/': 'RbsController.index',


    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/



    'GET /rbs/json': 'RbsController.json',
    'GET /rbs/getall': 'RbsController.getall',
    'POST /user/login': 'UserController.applogin',
    'POST /user/logout': 'UserController.applogout',
    'GET /rbs/mybookings': 'RbsController.mybookings',
    'POST /rbs/reservation': 'RbsController.reservation',



    'GET /rbs/index': 'RbsController.index',

    'GET /rbs/create': 'RbsController.create',
    'POST /rbs/create': 'RbsController.create',

    'GET /rbs/detail/:id': 'RbsController.detail',
    'GET /rbs/admin': 'RbsController.admin',

    'GET /rbs/update/:id': 'RbsController.update',
    'POST /rbs/update/:id': 'RbsController.update',
    'POST /rbs/delete/:id': 'RbsController.delete',


    'GET /rbs/search': 'RbsController.search',
    'POST /rbs/search_items': 'RbsController.search_items',

    'GET /user/login': 'UserController.login',
    'POST /user/login': 'UserController.login',
    'POST /user/logout': 'UserController.logout',

    'GET /rbs/bookStatus': 'RbsController.bookStatus',
    'POST /rbs/book_add': 'RbsController.add_book',

    'POST /rbs/book_delete': 'RbsController.delete_book',
    'DELETE /rbs/book_delete/:userId/:resId': 'RbsController.delete_book',

    'GET /rbs/bookState': 'RbsController.bookState',
    'GET /rbs/bookings': 'RbsController.bookings',





};