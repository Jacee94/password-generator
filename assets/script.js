//String for the password generator to choose from
var alphabetString = "abcdefghijklmnopqrstuvwxyz";
var numberString = "1234567890";
var specialString = "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

var charLen;
var password = '';

// Add event listener to generate button
$('#generate').click(() => {
  startPasswordGeneration();
  $('#next-btn').data('step', 0);
})

$('#next-btn').click(() => {
  const $btnStep = $('#next-btn').data('step');

  if($btnStep === 0) validateCharLength();
  else if($btnStep === 1) validateRadioInput();
})

$("#password-modal").on("hidden.bs.modal", () => {
  $('.form-group').html('');
  $('#next-btn').data('step', 0)
  charLen = 0;
  password = '';
});

function startPasswordGeneration(){
  const modalStartHtml = `<label for="input-field" class="col-form-label" id="input-field-text"></label>
                          <input type="text" class="form-control" id="input-field">`;
  
  $('.form-group').append(modalStartHtml);
  $('#passwordModalLabel').text('Character Length');
  $('#input-field-text').text('Please enter how long you would like your password to be:\n(Whole number between 7 and 129 characters long)');
}

function validateCharLength(){
  const $charLen = parseInt($('#input-field').val());

  if(typeof $charLen === 'number' && $charLen > 7 && $charLen < 129){
    charLen = $charLen;
    $('#next-btn').data('step', 1);
    getUserInput(false);
  } else {
    $('#input-field').val('');
    $('#input-field').attr('placeholder', 'PLEASE ENTER AN APPROPRIATE NUMBER');
  }
}

//Gets user input and validates the data
function getUserInput(failValidate){
  $('#next-btn').data('step', 1);
  const validation = failValidate ? `<p>At least one field must have YES selected</p>` : '' ;

  const htmlInput = validation + `<p>Would you like to use Lowercase Letters? <input type='radio' name='lowercase' id='lower-yes' value='yes'></input><label for='lower-yes'>&nbsp;Yes&nbsp;</label><input type='radio' name='lowercase' id='lower-no' value='no'></input><label for='lower-no'>&nbsp;No&nbsp;</label></p>
  <p>Would you like to use Uppercase Letters? <input type='radio' name='uppercase' id='upper-yes' value='yes'></input><label for='upper-yes'>&nbsp;Yes&nbsp;</label><input type='radio' name='uppercase' id='upper-no' value='no'></input><label for='upper-no'>&nbsp;No&nbsp;</label></p>
  <p>Would you like to use Numbers? <input type='radio' name='number' id='number-yes' value='yes'></input><label for='number-yes'>&nbsp;Yes&nbsp;</label><input type='radio' name='number' id='number-no' value='no'></input><label for='number-no'>&nbsp;No&nbsp;</label></p>
  <p>Would you like to use Special Characters? <input type='radio' name='special' id='special-yes' value='yes'></input><label for='special-yes'>&nbsp;Yes&nbsp;</label><input type='radio' name='special' id='special-no' value='no'></input><label for='special-no'>&nbsp;No&nbsp;</label></p>`;

  $('.form-group').html('');
  $('.form-group').append(htmlInput);
}

function validateRadioInput(){
  let l = $('input[name="lowercase"]:checked').val() === 'yes' ? true : false;
  let u = $('input[name="uppercase"]:checked').val() === 'yes' ? true : false;
  let n = $('input[name="number"]:checked').val() === 'yes' ? true : false;
  let s = $('input[name="special"]:checked').val() === 'yes' ? true : false;

  if(l || u || n || s) {
      writePassword(generatePassword(l, u, n, s));
  } else {
    getUserInput(true);
  }
}

function generatePassword(lowercase, uppercase, number, special){
  let passChar;

  while(password.length < charLen){
    passChar = "";
    //Pick a random lowercase letter as a potential character choice to add
    if(lowercase){
      let lowercaseChoice = alphabetString.charAt(Math.floor(Math.random() * (alphabetString.length - .001)));
      passChar = lowercaseChoice;
    } 
    //Pick a random uppercase letter as a potential character choice to add
    if(uppercase){
      var uppercaseChoice = alphabetString.charAt(Math.floor(Math.random() * (alphabetString.length - .001)));
      uppercaseChoice = uppercaseChoice.toUpperCase();
      passChar = passChar + uppercaseChoice;
    }
    //Pick a random number as a potential character to add
    if(number){
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

// Write password to the #password input
function writePassword(pass) {
  $('#password').val(pass);
  $('#password-modal').modal('hide');
}