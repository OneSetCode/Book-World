import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { useState } from "react";

export const Footer = () => {

    const { oktaAuth, authState } = useOktaAuth();

    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    if (!authState) {
        return <SpinnerLoading />
    }
    
    return (
        <div className="main-color">
            <footer className="container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color">
                <p className="col-md-4 mb-0 text-white">@ Example Library App, Inc</p>
                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/home" onClick={scrollTop} className="nav-link px-2 text-white">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link px-2 text-white">
                            Search Books
                        </Link>
                    </li>
                    {!authState.isAuthenticated ?
                        <li className="nav-item">
                            <Link to="/login" className="nav-link px-2 text-white">
                                Sign in
                            </Link>
                        </li>
                        :
                        <></>
                    }               
                </ul>
            </footer>
        </div>
    );
}