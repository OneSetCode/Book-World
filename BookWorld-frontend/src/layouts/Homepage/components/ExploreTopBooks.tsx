import { useState } from "react";
import { Link } from "react-router-dom";

export const ExploreTopBooks = () => {

    const [search, setSearch] = useState('');

    return (
        <>
            <div className='p-5 mb-4 bg-dark header'>
                <div className="container-fluid py-5 text-white
                d-flex justify-content-center align-items-center">
                    <div>
                        <h1 className="display-5 fw-bold">Your Journey Starts Here</h1>
                        <p className="col-md-8 fs-4">Where would you like to go next?</p>
                        <Link type='button' className="btn main-color btn-lg text-white" to="/search">
                            Explore Top Books</Link>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <input className="form-control me-2" type="search" value={search}
                    placeholder="Search books here" aria-labelledby="Search" style={{ width: '35%' }}
                    onChange={e => setSearch(e.target.value)} />
                <Link to={`/search/${search}`}>
                    <button className="btn btn-outline-success">
                        Search
                    </button>
                </Link>
            </div>
        </>
    );
}