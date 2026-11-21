const express = require('express');

const app = express();

app.use(express.json);
app.use(express.urlencoded({ extended: true}));

app.get('/', (request, response) => {
    response.status(200).send("Hello world");
}); 

app.post('/greetings', (request,response) =>{
    const{ name, course, section} = request.body;

    response.status(200).json({
        name,
        course,
        section,
        message: `Hello ${name} from ${course} ${section}`
    });

})

app.listen(8000, error => {
    if(error) {
        console.error("Error starting server:", error);
        process.exit(1);
    }
    console.log("Server running on port", 8000);
})
