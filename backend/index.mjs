
import { error } from 'console';
import express from 'express';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Model
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String
});


const Url = mongoose.model('Url', urlSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://lohithrajbrb:lohith527@cluster0.kght6.mongodb.net/');

app.post("/shorten" ,async (req,res)=>{
    try{
        const {originalUrl} = req.body;
    if(!originalUrl){
        return res.status(400).json({error : 'Enter a Url'})
    }
    const shortUrl = nanoid(4); 
    const newUrl = new Url({ originalUrl, shortUrl });
     await newUrl.save();
     res.json({ originalUrl, shortUrl: `localhost:5173/${shortUrl}` });
    }catch(error){
        console.error("Error saving URL");
        res.status(500).json({error : "Internal Server Error"})
    }
})

app.get("/:shortUrl", async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const urlData = await Url.findOne({ shortUrl });
      
      if (urlData) {
        res.redirect(urlData.originalUrl);
      } else {
        res.status(404).json({ message: 'URL not found' });
      }
    } catch (error) {
      console.error("Error finding URL", error);
      res.status(500).json({ message: 'Server error' });
    }
  });


app.listen(3000);