// set up router, models required, and authorizeUser
const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');
const authorizeUser = require('../utils/auth');