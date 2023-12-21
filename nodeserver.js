const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 3000;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})
  // server.js


app.use(bodyParser.json());

// Connect to MongoDB (you need to have MongoDB installed and running)
mongoose.connect('mongodb://localhost:80/social_network', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  interests: [String],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const User = mongoose.model('User', userSchema);

// API endpoint to get friend recommendations
app.get('/recommendations/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Get user's interests
    const user = await User.findById(userId);
    const userInterests = user.interests;

    // Find users with similar interests (excluding the user)
    const recommendations = await User.find({
      _id: { $ne: userId },
      interests: { $in: userInterests }
    }).limit(5);

    res.json({ recommendations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from Node.js
  fetch('http://localhost:80')
      .then(response => response.text())
      .then(data => {
          document.getElementById('nodeResponse').innerText = data;
      });

  // Use Java app through some mechanism (REST API, command line, etc.)
  // For simplicity, let's assume calling a Java command through Node.js
  const { exec } = require('child_process');
  exec('java Example', (error, stdout, stderr) => {
      if (error) {
          console.error(`Error: ${error.message}`);
          return;
      }
      document.getElementById('javaResponse').innerText = stdout;
  });
});
