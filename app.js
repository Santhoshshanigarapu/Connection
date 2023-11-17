const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/connect", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connection successful...");

    // Define the schema and model inside the connection success callback
    const playlistSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      ctype: String,
      videos: Number,
      author: String,
      active: Boolean,
      date: {
        type: Date,
        default: Date.now,
      },
    });

    const Playlist = mongoose.model("Playlist", playlistSchema);

    const reactPlaylist = new Playlist({
      name: "React js",
      ctype: "Front end",
      videos: 80,
      author: "thapa",
      active: true,
    });

    // Disable buffering for this operation
    reactPlaylist.save({ bufferCommands: false })
      .then((savedPlaylist) => {
        console.log("Playlist saved:", savedPlaylist);
        mongoose.connection.close(); // Close the connection after saving
      })
      .catch((saveError) => {
        console.error("Error saving playlist:", saveError);
        mongoose.connection.close(); // Close the connection on error as well
      });
  })
  .catch((err) => {
    console.error("Connection error:", err);
  });
