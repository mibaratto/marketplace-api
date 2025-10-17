import mongoose from "mongoose";

let Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    unique: [true, "This login already exists!"],
  },

  email: {
    type: String,
    validate: {
      validator: function (email) {
        return new RegExp(
          "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$"
        ).test(email);
      },
    },
    unique: [true, "This email already exists!"],
  },

  cpf: {
    type: String,
    minlength: 11,
    maxlength: 11,
    unique: [true, "This cpf already exists!"],
  },

  password: {
    type: String,
  },

  admin: {
    type: Boolean,
  },
});

// UserSchema.methods.generatePassword = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

// UserSchema.pre("save", async function () {
//     this.password = await this.generatePassword(this.password);
// });

const User = mongoose.model("User", UserSchema);

export default User;
