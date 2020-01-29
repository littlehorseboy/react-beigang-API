import config from './config/config';
import app from './config/express';

if (module.parent.filename.includes('start.js')) {
  app.listen(config.port, () => console.log(`server started port ${config.port}`));
}
