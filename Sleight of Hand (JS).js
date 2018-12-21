// Create Objects that contain archtype parameters //
const masterThief = {
    skillPoints: 9,
    crewPoints: 0,
    contactPoints: 5
};

const modernItalian = {
    skillPoints: 4,
    crewPoints: 2,
    contactPoints: 3
};

const shockAndAwe = {
    skillPoints: 2,
    crewPoints: 3,
    contactPoints: 3
};

// Var to store the choice of archetype
var chosenArchetype;


// Variables for target modification and storage
var chosenTargets = [];
var targetCounter;
var targetCellLog = [];

// Variables for skill modification and storage
var changingSkillCounter;
var chosenSkills;
var skillCounter;
var skillCellLog = [];
var skillWellConnectedLogCrew = 0;
var skillWellConnectedLogCont = 0;

// Variables for crew modification and storage
var changingCrewCounter;
var chosenCrew;
var crewCounter;
var crewCellLog = [];

// Variables for contact modification and storage
var changingContactCounter;
var chosenContacts;
var contactCounter;
var contactCellLog = [];

// Functions to acquire the initial values for whatever class the user picks //
function getSkillPoints(row) {
    for (var i = 0; i < row.cells.length; i++) {
        if(row.cells[i].className == "skillPointsCollumn") {
            return parseInt(row.cells[i].innerHTML);
        }
    }
    return 0;
}

function getCrewPoints(row) {
    for (var i = 0; i < row.cells.length; i++) {
        if(row.cells[i].className == "crewPointsCollumn") {
            return parseInt(row.cells[i].innerHTML);
        }
    }
    return 0;
}

function getContactPoints(row) {
    for (var i = 0; i < row.cells.length; i++) {
        if(row.cells[i].className == "contactPointsCollumn") {
            return parseInt(row.cells[i].innerHTML);
        }
    }
    return 0;
}

// Function for picking the archtype // 
function pickArchetype(tableName, rowNum, method) {
    // Get initial skill, crew, and contact points. THey should all be 0! //
    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var crewPointsString = document.getElementById("crew");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var contactPointsString = document.getElementById("contacts");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    // options is meant to give value to the Archetype table rows //
    var options = document.getElementById(tableName).getElementsByTagName("tr");

    // set skill, crew, and contact PointsGiven respectively to the values found in the respective row //
    var skillPointsGiven = getSkillPoints(options[rowNum]);
    var crewPointsGiven = getCrewPoints(options[rowNum]);
    var contactPointsGiven = getContactPoints(options[rowNum]);

    // This seems like a bit of redundant code but set the skill, crew, and contact 
    skillPoints = skillPointsGiven;
    crewPoints = crewPointsGiven;
    contactPoints = contactPointsGiven;

    skillPointsString.innerHTML = skillPoints.toString(); //update counter
    crewPointsString.innerHTML = crewPoints.toString(); //update counter
    contactPointsString.innerHTML = contactPoints.toString(); //update counter

    // Free Skills and Forced Targets
    if (rowNum == 1) {
        chosenArchetype = "Master Thief";
        forcedSaaTargets('targets', 1, 0);
        forcedSaaTargets('targets', 2, 0);
        forcedMtSkills('skillsToChoose', 0, 0);
    } else if (rowNum == 2) {
        chosenArchetype = "Modern Italian";
        forcedSaaTargets('targets', 1, 0);
        forcedSaaTargets('targets', 2, 0);
        forcedMISkills('skillsToChoose', 2, 2)
    } else if (rowNum == 3) {
        chosenArchetype = "Shock and Awe";
        forcedSaaTargets('targets', 1, 0);
        forcedSaaTargets('targets', 2, 0);
        forcedSaaSkills('skillsToChoose', 2, 0)
    }
}

// Sets forced targets for Shock and Awe Archetype //
function forcedSaaTargets(tableName, rowNum, cellNum) {
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];

    if (chosenArchetype == "Shock and Awe") {
        cell.className = "saaTarget";
        return 1;
    } else {
        cell.className = "notATarget";
    }
}

// Sets free Skills for the Archetypes //
function forcedMtSkills(tableName, rowNum, cellNum) {
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var clearcell;
    let i;
    let j;

    // Sets all skill cells to noSkill so we start fresh every time there is an Archetype change //
    if (chosenArchetype == "Master Thief") {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 3; j++) {
                clearcell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                clearcell.className = "noSkill";
            }
        }
        cell.className = "freeSkill";
        return 1;
    }
}

function forcedMISkills(tableName, rowNum, cellNum) {
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var clearcell;
    if (chosenArchetype == "Modern Italian") {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 3; j++) {
                clearcell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                clearcell.className = "noSkill";
            }
        }
        cell.className = "freeSkill";
        return 1;
    }
}

function forcedSaaSkills(tableName, rowNum, cellNum) {
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var clearcell;
    if (chosenArchetype == "Shock and Awe") {
        for (i = 0; i < 5; i++) {
            for (j = 0; j < 3; j++) {
                clearcell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
                clearcell.className = "noSkill";
            }
        }
        cell.className = "freeSkill";
        return 1;
    }
}

// function for choosing your targets //
function chooseTarget(tableName, rowNum, cellNum) {
    // the if statement makes sure that an archetype is actually picked //
    // if there is no archetype is picked than the rest of the function will not run //
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        console.log('All good!');
    } else {
        return ('Pick an Archetype');
    }

    // every time we access the function we count how many Targets have been picked by accessing the //
    // countTakenTargets function //
    targetCounter = countTakenTargets(tableName);


    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var justChanged = false;
    var is_takenI;
    if (targetCounter < 4 || targetCounter - 1 == 3) {
        if (targetCounter + 1 == 5) {
            for (is_takenI = 0; is_takenI < targetCellLog.length; is_takenI++) {
                if (targetCellLog[is_takenI] === cell) {
                    targetCellLog[is_takenI].className = "notATarget";
                    targetCellLog = targetCellLog.splice(is_takenI, 1);
                }
            }
            
            justChanged = true;
        }
        if (cell.className != "aTarget" && justChanged == false && cell.className != "saaTarget") {
            cell.className = "aTarget";
            targetCellLog.push(cell);
            console.log(targetCellLog);
            return 1;
        } else if (cell.className != "notATarget" && cell.className != "saaTarget") {
            cell.className = "notATarget"
            return 0;
        } else {
            return 0;
        }
    }
}

function countTakenTargets(tableName) {
    var num = 1;
    var i;
    var j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            var takenCell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            if (takenCell.className == "aTarget" || takenCell.className == "saaTarget") {
                num++;
            }
        }
    }
    return num;

}

function chooseSkill(tableName, rowNum, cellNum) {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        if (chosenArchetype == "Master Thief") {
            chosenSkills = masterThief.skillPoints;
        } else if (chosenArchetype == "Modern Italian") {
            chosenSkills = modernItalian.skillPoints;
        } else {
            chosenSkills = shockAndAwe.skillPoints;
        }
    } else {
        return ('Pick an Archetype');
    }
    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);
    skillCounter = countTakenSkills(tableName);
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var justChanged = false;
    var is_takenI;
    if (skillCounter < chosenSkills + 2) {
        if (skillCounter + 1 == chosenSkills + 2) {
            for (is_takenI = 0; is_takenI < skillCellLog.length; is_takenI++) {
                if (skillCellLog[is_takenI] === cell) {
                    skillCellLog[is_takenI].className = "noSkill";
                    skillCellLog = skillCellLog.splice(is_takenI, 1);
                    skillPoints++;
                    skillPointsString.innerHTML = skillPoints.toString();
                }
            }
            justChanged = true;
        }
        if (cell.className != "gotSkills" && justChanged == false && cell.className != "freeSkill") {
            cell.className = "gotSkills";
            skillCellLog.push(cell);
            if (skillPoints - 1 > -1) {
                skillPoints--;
            }
            skillPointsString.innerHTML = skillPoints.toString();
            return 1;
        } else if (cell.className != "noSkill" && cell.className != "freeSkill") {
            cell.className = "noSkill"
            skillPoints++;
            skillPointsString.innerHTML = skillPoints.toString();
            return 0;
        } else {
            return 0
        }
    }
    
}

function countTakenSkills(tableName) {
    var num = 1;
    var i;
    var j;
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 3; j++) {
            var takenCell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            if (takenCell.className == "gotSkills" || takenCell.className == "freebieSkill") {
                num++;
            }
        }
    }
    return num;

}

function giveExtraCrew() {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        console.log('All good!')
    } else {
        return ('Pick an Archetype');
    }

    var takenExtraCrewString = document.getElementById("extraCrewForSkills");
    var takenExtraCrew = parseInt(takenExtraCrewString.innerHTML);

    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var crewPointsString = document.getElementById("crew");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var cell = document.getElementById("wellConnectedCell");

    if (takenExtraCrew + 1 > 1 || skillWellConnectedLogCont > 0 || skillPoints === 0) {
        return "TOO HIGH!!!";
    }

    skillPoints--;
    crewPoints++;
    takenExtraCrew++;
    skillWellConnectedLogCrew++;

    if (takenExtraCrew > 0) {
        cell.className = "gotSkills";
    }

    skillPointsString.innerHTML = skillPoints.toString();
    crewPointsString.innerHTML = crewPoints.toString();
    takenExtraCrewString.innerHTML = takenExtraCrew.toString();

}

function takeExtraCrew(clearExtraFromSkills) {

    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        console.log('All good!')
    } else {
        return ('Pick an Archetype');
    }

    var takenExtraCrewString = document.getElementById("extraCrewForSkills");
    var takenExtraCrew = parseInt(takenExtraCrewString.innerHTML);

    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var crewPointsString = document.getElementById("crew");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var cell = document.getElementById("wellConnectedCell");

    if (takenExtraCrew - 1 < 0 || crewPoints === 0) {
        return "TOO LOW!";
    }

    if (clearExtraFromSkills == true) {
        cell.className = "noSkill";
        takenExtraCrew = 0;
        if (chosenArchetype == "Master Thief") {
            skillPoints = masterThief.skillPoints;
            crewPoints = masterThief.crewPoints;
        } else if (chosenArchetype == "Modern Italian") {
            skillPoints = modernItalian.skillPoints;
            crewPoints = modernItalian.crewPoints;
        } else {
            skillPoints = shockAndAwe.skillPoints;
            crewPoints = shockAndAwe.crewPoints;
        }

        skillWellConnectedLogCrew = 0;
        crewPointsString.innerHTML = crewPoints.toString();
        takenExtraCrewString.innerHTML = takenExtraCrew.toString();

        return "Done";
    }

    skillPoints++;
    crewPoints--;
    takenExtraCrew--;
    skillWellConnectedLogCrew--;
    
    if (takenExtraCrew <= 0) {
        cell.className = "noSkill";
    }
    skillPointsString.innerHTML = skillPoints.toString();
    crewPointsString.innerHTML = crewPoints.toString();
    takenExtraCrewString.innerHTML = takenExtraCrew.toString();
}

function giveExtraContacts() {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        console.log('All good!')
    } else {
        return ('Pick an Archetype');
    }

    var takenExtraContString = document.getElementById("extraContForSkills");
    var takenExtraCont = parseInt(takenExtraContString.innerHTML);

    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var contactPointsString = document.getElementById("contacts");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    var cell = document.getElementById("wellConnectedCell");

    if (takenExtraCont + 1 > 2 || skillWellConnectedLogCrew > 0 || skillPoints === 0) {
        return "TOO HIGH!!!";
    }

    skillPoints--;
    contactPoints += 2;
    takenExtraCont += 2;
    skillWellConnectedLogCont++;

    if (takenExtraCont > 0) {
        cell.className = "gotSkills";
    }

    skillPointsString.innerHTML = skillPoints.toString();
    contactPointsString.innerHTML = contactPoints.toString();
    takenExtraContString.innerHTML = takenExtraCont.toString();

}

function takeExtraContacts(clearExtraFromSkills) {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        console.log('All good!')
    } else {
        return ('Pick an Archetype');
    }

    var takenExtraContString = document.getElementById("extraContForSkills");
    var takenExtraCont = parseInt(takenExtraContString.innerHTML);

    var skillPointsString = document.getElementById("skills");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var contactPointsString = document.getElementById("contacts");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    var cell = document.getElementById("wellConnectedCell");

    if (takenExtraCont - 1 < 0 || contactPoints === 0) {
        return "TOO LOW!";
    }

    if (clearExtraFromSkills == true) {
        cell.className = "noSkill";
        takenExtraCont = 0;
        if (chosenArchetype == "Master Thief") {
            skillPoints = masterThief.skillPoints;
            contactPoints = masterThief.contactPoints;
        } else if (chosenArchetype == "Modern Italian") {
            skillPoints = modernItalian.skillPoints;
            contactPoints = modernItalian.contactPoints;
        } else {
            skillPoints = shockAndAwe.skillPoints;
            contactPoints = shockAndAwe.contactPoints;
        }

        skillWellConnectedLogCont = 0;
        contactPointsString.innerHTML = contactPoints.toString();
        takenExtraContString.innerHTML = takenExtraCont.toString();
        
        return "Done";
    }

    skillPoints++;
    contactPoints -= 2;
    takenExtraCont -= 2;
    skillWellConnectedLogCont--

    if (takenExtraCont <= 0) {
        cell.className = "noSkill";
    }

    skillPointsString.innerHTML = skillPoints.toString();
    contactPointsString.innerHTML = contactPoints.toString();
    takenExtraContString.innerHTML = takenExtraCont.toString();
}

function chooseCrew(tableName, rowNum, cellNum) {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        if (chosenArchetype == "Master Thief") {
            chosenCrew = masterThief.crewPoints;
        } else if (chosenArchetype == "Modern Italian") {
            chosenCrew = modernItalian.crewPoints;
        } else {
            chosenCrew = shockAndAwe.crewPoints;
        }
    } else {
        return ('Pick an Archetype');
    }
    var crewPointsString = document.getElementById("crew");
    var crewPoints = parseInt(crewPointsString.innerHTML);
    crewCounter = countTakenCrew(tableName);
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var justChanged = false;
    var is_takenI;
    if (crewPoints >= 0) {
        if (crewPoints === 0) {
            for (is_takenI = 0; is_takenI < crewCellLog.length; is_takenI++) {
                if (crewCellLog[is_takenI] === cell) {
                    crewCellLog[is_takenI].className = "notCrew";
                    crewCellLog.splice(is_takenI, 1);
                    crewPoints++;
                    crewPointsString.innerHTML = crewPoints.toString();
                }
            }
            justChanged = true;
            return "...";
        }
        if (cell.className != "partOfTheCrew" && justChanged == false) {
            cell.className = "partOfTheCrew";
            crewCellLog.push(cell);
            if (crewPoints - 1 > -1) {
                crewPoints--;
            }
            crewPointsString.innerHTML = crewPoints.toString();
            return 1;
        } else if (cell.className != "notCrew") {
            crewPoints++;
            crewPointsString.innerHTML = crewPoints.toString();
            for (is_takenI = 0; is_takenI < crewCellLog.length; is_takenI++) {
                if (crewCellLog[is_takenI] === cell) {
                    crewCellLog.splice(is_takenI, 1);
                }
            }
            cell.className = "notCrew"
            return 0;
        } else {
            return 0
        }
    }
}

function countTakenCrew(tableName) {
    var num = 1;
    var i;
    var j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 2; j++) {
            var takenCell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            if (takenCell.className == "partOfTheCrew") {
                num++;
            }
        }
    }
    return num;

}

function chooseContact(tableName, rowNum, cellNum) {
    if (chosenArchetype == "Master Thief" || chosenArchetype == "Modern Italian" || chosenArchetype == "Shock and Awe") {
        if (chosenArchetype == "Master Thief") {
            chosenContacts = masterThief.contactPoints;
        } else if (chosenArchetype == "Modern Italian") {
            chosenContacts = modernItalian.contactPoints;
        } else {
            chosenContacts = shockAndAwe.contactPoints;
        }
    } else {
        return ('Pick an Archetype');
    }
    var contactPointsString = document.getElementById("contacts");
    var contactPoints = parseInt(contactPointsString.innerHTML);
    contactCounter = countTakenContacts(tableName);
    var cell = document.getElementById(tableName).getElementsByTagName("tr")[rowNum].getElementsByTagName("td")[cellNum];
    var justChanged = false;
    var is_takenI;
    if (contactPoints >= 0) {
        if (contactPoints === 0) {
            for (is_takenI = 0; is_takenI < contactCellLog.length; is_takenI++) {
                if (contactCellLog[is_takenI] === cell) {
                    contactCellLog[is_takenI].className = "noContact";
                    contactCellLog.splice(is_takenI, 1);
                    contactPoints++;
                    contactPointsString.innerHTML = contactPoints.toString();
                }
            }
            justChanged = true;
            return "...";
        }
        if (cell.className != "closeContact" && justChanged == false) {
            cell.className = "closeContact";
            contactCellLog.push(cell);
            if (contactPoints - 1 > -1) {
                contactPoints--;
            }
            contactPointsString.innerHTML = contactPoints.toString();
            return 1;
        } else if (cell.className != "noContact") {
            contactPoints++;
            contactPointsString.innerHTML = contactPoints.toString();
            for (is_takenI = 0; is_takenI < contactCellLog.length; is_takenI++) {
                if (contactCellLog[is_takenI] === cell) {
                    contactCellLog.splice(is_takenI, 1);
                }
            }
            cell.className = "noContact"
            return 0;
        } else {
            return 0
        }
    }
}

function countTakenContacts(tableName) {
    var num = 1;
    var i;
    var j;
    for (i = 0; i < 2; i++) {
        for (j = 0; j < 5; j++) {
            var takenCell = document.getElementById(tableName).getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            if (takenCell.className == "closeContact") {
                num++;
            }
        }
    }
    return num;

}

function slidePanel(id) {
    var panel = document.getElementById(id);
    if(panel.className == "infocus") {
        panel.className = "nodisplay";
    } else {
        panel.className = "infocus";
    }
}

