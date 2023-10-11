window.global ||= window;

const envPath = import.meta.env.MODE === 'production' ? '.env.prod' : '.env.local';
// require('dotenv').config({ path: envPath });
import { config } from 'dotenv';
config({ path: envPath });

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const express = require('express');
// const listener = require('../utils/listener');
// const mongoose = require('mongoose');
// const morgan = require('morgan');
// const router = require('./routes');

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import listener from '../utils/listener';
import mongoose from 'mongoose';
import morgan from 'morgan';
import router from './routes';

const { MODE, MONGODB_URI, PORT } = import.meta.env;

// db
const db = MONGODB_URI;
mongoose.Promise = global.Promise;
mongoose.connect(db);

// server
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(router);

const port = PORT || 3000;
app.listen(port, () => listener(port, db, MODE));

export default app;
