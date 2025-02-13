import { IStructure } from 'interfaces/model.interfaces';
import { Schema, model } from 'mongoose';

interface IRest {
    minutes: number;
    seconds: number;
  }
  
  interface IDetails {
    sets: number;
    reps: number;
    rest: IRest;
  }

interface IExercise extends IStructure {
    details: IDetails
}

const ExerciseSchema = new Schema<IExercise>({
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
  details: {
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    rest: {
      minutes: { type: Number, required: true },
      seconds: { type: Number, required: true }
    }
  }
}, { timestamps: true });

ExerciseSchema.index({ 'dballInfo.vertical': 1, 'dballInfo.typeOfContent': 1 });

export const Exercise = model<IExercise>('Exercise', ExerciseSchema);
