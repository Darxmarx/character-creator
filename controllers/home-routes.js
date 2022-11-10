// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character, Abilities } = require('../models');
const authorizeUser = require ('../utils/auth');
