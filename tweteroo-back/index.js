import express from "express"; 
import axios from "axios";  
import chalk from "chalk"; 
import cors from 'cors';

const app = express();  
app.use(cors()); 
app.use(express.json());

const usuario = []; 
const tweets = []; 

app.post("/sign-up", (request,response) => { 
    const usersData = request.body; 
    usuario.push(usersData);   
    console.log(usuario);  
    if(usersData.username=== "" || usersData.avatar=== "") { 
        response.sendStatus(400);
    }
    response.status(200).send("OK");
}); 

app.post("/tweets", (request,response) => { 
    const enviaTweet = request.body;   
    if(enviaTweet.tweet==="") { 
        response.sendStatus(400);
    } else {
        tweets.push(enviaTweet);
    }
    response.status(200).send("OK");
}); 

app.get("/tweets",(request,response) => {  
    const avatares = usuario.map(function(avat) { 
        const pegaAvatar = avat.avatar;
        return pegaAvatar;
    });  

    const recebeTweet = tweets.map(function(num) {
        const completo = {
                username : num.username, 
                avatar : avatares[(usuario.length-1)], 
                tweet : num.tweet
            }; 
        return completo;
    });  
    const ultimosDez = []; 
    let contador =0;

    if(recebeTweet.length>0) {
        for(let i=recebeTweet.length-1; contador<10 && contador<recebeTweet.length; i--) { 
            ultimosDez.push(recebeTweet[i]); 
            contador++;
        } 
    } 
    response.status(200).send(ultimosDez);
});

app.listen(5000, () => { 
    console.log(chalk.blue.bold("\nRodando na 5000")); 
});