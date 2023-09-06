const radioInputs = document.getElementsByName('system')
const bmiMetricInputsContainer = document.querySelector('.bmi-details-metric')
const bmiImperialInputsContainer = document.querySelector('.bmi-details-imperial')

// Metric Inputs:
const heightCmMetricInput = document.getElementById('height-cm-metric')
const weightKgMetricInput = document.getElementById('weight-kg-metric')

// Imperial Inputs:
const heightFtImperialInput = document.getElementById('height-ft-imperial')
const heightInImperialInput = document.getElementById('height-in-imperial')
const weightStImperialInput = document.getElementById('weight-st-imperial')
const weightLbsImperialInput = document.getElementById('weight-lbs-imperial')

// Calculator footer
const bmiResultSpan = document.querySelector('.bmi-result')
const bmiResultFooter = document.querySelector('.bmi-result-container')
const bmiWelcomeFooter = document.querySelector('.bmi-welcome')
const bmiSuggestion = document.querySelector('.bmi-suggestion')

let systemMeasurement = 'metric'
let bmiResult = 0

const underweightLimit = 18.5
const healthyLowerLimit = 18.5
const healthyUpperLimit = 24.9
const overweightLowerLimit = 25
const overweightUpperLimit = 29.9
const obeseLimit = 30

function reset() {
  bmiWelcomeFooter.classList.remove('hide')
  bmiResultFooter.classList.add('hide')
  heightCmMetricInput.value = ''
  weightKgMetricInput.value = ''
  heightFtImperialInput.value = ''
  heightInImperialInput.value = ''
  weightStImperialInput.value = ''
  weightLbsImperialInput.value = ''
}

function printSuggestionMetric(height) {
  const lowerWeight = ((healthyLowerLimit / 10000) * (height**2)).toFixed(1)
  const upperWeight = ((healthyUpperLimit / 10000) * (height**2)).toFixed(1)

  if (bmiResult <= underweightLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI Suggest you're an Underweight. Your ideal weight is between 
      <strong> ${lowerWeight}Kgs - ${upperWeight}Kgs.</strong>
    `
  } else if (bmiResult > healthyLowerLimit && bmiResult <= healthyUpperLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re a healthy weight. Your ideal weight is between
      <strong> ${lowerWeight}Kgs - ${upperWeight}Kgs.</strong>
    `
  } else if (bmiResult >= overweightLowerLimit && bmiResult <= overweightUpperLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re an overweight. Your ideal weight is between
      <strong> ${lowerWeight}Kgs - ${upperWeight}Kgs.</strong>
    `
  } else if (bmiResult >= obeseLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re an Obese. Your ideal weight is between
      <strong> ${lowerWeight}Kgs - ${upperWeight}Kgs.</strong>
    `
  }
}

function printSuggestionImperial(height) {
  const lowerWeight = ((healthyLowerLimit / 703) * (height**2)).toFixed(1)
  const upperWeight = ((healthyUpperLimit / 703) * (height**2)).toFixed(1)
  const lowerWeightSt = Math.floor(lowerWeight/14)
  const lowerWeightLbs = Math.floor(lowerWeight%14)
  const upperWeightSt = Math.floor(upperWeight/14)
  const upperWeightLbs = Math.floor(upperWeight%14)

  if (bmiResult <= underweightLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI Suggest you're an Underweight. Your ideal weight is between 
      <strong> ${lowerWeightSt}st ${lowerWeightLbs}lbs - ${upperWeightSt}st ${upperWeightLbs}lbs.</strong>
    `
  } else if (bmiResult > healthyLowerLimit && bmiResult <= healthyUpperLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re a healthy weight. Your ideal weight is between
      <strong> ${lowerWeightSt}st ${lowerWeightLbs}lbs - ${upperWeightSt}st ${upperWeightLbs}lbs.</strong>
    `
  } else if (bmiResult >= overweightLowerLimit && bmiResult <= overweightUpperLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re an overweight. Your ideal weight is between
      <strong> ${lowerWeightSt}st ${lowerWeightLbs}lbs - ${upperWeightSt}st ${upperWeightLbs}lbs.</strong>
    `
  } else if (bmiResult >= obeseLimit) {
    bmiSuggestion.innerHTML = `
      Your BMI suggests you’re an Obese. Your ideal weight is between
      <strong> ${lowerWeightSt}st ${lowerWeightLbs}lbs - ${upperWeightSt}st ${upperWeightLbs}lbs.</strong>
    `
  }
}

function calculateBmiMetric() {
  const weightKg = weightKgMetricInput.value
  const heightCm = heightCmMetricInput.value

  if (heightCm > 0 && weightKg > 0 && systemMeasurement === 'metric') {
    bmiResultFooter.classList.remove('hide')
    bmiWelcomeFooter.classList.add('hide')
    bmiResult = ((weightKg / heightCm / heightCm) * 10000).toFixed(1)
    bmiResultSpan.textContent = bmiResult
    printSuggestionMetric(heightCm)
  }
}

function calculateBmiImperial() {
  const weightLbs = +weightLbsImperialInput.value + (weightStImperialInput.value * 14)
  const heightIn = +heightInImperialInput.value + (heightFtImperialInput.value * 12)

  if (heightIn > 0 && weightLbs > 0 && systemMeasurement === 'imperial') {
    bmiResultFooter.classList.remove('hide')
    bmiWelcomeFooter.classList.add('hide')
    bmiResult = ((weightLbs / heightIn / heightIn) * 703).toFixed(1) //weight in Lbs | height in In
    bmiResultSpan.textContent = bmiResult
    printSuggestionImperial(heightIn)
  }
}

radioInputs.forEach((input) => {
  input.addEventListener('input', (e) => {
    systemMeasurement = e.target.value
    reset()
    if (e.target.value === 'metric') {
      bmiMetricInputsContainer.classList.remove('hide')
      bmiImperialInputsContainer.classList.add('hide')
    } else if (e.target.value === 'imperial') {
      bmiMetricInputsContainer.classList.add('hide')
      bmiImperialInputsContainer.classList.remove('hide')
    }
  })
})

// Metric events Listeners
heightCmMetricInput.addEventListener('change', calculateBmiMetric)
weightKgMetricInput.addEventListener('change', calculateBmiMetric)

// Imperial events Listeners
heightFtImperialInput.addEventListener('change', (e) => {
  calculateBmiImperial()
})

heightInImperialInput.addEventListener('change', (e) => {
  calculateBmiImperial()
})

weightStImperialInput.addEventListener('change', (e) => {
  calculateBmiImperial()
})

weightLbsImperialInput.addEventListener('change', (e) => {
  calculateBmiImperial()
})