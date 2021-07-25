const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const Model = mongoose.model;
const { String, ObjectId, Number } = Schema.Types;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: "user"
        },
        history: {
            type: Array,
            default: []
        },
        products: [{
            type: ObjectId,
            ref: "Product"
        }],
    },
    { timestamps: true }
);

userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = new Model('User', userSchema);