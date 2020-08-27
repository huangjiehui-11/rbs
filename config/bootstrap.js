/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */


sails_bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports.bootstrap = async function() {

    // By convention, this is a good place to set up fake data during development.
    //
    // For example:
    // ```
    // // Set up fake development data (or if we already have some, avast)
    // if (await User.count() > 0) {
    //   return;
    // }
    //
    // await User.createEach([
    //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
    //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
    //   // etc.
    // ]);
    // ```
    if (await Rbs.count() > 0) {
        return;
    } else {
        await Rbs.createEach([{
                name: "Gelato-go",
                discription: "Located at Nathan Road at Tsim Sha Tsui, Gelato-go goes to all ends to use ingredients only of the highest quality when it comes to mixing their gelato - pistachios from Bronte, Sicily.",
                location: "Tsim Sha Tsui",
                cuisine: "Italian",
                imageURL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582090939164&di=d7418145c298fcd8ffd8062aee873827&imgtype=0&src=http%3A%2F%2Fc3.nychinaren.com%2Fimages%2Fdeals%2Flarge700X420%2F6__25363__65272.jpg",
                rating: 5,
                min: 28,
                max: 52,
                maxbooking: 1,
                highlighted: "false"
            },
            {
                name: "Hands-On Coffee",
                discription: "Located on the third floor of China Mobile Flagship Store, Hands-On Coffee is the place to sip a cup of perfect coffee amidst the city’s busiest district on Sai Yeung Choi Street South.",
                location: "Mong Kok",
                cuisine: "Western",
                imageURL: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2688546842,2596930900&fm=15&gp=0.jpg",
                rating: 4,
                min: 63,
                max: 132,
                maxbooking: 4,
                highlighted: "false"
            },
            {
                name: "Zenon Cafe",
                discription: "Tucked away in a chic and stylish space on Wellington Road in Central, Zenon is a boutique cafe that is known for its Italian Coffee and American-influenced sandwiches.",
                location: "Central",
                cuisine: "Western",
                imageURL: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2379918406,777021787&fm=15&gp=0.jpg",
                rating: 3,
                min: 59,
                max: 161,
                maxbooking: 1,
                highlighted: "true"
            },
            {
                name: "Kim's Bowl @ Admiralty",
                discription: "Located in Admiralty , Kim’s Bowl exemplifies how traditional Korean cuisine has been revitalized by contemporary concepts.",
                location: "Admiralty",
                cuisine: "Korean",
                imageURL: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=523331394,4270595353&fm=15&gp=0.jpg",
                rating: 4,
                min: 53,
                max: 71,
                maxbooking: 228,
                highlighted: "false"
            },
            {
                name: "PizzaExpress @ Tseung Kwan O",
                discription: "PizzaExpress is really proud of its pizzas, its love for music and supporting meaningful causes in the community.",
                location: "Tseung Kwan O",
                cuisine: "Pizza",
                imageURL: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3393559823,1094442882&fm=26&gp=0.jpg",
                rating: 5,
                min: 45,
                max: 179,
                maxbooking: 3381,
                highlighted: "true"
            },
            {
                name: "Eiffel Bistro",
                discription: "Ideal for get-togethers with family and friends, Eiffel Bistro serves French food, with signatures like roasted halibut with fennel and rocket leaves in vierge sauce and French veal stew.",
                location: "Tai Koo",
                cuisine: "French",
                imageURL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582091137759&di=469d1c0d74225ad19d7e1dac5f8a9344&imgtype=0&src=http%3A%2F%2Fassets.diningcity.cn%2Frestaurantpictures%2F2049130_7ef73687d6_logo.jpg_800x800",
                rating: 2,
                min: 71,
                max: 183,
                maxbooking: 2519,
                highlighted: "true"
            },
            {
                name: "Dim Sum Heritage",
                discription: "Located on Morrison Hill Road in Wan Chai, Dim Sum Heritage aims to bring dim sum experience to a whole new level by infusing innovation, flavors and classics into the dishes.",
                location: "Wan Chai",
                cuisine: "Dim Sum",
                imageURL: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1558549042,736661686&fm=15&gp=0.jpg",
                rating: 4,
                min: 26,
                max: 35,
                maxbooking: 854,
                highlighted: "true"
            },
            {
                name: "Fung Shing Restaurant @ Causeway Bay",
                discription: "Located in Causeway Bay, Fung Shing Restaurant has successfully infused contemporary-style flavours into revamped Cantonese classics on Leighton Road.",
                location: "Causeway Bay",
                cuisine: "Chinese",
                imageURL: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3888277337,744161017&fm=15&gp=0.jpg",
                rating: 3,
                min: 22,
                max: 206,
                maxbooking: 679,
                highlighted: "false"
            },
            {
                name: "WM Café & Bar @ HK Science Park",
                discription: "Located in Sha Tin, WM Café and Bar?offers refreshing Western tastes for diners at Tai Po and Science Park.",
                location: "Sha Tin",
                cuisine: "Western",
                imageURL: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582091197624&di=6880f4d62ff5a95d4a61d505b88d39d4&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fpoi%2F1606%2F39%2F6084b97687c123db.jpg_480x360x95_da7aebb7.jpg",
                rating: 4,
                min: 53,
                max: 98,
                maxbooking: 218,
                highlighted: "true"
            },
            {
                name: "Flying Pig Bistro",
                discription: "Decked in urban art, Flying Pig Bistro specially imports their ingredients to achieve authenticity in the European mains they serve.",
                location: "Sai Ying Pun",
                cuisine: "International",
                imageURL: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3057214767,4133546279&fm=15&gp=0.jpg",
                rating: 4,
                min: 161,
                max: 269,
                maxbooking: 1085,
                highlighted: "false"
            },
        ]);
    }

    if (await User.count() > 0) {
        return;
    } else {

        const hash = await sails_bcrypt.hash('123456', saltRounds);

        await User.createEach([
            { username: "admin", password: hash, role: "admin" },
            { username: "huangjiehui", password: hash, role: "member" },
            { username: "xguy", password: hash, role: "member" },
        ]);

    }

};