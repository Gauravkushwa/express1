const express = require("express");
const fs = require("fs");
const server = express();

server.use(express.json());

const JsonData = () =>{
    const data = fs.readFileSync("./db.json");
    return JSON.parse(data)
};

//           GET Request

server.get("/todos", (req, res) =>{
    const data = JsonData()
    res.send(data);
})

const writeJson = (data) =>{
   fs.writeFileSync("db.json", JSON.stringify(data, null, 2))
}

        //   POST Request

server.post("/todos", (req, res) =>{
    const data = JsonData();

    const newTask = {
        id: data.todos.length+1,
        task: req.body.task,
        status: false
    }
    data.todos.push(newTask);
    writeJson(data);
    res.json(newTask)
});


        //   PUT Request

server.put("/todos/updatedData", (req, res) =>{
    const data = JsonData();

    data.todos.forEach((todo) =>{
        if(todo.id%2==0 && todo.status == false){
            todo.status = true;
        }
    });
    writeJson(data);
    res.json(data.todos)
});

       // DELETE Request

server.delete("/todos/delete-true", (req, res) =>{
    const data = JsonData();
    data.todos =  data.todos.filter((todo) => !todo.status)
    writeJson(data)
    res.json(data.todos)
})
server.listen(8585, ()=>{
    console.log("server is running"); 
})