import React from 'react';
import NavigationBar from "../components/NavigationBar";
import {Link} from 'react-router-dom';
import ServiceTile from "../components/ServiceTile";


export default class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            for: '',
            query: ''
        };
    }

    componentDidMount() {
        this.setState({for: this.props.location.state.for})
        this.setState({query: this.props.location.state.query})
    }

    renderResults() {
        if (this.state.for == 'service') {
            //get services by query from microsrvice
            let services = [
                {
                    key: 1,
                    id: 1,
                    name: "Walk Your Dog",
                    description: "Hamburger excepteur ex non. Picanha labore t-bone excepteur, shoulder jerky frankfurter jowl venison veniam andouille tail shank chicken prosciutto. Lorem et capicola pariatur frankfurter, fugiat turkey. Ex consequat dolore, eiusmod shank bacon tri-tip shoulder elit. Jowl rump tenderloin officia labore reprehenderit.",
                    owner: "@iduchan0",
                    mark: 3,
                    price: 3
                },
                {
                    key: 2,
                    id: 2,
                    name: "Feed Your Cat",
                    description: "In t-bone salami occaecat tongue nostrud cupim dolore pancetta doner short ribs. Reprehenderit burgdoggen alcatra cupidatat non id laborum lorem andouille mollit. Chuck ham hock dolor ground round, esse porchetta kevin salami alcatra proident beef ribs incididunt anim nostrud ut. Pig cupim picanha frankfurter sint officia kielbasa qui.",
                    owner: "@iduchan0",
                    mark: 4,
                    price: 3
                },
                {
                    key: 3,
                    id: 3,
                    name: "Debug Your Code",
                    description: "Bacon ipsum dolor amet deserunt officia in consectetur strip steak. Strip steak labore sint ham chuck buffalo, sunt velit reprehenderit andouille kevin. Pastrami velit jowl do voluptate turducken, landjaeger anim tongue dolor sirloin chicken et strip steak fatback. Frankfurter doner filet mignon minim, pancetta exercitation shank non chuck.",
                    owner: "@iduchan0",
                    mark: 3.5,
                    price: 4
                },
                {
                    key: 4,
                    id: 4,
                    name: "Merge Your Branches",
                    description: "Ullamco dolor id laborum ham ham hock meatball consequat. In strip steak pork loin, nostrud short ribs aliquip nulla aliqua. Landjaeger biltong dolor ullamco. Nisi mollit pork chop in ut. Beef ribs frankfurter rump jowl voluptate drumstick.",
                    owner: "@iduchan0",
                    mark: 5,
                    price: 5
                }
            ]
            this.renderServices(services);
        }
        else {
            //get profiles by query from microsrvice
            let profiles = [
                {
                    login: "iduchan0",
                    firstName: "Ivor",
                    lastName: "Duchan",
                    email: "iduchan0@dmoz.org",
                    description: "Hi! I am a cool guy, who is an expert Software Engineer." +
                    "\n I can help you with any of your projects for a low price.",
                    city: "Lviv",
                    mark: 3.6
                },
                {
                    login: "ellegal",
                    firstName: "Elena",
                    lastName: "Galitska",
                    email: "elgal0@dmoz.org",
                    description: "Hi! I am cool.",
                    city: "Kyiv",
                    mark: 5
                }]
            this.renderProfiles(profiles);
        }
    }

    renderServices(services) {
        let result = []
        services.map((s) =>
            result.push(<div className="column is-6-desktop is-10-tablet">
                <ServiceTile service={s} key={s.id}/>
            </div>)
        )
        return result
    }

    renderProfiles(profiles) {
        return "why"
    }

    render() {
        return (
            <main className="ProfileSettings">
                <NavigationBar/>

                <section className="section">
                    <div className="container box has-background-white">
                        Results for {this.state.for} : {this.state.query}
                        <div className="columns is-multiline is-centered">
                            {this.renderResults()}
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}