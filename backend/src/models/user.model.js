import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name : { type : String , requried : true},
        username : { type : String , requried : true , unique : true},
        password : { type : String , requried : true},
        token : {type : String}
      

      
      
    }
)

const User = mongoose.model("User", userSchema);

export {User};