import { Schema, model, Document, Types } from 'mongoose';

    export interface IEnrollment extends Document {
        student: Types.ObjectId;
        course: Types.ObjectId;
        enrollmentDate: Date;
        grade: string | null;
        status: 'ENROLLED' | 'WAITLISTED' | 'DROPPED' | 'COMPLETED';
    }
    
    const EnrollmentSchema = new Schema<IEnrollment>({
        student: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true,
            validate: {
                validator: async function(v: Types.ObjectId) {
                    const user = await model('User').findById(v);
                    return user && user.get('role') === 'STUDENT';
                },
                message: props => `${props.value} is not a valid Student ID.`
            }
        },
        course: { 
            type: Schema.Types.ObjectId, 
            ref: 'Course', 
            required: true 
        },
        enrollmentDate: { type: Date, default: Date.now },
        grade: { type: String, default: null },
        status: { 
            type: String, 
            enum: ['ENROLLED', 'WAITLISTED', 'DROPPED', 'COMPLETED'], 
            default: 'ENROLLED' 
        }
    }, { timestamps: true });
    
    EnrollmentSchema.index({ student: 1, course: 1 }, { unique: true, partialFilterExpression: { status: { $in: ['ENROLLED', 'WAITLISTED', 'COMPLETED'] } } });
    
    export const EnrollmentModel = model<IEnrollment>('Enrollment', EnrollmentSchema);