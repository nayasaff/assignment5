const AWS = require('aws-sdk');
const { S3 } = require('@aws-sdk/client-s3');
const fs = require('fs/promises');
const path = require('path')
const htmlFile = path.join(__dirname, 'public')
const express = require('express')
const app = express()


app.use(express.static(htmlFile))

const port = process.env.PORT

const s3 = new S3({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY ,
    },
  });

const uploadFile = async () => {
  const file = await fs.readFile('D:/Giu/Software Cloud Computing/Assignment 5/intent.txt', 'utf8')
  console.log(file)
  const params= {
      Body: file ,
      Bucket : 'cloudassignments5',
      Key:  'Dataset/intentts.json'
  }

try {
    const data = await s3.putObject(params);
    console.log(`File uploaded successfully ${data}`);
  } catch (err) {
    console.error(err);
  }
}

const deleteFile = async() =>{
  var params = {  Bucket: 'cloudassignments5', Key: 'Dataset/intents.json' };
  s3.deleteObject(params, (err)=>{
    if (err) console.log(err);  // error
    else     console.log("deletion success");  
  })
}

app.get('/upload', (req,res)=>{
  uploadFile();
})

app.get("/delete", (req,res) =>{
  deleteFile();
  
} )

app.listen(port)