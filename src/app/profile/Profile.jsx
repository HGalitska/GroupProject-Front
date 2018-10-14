import React from 'react';

import './Profile.scss';
import '../components/NavigationBar';
import {NavigationBar} from "../components/all";
import ServiceTile from "../components/ServiceTile";

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {userId: 0};
    }

    componentDidMount() {
        this.setState({userId: this.props.match.params.userId})
    }

    getUser(id) {
        //TODO: get data from back

        let user = {
            login: "iduchan0",
            firstName: "Ivor",
            lastName: "Duchan",
            email: "iduchan0@dmoz.org",
            description: "Hi! I am a cool guy, who is an expert Software Engineer." +
            "\n I can help you with any of your projects for a low price.",
            city: "Lviv",
            mark: 3.6
        }

        return user
    }

    renderServiceTiles(services) {
        let result = []
        services.map((s) =>
            result.push(<div className="column is-5-desktop">
                <ServiceTile service={s} key={s.id}/>
            </div>)
        )
        return result
    }

    renderMyServices() {
        //TODO: get data from back
        let myServices = [{id: 1, name: "Title 1"}, {id: 2, name: "Title 2"},
            {id: 3, name: "Title 3"}, {id: 4, name: "Title 4"}]
        return this.renderServiceTiles(myServices)
    }

    renderOrderedByMeServices() {
        //TODO: get data from back
        let orderedByMeServices = [{id: 5, name: "Title 5"}, {id: 7, name: "Title 7"},
            {id: 8, name: "Title 8"}, {id: 9, name: "Title 9"}]
        return this.renderServiceTiles(orderedByMeServices)
    }

    render() {
        return (
            <main className="Profile">
                <NavigationBar/>

                <section className="section">
                    <div className="container box has-background-white">

                        <div className="columns">
                            <div className="column is-3">
                                <figure className="image is-480x480">
                                    <img
                                        src="https://bulma.io/images/placeholders/480x480.png"></img>
                                </figure>

                            </div>
                            <div className="column">
                                <p className="is-uppercase has-text-weight-bold">
                                    {(this.getUser(this.props.match.params.userId)).firstName + " " +
                                    (this.getUser(this.props.match.params.userId)).lastName}
                                </p>
                                <p>@{(this.getUser(this.props.match.params.userId)).login}</p>
                                <br/>
                                <p>
                                    <span className="icon">
                                        <ion-icon name="information-circle"></ion-icon>
                                    </span>
                                    {(this.getUser(this.props.match.params.userId)).description}</p>
                                <p>
                                    <span className="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    {(this.getUser(this.props.match.params.userId)).email}</p>
                                <p>
                                    <span className="icon">
                                        <ion-icon name="navigate"></ion-icon>
                                    </span>
                                    {(this.getUser(this.props.match.params.userId)).city}</p>
                                <p>
                                    <span className="icon">
                                        <ion-icon name="star"></ion-icon>
                                    </span>
                                    {(this.getUser(this.props.match.params.userId)).mark}</p>

                                <button><a href={"profile/" + this.props.match.params.userId + "/create"}>
                                    New Service
                                </a></button>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
        );
    }
}
