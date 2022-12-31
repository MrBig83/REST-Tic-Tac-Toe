const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = require("../server");
const fs = require("fs");
const { format } = require("path");
const { fileURLToPath } = require("url");
const { setTimeout } = require("timers/promises");

router.use(cors());

router.get("/", function(req, res){
    res.send("Välkommen till /users.");
});

router.get("/usersList/:ID", function(req, res){
    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }

        if(data == ""){
            res.status(404).send("Du försöker läsa ifrån en tom fil");
         } else {
         
         const users = JSON.parse(data)

         for (let i = 0; i < users.length; i++){
            if (users[i].ID == req.params.ID){
                specificUser(users[i].userName, users[i].ID, users[i].highScore)
            }
         }
         function specificUser(namn, ID, highScore){
            res.send("Användare med id: " + ID + " har användatnamn: " + namn + " och ett highscore på: " + highScore)
            
         }
         
        }});    
});

router.get("/usersList", function (req, res){

    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }
        if(data == ""){
            res.status(404).send("Du försöker läsa ifrån en tom fil");
            
         } else {
            const users = JSON.parse(data);
            let sortedUsers = users.sort((a,b) => b.highScore - a.highScore)
            res.send(sortedUsers);
            return;
         }
    })  
});

router.post("/newuser", function(req, res){
    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }

        if(data == ""){
            var users = [{"ID":1,"userName":"Admin","bio":"This is santaclaus.","highScore":0}]
        } else {
            var users = JSON.parse(data)
        };

        const newUser = req.body;
        newUser.ID = users.length +1;
        
        for(let i = 0; i < users.length; i++){
            if(newUser.ID == users[i].ID){
                newUser.ID = newUser.ID +1;
            }
        }
        users.push(newUser);

        
        fs.writeFile("./json/users.json", JSON.stringify(users, null, 2), function(err){
            if(err){
                console.log(err);
            }
        })
        res.status(201).send("User added: " + JSON.stringify(newUser))
        return;
    })    
});

router.use(express.json());
router.put("/update", function(req, res){
   
    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }

        if(data == ""){
            res.status(404).send("Du försöker läsa ifrån en tom fil");
         } else {
           
        const users = JSON.parse(data)
        console.log(users)
        const newCreds = req.body;

            for (let i = 0; i < users.length; i++){
                if (users[i].ID == newCreds.ID){               
                    if(users[i].userName != ""){
                        users[i].userName = newCreds.userName
                    }
                    if(req.body.bio != ""){
                        users[i].bio = newCreds.bio
                    }
                    if(newCreds.highScore == "score"){
                        users[i].highScore = users[i].highScore +1;
                    } 
                }   
            }
            fs.writeFile("./json/users.json", JSON.stringify(users, null, 2), function(err){
                if(err){
                    console.log(err);
                }
            })
        };

        res.status(201).send("User uppdated")
})});

router.delete("/usersList/delete/:ID", function(req, res){
    fs.readFile("./json/users.json", function(err, data){
        if(err){
            console.log(err);
        }
        const users = JSON.parse(data)
        const user = req.params;

        for (let i = 0; i < users.length; i++){
            if (users[i].ID == user.ID){
                res.status(204).send(users[i].userName + " removed");
                users.splice(i, 1);
            }            
         }
         fs.writeFile("./json/users.json", JSON.stringify(users, null, 2), function(err){
            if(err){
                console.log(err);
            }
        })
        return;
    })
});
module.exports = router;