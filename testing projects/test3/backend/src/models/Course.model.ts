import { Schema, model, Document, Types } from 'mongoose';

    export interface ICourse extends Document {
        courseCode: string;
        title: string;
        description: string;
        credits: number;
        department: string;
        instructor: Types.ObjectId;
        schedule: { day: string; timeSlot: string; }[];
        maxCapacity: number;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }
    
    const CourseSchema = new Schema<ICourse>({
        courseCode: { type: String, required: true, unique: true, uppercase: true, trim: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        credits: { type: Number, required: true, min: 0.5, max: 4.0 },
        department: { type: String, required: true },
        instructor: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true,
            validate: {
                validator: async function(v: Types.ObjectId) {
                    const user = await model('User').findById(v);
                    return user && user.get('role') === 'FACULTY';
                },
                message: props => `${props.value} is not a valid Faculty ID.`
            }
        },
        schedule: [{
            day: { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], required: true },
            timeSlot: { type: String, required: true }
        }],
        maxCapacity: { type: Number, required: true, min: 1, default: 30 },
        isActive: { type: Boolean, default: true }
    }, { timestamps: true });
    
    CourseSchema.index({ courseCode: 1 }, { unique: true });
    CourseSchema.index({ instructor: 1 });
    CourseSchema.index({ department: 1 });
    
    export const CourseModel = model<ICourse>('Course', CourseSchema);