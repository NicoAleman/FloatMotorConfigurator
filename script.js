// Text Field / Select background colors
const everySetupRed = '#ff000033'
const everySetupRedDim = '#ff000014'
const initialSetupYellow = '#ffff0046'
const initialSetupYellowDim = '#ffff0020'

// Array of parameter IDs that must be set after every Motor Setup
const everySetupIds = [
  'l_current_max',
  'l_current_min',
  'l_abs_current_max',
  'l_in_current_max',
  'l_in_current_min',
  'l_battery_cut_start',
  'l_battery_cut_end',
  'foc_sl_erpm'
];

// Array of parameter IDs that only must be set after initial Motor Setup
const initialSetupIds = [
  'l_temp_accel_dec',
  'l_temp_fet_start',
  'l_temp_fet_end',
  'l_temp_motor_start',
  'l_temp_motor_end',
  'foc_fw_current_max',
  'foc_fw_duty_start',
  'foc_fw_ramp_time',
  'foc_hall_interp_erpm',
  'foc_f_zv',
  'foc_offsets_cal_on_boot',
  'bms.type'
];

// Function to apply colored background to specified text fields / selects
function applyParamColorRule(inputId, color, dimColor) {
  const inputElement = document.getElementById(inputId);

  // Set the initial background color
  inputElement.style.backgroundColor = color;

  // Check if the input element is a select
  if (inputElement.tagName === 'SELECT') {
    inputElement.addEventListener('change', function() {
      // Check if the select option value is empty
      const selectedOption = inputElement.options[inputElement.selectedIndex];
      if (selectedOption.value === '') {
        inputElement.style.backgroundColor = color;
      } else {
        inputElement.style.backgroundColor = dimColor;
      }
    });
  } else {
    inputElement.addEventListener('input', function() {
      // Check if the input field is empty
      if (inputElement.value === '') {
        inputElement.style.backgroundColor = color;
      } else {
        inputElement.style.backgroundColor = dimColor;
      }
    });
  }
}

function resetParamColors() {
	// Reset "Every Setup" parameters to darker red background
	everySetupIds.forEach(function(inputId) {
    const inputElement = document.getElementById(inputId);
  	inputElement.style.backgroundColor = everySetupRed;
  });
  
  // Reset "Initial Setup" parameters to darker yellow background
  initialSetupIds.forEach(function(inputId) {
    const inputElement = document.getElementById(inputId);
  	inputElement.style.backgroundColor = initialSetupYellow;
  });
}

function clearConfig() {
  var textFieldList = document.querySelector('.text-field-list');
  var columns = textFieldList.getElementsByClassName('column');

  // Loop through each column
  Array.from(columns).forEach(function(column) {
    // Get all input and select elements within the column
    var params = column.querySelectorAll('input, select');

    // Loop through each parameter and set its value to an empty string
    Array.from(params).forEach(function(element) {
      element.value = '';
    });
  });
  
  resetParamColors();
}

// Apply red background to "Every Setup" parameters
everySetupIds.forEach(function(inputId) {
  applyParamColorRule(inputId, everySetupRed, everySetupRedDim);
});

// Apply yellow background to "Initial Setup" parameters
initialSetupIds.forEach(function(inputId) {
  applyParamColorRule(inputId, initialSetupYellow, initialSetupYellowDim);
});

// Clear Button Functionality
var clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearConfig); // Clear Config when selected