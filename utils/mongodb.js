import mongoose from "mongoose";

    export default function mongodb (){
        return mongoose.connect( "mongodb+srv://AhmedShtya:rfOVazyZ1puX7cHD@cluster0.xgw84zk.mongodb.net/english-website?retryWrites=true" )
        .then(res => console.log(res.connection.host))
        .catch(err => console.log(err))
    }