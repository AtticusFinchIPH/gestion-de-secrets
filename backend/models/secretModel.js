import mongoose from 'mongoose';

const secretSchema = new mongoose.Schema({
    secret: { type: String, required: true},
    expire: { type: Number, required: true, default: Date.now},
});

const secretModel = mongoose.model("Secret", secretSchema);

export default secretModel;