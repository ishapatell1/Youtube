const express = require("express");
const router = express.Router();
const { google } = require("googleapis");

router.post("/", async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).send("Unauthorized");

  const { videoId, commentText } = req.body;

  if (!videoId || !commentText) {
    return res.status(400).json({ error: "videoId and commentText are required" });
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token: req.user.accessToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  try {
    const response = await youtube.commentThreads.insert({
      part: "snippet",
      requestBody: {
        snippet: {
          videoId: videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText,
            },
          },
        },
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error posting comment:", err);
    res.status(500).send("Error posting comment");
  }
});

module.exports = router;