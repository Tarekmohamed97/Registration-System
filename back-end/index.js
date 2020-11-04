const express = require('express');
const mongoose = require('mongoose');
const cors = reuqire('cors');
require('dotenv').config();

//setup express

const app = express();
app.use(express.json());
app.use(cors());