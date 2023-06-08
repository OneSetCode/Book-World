import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchBook } from "./Components/SearchBook";
import { Pagination } from "../Utils/Pagination";

export const SearchBooksPage = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Book category');

    const [firstSearch, setFirstSearch] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `${process.env.REACT_APP_API}/books`;

            let url: string = ''; // `const` means can't change, `let` means can change 

            if (searchUrl === '') {
                url = `${baseUrl}?page=${currentPage - 1}&size=${booksPerPage}`;
            } else {
                let seachWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + seachWithPage;
            }

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.books;

            setTotalAmountOfBooks(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedBooks: BookModel[] = [];

            for (const key in responseData) {
                loadedBooks.push({
                    id: responseData[key].id,
                    title: responseData[key].title,
                    author: responseData[key].author,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0, 0); // Scroll the page to the top
    }, [currentPage, searchUrl]); // Each time currentPage changes, the function reruns


    if (isLoading) {
        return (
            <SpinnerLoading />
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=<pageNumber>&size=${booksPerPage}`)
        }
        setCategorySelection('Book catogory');
    }


    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (
            value.toLowerCase() === 'technology' ||
            value.toLowerCase() === 'fiction' ||
            value.toLowerCase() === 'marketing' ||
            value.toLowerCase() === 'reference' ||
            value.toLowerCase() === 'music'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${booksPerPage}`)
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${booksPerPage}`);
        }
        setSearch('');
    }

    const firstItem: number = (currentPage - 1) * booksPerPage + 1;
    let lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    // Handle the first search
    const firstSearchValue = (window.location.pathname).split('/')[2];
    if (firstSearchValue !== undefined && !firstSearch) {
        setFirstSearch(true);
        setSearch(firstSearchValue);
        // It updates the search state, but the state update may not be immediately reflected in the subsequent lines of code, so use firstSearchValue instead
        setSearchUrl(`/search/findByTitleContaining?title=${firstSearchValue}&page=<pageNumber>&size=${booksPerPage}`);
    }

    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-6">
                            <div className="d-flex">
                                <input className="form-control me-2" type="search" value={search}
                                    placeholder="Search" aria-labelledby="Search"
                                    onChange={e => setSearch(e.target.value)} />
                                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button"
                                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    {categorySelection}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenurButton1">
                                    <li onClick={() => categoryField('All')}>
                                        <a className="dropdown-item" href="#">
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Technology')}>
                                        <a className="dropdown-item" href="#">
                                            Technology
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Fiction')}>
                                        <a className="dropdown-item" href="#">
                                            Fiction
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Marketing')}>
                                        <a className="dropdown-item" href="#">
                                            Marketing
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Reference')}>
                                        <a className="dropdown-item" href="#">
                                            Reference
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('Music')}>
                                        <a className="dropdown-item" href="#">
                                            Music
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfBooks > 0 ?
                        <>
                            <div className="mt-3">
                                <h5>Number of results: ({totalAmountOfBooks})</h5>
                            </div>
                            <p>
                                {firstItem} to {lastItem} of {totalAmountOfBooks} items:
                            </p>
                            {books.map(book => (
                                <SearchBook book={book} key={book.id} />
                            ))}
                        </>
                        :
                        <>
                            <div className="mt-3">
                                <h5>Number of results: (0)</h5>
                            </div>
                            <div className="m-5">
                                <h3>
                                    Can't find what you are looking for?
                                </h3>
                                <a type="button" className="btn main-color btn-md px-4 me-md-2 fw-bold text-white"
                                    href="#">Library Services</a>
                            </div>
                        </>
                    }
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
                </div>
            </div>
        </div>
    );
}