import mongoose from 'mongoose';

const secretSchema = new mongoose.Schema({
    secret: { type: String, required: true},
    lifetime: { type: Number, required: true, default: 1}
});

const secretModel = mongoose.model("Secret", secretSchema);

export default secretModel;