import express from "express"; 
import axios from "axios";  
import chalk from "chalk"; 
import cors from 'cors';

const app = express();  
app.use(cors()); 
app.use(express.json());

const usuario = []; 
const tweet = []; 

app.post("/sign-up", (request,response) => { 
    const body = request.body; 
    usuario.push(body);  
    console.log(usuario);
    response.status(200).send("OK");
}); 

app.post("/tweets", (request,response) => { 
    const body = { 
        id : (tweet.length+1),
        username: "bobesponja",
        tweet: "eu amo o hub",
    }; 
    tweet.push(body);  
    response.send("OK");
}); 

app.get("/tweets",(request,response) => { 
    const body = tweet; 
    const ultimosDez = []; 
    let contador =0;

    if(body.length>0) {
        for(let i=body.length-1; contador<10; i--) { 
            ultimosDez.push(body[i]); 
            contador++;
        } 
    }
    console.log(body.length);  
    console.log(ultimosDez); 
    response.status(200).send(ultimosDez);
});

app.listen(5000, () => { 
    console.log(chalk.blue.bold("\nRodando na 5000")); 
});