const express = require('express');
const router = express.Router();
require('dotenv').config();

const { User } = require('../../models/user');
const { checkLoggedIn } = require('../../middleware/auth');
const { grantAccess } = require('../../middleware/roles');
const {getUserProps} = require('../../utils')
const { contactMail, registerEmail } = require('../../config/email')

router.route('/register').post(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = new User({
            email,
            password
        });

        if (await User.emailTaken(email)) return res.status(400).json({message: 'Email already taken'})
        const token = user.generateToken();
        const doc = await user.save();

        const emailToken = user.generateRegisterToken();
        await registerEmail(doc.email, emailToken)

        res
            .cookie('x-access-token', token)
            .status(200)
            .send({...getUserProps(doc)});

    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
});

router.route('/sign-in').post(async (req, res, ) => {
    const { email , password } = req.body;
    try {
        const doc = await User.findOne({email});
        if (!doc) return res.status(400).json({message: 'There is no such user'});

        const compare = await doc.comparePassword(password);
        if (!compare) return res.status(400).json({message: 'Bad password'});

        const token = doc.generateToken();
        res
            .cookie('x-access-token', token)
            .status(200)
            .send({...getUserProps(doc)});
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
});

router.route('/profile')
    .get(checkLoggedIn, grantAccess('readOwn', 'profile'), async (req, res) => {
    try {
        const {permission} = res.locals;
        const user = await User.findById(req.user._id);
        if (!user) return res.status(400).json({message: 'User not found'})
        res.status(200).json(permission.filter(user._doc))
        // next();
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
    }).patch(checkLoggedIn, grantAccess('updateOwn', 'profile'), async (req, res) => {
    try {
        const {firstname, lastname, age} = req.body;
        const user = await User.findByIdAndUpdate(
            {_id: req.user._id},
            {'$set': {firstname, lastname, age}},
            {new: true}
        )
        if (!user) return res.status(400).json({message: 'User not found'});
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({message: 'Error', error})
    }
});

router.route('/is-auth')
    .get(checkLoggedIn,async (req,res) =>{
        res.status(200).send(getUserProps(req.user))
    })

router.route('/update-email').patch(checkLoggedIn, grantAccess('readOwn', 'profile'), async (req, res) => {
    try {
        const {email} = req.body;
        if (!email)  return res.status(400).json({message: 'There is no email'});
        if (await User.emailTaken(email)) {
            return res.status(400).json({message: 'Sorry email unavailable'});
        }

        const user = await User.findOneAndUpdate(
            {_id: req.user._id},
            {'$set': {email}},
            {new: true}
        )
        if (!user) return res.status(400).json({message: 'User not found'});

        const token = user.generateToken();
        res
            .cookie('x-access-token', token)
            .status(200).json(user.email);
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/contact').post(checkLoggedIn, async (req, res) => {
    try {
        const {body} = req;
        const resp = await contactMail(body);

        if(resp) {
            res.status(200).json({message: 'Email send'});
        }
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

router.route('/verify').get(async (req, res) => {
    try {
       const token = User.validateToken(req.query.validation);
       const user = await User.findById(token._id);
       if (!user) {
           return res.status(400).json({message: 'User not found!'})
       }
        console.log('user.verified', user.verified);
        if (user.verified) {
           return res.status(400).json({message: 'User already verified!'})
       }

        user.verified = true
        const updatedUser = await user.save();

        return res.status(200).json(updatedUser)
    } catch (error) {
        res.status(400).json({message: 'Error', error});
    }
});

module.exports = router;