function showValue1(newValue) { 
    document.getElementById("plantSize").innerHTML=newValue;
	calculateROI();
}

function calculateROI() { 
    var plantSize = document.getElementById("plantSize").innerHTML;
    var plantLocation = document.getElementById("plantLocation").options[document.getElementById("plantLocation").selectedIndex].text;
    var energyCost = document.getElementById('plantLocation').value;
    var energyEfficiency = 1500; //kWh per MG 
    var totalEnergyConsumption = plantSize*energyEfficiency;
    var aerationConsumption1 = 0.4; 
    var aerationConsumption2 = 0.7;
    var aerationSavings1 = 0.2;
    var aerationSavings2 = 0.4;
    var CO2emission = 0.62596; // kg per kWh
    var feasibilityStudyPrice = 40000;
    var implementationProject = 73000;
    var energySavings1 = (totalEnergyConsumption*aerationConsumption1*aerationSavings1);
    var energySavings2 = (totalEnergyConsumption*aerationConsumption2*aerationSavings2);
    var energyCostSavings1 = (energySavings1*energyCost*365);
    var energyCostSavings2 = (energySavings2*energyCost*365);
    var co2Savings1 = (energySavings1*CO2emission*365/1000);
    var co2Savings2 = (energySavings2*CO2emission*365/1000);
    var breakeven1 = ((feasibilityStudyPrice+implementationProject)/energyCostSavings2).toFixed(1);
    var breakeven2 = ((feasibilityStudyPrice+implementationProject)/energyCostSavings1).toFixed(1);
    var roi1 = (energyCostSavings1*3/(feasibilityStudyPrice+implementationProject)*100).toFixed(0);
    var roi2 = (energyCostSavings2*3/(feasibilityStudyPrice+implementationProject)*100).toFixed(0);
	
	const format0 = (num, decimals) => num.toLocaleString('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 0,
	});

    document.getElementById("roiResultsTitle").innerHTML = "Results";
    document.getElementById("energyCost").innerHTML="<ul><li>The plant capacity is <strong>" + plantSize.toLocaleString() + " million gallons per day (mgd)</strong> and is located at <strong>" + plantLocation + "</strong>, where the average energy cost for industries is <strong>" + energyCost + " USD per kWh</strong>.</li></ul>";
    document.getElementById("totalEnergyConsumption").innerHTML="<ul><li>The estimated total energy consumption for the plant is <strong>" + totalEnergyConsumption.toLocaleString() + " kWh per day</strong>.</li></ul>";
    document.getElementById("aerationEnergyConsumption").innerHTML="<ul><li>The estimated energy consumption for aeration control is between <strong>" + (totalEnergyConsumption*aerationConsumption1).toLocaleString() + " kWh per day</strong> (40%) to <strong>" + (totalEnergyConsumption*aerationConsumption2).toLocaleString() + " kWh per day</strong> (70%).</li></ul>";
    document.getElementById("potentialAerationEnergyReduction").innerHTML="<ul><li>When aeration control is optimised with DHI's approach, the potential energy savings are between  <strong>" + energySavings1.toLocaleString() + " kWh per day</strong> (20%) to <strong>" + energySavings2.toLocaleString() + " kWh per day</strong> (40%).</li></ul>" ;
    document.getElementById("potentialEnergySavings").innerHTML="<ul><li>This amounts to potential energy cost savings between <strong>" + format0(energyCostSavings1) + " USD per year</strong> and <strong>" + format0(energyCostSavings2) + " USD per year</strong>.</li></ul>";
    document.getElementById("potentialCO2EmissionSavings").innerHTML="<ul><li>This also amounts to carbon emission savings between <strong>" + format0(co2Savings1) + " metric tons of CO2 per year </strong> and <strong>" + format0(co2Savings2) + " metric tons of CO2 per year</strong>.</li></ul>";
    //document.getElementById("feasibilityStudyInvestment").innerHTML="<ul><li>We can conduct a feasibility study to analyze and evaluate the potential savings at  <strong>" + feasibilityStudyPrice.toLocaleString() + " USD</strong>.</li></ul>";
    //document.getElementById("implementationInvestment").innerHTML="<ul><li>A further implementation project investment of <strong>" + implementationProject.toLocaleString() + "* USD</strong> is needed after we concluded potential savings are feasible.</li></ul>";
    document.getElementById("breakevenTime").innerHTML="<ul><li>The breakeven time for the total investment is between <strong>" + breakeven1 + "</strong> and <strong>" + breakeven2 + "</strong> years.</li></ul>";
    document.getElementById("3YearROI").innerHTML="<ul><li>The 3-year return of investment (ROI) is between <strong>" + format0(roi1) + " %</strong> and <strong>" + format0(roi2) + " %</strong>.</li></ul>";
    //document.getElementById("disclaimer").innerHTML="<br><hr style='height: 1px; text-align: center;'><i style='font-size: 75%;'>Disclaimer: Lorem ipsum</i>.";
	
}
