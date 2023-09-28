function showValue1(newValue) {
  document.getElementById('plantSize').innerHTML = newValue;
  calculateROI();
}

const priceIndex2022 = {
  Alabama: 7.56,
  Alaska: 19.24,
  Arizona: 7.67,
  Arkansas: 7.04,
  California: 19.37,
  Colorado: 9.03,
  Connecticut: 14.23,
  Delaware: 6.77,
  'District of Columbia': 10.77,
  Florida: 9.3,
  Georgia: 7.01,
  Hawaii: 33.52,
  Idaho: 8.61,
  Illinois: 8.68,
  Indiana: 7.54,
  Iowa: 8.79,
  Kansas: 8.08,
  Kentucky: 6.36,
  Louisiana: 5.42,
  Maine: 12.13,
  Maryland: 9.56,
  Massachusetts: 17.25,
  Michigan: 8.29,
  Minnesota: 9.86,
  Mississippi: 7.05,
  Missouri: 8.65,
  Montana: 6.63,
  Nebraska: 7.85,
  Nevada: 11.82,
  'New Hampshire': 14.7,
  'New Jersey': 13.6,
  'New Mexico': 5.91,
  'New York': 6.65,
  'North Carolina': 6.88,
  'North Dakota': 7.01,
  Ohio: 7.31,
  Oklahoma: 6.72,
  Oregon: 6.83,
  Pennsylvania: 7.72,
  'Rhode Island': 17.79,
  'South Carolina': 6.79,
  'South Dakota': 7.99,
  Tennessee: 6.41,
  Texas: 6.74,
  Utah: 6.77,
  Vermont: 11.34,
  Virginia: 8.77,
  Washington: 6.07,
  'West Virginia': 7.2,
  Wisconsin: 8.95,
  Wyoming: 6.49,
};

const WRRF_EnergyAeration = {
  type1: [40, 55, 70],
  type2: [40, 55, 70],
  type3: [30, 45, 60],
  type4: [30, 45, 60],
};
const WRRF_EnergyConsumption = {
  type1: [60, 80, 100],
  type2: [40, 50, 60],
  type3: [20, 30, 40],
};

const WRRF_EnergyOptimization = {
  type1: [25, 40],
  type2: [15, 25],
  type3: [5, 15],
};
const selectPlatLocations = document.getElementById('plantLocation');

for (var i = 0; i < Object.keys(priceIndex2022).length; i++) {
  selectPlatLocations.add(
    new Option(
      Object.keys(priceIndex2022)[i],
      (Object.values(priceIndex2022)[i] / 100).toFixed(4)
    )
  );
}

function calculateROI() {
  var plantSize = document.getElementById('plantSize').innerHTML;

  var selectPlatLocationName =
    selectPlatLocations.options[selectPlatLocations.selectedIndex].text;

  var plantTargetType =
    document.getElementById('plantTargetType').options[
      document.getElementById('plantTargetType').selectedIndex
    ].value;

  var plantAutomationLevel = document.getElementById('plantAutomationLevel')
    .options[document.getElementById('plantAutomationLevel').selectedIndex]
    .value;

  var plantAerationLevel =
    document.getElementById('plantAerationLevel').options[
      document.getElementById('plantAerationLevel').selectedIndex
    ].value;

  var energyCost = document.getElementById('plantLocation').value;
  var plantsizePE = 19000 * plantSize; // MGD to PE

  const totalEnergyConsumption = [
    Math.round(
      (plantsizePE * WRRF_EnergyConsumption[plantAerationLevel][0]) / 365
    ),
    Math.round(
      (plantsizePE * WRRF_EnergyConsumption[plantAerationLevel][1]) / 365
    ),
    Math.round(
      (plantsizePE * WRRF_EnergyConsumption[plantAerationLevel][2]) / 365
    ),
  ];
  var totalEnergyConsumption1 = totalEnergyConsumption[0];
  var totalEnergyConsumption2 = totalEnergyConsumption[2];
  var totalEnergyConsumptionAve = totalEnergyConsumption[1];
  var aerationConsumption1 = WRRF_EnergyAeration[plantTargetType][0];
  var aerationConsumption2 = WRRF_EnergyAeration[plantTargetType][2];
  var aerationConsumptionAve = WRRF_EnergyAeration[plantTargetType][1];
  var aerationSavings1 = WRRF_EnergyOptimization[plantAerationLevel][0];
  var aerationSavings2 = WRRF_EnergyOptimization[plantAerationLevel][1];
  var CO2emission = 0.62596; // kg per kWh
  var feasibilityStudyPrice = 20000;
  var implementationProject = [50000, 90000, 150000];
  var energySavings1 =
    totalEnergyConsumptionAve *
    (aerationConsumption1 / 100) *
    (aerationSavings1 / 100);
  var energySavings2 =
    totalEnergyConsumptionAve *
    (aerationConsumption2 / 100) *
    (aerationSavings2 / 100);
  var energyCostSavings1 = energySavings1 * energyCost * 365;
  var energyCostSavings2 = energySavings2 * energyCost * 365;
  var co2Savings1 = (energySavings1 * CO2emission * 365) / 1000;
  var co2Savings2 = (energySavings2 * CO2emission * 365) / 1000;

  let tempImplementationProject = 0;
  if (plantsizePE < 50000) {
    tempImplementationProject = implementationProject[0];
  }
  if (plantsizePE >= 50000) {
    tempImplementationProject = implementationProject[1];
  }
  if (plantsizePE >= 300000) {
    tempImplementationProject = implementationProject[2];
  }

  var breakeven1 = (
    (feasibilityStudyPrice + tempImplementationProject) /
    energyCostSavings2
  ).toFixed(1);
  var breakeven2 = (
    (feasibilityStudyPrice + tempImplementationProject) /
    energyCostSavings1
  ).toFixed(1);
  var roi1 =
    ((energyCostSavings1 * 3) /
      (feasibilityStudyPrice + tempImplementationProject)) *
    100;
  var roi2 =
    ((energyCostSavings2 * 3) /
      (feasibilityStudyPrice + tempImplementationProject)) *
    100;

  const format0 = (num) =>
    num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  document.getElementById('roiResultsTitle').innerHTML = 'Current Status';

  document.getElementById('energyCost').innerHTML =
    'The WRRF has a capacity of <strong>' +
    plantSize.toLocaleString() +
    ' million gallons per day (mgd)</strong> and is located in <strong>' +
    selectPlatLocationName +
    '</strong>, where the average energy cost for industries is <strong>' +
    energyCost +
    ' USD per kWh</strong>.';

  document.getElementById('totalEnergyConsumption').innerHTML =
    'The total estimated energy consumption of the WRRF is between <strong>' +
    totalEnergyConsumption1.toLocaleString() +
    ' kWh per day</strong> and <strong>' +
    totalEnergyConsumption2.toLocaleString() +
    ' kWh per day</strong>';

  document.getElementById('aerationEnergyConsumption').innerHTML =
    'The estimated energy consumption for aeration is between <strong>' +
    Math.round(
      (totalEnergyConsumptionAve * aerationConsumption1) / 100
    ).toLocaleString() +
    ' kWh per day</strong> and <strong>' +
    Math.round(
      (totalEnergyConsumptionAve * aerationConsumption2) / 100
    ).toLocaleString() +
    ' kWh per day</strong>.';

  document.getElementById('roiOptimizationTitle').innerHTML = 'Optimization Potential';
  
  document.getElementById('potentialAerationEnergyReduction').innerHTML =
    "When aeration control is optimised with our approach, the potential energy savings are between  <strong>" +
    Math.round(energySavings1).toLocaleString() +
    ' kWh per day</strong> and <strong>' +
    Math.round(energySavings2).toLocaleString() +
    ' kWh per day</strong>.';

  document.getElementById('potentialEnergySavings').innerHTML =
    'This amounts to potential energy cost savings between <strong>' +
    format0(energyCostSavings1) +
    ' USD per year</strong> and <strong>' +
    format0(energyCostSavings2) +
    ' USD per year</strong>.';

  document.getElementById('potentialCO2EmissionSavings').innerHTML =
    'This also amounts to carbon emission savings between <strong>' +
    format0(co2Savings1) +
    ' metric tons of CO2 per year </strong> and <strong>' +
    format0(co2Savings2) +
    ' metric tons of CO2 per year</strong>.';

  document.getElementById('breakevenTime').innerHTML =
    'The breakeven time for the total investment is between <strong>' +
    breakeven1 +
    '</strong> and <strong>' +
    breakeven2 +
    '</strong> years.';

  //document.getElementById('3YearROI').innerHTML =
    //'The 3-year return of investment (ROI) is between <strong>' +
    //format0(roi1) +
    //' %</strong> and <strong>' +
    //format0(roi2) +
    //' %</strong>.';
}
calculateROI();
