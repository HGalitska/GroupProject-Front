import React from 'react';

import './Profile.scss';
import '../components/NavigationBar';
import NavigationBar from "../components/NavigationBar";
import Tabs from "../tabs/Tabs";
import Link from "react-router-dom/es/Link";
import StarRatings from "react-star-ratings";

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
                                        src="https://media.giphy.com/media/3M9zf3NSuNgBWM3RWC/giphy.gif"></img>
                                </figure>

                            </div>
                            <div className="column">
                                <p className="is-uppercase has-text-weight-bold">
                                    {(this.getUser(this.props.match.params.userId)).firstName + " " +
                                    (this.getUser(this.props.match.params.userId)).lastName}
                                </p>
                                <p>@{(this.getUser(this.props.match.params.userId)).login}</p>
                                <p>
                                    <StarRatings
                                        rating={(this.getUser(this.props.match.params.userId)).mark}
                                        starDimension="20px"
                                        starSpacing="10px"
                                        starEmptyColor='rgb(236, 236, 236)'
                                        starRatedColor='rgb(119, 171, 89)'
                                    />
                                </p>
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

                                <button className="button is-success"><Link
                                    className="has-text-white"
                                    to={"/profile/" + this.props.match.params.userId + "/create"}>
                                    New Service
                                </Link></button>
                            </div>
                            <div className="column is-1">
                                <span className="icon">
                                        <ion-icon name="settings"></ion-icon>
                                    </span>
                            </div>
                        </div>

                        <Tabs/>
                    </div>
                </section>
            </main>
        );
    }
}
