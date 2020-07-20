import mongoose, { Schema } from 'mongoose';

const secretSchema = new mongoose.Schema({
    secret: { type: Buffer, required: true},
    expire: { type: Number, required: true, default: Date.now},
    viewed: { type: Boolean, required: true, default: false},
    email: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    fileName: { type: String, default: null},
});

const secretModel = mongoose.model("Secret", secretSchema);

export default secretModel; 