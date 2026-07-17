require("dotenv").config();

const sendEmail = require("./utils/sendEmail");


sendEmail({

    email:"firstruleoffightclub.888@gmail.com",

    subject:"Explore Tamil Nadu Test",

    message:`
        <h2>Explore Tamil Nadu</h2>
        <p>Email system is working successfully ✅</p>
    `

})
.then(()=>{

    console.log("Email Sent Successfully");

})
.catch(err=>{

    console.log(err);

});