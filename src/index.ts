import path from "path";
import express from "express";
import cors from "cors";
import routes from "../routes/routing";


const app = express();
const port = 5000;


// Settings for web pages
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})