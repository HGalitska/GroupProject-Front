import React from 'react';
import './ServiceTile.scss';
import StarRatings from "react-star-ratings";
import {Link} from 'react-router-dom';


export default class ServiceTile extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {

    }

    render() {
        return (
            //TODO: onclick open service page
            <main className="ServiceTile">
                <Link to={"/service/" + this.props.service.id}>
                    < article className="box">
                        <p className="title is-5 has-text-centered is-marginless">{this.props.service.name}</p>

                        <div className="has-text-centered"> <StarRatings
                            rating={this.props.service.mark}
                            starDimension="20px"
                            starSpacing="10px"
                            starEmptyColor='rgb(236, 236, 236)'
                            starRatedColor='hsl(141, 71%, 48%)'
                        /></div>
                        <p className="title is-7 has-text-centered has-text-grey is-marginless">{this.props.service.owner}</p>
                        <p className="text">
                            <span className="title is-6">Price:</span> {this.props.service.price} Milo</p>
                        <div className="is-text is-6 has-text-justified">
                            <span className="title is-6">Description:</span>
                            <p>{this.props.service.description}</p></div>
                    </article>
                </Link>
            </main>
        );
    }
}
