const mongoose = require("mongoose");

const instance = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    userid: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    photo_index: {
      type: Number,
    },
    photo_type: {
      type: Number,
    },
    facebook_id: {
      type: String,
    },
    points: {
      type: Number,
    },
    level: {
      type: Number,
    },
    archivement: {
      type: Array,
    },
    hands_played: {
      type: Number,
    },
    hands_won: {
      type: Number,
    },
    biggest_pot_won: {
      type: Number,
    },
    best_winning_hand: {
      type: String,
    },
    win_percent_holdem: {
      type: Number,
    },
    win_percent_spin: {
      type: Number,
    },
    tour_won: {
      type: Number,
    },
    likes: {
      type: Number,
    },
    buddies: {
      type: Number,
    },
    friends: {
      type: Array,
    },
    recents: {
      type: Array,
    },
    referral_code: {
      type: String,
    },
    referral_count: {
      type: Number,
    },
    referral_users: {
      type: Array,
    },
    created_date: {
      type: Date,
      required: true,
    },
    mail_date: {
      type: Date,
    },
    spin_date: {
      type: Date,
    },
    dailyReward_date: {
      type: Date,
    },
    messages: {
      type: Array,
    },
    status: {
      type: Number,
    },
    connected_room: {
      type: String,
    },
    connect: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const modelName = "User";

module.exports = mongoose.model(modelName, instance);
