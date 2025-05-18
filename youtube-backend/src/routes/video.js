const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    // 1. Get the user's channel and uploads playlist
    const channelRes = await youtube.channels.list({
      part: "contentDetails",
      mine: true,
    });

    const uploadsPlaylistId =
      channelRes.data.items[0].contentDetails.relatedPlaylists.uploads;

    // 2. Get videos from the uploads playlist
    const videosRes = await youtube.playlistItems.list({
      part: "snippet,contentDetails",
      playlistId: uploadsPlaylistId,
      maxResults: 10,
    });

    res.json(videosRes.data.items);
  } catch (err) {
    console.error("Error fetching uploaded videos:", err);
    res.status(500).send("Error fetching uploaded videos");
  }
});

module.exports = router;