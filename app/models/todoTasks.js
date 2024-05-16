const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    subTitle: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const users = new mongoose.model("todoTasks", schema);

module.exports = users;
