const app = require("./app");
const Loaders = require("./loaders");
const PORT = process.env.APP_PORT || 5000;

Loaders.start();

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
