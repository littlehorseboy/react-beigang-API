import dotenv from 'dotenv';

dotenv.config();

const config = {
  version: process.env.VERSION,
  port: process.env.PORT,
  mLabUrl: process.env.MLAB_URL,
  mLabDBName: process.env.MLAB_DBNAME,
};

export default config;
