/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const mailjet = require('./sendMailer.js')

 exports.sendMail = async(req, res) => {
     res.header('Content-Type','application/json');
     res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Headers', 'Content-Type');
 
   const {email, fullName, description} = req.body
   try{
     let response = await mailjet(email, fullName, description)
     if(!response){
       throw new Error()
     }
     res.status(200).send("Success!");
   }
   catch(error){
     res.status(400).send("Error: Failed!")
   }
 };
 
 
 