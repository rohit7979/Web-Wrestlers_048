import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const customerSchema = new mongoose.Schema({
    student_name: {
        type: String,
        required: true,
    },
    student_email: {
        type: String,
        required: true,
        unique: true,
    },
    student_password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
    role: {
        type: String,
        default: "student",
        enum:["student","admin","donor"],
    },
    student_age: { type: Number },
    donation_title: { type: String },
    donation_discription: { type: String },
    updates_on_donation: { type: [String] },
    media_images: { type: [String] },
    time_of_creation: { type: Date },
    donation_deadline: { type: Date },
    total_amount_gathered: { type: Number },
    goal_amount: { type: Number },
    current_amount: { type: Number },
    donation_active_status: { type: Boolean },
    current_donators: { type: [Object] },
    comments: { type: [Object] }
});

customerSchema.pre('save', async function (next) {
    if (this.isModified('student_password') || this.isNew) {
        this.student_password = await bcrypt.hash(this.student_password, 10);
    }
    next();
});

customerSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.student_password);
};

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
