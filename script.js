"use strict";

// Basic data types

const faction = [
  "Atlantis Guild",
  "Black Powder Rebels",
  "Draconum",
  "Elemental League",
  "Knights Immortal",
  "Necropolis Sect",
  "Orc Raiders",
  "Shyft",
  "Solonavi",
  "Heros",
  "Mage Spawn",
  "none",
];

const movSpec = [
  "Charge",
  "Quickness",
  "Magic Levitation",
  "Flight",
  "Aquatic",
  "Stealth",
  "Bound",
  "Forced March",
  "Nimble",
  "Ram",
  "none",
];

const atkSpec = [
  "Healing",
  "Weapon Master",
  "Magic Blast",
  "Flame Lightning",
  "Shockwave",
  "Vampirism",
  "Magic Healing",
  "Venom",
  "Sneak Attack",
  "Sweep",
  "none",
];

const defSpec = [
  "Battle Armor",
  "Pole Arm",
  "Magic Immunity",
  "Toughness",
  "Defend",
  "Regeneration",
  "Invunerability",
  "Dodge",
  "Magic Retaliation",
  "Limited Invisibility",
  "none",
];

const dmgSpec = [
  "Starting Position",
  "Berserk",
  "Magic Enhancment",
  "Battle Fury",
  "Demoralized",
  "Necromancy",
  "Command",
  "Peirce",
  "Magic Freeze",
  "Magic Confusion",
  "none",
];

//Dice

const d6 = function () {
  return Math.floor(Math.random() * 6 + 1);
};

const d12 = function () {
  return d6() + d6();
};

//*********************Game Mechanics************************

//Mounted Mechanics
const specMov = function (self) {
  self.formation = false;
  self.break = [2, 3, 4, 5, 6];
};

//Base Contact

//Break away
const breakAway = function (self) {
  let roll = d6();
  let win = false;
  self.break.forEach((cond) =>
    roll == cond ? (win = true) : console.log(`${cond} != ${win}`)
  );
  return win;
};

//Attack & Damage

/*This is going to take in number data and return a new array. You will then change all of the stats to the new updated data.
1) You will need to decided how you want to structure your array that you're pulling your data from
2) You will want to use a forEach to update the value of all of new parameters




1) ex const Whelp = [[],[],[],[],[],[],[],[]]
*/

const changeStats = function (unit, dmg, x = 0) {
  let unitTreated = unit[x];
  console.log(unitTreated.index);
  console.log(dmg);
  let dmgTaken = unitTreated.index + dmg;
  console.log(unitTreated[dmgTaken]);
  return unitTreated[dmgTaken];
};

const atk = function (self, target) {
  console.log(self[0]);
  return self[0].atk + d12() >= target[0].def ? true : false;
};

const dmg = function (unit, dmgTaken, heal = "dmg") {
  heal == "heal" ? changeStats(unit, -dmgTaken) : changeStats(unit, dmgTaken);
};
//Healing

let unitStats = class {
  constructor(
    mov,
    movAbil,
    atk,
    atkAbil,
    def,
    defAbil,
    dmg,
    dmgAbil,
    index,
    arc,
    range,
    name,
    faction,
    cost,
    rank
  ) {
    this.mov = mov;
    this.movAbil = movAbil;
    this.atk = atk;
    this.atkAbil = atkAbil;
    this.def = def;
    this.defAbil = defAbil;
    this.dmg = dmg;
    this.dmgAbil = dmgAbil;
    this.index = index;
    this.arc = arc;
    this.range = range;
    this.name = name;
    this.faction = faction;
    this.cost = cost;
    this.rank = rank;
  }
};
//-----------------------SPECIAL ABILITY CARD LOGIC----------------------------------------------

//*********************SPECIAL SPEED ABILITIES*************************

const charge = function (self, target) {
  specMov(self);
  let mov = self.mov * 2;
  if (mov <= 0.5 * mov) {
    if (target.baseContact) {
      atk(self, target);
    }
  } else if (mov > 0.5 * mov) {
    return;
  }
};

const quickness = function (self) {
  self.fomation = false;
  self.actionCost = -1;
};

const flight = function (self) {
  specMov(self);
  self.terrainMods = "all";
};

const magicLevitation = function (self, target) {
  move(target, self);
};

const aquatic = function (self) {
  self.terrainMods = "aquatic";
};

const stealth = function (self) {
  if (self.terrainMods == "hindering") {
    self.targetable = false;
    if (self.baseContact && target.baseContact) {
      self.targetable = true;
    }
  }
};

const bound = function (self, target) {
  specMov(self);
  let mov = self.mov * 2;
  if (mov <= 0.5 * mov) {
    if (!target.baseContact && !self.baseContact) {
      atk(self, target);
    }
  } else if (mov > 0.5 * mov) {
    return;
  }
};

const forcedMarch = function (self) {
  self.formation.forEach((unit) => (unit.mov = self.mov));
};

const nimble = function (self, degree) {
  angle(self, degree);
  self.actionCost = -1;
};

const ram = function (target) {
  dmg(target, 1);
};

//*******************SPECIAL ATTACKS***********************************

const healing = function (self, target) {
  if (target.baseContact && !target.engaged) {
    atk(self, target) ? dmg(target, this.atk, "heal") : miss();
  }
};

const weaponMaster = function (self, target) {
  if (target.baseContact) {
    atk(self, target) ? dmg(target, d6()) : miss();
  }
};

const magicalBlast = function (self, target) {
  if (!self.baseContact && !target.engaged) {
    while (targetSelect < +self.range) {
      target.immune = false;
      atk(self, target) ? dmg(target, d6() + self.buffs) : miss();
    }
  }
};

const flameLightning = function (self, target) {
  if (!self.baseContact && !target.engaged) {
    atk(self, target) ? dmg(target, 1) : miss();
    if (target.baseContact) {
      target.baseContact.forEach((unit) => {
        atk(self, unit) ? dmg(unit, 1 + self.buffs) : miss();
      });
    }
  }
};

//SHOCKWAVE WILL GO HERE

const vampirism = function (self, target) {
  if (baseContact) {
    if (atk(self, target)) {
      dmg(target, self.dmg);
      dmg(self, 1, "heal");
    }
  }
};

const magicHealing = function (self, target) {
  if (!target.engaged) {
    atk(self, target) ? dmg(target, d6() + self.buffs, "heal") : miss();
  }
};

const venom = function (self) {
  if (turnStart) {
    self.enemyContact.forEach((unit) => {
      dmg(unit, 1);
    });
  }
};

const sneakAttack = function (self, target) {
  if (target.rearArc && self.sneaked) {
    atk(self, target) ? dmg(target, self.dmg * 2) : miss();
  }
};

//*********************SPECIAL DEF*********************************

const battleArmor = function (self, incDMG) {
  if (!baseContact) {
    self.def += 2;
  }
};
const poleArm = function (target) {
  if (baseContact) {
    return dmg(target, 1);
  }
};
const magicImmunity = function (self) {
  if (x.includes("magic")) {
    return dmg(self, 0);
  }
};
const toughness = function (self, incDMG) {
  let val = incDMG - 1;
  if (val < 0) {
    return;
  } else {
    return dmg(self, val);
  }
};
const regeneration = function (self) {
  let heal = d6() - 2;
  if (heal > 0) {
    return dmg(self, heal, "heal");
  }
};

const invunerablity = function (self, incATK, incDMG) {
  let val = incDMG - 2;
  if (!baseContact) {
    this.def += 2;
    if (incATK >= this.def)
      if (!val < 0) {
        dmg(val);
      }
    this.def -= 2;
  } else if (baseContact) {
    dmg(self, val);
  }
};

const dodge = function (self, incDMG) {
  if (d6() > 3) {
    return dmg(0);
  } else {
    return dmg(self, incDMG);
  }
};

const magicRetaliation = function (self, incDMG) {
  dmg(self, incDMG);
  return dmg(justMoved);
};

const limitInvisibilty = function () {
  if (!baseContact) {
    this.target = null;
  } else if (baseContact) {
    this.target = true;
  }
};

const Altem_Gaurdsman1 = [
  new unitStats(
    8,
    movSpec[10],
    9,
    atkSpec[1],
    16,
    defSpec[0],
    3,
    dmgSpec[10],
    0,
    90,
    6,
    "Altem Gaurdsman",
    faction[0],
    37,
    "Weak"
  ),
];

console.log(atk(Altem_Gaurdsman1, Altem_Gaurdsman1));

const rollCheckr = function (x) {
  for (let i = 0; i < x; i++) {
    console.log(d12());
  }
};

const number = 1;
let word = "string";
let logic = true;

const sentence = ["parker", "luke"];
let obj = {
  key: "value",
};
