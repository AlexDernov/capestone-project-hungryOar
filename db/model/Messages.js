import mongoose from "mongoose";

const { Schema } = mongoose;

const messagesSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: {} });
const Message = mongoose.models.Message || mongoose.model("Message", messagesSchema, "messages");

export default Message;
