const User = require("../models/userSchema");
const ApiResponse = require("../utils/apiResponse");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
  const { firstname, lastname, gender, email, contact, password } = req.body;

  // Validate input fields
  if (!firstname || !lastname || !gender || !email || !contact || !password) {
    return ApiResponse.validationError(
      res,
      "Please enter all required fields."
    );
  }

  try {
    // Check if contact number is already registered
    const sameNumber = await User.findOne({ contact });
    if (sameNumber) {
      return ApiResponse.validationError(
        res,
        "Mobile number already registered."
      );
    }

    // Check if email is already registered
    const UserExist = await User.findOne({ email });
    if (UserExist) {
      return ApiResponse.validationError(
        res,
        "User already exists, please login."
      );
    }

    // Hash the password and save the user
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return ApiResponse.error(
          res,
          "Error occurred while encrypting the password."
        );
      }

      const user = new User({
        firstname,
        lastname,
        gender,
        email,
        contactnumber: contact,
        password: hash,
      });

      try {
        const savedUser = await user.save();
        console.log("User saved:", savedUser);
        return ApiResponse.success(
          res,
          "User registered successfully.",
          savedUser
        );
      } catch (saveError) {
        console.error("Error saving user:", saveError);
        return ApiResponse.error(res, "Error occurred while saving the user.");
      }
    });
  } catch (err) {
    console.error("Error in RegisterUser:", err);
    return ApiResponse.error(
      res,
      "An unexpected error occurred. Please try again."
    );
  }
};
const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email) {
        return ApiResponse.error(res, null, "Please enter the email", 400);
      }
      if (!password) {
        return ApiResponse.error(res, null, "Please enter a password", 400);
      }
  
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return ApiResponse.error(res, null, "Email doesn't exist", 404);
      }
  
      // Check password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return ApiResponse.error(res, null, "Authentication failed", 401);
      }
  
      // Generate access token
      const accessToken = jwt.sign(
        {
          firstname: user.firstname,
          lastname: user.lastname,
          contactnumber: user.contactnumber,
          gender: user.gender,
          email: user.email,
          isAdmin: user.isAdmin,
          userId: user._id,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1d",
        }
      );
  
      // Respond with tokens
      ApiResponse.success(res, { accessToken }, "Logged in successfully");
    } catch (err) {
      console.error(err);
      ApiResponse.error(res, err, "Internal Server Error");
    }
  };

module.exports = { Register, Login };
