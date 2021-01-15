import app from "./config/app";
import env from './environment';


app.listen(env.getPort(), () => {
   console.log('Servidor Express ouvindo a porta: ' + env.getPort());
})