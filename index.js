const express = require("express");
const bodyparser = require("body-parser");
const {PrismaClient} = require("./generated/prisma");
const { warnEnvConflicts } = require("@prisma/client/runtime/library");

const port = 4000;

const app = express();
const prisma = new PrismaClient();

app.use(bodyparser.json());


app.get("/getUser", async(req, res) => {
  const result = await prisma.user.findMany();

  res.send(result);
})


app.post("/addUser", async(req, res) => {
  const user = req.body;
  
  const result = await prisma.user.create({
    data:user
  });

  res.send(result);
})

app.post("/addPost", async(req, res) => {
  const posting = req.body;
  
  const result = await prisma.post.create({
    data:posting
  });

  res.send(result);
})

// update
app.post("/updatePost", async(req, res) => {
  const postid = req.body.id;
  const posting = req.body;

  delete posting.id;
  
  const result = await prisma.post.update({
    where: {
      id: postid
    },

    data: posting
  });

  res.send(result);
})

app.delete("/deletePost/:id", async(req, res) => {
  const postid = req.params.id;

  const result = await prisma.post.delete({
    where: {
      id: postid
    },

  });

  res.send(result);
})

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.listen(port, () => console.log(`running on port ${port}`));
