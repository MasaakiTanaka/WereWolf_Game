import React from 'react';
import { GameOverAll } from '../App';
import { useHistory } from 'react-router-dom';
import { putUserNameInArray, switchToStringName } from '../utilities';

const GameHost = ({ codeNo, url, socket }) => {

    const gameContext = React.useContext(GameOverAll);
    const history = useHistory();

    const showRoles = (roles) => {
        let rolesForSwitching = new Array();
        let rolesForShowing = "";
        for (let i = 0; i < roles.length; i++) {
            rolesForSwitching[i] = switchToStringName(roles[i]);
        }
        for (let i = 0; i < roles.length; i++) {
            rolesForShowing = rolesForShowing + " " + switchToStringName(roles[i]);
        }
        return rolesForShowing;
    }

    React.useEffect(() => {
        socket.on("ready", (data) => {
            gameContext.setUserList(userList => [...userList, data.userName]);
        });

        socket.on("during_start_game", (data) => {
            const newArray = putUserNameInArray(data.userList, gameContext.array);

            socket.emit("pass_newArray", { array: newArray, roles: showRoles(Array.from(gameContext.roles)) });
        });

        socket.on("go_to_gameOn", (data) => {
            gameContext.setArray(data.array);
            gameContext.setIsHost(true);
            gameContext.setRolesAfterNameChanged(data.roles);
            history.push('/gameOn');
        });


    }, [socket]);


    const startGame = () => {
        socket.emit("start_game", { codeNo, array: gameContext.array, userList: gameContext.userList });
    }

    const changeDisplay = () => {

        return <>
            <h2></h2>
            <div>
                <label>Log in user</label>
                {gameContext.userList.map((name) => <p>{name}</p>)}

            </div>
            <input type="text" value={url} style={{ width: "300px" }} />

            <div>
                <button onClick={startGame}>Game Start</button>
            </div>
        </>
    }

    return (
        changeDisplay()
    )
}

export default GameHost;

