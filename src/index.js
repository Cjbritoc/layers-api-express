import app from './server.js';

function main() {
  app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
  });
}

main();
