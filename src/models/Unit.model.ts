import { IStructure } from 'interfaces/model.interfaces';
import { Schema, model } from 'mongoose';

interface IUnit extends IStructure {
  learnings: Schema.Types.ObjectId[];  
}

const UnitSchema = new Schema<IUnit>({
  info: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true, minlength: [10, 'Description must be at least 10 characters long'] }
  },
  dballInfo: {
    vertical: {
      type: String,
      required: true,
      enum: ['ACADEMY', 'VERT'],
      default: 'ACADEMY'
    },
    typeOfContent: {
      type: String,
      required: true,
      enum: ['SHOOTING', 'DRIBBLING', 'FINISHING', 'ISO', 'POST', 'LOWER', 'UPPER', 'CARDIO'],
      default: 'SHOOTING'
    }
  },
  learnings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Learning'  
    }
  ]
}, { timestamps: true });  

UnitSchema.index({ 'dballInfo.vertical': 1, 'dballInfo.typeOfContent': 1 });

export const Unit = model<IUnit>('Unit', UnitSchema);
