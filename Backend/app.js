//ZFVoB3pGbGHGoj2h
import express from 'express'; 
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import participantRoutes from './routes/participant.js';
import trackRoutes from './routes/track.js';
import sessionRoutes from './routes/session.js';
import attendanceRoutes from './routes/attendence.js';
import qrCodeRoutes from './routes/qrCodeRoutes.js';


const app = express();

//middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api/participants', participantRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/qrcode', qrCodeRoutes);

mongoose.connect ("mongodb+srv://conference:ZFVoB3pGbGHGoj2h@cluster0.kjbrj.mongodb.net/")
.then(()=> console.log("Connect to MongoDB"))
.then(()=> {
    app.listen(5000);
})
.catch((err)=> console.log((err)));