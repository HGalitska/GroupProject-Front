import React from 'react';
import {Link} from 'react-router-dom';

import './Homepage.scss';
import NavigationBar from "../components/NavigationBar";
import SearchArea from "../search-area/SearchArea";

export default class Homepage extends React.Component {
    render() {
        return (
            <main className="Homepage">
                <NavigationBar/>

                <section className="section">
                    <div className="container">
                        <SearchArea for="service"/>
                    </div>
                </section>
            </main>
        );
    }
}
