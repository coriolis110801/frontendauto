import React from 'react'
function Loader() {
    return (
        <div className="f-loading">
            <div className="loading spin"></div>
            <div>
                <div>Thanks for your patience!</div><div>We are currently saving your changes...</div>
            </div>
        </div>
    )
}

export default Loader
