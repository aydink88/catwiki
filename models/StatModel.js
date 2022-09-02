import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({
  cat: { type: mongoose.Schema.Types.ObjectId, ref: "Cat" },
  search_count: Number,
});

const Stat = mongoose.model('Stat', StatSchema);

export default Stat;
