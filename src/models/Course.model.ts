import { IStructure,IBooleanInfo } from 'interfaces/model.interfaces';
import { Schema, model } from 'mongoose';


interface ICourse extends IStructure, IBooleanInfo {
  units: Schema.Types.ObjectId[];
}

const CourseSchema = new Schema<ICourse>({
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
  isRecent: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: true
  },
  units: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Unit'  
    }
  ]
}, { timestamps: true });  

CourseSchema.index({ 'dballInfo.vertical': 1, 'dballInfo.typeOfContent': 1 });

export const Course = model<ICourse>('Course', CourseSchema);
