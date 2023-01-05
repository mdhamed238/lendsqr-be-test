
import app from './app';
import logger from './log/logger';


const port = process.env.PORT || 3000;

// listen to server and handle server errors
app.listen(port, () => {
    console.log(`Server running 🚀🚀🚀 on port http://localhost${port}`);
}).on('error', (error) => {
    logger.error('Server error', error);
});

