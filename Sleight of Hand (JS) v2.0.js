// Archetype Parameters //
var archetypes = [
    {
        archetypeName: "Master Thief",
        skillPoints: 9,
        crewPoints: 0,
        contactPoints: 5,
        freeSkill: "catBurglar"
    },
    {
        archetypeName: "Modern Italian",
        skillPoints: 4,
        crewPoints: 2,
        contactPoints: 3,
        freeSkill: "stealth"
    },
    {
        archetypeName: "Shock and Awe",
        skillPoints: 2,
        crewPoints: 3,
        contactPoints: 3,
        freeSkill: "firearmsExpert",
        forcedTargets: ["bonds", "gold"]
    }
];

var currentArchetype;
var currentTargets = [];
var currentSkills = [];
var currentRashaSkill = [];
var currentCrew = [];
var currentContacts = [];
var currentEquipment = [];


var userPoints = {
    targets: 3,
    items: 4
};

function pickArchetype(archetypeName) {

    clear();

    let i;
    let j;

    var skillPointsString = document.getElementById("skillsPoints");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var crewPointsString = document.getElementById("crewPoints");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var contactPointsString = document.getElementById("contactsPoints");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    for (i = 0; i < archetypes.length; i++) {
        if (archetypes[i].archetypeName === archetypeName) {
            currentArchetype = archetypes[i].archetypeName;
            skillPoints = archetypes[i].skillPoints;
            crewPoints = archetypes[i].crewPoints;
            contactPoints = archetypes[i].contactPoints;
            userPoints.skillPoints = skillPoints;
            userPoints.crewPoints = crewPoints;
            userPoints.contactPoints = contactPoints;
        }
    }

    skillPointsString.innerHTML = skillPoints.toString();
    crewPointsString.innerHTML = crewPoints.toString();
    contactPointsString.innerHTML = contactPoints.toString();

    if (currentArchetype === "Shock and Awe") {
        for (j = 0; j < archetypes[2].forcedTargets.length; j++) {
            chooseTarget(archetypes[2].forcedTargets[j], true);
        }
        chooseSkill(archetypes[2].freeSkill, true);
    } else if (currentArchetype === "Modern Italian") {
        chooseSkill(archetypes[1].freeSkill, true);
    } else if (currentArchetype === "Master Thief") {
        chooseSkill(archetypes[0].freeSkill, true);
    }
    return "Done!";
};

function chooseTarget(targetName, forced) {
    if (currentArchetype === undefined) {
        return "Pick an Archetype!";
    }

    let i;

    let cell = document.getElementById(targetName);

    if (currentTargets.length < userPoints.targets || currentTargets.indexOf(cell) > -1) {
        if (cell.className === "notATarget") {
            if (forced === true) {
                cell.className = "saaTarget";
                currentTargets.push(cell);
                return "Done!";
            }
            cell.className = "aTarget";
            currentTargets.push(cell);
        } else if (cell.className === "aTarget") {
            for (i = 0; i < currentTargets.length; i++) {
                if (currentTargets[i].id === cell.id) {
                    currentTargets.splice(i, 1);
                }
            }
            cell.className = "notATarget";
        }
    }
};

function chooseSkill(skillName, free, give, crew, contacts) {
    if (currentArchetype === undefined) {
        return "Pick an Archetype!";
    }

    let i;

    let cell = document.getElementById(skillName);

    var skillPointsString = document.getElementById("skillsPoints");
    var skillPoints = parseInt(skillPointsString.innerHTML);

    var crewPointsString = document.getElementById("crewPoints");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var contactPointsString = document.getElementById("contactsPoints");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    var takenExtraCrewString = document.getElementById("extraCrewForSkills");
    var takenExtraCrew = parseInt(takenExtraCrewString.innerHTML);

    var takenExtraContString = document.getElementById("extraContForSkills");
    var takenExtraCont = parseInt(takenExtraContString.innerHTML);
    
    if (cell.id === "wellConnectedCell") {
        if (give === true) {
            if (crew === true && contacts === false && takenExtraCrew < 1 && skillPoints !== 0 && takenExtraCont === 0) {
                takenExtraCrew++;
                crewPoints++;
                skillPoints--;
                userPoints.crewPoints++;
                cell.className = "gotSkills";
                currentSkills.push(cell);
            } else if (contacts === true && crew === false && takenExtraCont < 2 && skillPoints !== 0 && takenExtraCrew === 0) {
                takenExtraCont += 2;
                contactPoints += 2;
                skillPoints--;
                userPoints.contactPoints += 2;
                cell.className = "gotSkills";
                currentSkills.push(cell);
            }
        } else if (give === false) {
            if (crew === true && contacts === false && takenExtraCrew > 0 && crewPoints !== 0) {
                takenExtraCrew--;
                crewPoints--;
                skillPoints++;
                userPoints.crewPoints--;
                for (i = 0; i < currentSkills.length; i++) {
                    if (currentSkills[i].id === cell.id) {
                        currentSkills.splice(i, 1);
                    }
                }
                cell.className = "noSkill";
            } else if (contacts === true && crew === false && takenExtraCont > 0 && contactPoints !== 0) {
                takenExtraCont -= 2;
                contactPoints -= 2;
                skillPoints++;
                userPoints.contactPoints -= 2;
                for (i = 0; i < currentSkills.length; i++) {
                    if (currentSkills[i].id === cell.id) {
                        currentSkills.splice(i, 1);
                    }
                }
                cell.className = "noSkill";
            }
        }

        skillPointsString.innerHTML = skillPoints.toString();
        crewPointsString.innerHTML = crewPoints.toString();
        contactPointsString.innerHTML = contactPoints.toString();
        takenExtraCrewString.innerHTML = takenExtraCrew.toString();
        takenExtraContString.innerHTML = takenExtraCont.toString();

        return "Done!";
    }

    if (currentSkills.length < userPoints.skillPoints || currentSkills.indexOf(cell) > -1) {
        if (cell.className === "noSkill") {
            if (free === true) {
                cell.className = "freeSkill";
                currentSkills.push(cell);
                userPoints.skillPoints++;
                populate(currentSkills);
                return "Done!";
            }
            cell.className = "gotSkills";
            currentSkills.push(cell);
            skillPoints--;
            skillPointsString.innerHTML = skillPoints.toString();
            populate(currentSkills);
            return "Done!";
        } else if (cell.className === "gotSkills") {
            for (i = 0; i < currentSkills.length; i++) {
                if (currentSkills[i].id === cell.id) {
                    currentSkills.splice(i, 1);
                }
            }
            cell.className = "noSkill";
            skillPoints++;
            skillPointsString.innerHTML = skillPoints.toString();
            populate(currentSkills);
            return "Done!";
        }
    }
}

function chooseRashaSkill(skillCellID) {
    let cell = document.getElementById(skillCellID);
    if (cell.className !== 'rashaGotSkills' && currentRashaSkill.length < 1) {
        cell.className = 'rashaGotSkills';
        currentRashaSkill.push(cell);
        return true;
    } else if (cell.className === 'rashaGotSkills' && cell.length !== 0){
        cell.className = 'rashaGotNoSkills';
        currentRashaSkill.pop();
        return false;
    }
    return 'done';
}

let firstPopulateCall = true;
function populate(curSkills) {
    let allSkills = curSkills;
    let arrayOfSKillNames = [];
    let table = document.getElementById("changingRashaTable");
    if (firstPopulateCall === false) {
        var rowsToDelete = document.getElementsByClassName('rashaSkillRows');
    }
    if (firstPopulateCall === false) {
        for (let i = rowsToDelete.length; i >= 0; i--) {
            document.getElementById("changingRashaTable").deleteRow(i - 1);
        }
    }
    for (let i = 0; i < allSkills.length; i++) {
        let textOfCell = allSkills[i].getElementsByTagName("p");
        if (textOfCell[0].innerText !== 'Well-Connected' && textOfCell[0].innerText !== 'Pickpocketing') {
            arrayOfSKillNames.push(textOfCell[0].innerText);
        }
    }
    for (let j = 0; j < arrayOfSKillNames.length; j++) {
        if (j % 3 === 0) {
            var row = table.insertRow();
            row.className = 'rashaSkillRows';
        }
        var cell = row.insertCell();
        cell.id = arrayOfSKillNames[j];
        cell.setAttribute("onclick", "chooseRashaSkill(" + "'" + arrayOfSKillNames[j] + "'" +");");
        cell.innerHTML = arrayOfSKillNames[j];
    }
    firstPopulateCall = false;
    return "done";
}

function chooseCrew(crewmemberName) {
    if (currentArchetype === undefined) {
        return "Pick an Archetype!";
    }

    let i;

    let cell = document.getElementById(crewmemberName);
      

    var crewPointsString = document.getElementById("crewPoints");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    if (currentCrew.length < userPoints.crewPoints || currentCrew.indexOf(cell) > -1) {
        if (cell.id === 'Rasha') {
            if (cell.className === "notCrew") {
                let sectionToShow = document.getElementsByClassName("rashanodisplay");
                cell.className = "partOfTheCrew";
                currentCrew.push(cell);
                crewPoints--;
                for (let p = 0; p < sectionToShow.length; p++) {
                    sectionToShow[p].className = 'rashainfocus';
                }
                crewPointsString.innerHTML = crewPoints.toString();
                return "done";
            } else if (cell.className = "partOfTheCrew") {
                for (i = 0; i < currentCrew.length; i++) {
                    if (currentCrew[i].id === cell.id) {
                        currentCrew.splice(i, 1);
                    }
                }
                let sectionToShow = document.getElementsByClassName("rashainfocus");
                cell.className = "notCrew";
                crewPoints++
                for (let p = 0; p < sectionToShow.length; p++) {
                    sectionToShow[p].className = 'rashanodisplay';
                }
                crewPointsString.innerHTML = crewPoints.toString();
                return "done";
            }
        }
    }

    if (currentCrew.length < userPoints.crewPoints || currentCrew.indexOf(cell) > -1) {
        if (cell.className ===  "notCrew") {
            cell.className = "partOfTheCrew";
            currentCrew.push(cell);
            crewPoints--;
        } else if (cell.className = "partOfTheCrew") {
            for (i = 0; i < currentCrew.length; i++) {
                if (currentCrew[i].id === cell.id) {
                    currentCrew.splice(i, 1);
                }
            }
            cell.className = "notCrew";
            crewPoints++
        }
    }

    crewPointsString.innerHTML = crewPoints.toString();

    return 'Done!';
}

function chooseContact(contactID) {
    if (currentArchetype === undefined) {
        return "Pick an Archetype!";
    }

    let i;

    let cell = document.getElementById(contactID);

    var crewPointsString = document.getElementById("crewPoints");
    var crewPoints = parseInt(crewPointsString.innerHTML);

    var contactPointsString = document.getElementById("contactsPoints");
    var contactPoints = parseInt(contactPointsString.innerHTML);

    if (cell.id === "informationVendorUnderworld") {
        if (cell.className === "noContact" && contactPoints !== 0) {
            cell.className = "closeContact";
            currentContacts.push(cell);
            contactPoints += 2;
            userPoints.contactPoints += 3;
        } else if (cell.className === "closeContact" && contactPoints > 2) {
            for (i = 0; i < currentContacts.length; i++) {
                if (currentContacts[i].id === cell.id) {
                    currentContacts.splice(i, 1);
                }
            }
            cell.className = "noContact";
            contactPoints -= 2;
            userPoints.contactPoints -= 3;
        }

        contactPointsString.innerHTML = contactPoints.toString();

        return "Done!";
    }

    if (cell.id === "contactCrew") {
        if (cell.className === "noContact"  && contactPoints > 1) {
            cell.className = "closeContact";
            currentContacts.push(cell);
            contactPoints -= 2;
            crewPoints++;
            userPoints.crewPoints++;
            userPoints.contactPoints--;
        } else if (cell.className === "closeContact" && crewPoints !== 0) {
            cell.className = "noContact";
            for (i = 0; i < currentContacts.length; i++) {
                if (currentContacts[i].id === cell.id) {
                    currentContacts.splice(i, 1);
                }
            }
            cell.className = "noContact";
            contactPoints += 2;
            crewPoints--;
            userPoints.crewPoints--;
            userPoints.contactPoints++;
        }

        crewPointsString.innerHTML = crewPoints.toString();
        contactPointsString.innerHTML = contactPoints.toString();

        return "Done!";
    }

    if (currentContacts.length < userPoints.contactPoints || currentContacts.indexOf(cell) > -1) {
        if (cell.className === "noContact") {
            cell.className = "closeContact";
            currentContacts.push(cell);
            contactPoints--;
        } else if (cell.className = "closeContact") {
            for (i = 0; i < currentContacts.length; i++) {
                if (currentContacts[i].id === cell.id) {
                    currentContacts.splice(i, 1);
                }
            }
            cell.className = "noContact";
            contactPoints++;
        }
    }

    contactPointsString.innerHTML = contactPoints.toString();

    return "Done!";
}

function chooseEquipment(equipmentID) {
    if (currentArchetype === undefined) {
        return "Pick an Archetype!";
    }

    let i;
    let cell = document.getElementById(equipmentID);

    if (currentEquipment.length < userPoints.items || currentEquipment.indexOf(cell) > -1) {
        if (cell.className ===  "unequipped") {
            cell.className = "equipped";
            currentEquipment.push(cell);
        } else if (cell.className = "equipped") {
            for (i = 0; i < currentEquipment.length; i++) {
                if (currentEquipment[i].id === cell.id) {
                    currentEquipment.splice(i, 1);
                }
            }
            cell.className = "unequipped";
        }
    }
}

function clear() {
    var takenExtraCrewString = document.getElementById("extraCrewForSkills");

    var takenExtraContString = document.getElementById("extraContForSkills");

    let takenExtraCrew = 0;
    let takenExtraCont = 0;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let clearTargetCell = document.getElementById('targets').getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            clearTargetCell.className = "notATarget";
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            let clearSkillCell = document.getElementById('skillsToChoose').getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            clearSkillCell.className = "noSkill"
        }
    }

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 2; j++) {
            let clearCrewCell = document.getElementById('crewToChoose').getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            clearCrewCell.className = "notCrew";
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
            let clearContactCell = document.getElementById('contactsToChoose').getElementsByTagName("tr")[i].getElementsByTagName("td")[j];
            clearContactCell.className = "noContact";
        }
    }

    for (let i = 0; i < 2; i++) {
        let j = 4;
        if (i === 1) {
            j = 3;
        }
        for (let k = 0; k < j; k++) {
            let clearEquippmentCell = document.getElementById('equipmentToChoose').getElementsByTagName("tr")[i].getElementsByTagName("td")[k];
            clearEquippmentCell.className = "unequipped";
        }
    }

    let sectionToShow = document.getElementsByClassName("rashainfocus");
    for (let p = 0; p < sectionToShow.length; p++) {
        sectionToShow[p].className = 'rashanodisplay';
    }

    currentTargets = [];
    currentSkills = [];
    currentCrew = [];
    currentContacts = [];
    currentEquipment = [];
    userPoints.targets = 3;
    userPoints.items = 4;

    takenExtraCrewString.innerHTML = takenExtraCrew.toString();
    takenExtraContString.innerHTML = takenExtraCont.toString();
}

function summarize(curArchetype, curTargets, curSkills, curCrew, curContacts, curEquipment) {
}

function slidePanel(id) {
    var panel = document.getElementById(id);
    if(panel.className == "infocus") {
        panel.className = "nodisplay";
    } else {
        panel.className = "infocus";
    }
}