const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const createObjects = (roles, array) => {
    const arrayRoles = shuffle(Array.from(roles));

    for (let i = 0; i < arrayRoles.length; i++) {
        array[i] = {
            role: arrayRoles[i],
            userName: ""
        }
    }
}

export const putUserNameInArray = (userList, array) => {
    for (let i = 0; i < userList.length; i++) {
        array[i + 2].userName = userList[i]
    }
    return array;
}

export const switchToStringName = (number) => {
    let StringName;
    switch (number) {
        case "1":
            StringName = "Villager";
            break;
        case "2":
            StringName = "FortuneTeller";
            break;
        case "3":
            StringName = "Thief";
            break;
        case "4":
            StringName = "WereWolf";
            break;
        case "5":
            StringName = "BigWolf";
            break;
        case "6":
            StringName = "CrazyMan";
            break;
        case "7":
            StringName = "HangedMan";
            break;
    }
    return StringName;
}