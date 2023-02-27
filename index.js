import express from 'express';

const app = express();
import cors from 'cors';

//Importing Global functions & utils
import {
    fetchSchedule
} from './scraper/scrape.js';

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json())

import gogoRoutes from './Routes/Gogoanime.js';

app.use('/gogoanime', gogoRoutes);
app.use('/animix', animixRoutes);
app.use('/zoro', zoroRoutes);
app.use('/allanime', allanimeRoutes);
app.use('/animepahe', animepaheRoutes);
app.use('/yugen', yugenRoutes);
app.use(['/nineanime', '/9anime'], nineanimeRoutes);

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to FoxyAPI!')
});

app.get('/schedule', async (req, res) => {
    const data = await fetchSchedule();
    res.json(data).status(200);
})

//Start the web-server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`)
});
