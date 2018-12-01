import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StarRatings from 'react-star-ratings';

import './Service.scss';
import ProfileBox from '../components/ProfileBox';
import * as serviceActions from '../../store/service/actions';
import * as serviceSelectors from '../../store/service/reducer';

class Service extends React.Component {
    componentDidMount() {
        let {serviceId} = this.props.match.params;
        this.props.dispatch(serviceActions.getService(serviceId));
    }

    renderServiceErrors() {
        let {serviceErrors} = this.props;

        if (serviceErrors && serviceErrors.message) {
            return (
                <section className="section">
                    <div className="container">
                        <h1 className="title has-text-centered has-text-danger not-found-text">
                            {serviceErrors.message}
                        </h1>
                    </div>
                </section>
            );
        } else return false;
    }

    renderServiceSection() {
        let {service, ownerProfile} = this.props;

        if (!service)
            return false;

        let profileBox = ownerProfile
            ? <ProfileBox profile={ownerProfile}/>
            : false;

        return (
            <section className="section">
                <div className="container">
                    <div className="columns">
                        <div className="column">
                            <h1 className="title"> {service.name} </h1>
                            <div className="subtitle">
                                <StarRatings
                                    rating={service.mark}
                                    starDimension="1.7rem"
                                    starSpacing="2px"
                                    starEmptyColor="rgb(236, 236, 236)"
                                    starRatedColor="hsl(141, 71%, 48%)"/>
                            </div>
                        </div>
                        <div className="column is-narrow">
                            <div className="columns is-mobile">
                                <div className="column">
                                    <a className="button is-primary is-fullwidth"> Buy: {service.price} Milo </a>
                                </div>
                                <div className="column">
                                    <Link className="button is-info is-outlined is-fullwidth"
                                          to={this.props.location.pathname + "/chats"}>
                                        Chat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="title is-4"> Description </h2>
                    <article className="content">
                        <p> {service.description} </p>
                    </article>
                    {profileBox}
                </div>
            </section>
        );
    }

    renderCommentsSection() {
        let {service, comments, ownerProfile = {}} = this.props;

        if (!service || !comments)
            return false;

        return (
            <section className="section">
                <div className="container">
                    <h2 className="title is-4"> Comments </h2>
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img className="is-rounded" src={ownerProfile.photo}/>
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="field">
                                <p className="control">
                                    <textarea className="textarea" placeholder="Add a comment..."/>
                                </p>
                            </div>
                            <a className="button is-primary">Submit</a>
                        </div>
                    </article>
                    <article className="media">
                        <figure className="media-left">
                            <p className="image is-64x64">
                                <img className="is-rounded" src={ownerProfile.photo}/>
                            </p>
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <strong> Kayli Eunice </strong>
                                <p>
                                    Sed convallis scelerisque mauris, non pulvinar nunc mattis vel. Maecenas
                                    varius felis sit amet magna vestibulum euismod malesuada cursus libero.
                                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
                                    cubilia Curae; Phasellus lacinia non nisl id feugiat.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        );
    }

    render() {
        return (
            <main className="Service">
                {this.renderServiceErrors()}
                {this.renderServiceSection()}
                {this.renderCommentsSection()}
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        serviceErrors: serviceSelectors.getFetchErrors(state),
        service: serviceSelectors.getService(state),
        ownerProfile: serviceSelectors.getOwnerProfile(state),
        comments: serviceSelectors.getComments(state)
    };
}

export default connect(mapStateToProps)(Service);
