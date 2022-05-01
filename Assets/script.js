//User input variables
var lowercase;
var uppercase;
var numeric;
var special;
var length;

//Generated password variable
var password = "";

//String for the password generator to choose from
var alphabetString = "abcdefghijklmnopqrstuvwxyz";
var numberString = "1234567890";
var specialString = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

function generatePassword(){
  getPasswordLength();
  getUserInput();

  var passChar;

  //while(password.length < length){
    if(lowercase){
      passChar = alphabetString.charAt(25);
      console.log(passChar);
    }
  //}
}

//Gets password length and validates the value
function getPasswordLength(){
  length = window.prompt("Please enter your desired password length (min 8 characters, max 128)");
  
  while(length < 8 || length > 128){
    length = window.prompt("ERROR: Input was not in the specified character length range. Please enter an appropriate length(min 8, max 128)");
  }
}

//Gets user input and validates the data
function getUserInput(){
  lowercase = window.confirm("Would you like to use lowercase letters?");

  uppercase = window.confirm("Would you like to use uppercase letters?");

  numeric = window.confirm("Would you like to use numbers?");

  special = window.confirm("Would you like to use special characters?");
  
  if(lowercase == false && uppercase == false && numeric == false & special == false){
    window.alert("You must use at least one of the previous character choices, please try again");
    getUserInput();
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
