import React from 'react';
import './ServiceTile.scss';
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom';



export default class CommentTile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'comment': this.props.comment,
        };
    }

    getAuthorById(id) {
        let user1 = {
            id: 1,
            username: "iduchan0",
            firstName: "Ivor",
            secondName: "Duchan",
            emailAddress: "iduchan0@dmoz.org",
            description: "Hi! I am a cool guy, who is an expert Software Engineer." +
            "\n I can help you with any of your projects for a low price.",
            location: "Lviv",
            rating: 3.6,
            photo: "https://media.giphy.com/media/3M9zf3NSuNgBWM3RWC/giphy.gif",
            walletAddress: "address1"
        };

        let user2 = {
            id: 2,
            username: "ellegal",
            firstName: "Elena",
            secondName: "Galitska",
            emailAddressAddress: "elgal0@dmoz.org",
            description: "Hi! I am cool.",
            location: "Kyiv",
            rating: 5,
            photo: "https://media.giphy.com/media/7ieOyZw7sogO4/source.gif",
            walletAddress: "address2"
        };

        if (id == 1) return user1;
        else return user2
    }

    render() {
        return (
            <article>
                <hr/>
                <div className="columns">
                    <figure className="image is-16x16 column is-1">
                        <img className="is-rounded" src={this.getAuthorById(this.state.comment.customerId).photo}/>
                    </figure>
                    <div className="column">
                        <Link to={"/profile/" + this.state.comment.customerId}>
                            <p className="is-text">{this.getAuthorById(this.state.comment.customerId).username}
                                <span
                                    className="is-text has-text-grey-light is-pulled-right">{this.state.comment.time.replace('T', ' ')}
                        </span>
                            </p>
                        </Link>

                        <StarRatings
                            rating={this.state.comment.rating}
                            starDimension="20px"
                            starSpacing="2px"
                            starEmptyColor='rgb(236, 236, 236)'
                            starRatedColor='hsl(141, 71%, 48%)'
                        />
                        <p className="is-text">{this.state.comment.commentBody}</p>
                    </div>
                </div>
            </article>
        );
    }
}
