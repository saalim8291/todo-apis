const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 1,
  },
});

const Counter = mongoose.model("counter", schema);
