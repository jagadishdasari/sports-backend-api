const messages = {
  success: {
    REGISTER:
      "Verification OTP has been sent to your mobile, Please verify your account.",
    FORGOT:
      "Please check your email address for verification code. Please enter the verification code to reset your password.",
    FORGOT_INVALID:
      "NO account registered with this email, Please try new one.",
    RESETPASSWORD: "Password updated successfully, Please login now.",
    LOGIN: "You have successfully logged In.",
    LOGOUT: "You have successfully logged Out.",
    verifyRegistrationOTP: "Your account has been verified, Please login now.",
    VERIFYFORGETOTP:
      "Your account has been verified, Please reset your password now.",
    RESENDOTP: "An OTP has been sent to your email, Plesae check."
  },
  error: {
    FACEBOOK: "Error in authenticating from Facebook, Invalid Credentials",
    DUPLICATE_EMAIL: "Account already exist with this email.",
    INVALID_EMAIL:
      "No Account registered with this email, Plesae try other one.",
    REGISTER: "Some Error occured, while adding user.",
    verifyRegistrationOTP: "You have entered invalid OTP.",
    FORGOT: "Some Error Occured, While recovering password.",
    RESETPASSWORD: "Some Error Occured, While upadting your new password.",
    LOGIN_PASSWORD: "Invalid Password",
    LOGIN_INVALID: "Invalid Username or Password",
    LOGOUT: "Some Error Occured, While logging Out.",
    SERVER: "Some Error Occured, Please try after Some time."
  }
};

module.exports = messages;
