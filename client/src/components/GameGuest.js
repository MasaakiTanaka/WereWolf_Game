import React from 'react';
import { GameOverAll } from '../App';
import { useHistory } from 'react-router-dom';

const GameGuest = ({ socket }) => {

    const gameContext = React.useContext(GameOverAll);
    const history = useHistory();

    const [userName, setUserName] = React.useState("");
    const [isGameReady, setIsGameReady] = React.useState(false);


    const codeNo = history.location.pathname.slice(11, 18);

    React.useEffect(() => {
        socket.on("go_to_gameOn", (data) => {
            gameContext.setArray(data.array);
            gameContext.setRolesAfterNameChanged(data.roles);
            history.push('/gameOn');
        });
    }, [socket]);

    const joinGame = () => {
        socket.emit("join_room", { codeNo, userName });
        setIsGameReady(true)
        gameContext.setUserName(userName);
    }

    const createOnChange = (e) => {
        setUserName(e.target.value);
    }

    if (isGameReady) {
        return <h2>Please wait until game starts</h2>
    }

    return <>
        <h2>Join the Game</h2>

        <div>
            <label>Game Code</label>
        </div>

        <input type="text" value={codeNo} style={{ width: "300px" }} />

        <div>
            <label>Name</label>
        </div>

        <input type="text" style={{ width: "300px" }} onChange={createOnChange} />

        <div>
            <button onClick={joinGame}>Join the Game</button>
        </div>
    </>
}

export default GameGuest;
