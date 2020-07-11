import config from './config';
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
import User from './models/userModel';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

const strategyOptions = {
    callbackURL: config.SERVER_API_URL + '/users/google/redirect',
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET
}

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    try {      
        const currentUser = await User.findOne({
            email: profile.email
        })
        if(currentUser){
            console.log(`user is: ${currentUser}`)
            done(null, currentUser);
        } else {
            const user = new User({
                name: profile.displayName,
                email: profile.email,
                password: profile.id,
                isAdmin: true
            })
            const newUser = await user.save();
            console.log(`new user created: ${newUser}`);
            done(null, newUser);
        }
    } catch (error) {
        console.log(error);
    }
}

passport.use(new GoogleStrategy(strategyOptions, verifyCallback));