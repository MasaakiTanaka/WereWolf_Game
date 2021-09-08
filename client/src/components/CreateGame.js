import React from 'react'
import { GameOverAll } from '../App';
import { createObjects } from '../utilities';
import { useHistory } from 'react-router-dom';

const CreateGame = ({ codeNo, socket }) => {

    const [hostName, setHostName] = React.useState("");
    const gameContext = React.useContext(GameOverAll)

    const history = useHistory();

    const createOnChange = (e) => {
        // gameContext.setUserNameを使うとページ移動できない
        setHostName(e.target.value);
    }
    const createRoles = (e) => {
        gameContext.setRoles(e.target.value);
    }


    const createGame = () => {
        socket.emit("create_room", { hostName, codeNo });
        gameContext.setUserList([hostName]);
        gameContext.setUserName(hostName);
        createObjects(gameContext.roles, gameContext.array);
        gameContext.setArray(gameContext.array);
        history.push('/game');
    };


    return <>
        <label>Enter you name</label>
        <div>
            <input type="text" onChange={createOnChange} />
        </div>

        <div>
            <label>Choose roles</label>
        </div>
        <div>
            <input type="text" onChange={createRoles} style={{ width: "300px" }} />
        </div>
        <div>
            <label>RolesNo   1:Villager 2:FortuneTeller 3:Thief 4:WereWolf 5:BigWolf 6:CrazyMan 7:HangedMan</label>
        </div>
        <button onClick={createGame}>Create Game</button>
    </>
}

export default CreateGame;
