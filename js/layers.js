addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O1P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new ExpantaNum(0),
    }},
    color: "#d231ca",
    requires: new ExpantaNum(10), // Can be a function that takes requirement increases into account
    resource: "order 1 points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new ExpantaNum(1)
	if (hasUpgrade("p",13)) mult = new ExpantaNum(mult).mul(2)
	if (hasUpgrade("p",14)) mult = new ExpantaNum(mult).mul(upgradeEffect("p",14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new ExpantaNum(1)
    },
    upgrades: {
	11: {
		title: "The beginning",
		description: "Double point gain.",
		cost() { return new ExpantaNum(1) },
            },
	12: {
		title: "A small boost",
		description: "Double point gain, again.",
		cost() { return new ExpantaNum(2) },
		unlocked() { return hasUpgrade("p", 11) },
            },
	13: {
		title: "The turning point",
		description: "Double O1P gain.",
		cost() { return new ExpantaNum(5) },
		unlocked() { return hasUpgrade("p", 12) },
            },
	14: {
		title: "A better sale",
		description: "O1P gain is multiplied based on the number of points.",
		cost() { return new ExpantaNum(15) },
		unlocked() { return hasUpgrade("p", 13) },
		effect() { return new ExpantaNum(player.points).add(1).log10().div(2.4).add(1.5) },
		effectDisplay() { return (new ExpantaNum(upgradeEffect("p",14))) + "x" },
            },
	15: {
		title: "A better sale, with points",
		description: "Point gain is multiplied based on the number of O1Ps.",
		cost() { return new ExpantaNum(55) },
		unlocked() { return hasUpgrade("p", 14) },
		effect() { return new ExpantaNum(player.p.points).add(1).log10().div(1.6).add(1.5) },
		effectDisplay() { return (new ExpantaNum(upgradeEffect("p",15))) + "x" },
            },
	21: {
		title: "Exponentiated",
		description: "Point gain is ^1.25.",
		cost() { return new ExpantaNum(125) },
		unlocked() { return hasUpgrade("p", 15) },
            },
    },
    row:0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
