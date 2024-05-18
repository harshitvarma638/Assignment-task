const accountCreation = require('../Models/schema');

const CreateAccount = async(req,res)=>{
    try{
        const { mobile_no } = req.body;
        const User = await accountCreation.find({mobile_no});
        if(User){
            res.status(400).send({success:false,message:"Account with this number already exists"});
        }
        const account = new accountCreation(req.body);
        const a1 = await account.save();
        res.status(200).send({success: true,message: "Account created successfully"});
    }
    catch(error){
        res.status(404).send({success:false,message:"Account Not Created.Try Again"});
    }
}

module.exports = { CreateAccount };