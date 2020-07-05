import mongoose, { Schema } from 'mongoose';

const secretSchema = new mongoose.Schema({
    secret: { type: String, required: true},
    expire: { type: Number, required: true, default: Date.now},
    viewed: { type: Boolean, required: true, default: false},
    userId: { type: Schema.Types.ObjectId, ref: 'User'}
});

const secretModel = mongoose.model("Secret", secretSchema);

export default secretModel;