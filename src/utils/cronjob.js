const cron = require('node-cron');
const { addHours, subDays, startOfDay, endOfDay } = require('date-fns');
const sendEmail = require('./sendEmail');
const ConnectionRequestModel = require('../models/connectionRequest');



// This job run at 8 AM every day
cron.schedule('0 8 * * *', async () => {
    
    try{
        const yesterday = subDays(new Date(), 1); 
        const yesterdayStart = startOfDay(yesterday); // Get the start of yesterday (00:00:00)
        const yesterdayEnd = endOfDay(yesterday); // Get the end of yesterday (23:59:59)  
        const pendingConnectionRequests = await ConnectionRequestModel.find({ 
            status: "interested",
            createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } // older than 24 hours
         }).populate("fromUserId toUserId");

         const listOfEmails = [...new Set(pendingConnectionRequests.map(req=> req.toUserId.emailId))]; // Use a Set to store unique email addresses. If he has 3 pending connection request from 3 different people, he should get only 1 email notification.

         for(let email of listOfEmails){

            // Send email notification to the user about pending connection requests
            try{

               const res= await sendEmail.run("New Pending Connection Requests for " + email, "You have new pending connection requests. Please login to devTinder.shop and accept or reject them.");
               console.log("Email sent successfully to ", email, "Response: ", res);
            }
            
            catch(err){
                console.log("Error sending email: ", err.message);
            }
            }
        

    }catch(err){
        console.log("Error in cron job: ", err.message);
    }
});



