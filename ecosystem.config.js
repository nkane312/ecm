module.exports = {
  apps : [
    {
      name: 'ecm db',
      script: './mongod-simple.sh',
    },
    {
      name: 'ecm server',
      script: './server.js',
      cwd: '/var/www/ecm/html'
    }
  ],
};
