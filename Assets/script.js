//User input variables
var lowercase;
var uppercase;
var numeric;
var special;
var length;

//Generated password variable
var password = "";
var passChar = "";

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
  password = "";

  getPasswordLength();
  getUserInput();

  //String for the next character in password to be chosen from
  
  while(password.length < length){
    passChar = "";
    //Pick a random lowercase letter as a potential character choice to add
    if(lowercase){
      lowercaseChoice = alphabetString.charAt(Math.floor(Math.random() * (alphabetString.length - .001)));
      passChar = lowercaseChoice;
    } 
    //Pick a random uppercase letter as a potential character choice to add
    if(uppercase){
      var uppercaseChoice = alphabetString.charAt(Math.floor(Math.random() * (alphabetString.length - .001)));
      uppercaseChoice = uppercaseChoice.toUpperCase();
      passChar = passChar + uppercaseChoice;
    }
    //Pick a random number as a potential character to add
    if(numeric){
      var numberChoice = numberString.charAt(Math.floor(Math.random() * (numberString.length - .001)));
      passChar = passChar + numberChoice;
    }
    //Pick a random special character as a potential character to add
    if(special){
      var specialChoice = specialString.charAt(Math.floor(Math.random() * (specialString.length - .001)));
      passChar = passChar + specialChoice;
    }

    //Choose a random character from passChar and add it to the password
    password = password + passChar.charAt(Math.floor(Math.random() * (passChar.length - .001)));
  }

  return password;
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
