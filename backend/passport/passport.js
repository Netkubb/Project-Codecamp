var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Netkubb';

const db = require('./../database/models');

passport.use("a", new JwtStrategy(opts, async function (payload, done) {
    // console.log("payload = "+payload.id)
    const data = await db.user.findOne({ where: { id: payload.id } });
    // console.log(a);
    if (data) {
        return done(null, data);
    } else {
        return done(null, false);
        // or you could create a new account
    }
    // return done(null,"hey")
}));