'use strict';
// const fs = require('fs');
import fs from 'fs';
fs.createReadStream('.env.example').pipe(fs.createWriteStream('.env.local'));
fs.createReadStream('.env.example').pipe(fs.createWriteStream('.env.prod'));
