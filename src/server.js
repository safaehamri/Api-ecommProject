// src/server.js
// Brief: Entry point to start the server and listen on a given port.
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
