import mongoose from 'mongoose';

const messagseSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'message text required'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messagseSchema);

export default Message;
