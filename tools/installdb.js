import path from 'path';
import Promise from 'bluebird';
import mongoose from 'mongoose';

async function installdb() {
  mongoose.connect('mongodb://localhost/test_db');
}

export default installdb;