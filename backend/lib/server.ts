import app from "./config/app";
import env from './environment';

const PORT = process.env.PORT || env.getPort();

if(process.env.NODE_ENV === 'production'){
   //Heroku
}

app.listen(PORT, () => {
   console.log('Servidor Express ouvindo a porta: ' + env.getPort());
})