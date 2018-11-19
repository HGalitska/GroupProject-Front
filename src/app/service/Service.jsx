import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './Service.scss';
import * as servicesActions from '../../store/services/actions';
import * as servicesSelectors from '../../store/services/reducer';
import StarRatings from "react-star-ratings";
import CommentTile from "./CommentTile";

class Service extends React.Component {
    componentDidMount() {
        let {serviceId} = this.props.match.params;
        this.props.dispatch(servicesActions.getService(serviceId));
    }

    componentWillUnmount() {
        this.props.dispatch(servicesActions.resetService());
    }

    renderServiceErrors() {
        let {serviceErrors} = this.props;

        if (serviceErrors && serviceErrors.message) {
            return (
                <h1 className="title has-text-centered has-text-danger not-found-text">
                    {serviceErrors.message}
                </h1>
            );
        }
    }

    renderService() {
        let {service} = this.props;

        if (!service)
            return false;

        return (
            <div className="">
                <h1 className="title is-4 has-text-centered"> {service.name} </h1>
                <div className="has-text-centered">
                    <StarRatings
                        rating={service.mark}
                        starDimension="20px"
                        starSpacing="2px"
                        starEmptyColor='rgb(236, 236, 236)'
                        starRatedColor='hsl(141, 71%, 48%)'/>
                </div>
                <div className="has-text-centered">
                    {service.owner}
                    {' \xB7 '}
                    Price: {service.price} Milo
                </div>

                <section className="section">
                    <h2 className="title is-5"> Description </h2>
                    <div> {service.description} </div>
                </section>
            </div>
        );
    }

    renderComments() {
        let comments = [
            {
                "id": 1,
                "serviceId": 1,
                "customerId": 1,
                "time": "2018-11-17T21:34:53",
                "rating": 5,
                "commentBody": "This individual does her job perfectly)0))00"
            },
            {
                "id": 2,
                "serviceId": 1,
                "customerId": 2,
                "time": "2018-11-16T11:00:53",
                "rating": 1,
                "commentBody": "Awful."
            }
        ];

        let result = [];
        comments.map((c) =>
            result.push(<CommentTile comment={c}/>)
        );
        return result;
    }

    render() {
        return (
            <main className="Service">
                <section className="section">
                    <div className="container box">
                        {this.renderServiceErrors()}
                        {this.renderService()}
                        <section className="section">
                            <p className="title is-5">Reviews</p>
                            {this.renderComments()}
                        </section>
                    </div>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        serviceErrors: servicesSelectors.getServiceFetchErrors(state),
        service: servicesSelectors.getService(state)
    };
}

export default connect(mapStateToProps)(Service);
