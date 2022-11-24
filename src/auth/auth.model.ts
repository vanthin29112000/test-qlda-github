
import  *  as mongoose from "mongoose";
export const AuthSchema = new mongoose.Schema({
    email:{type:String, required: true},
    password: { type: String, required: true },
    name: { type: String, required: false },
    gender: { type: Number, required: false }, // 0 : female, 1 : male , -1 : orther
    birthday: { type: Date, required: false ,default : Date().toString()},
    phone: { type: String, required: false },
    avatar: { type: String, required: false },
    dateCreated: { type: Date, default : Date().toString() },
    totalCost : {type : Number, default : 0},
    qtyPurchased : {type : Number, default : 0},
    role : {type : Number}, //0 : user , 1 : admin
    address :{
        type : Object({
            mainAddress : String,
            district : {idDistrict : String,nameDistrict : String},
            ward : {idWard : String,nameWard : String},
            city : {idCity : String,nameCity : String},
        }),default :{
            mainAddress : "",
            district : {idDistrict : "",nameDistrict : ""},
            ward : {idWard : "",nameWard : ""},
            city : {idCity : "",nameCity : ""},
        }
    } ,
    block :{type : Object({
        isBLocking : Boolean,
        dateBLock : Date,
        isUserBlock : mongoose.Schema.Types.ObjectId,
    }),default : {isBLocking : false}
}
    ,
    shoppingCart : [
        {
            idProduct : mongoose.Schema.Types.ObjectId,
            qty : Number,
        },
    ]
});
export interface Auth extends mongoose.Document {    
    email:String,
    password: String,
    name: String,
    gender: String, 
    birthday: Date,
    phone: String,
    avatar: String,
    dateCreated: Date,
    totalCost : Number,
    qtyPurchased : Number,
    role : Number, //0 : user , 1 : admin
    address : { 
        mainAddress : String,
        district : {idDistrict : String,nameDistrict : String},
        ward : {idWard : String,nameWard : String},
        city : {idCity : String,nameCity : String},
    },
    block : {
        isBLocking : Boolean,
        dateBLock : Date,
        isUserBlock : mongoose.Schema.Types.ObjectId,
    },
    shoppingCart : [
        {
            idProduct : mongoose.Schema.Types.ObjectId,
            qty : Number,
        },
    ]
}
