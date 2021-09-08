import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import CreateGame from './components/CreateGame';
import GameHost from './components/GameHost';
import GameGuest from './components/GameGuest';
import GameOn from './components/GameOn';
import io from "socket.io-client";

const socket = io("http://localhost:8000", { transports: ['websocket'] });

export const GameOverAll = React.createContext();

const App = () => {
    const [isHost, setIsHost] = React.useState(false);
    const [roles, setRoles] = React.useState("");
    const [rolesAfterNameChanged, setRolesAfterNameChanged] = React.useState("");
    const [userList, setUserList] = React.useState([]);
    const [codeNo, setCodeNo] = React.useState(Math.floor(Math.random() * 10000000));
    const [url, setUrl] = React.useState('http://localhost:3000/gameGuest/' + codeNo);
    const [userName, setUserName] = React.useState("");
    const [array, setArray] = React.useState([]);
    const [gameTimes, setGameTimes] = React.useState(1);

    const value = {
        isHost,
        setIsHost,
        roles,
        setRoles,
        rolesAfterNameChanged,
        setRolesAfterNameChanged,
        userList,
        setUserList,
        userName,
        setUserName,
        array,
        setArray,
        gameTimes,
        setGameTimes
    };

    return (

        <GameOverAll.Provider value={value}>
            <Router>
                <Switch>
                    <Route exact path='/'>
                        <CreateGame socket={socket} codeNo={codeNo} />
                    </Route>
                    <Route exact path='/game'>
                        <GameHost socket={socket} url={url} codeNo={codeNo} />
                    </Route>
                    <Route exact path='/gameGuest/:no'>
                        <GameGuest socket={socket} />
                    </Route>
                    <Route exact path='/gameOn'>
                        <GameOn socket={socket} />
                    </Route>
                </Switch>
            </Router>
        </GameOverAll.Provider >
    )
}

export default App;
