// Research Tab

function getLab(){
	if(wood >= labWoodCost && gem >= labGemCost && metal >= labMetalCost){
		wood -= labWoodCost;
		gem -= labGemCost;
		metal -= labMetalCost;
		lab += 1;
		updateLabCost();
	}
}

function getLabT2(){
	if(wood >= labT2WoodCost && gem >= labT2GemCost && metal >= labT2MetalCost){
		wood -= labT2WoodCost;
		gem -= labT2GemCost;
		metal -= labT2MetalCost;
		labT2 += 1;
		updateLabCost();
	}
}

function getLabT3(){
	if(wood >= labT3WoodCost && gem >= labT3GemCost && metal >= labT3MetalCost){
		wood -= labT3WoodCost;
		gem -= labT3GemCost;
		metal -= labT3MetalCost;
		labT3 += 1;
		updateLabCost();
	}
}

function getLabT4(){
	if(wood >= labT4WoodCost && gem >= labT4GemCost && metal >= labT4MetalCost){
		wood -= labT4WoodCost;
		gem -= labT4GemCost;
		metal -= labT4MetalCost;
		labT4 += 1;
		updateLabCost();
	}
}

function getLabT5(){
	if(wood >= labT5WoodCost && gem >= labT5GemCost && metal >= labT5MetalCost){
		wood -= labT5WoodCost;
		gem -= labT5GemCost;
		metal -= labT5MetalCost;
		labT5 += 1;
		updateLabCost();
	}
}

function updateLabCost(){
	labWoodCost = labCostModel(10, lab) * labT1Multi;
	labGemCost = labCostModel(15, lab) * labT1Multi;
	labMetalCost = labCostModel(20, lab) * labT1Multi;

	labT2WoodCost = labCostModel(500, labT2) * labT2PlusMulti;
	labT2GemCost = labCostModel(200, labT2) * labT2PlusMulti;
	labT2MetalCost = labCostModel(1000, labT2) * labT2PlusMulti;

	labT3WoodCost = labCostModel(9600, labT3) * labT2PlusMulti;
	labT3GemCost = labCostModel(4700, labT3) * labT2PlusMulti;
	labT3MetalCost = labCostModel(17000, labT3) * labT2PlusMulti;

	labT4MetalCost = labCostModel(610000, labT4) * labT2PlusMulti;
	labT4GemCost = labCostModel(37000, labT4) * labT2PlusMulti;
	labT4WoodCost = labCostModel(926000, labT4) * labT2PlusMulti;

	labT5MetalCost = labCostModel(12400000, labT5) * labT2PlusMulti;
	labT5GemCost = labCostModel(7300000, labT5) * labT2PlusMulti;
	labT5WoodCost = labCostModel(15900000, labT5) * labT2PlusMulti;
}

function labCostModel(base_cost, unit_count){
  // https://www.desmos.com/calculator/8epfkr53t7
  return base_cost + base_cost * Math.floor(unit_count / 30);
}

function purchaseTech(id) {
	var tech = Game.tech.getTechData(id);
	if (typeof tech === 'undefined') {
		return;
	}

	if (Game.tech.buyTech(id, 1)) {
		Game.statistics.add('techResearched', 1);
		Game.statistics.add('resourcesUnlocked', tech.newResources.length);

		refreshResources();
		refreshResearches();
		refreshTabs();

		for (var i = 0; i < tech.tabAlerts.length; i++) {
			newUnlock(tech.tabAlerts[i]);
		}
		if (tech.notifyTitle !== null && tech.notifyText !== null) {
			Game.notifySuccess(tech.notifyTitle, tech.notifyText);
		}
	}
}

function getCost(basePrice, amount, multiplier) {
	if(!multiplier) {
		multiplier = 1.1;
	}
	return Math.floor(basePrice * Math.pow(multiplier, amount));
}

function updateResourceEfficiencyDisplay() {
	var tech = Game.tech.getTechData('efficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().class = 'hidden';
		return;
	} else {
		tech.getBodyElement().class = '';
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	tech.getTitleElement().text(tech.name + " #" + (tech.current));
	tech.getCostElement().text(Game.settings.format(cost));
}

function updateEnergyEfficiencyDisplay() {
	var tech = Game.tech.getTechData('energyEfficiencyResearch');

	if(tech.current >= tech.maxLevel) {
		tech.getButtonElement().class = '';
	}

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().className = 'hidden';
		return;
	} else {
		tech.getBodyElement().className= '';
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	if(tech.current === tech.maxLevel) {
		tech.getTitleElement().text(tech.name + " " + tech.maxLevel + " (MAX)");
		tech.getCostElement().text("N/A");
	} else {
		tech.getTitleElement().text(tech.name + " " + (tech.current) + " / " + tech.maxLevel);
		tech.getCostElement().text(Game.settings.format(cost));
	}
}

function updateScienceEfficiencyDisplay() {
	var tech = Game.tech.getTechData('scienceEfficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().className = 'hidden';
		return;
	} else {
		tech.getBodyElement().className = '';
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	tech.getTitleElement().text(tech.name + " #" + (tech.current));
	tech.getCostElement().text(Game.settings.format(cost));
}

function updateBatteryEfficiencyDisplay() {
	var tech = Game.tech.getTechData('batteryEfficiencyResearch');

	if(science > tech.cost['science'] || tech.current > 0) {
		tech.unlocked = true;
	}

	if(tech.unlocked === false) {
		tech.getBodyElement().className = 'hidden';
		return;
	} else {
		tech.getBodyElement().className = '';
	}

	var cost = getCost(tech.cost['science'], tech.current);
	Game.settings.turnRed(science, cost, tech.htmlIdCost);

	if(tech.current === tech.maxLevel) {
		tech.getTitleElement().text(tech.name + " " + tech.maxLevel + " (MAX)");
		tech.getCostElement().text("N/A");
	} else {
		tech.getTitleElement().text(tech.name + " " + (tech.current) + " / " + tech.maxLevel);
		tech.getCostElement().text(Game.settings.format(cost));
	}
}
