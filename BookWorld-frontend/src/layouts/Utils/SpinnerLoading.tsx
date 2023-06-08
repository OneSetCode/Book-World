export const SpinnerLoading = () => {
    return (
        <div className="container mt-5 d-flex flex-column align-items-center justify-content-center"
            style={{ height: 500 }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
            <div style={{ marginTop: '10px' }}>
                One moment, loading data...
            </div>
        </div>
    )
}