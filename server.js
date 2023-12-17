import express from "express";
import admin from "firebase-admin";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { FieldValue } from "firebase-admin/firestore";
import { readFileSync } from "fs";
import { v4 as uuid } from "uuid";
// Determine the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Construct the file path for the service account key
const serviceAccountPath = join(
  __dirname,
  "cyberspacesavy-firebase-adminsdk-xlvpt-c1c1e70330.json"
);
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const app = express();
const port = process.env.PORT || 5000; // Choose a port for your server

app.use(cors());
app.use(express.json());

// Define endpoint for getting user profile by username
app.get("/api/user-profile/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const usersRef = db.collection("users");
    const querySnapshot = await usersRef
      .where("username", "==", username)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User profile not found" });
    }

    let userProfile;
    querySnapshot.forEach((doc) => {
      userProfile = doc.data();
    });

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Define endpoint for getting user profile by userId
app.get("/api/user-profile/id/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const usersCollection = db.collection("users");
    const querySnapshot = await usersCollection.where("uid", "==", uid).get();

    if (querySnapshot.empty) {
      return res.status(404).json({ error: "User profile not found" });
    }
    let userProfile;
    querySnapshot.forEach((doc) => {
      userProfile = doc.data();
    });

    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Define endpoint for getting user posts by userid
app.get("/api/:uid/posts/", async (req, res) => {
  const { uid } = req.params;
  try {
    const postCollections = db.collection("posts");
    const querySnapshot = await postCollections
      .where("createdBy", "==", uid)
      .get();
    if (querySnapshot.empty) {
      return res.status(201).json([]);
    }
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });

    posts.sort((a, b) => b.createdAt - a.createdAt);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/posts/create", async (req, res) => {
  const { content, createdBy } = req.body;

  if (!content || !createdBy) {
    return res.status(400).json({ error: "Missing content or createdBy" });
  }

  const postCollections = db.collection("posts");
  const userDocRef = db.collection("users").doc(createdBy);

  const newPost = {
    content: content,
    likes: [],
    comments: [],
    createdAt: Date.now(),
    createdBy: createdBy,
  };

  try {
    const postDocRef = await postCollections.add(newPost);
    await userDocRef.update({ posts: FieldValue.arrayUnion(postDocRef.id) });
    res.status(200).json({newPost: newPost, postDocRefId: postDocRef.id});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/post/comment", async (req, res) => {
  const { postId, comment } = req.body;
  if (!postId || !comment) {
    return res.status(400).json({ error: "Missing content or createdBy" });
  }
  
  try {
    const postRef = db.collection("posts").doc(postId);
    await postRef.update({ comments: FieldValue.arrayUnion(comment) });
    res.status(200).json({ data: "Data Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
