// Les projets Node sont initialisés avec 'npm init'
// Import module http de node
const http = require('http');
// Import fichier de l'appilcation
const app = require('./app');

//----------------------------------
// Normalisation de port
//----------------------------------
/* La fonction renvoie un port valide */
const normalizePort = val => {
    /* convertit la valeur en nombre entier */ 
    const port = parseInt(val, 10);
    /* si pas un nombre retourne la valeur */ 
    if(isNaN(port)) {
        return val;
    }
    /* si port >= 0 retourne port */
    if(port >= 0) {
        return port;
    }
    return false;
};
/* définie le port */
const port = normalizePort(process.env.PORT || '3000');
/* ordonne à express d'utiliser le port définie */
app.set('port', port);

//----------------------------------
// Gestion d'erreur
//----------------------------------
/* recherche les erreurs */
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      /* met fin au processus avec échec */
      process.exit(1);
      /* Stop la propagation */
      break;
      /* addresse recherchée en cours d'utilisation */
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//----------------------------------
// Serveur
//----------------------------------
/* argument pour créer serveur */
const server = http.createServer(app);
/* si serveur en erreur appelle de la fonction de gestion d'erreurs */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
