'use strict';

const pg = require('pg');

var constring = "tcp://postgres:123456@localhost/team247";

const db = new pg.Client(constring);
client.connect();

export default db;
