import app from "./app.js";

const port = 3003;

app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});