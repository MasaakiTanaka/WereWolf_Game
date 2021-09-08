import React from 'react';
import { GameOverAll } from '../App';
import '../css/GameOn.scss';
import { createObjects, putUserNameInArray, switchToStringName } from '../utilities';

const GameOn = ({ socket }) => {
    const gameContext = React.useContext(GameOverAll);

    const [hasChecked, setHasChecked] = React.useState(false);
    const [hasCheckedTomb, setHasCheckedTomb] = React.useState(false);
    const [status, setStatus] = React.useState({
        role: "",
        userName: ""
    });

    React.useEffect(() => {
        socket.on("receive_new_game", (data) => {
            gameContext.setArray(data.newArray);
            setHasChecked(false);
            setHasCheckedTomb(false);
            console.log(gameContext.gameTimes, "gameTimes");
            gameContext.setGameTimes(data.gameTimes + 1);
        });
    }, [socket]);

    const createClassName = (i) => {
        return "field" + i
    }


    const seeTombRole = () => {
        setHasCheckedTomb(true)
        setHasChecked(true);
    }


    const seeRole = (value) => {
        setStatus(
            {
                role: value.role,
                userName: value.userName
            })
        setHasChecked(true);
    }

    const getRole = () => {
        for (let i = 0; i < gameContext.array.length; i++) {
            if (gameContext.userName === gameContext.array[i].userName) {
                return gameContext.array[i].role;
            }
        }
    }

    const displayForNormalRole = (value) => {
        if (value.userName === gameContext.userName) {

            return switchToStringName(value.role);
        }
        return "unknown"
    }

    const displayForWereWolf = (role) => {
        if (role === "4" || role === "5") {
            return switchToStringName(role);
        }
        return "unknown"
    }

    const getTomb = (role, value, index) => {

        if (role === "2") {
            return <>
                <div className={createClassName(index)}>{role === "5" ? switchToStringName(value.role) : "unknown"}</div >
                <div>
                    {(!hasChecked && (index === 1)) ? <button onClick={() => seeTombRole()}>TombCheck</button>
                        : null}
                </div>
            </>
        }
        return <div className={createClassName(index)}>{role === "5" ? switchToStringName(value.role) : "unknown"}</div >
    }

    const getField = (role, value, index) => {

        if (role === "2" || role === "3") {
            return <div className={createClassName(index)}>
                {displayForNormalRole(value)}
                <div>
                    {value.userName}
                </div>
                <div>
                    {value.userName === gameContext.userName ? null
                        : hasChecked ? null
                            : <button onClick={() => seeRole(value)}>
                                check
                            </button>}
                </div>
            </div>
        }

        return <div className={createClassName(index)}>
            {(role === "4" || role === "5") ? displayForWereWolf(value.role) : displayForNormalRole(value)}
            <div>
                {value.userName}
            </div>
        </div>
    }

    const createField = () => {
        const role = getRole();

        return gameContext.array.map((value, index) => {

            if (index < 2) {
                return getTomb(role, value, index);
            }
            else {
                return getField(role, value, index);
            }
        })
    }

    const createCheckedField = () => {
        if (hasChecked) {
            if (hasCheckedTomb) {
                return <div >
                    Checked tomb roles
                    <div>
                        Role: {switchToStringName(gameContext.array[0].role)}
                    </div>
                    <div>
                        Role: {switchToStringName(gameContext.array[1].role)}
                    </div>
                </div>
            }
            return <div >
                Checked field role
                <div>
                    Role: {switchToStringName(status.role)}
                </div>
                UserName： {status.userName}
            </div>
        }
        return;
    }



    const goToNextGame = () => {
        createObjects(gameContext.roles, gameContext.array);
        const newArray = putUserNameInArray(gameContext.userList, gameContext.array);
        console.log(newArray, "newArray");

        socket.emit("send_new_game", { newArray, gameTimes: gameContext.gameTimes });
    }

    return <>
        <div className="gameTimes" >
            game # {gameContext.gameTimes}
        </div>
        <div className="userName" >
            You're {gameContext.userName}
        </div>
        <div className="rolesList">
            Roles list
            <div>
                {gameContext.rolesAfterNameChanged}
            </div>
        </div>
        <div className="container">
            {createField()}
        </div>

        <div className="checkedField">
            {createCheckedField()}
        </div>

        {gameContext.isHost ? <button onClick={() => goToNextGame()}>Go to next game</button> : null}
    </>
}

export default GameOn;
