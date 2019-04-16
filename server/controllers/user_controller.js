const User = require('../models/user');
const axios = require('axios');

module.exports = {
    readUserData(req, res) {
        //Get the session, for update the reducer.
        res.status(200).json({user: req.session.user});
    },
    addToCart(req, res) {
    },
    removeFromCart(req, res) {

    },

    login(req, res) {
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, {
            client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
            code: req.query.code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        }).then(accessTokenResponse => {
            const accessToken = accessTokenResponse.data.access_token;
            console.log(accessToken)
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`).then(userDataResponse => {
                const {name, nickname, email, picture, sub} = userDataResponse.data;
                console.log('user data--------', userDataResponse.data);
                User.findOne({auth0_id: sub}, (err, user) => {
                    if (err) {
                        console.log('Login Error--------------', err);
                    }
                    if (!user) {                    // If the user is undefined
                        let newUser = new User({    // Create a new user
                            name: name,
                            email: email,
                            username: nickname,
                            profile_picture: picture,
                            auth0_id: sub
                        });
                        req.session.user = newUser; // Assign the user to the session
                        req.session.save();         // Save the session
                        newUser.save();             // Save the newUser instance to MongoDB
                    }
                    req.session.user = user;
                    req.session.save();
                    res.redirect('/');
                })
            }).catch(err => console.log('Auth0 get user info Error------------', err));
        }).catch(err => console.log('Auth0 Axios Post backend Error------------', err));
    },
    logout(req, res) {
        //Destroy the session, which logout the user, since when the user session is undefined the redux also logout's
        // the user in the frontend.
        req.session.destroy();
        //Send a message informing  a user successfully logged out.
        res.status(200).json({message: 'Logout Successfully!'});
    }
};