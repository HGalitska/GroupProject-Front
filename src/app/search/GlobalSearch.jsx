import React from 'react';
import StarRatings from "react-star-ratings";
import ServiceTile from "../service/ServiceTile";
import {connect} from "react-redux";
import * as searchSelectors from "../../store/search/reducer";
import * as searchActions from "../../store/search/actions";

class GlobalSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'queryValue': "",
            'categories': [],
            'priceRange': {
                'min': 0,
                'max': 100
            },
            'rating': 1,
            'fieldToSort': 'name',
            'asc': true
        };

        this.showResults = this.showResults.bind(this);
        this.onQueryEnter = this.onQueryEnter.bind(this);
        this.getResults = this.getResults.bind(this);
    }


    renderSearchErrors() {
        let {searchErrors} = this.props;

        if (searchErrors && searchErrors.message) {
            return (
                <h1 className="title has-text-centered not-found-text">
                    {searchErrors.message}
                </h1>
            );
        }
    }

    selectCategory(e) {
        let newCategory = e.target.textContent.replace(" & ", " ");
        let classes = e.target.classList;
        if (this.state.categories.includes(newCategory)) {
            this.state.categories.splice(this.state.categories.indexOf(newCategory), 1);
            classes.remove('is-success');
        }
        else {
            this.setState({
                'categories': this.state.categories.concat(newCategory.replace(' &', ''))
            }, () => {
                classes.add('is-success');
            })
        }

    }

    pickPrice(e) {
        if (e.target.placeholder == 'Min : 0')
            this.state.priceRange.min = e.target.value;
        else
            this.state.priceRange.max = e.target.value;
    }

    selectRating(e) {
        this.state.rating = e.target.value
    }

    showResults() {
        this.setState({
            showResults: true
        });
        this.getResults()
    }

    renderCategories() {
        let categories = [
            {
                "Graphics Design":
                    ["Logo Design", "Illustration", "Portraits & Caricatures", "Flyers & Brochures", "Web & Mobile Design", "Other"]
            },
            {
                "Writing Translation":
                    ["Resumes & Cover Letters", "Website Content", "Translation", "Press Releases", "Creative Writing", "Other"]
            },
            {
                "Music Audio":
                    ["Songwriters", "Producers & Composers", "Singers", "Sound Effects", "Mixing & Mastering", "Other"]
            },
            {
                "Programming Tech":
                    ["WordPress", "Web Programming", "Support & IT", "Data Analysis & Reports", "Databases", "QA", "User Testing", "Desktop Applications", "Mobile Apps & Web", "Other"]
            }];

        let result = [];
        categories.map((category) => {
            result.push(
                <p className="control" onClick={(e) => this.selectCategory(e)}>
                    <a className="button">
                        {(Object.keys(category)[0]).replace(' ', ' & ')}
                    </a>
                </p>)
        });
        return result
    }

    updateInputValue(evt) {
        this.setState({
            queryValue: evt.target.value,
        });
    }

    selectSorting(evt) {
        let sortSelectValue = evt.target.value;
        this.setState({
            asc: sortSelectValue % 2 ? true : false,
            fieldToSort: sortSelectValue < 3 ? 'name' :
                (sortSelectValue < 5 ? 'price' : 'rating')
        })

    }

    onQueryEnter(e) {
        if (e.key === 'Enter')
            this.showResults();
    }

    getResults() {
        let query = this.state.queryValue;
        if (query.length > 0) {
            this.props.dispatch(searchActions.searchService({
                text: query,
                mark: this.state.rating,
                priceFrom: this.state.priceRange.min,
                priceTo: this.state.priceRange.max,
                category: this.state.categories,
                asc: this.state.asc,
                fieldToSort: this.state.fieldToSort
            }));
        } else {
            this.props.dispatch(searchActions.resetServicesSearch());
        }
    }

    renderSearchErrors() {
        let {searchErrors} = this.props;

        if (searchErrors && searchErrors.message) {
            return (
                <h1 className="title has-text-centered not-found-text">
                    {searchErrors.message}
                </h1>
            );
        }
    }

    render() {
        let {servicesFound} = this.props;

        return (
            <main className="GlobalSearch">
                <section className="section">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-9-tablet is-7-desktop">
                                <div className="field has-addons">
                                    <div className="control is-expanded">
                                        <input className="input is-rounded"
                                               type="search" name="query"
                                               value={this.state.queryValue}
                                               autoComplete="off"
                                               onChange={evt => this.updateInputValue(evt, 0)}
                                               onKeyUp={this.onQueryEnter}/>
                                    </div>
                                    <div className="control">
                                        <button className="button is-rounded is-info"
                                                onClick={this.showResults}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="columns">

                            <div className="column is-3">
                                <br/>
                                <p className="title is-4">Category</p>
                                <div className="field is-grouped is-grouped-multiline">
                                    {this.renderCategories()}
                                </div>
                                <hr/>
                                <p className="title is-4">Price Range</p>
                                <div className="field has-addons">
                                    <p className="control">
                                        <input className="input" type="number" placeholder="Min : 0"
                                               onChange={(e) => this.pickPrice(e)}/>
                                    </p>
                                    <p className="control">
                                        <a className="button is-static">
                                            Milo
                                        </a>
                                    </p>
                                </div>
                                <div className="field has-addons">
                                    <p className="control">
                                        <input className="input" type="number" placeholder="Max : 100"
                                               onChange={(e) => this.pickPrice(e)}/>
                                    </p>
                                    <p className="control">
                                        <a className="button is-static">
                                            Milo
                                        </a>
                                    </p>
                                </div>
                                <hr/>
                                <p className="title is-4">Rating</p>
                                <div className="control" onChange={(e) => this.selectRating(e)}>
                                    <label className="radio">
                                        <input type="radio" name="rating" value="1"/>
                                        <StarRatings
                                            rating={1}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starEmptyColor='rgb(236, 236, 236)'
                                            starRatedColor='hsl(141, 71%, 48%)'
                                        />
                                    </label>
                                    <br/>
                                    <label className="radio">
                                        <input type="radio" name="rating" value="2"/>
                                        <StarRatings
                                            rating={2}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starEmptyColor='rgb(236, 236, 236)'
                                            starRatedColor='hsl(141, 71%, 48%)'
                                        />
                                    </label>
                                    <br/>
                                    <label className="radio">
                                        <input type="radio" name="rating" value="3"/>
                                        <StarRatings
                                            rating={3}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starEmptyColor='rgb(236, 236, 236)'
                                            starRatedColor='hsl(141, 71%, 48%)'
                                        />
                                    </label>
                                    <br/>
                                    <label className="radio">
                                        <input type="radio" name="rating" value="4"/>
                                        <StarRatings
                                            rating={4}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starEmptyColor='rgb(236, 236, 236)'
                                            starRatedColor='hsl(141, 71%, 48%)'
                                        />
                                    </label>
                                    <br/>
                                    <label className="radio">
                                        <input type="radio" name="rating" value="5"/>
                                        <StarRatings
                                            rating={5}
                                            starDimension="20px"
                                            starSpacing="2px"
                                            starEmptyColor='rgb(236, 236, 236)'
                                            starRatedColor='hsl(141, 71%, 48%)'
                                        />
                                    </label>
                                </div>
                                <hr/>
                                <p className="title is-4">Sort By</p>
                                <div className="control select is-rounded">
                                    <select id="sort" defaultValue={1} onChange={(e) => this.selectSorting(e)}>
                                        <option value={1}>Name Asceding</option>
                                        <option value={2}>Name Desceding</option>
                                        <option value={3}>Price Asceding</option>
                                        <option value={4}>Price Desceding</option>
                                        <option value={5}>Rating Asceding</option>
                                        <option value={6}>Rating Desceding</option>
                                    </select>
                                </div>
                                <br/>
                                <div className="control">
                                    <button className="button is-rounded is-info"
                                            onClick={(e) => this.showResults(e)}>Show Results
                                    </button>
                                </div>

                            </div>
                            <div className="column is-1">
                            </div>
                            <div className="column is-8">
                                <p className="title is-4">Results</p>
                                {this.state.showResults ?
                                    <div id="results" className="columns is-multiline is-centered">
                                        {servicesFound.map((service) =>
                                            <div className="column is-12" key={service.id}>
                                                <ServiceTile service={service}/>
                                            </div>
                                        )}
                                        {this.renderSearchErrors()}
                                    </div> : null}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        searchErrors: searchSelectors.getServicesSearchErrors(state),
        servicesFound: searchSelectors.getFoundServices(state),
    };
}

export default connect(mapStateToProps)(GlobalSearch);
