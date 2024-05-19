const accountCreation = require('../Models/schema');

const CreateAccount = async(req,res)=>{
    try{
        const { mobile_no } = req.body;
        const isUser = await accountCreation.findOne({mobile_no});
        // if(isUser){
        //     return res.status(400).json({success:false,message:"Account with this number already exists"});
        // }
        const tempAccount = new accountCreation(req.body);
        const validationError = tempAccount.validateSync();
        if (validationError) {
            return res.status(400).json({ success: false, message: validationError.message });
        }
        req.session.userData = req.body;
        res.status(200).json({success: true,message: "Account data stored successfully",data: req.body});
    }
    catch(error){
        console.log(error);
        return res.status(500).send({success:false,message:"Account Not Created.Try Again"});
    }
}

module.exports = { CreateAccount };