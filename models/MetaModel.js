import mongoose from 'mongoose';

const MetaSchema = new mongoose.Schema({
  updateDate: Date
});

const Meta = mongoose.model('Meta', MetaSchema);

export default Meta;