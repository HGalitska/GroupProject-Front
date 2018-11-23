import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Homepage from './homepage/Homepage';
import Error404 from './homepage/Error404';
import Register from './auth/Register';
import Login from './auth/Login';
import Profile from './profile/Profile';
import ProfileSettings from './profile/ProfileSettings';
import ServiceCreator from './service/ServiceCreator';
import Service from './service/Service';
import Results from './search/Results';
import ProfileSearch from './search/ProfileSearch';
import GlobalSearch from './search/GlobalSearch';
import ServiceChats from './service/ServiceChats';
import Chat from './service/Chat';

function MainRouting() {
    return (
        <>
            <NavigationBar/>

            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route path="/auth">
                    <Switch>
                        <Route exact path="/auth/login" component={Login}/>
                        <Route exact path="/auth/register" component={Register}/>
                        <Route component={Error404}/>
                    </Switch>
                </Route>
                <Route path="/profile">
                    <Switch>
                        <Route exact path="/profile/:userId" component={Profile}/>
                        <Route exact path="/profile/:userId/settings" component={ProfileSettings}/>
                        <Route exact path="/profile/:userId/create" component={ServiceCreator}/>
                        <Route component={Error404}/>
                    </Switch>
                </Route>
                <Route path="/service">
                    <Switch>
                        <Route exact path="/service/:serviceId" component={Service}/>
                        <Route exact path="/service/:serviceId/chats" component={ServiceChats}/>
                        <Route exact path="/service/:serviceId/chats/:customerId" component={Chat}/>
                        <Route component={Error404}/>
                    </Switch>
                </Route>
                <Route path="/search">
                    <Switch>
                        <Route exact path="/search/people" component={ProfileSearch}/>
                        <Route exact path="/search/global" component={GlobalSearch}/>
                        <Route component={Error404}/>
                    </Switch>
                </Route>
                <Route exact path="/results" component={Results}/>
                <Route component={Error404}/>
            </Switch>
        </>
    );
}

export default function router() {
    return (
        <Router>
            <MainRouting/>
        </Router>
    );
}
