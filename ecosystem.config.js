module.exports = {
  apps : [
    {
      name: 'ecm server',
      script: './server.js',
      cwd: '/'
    },
    {
      name: 'ecm db',
      script: './mongod-simple.sh'
    }
  ],    
};
