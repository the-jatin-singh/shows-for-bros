import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Triangle
                visible={true}
                height="80"
                width="80"
                color="#111111"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader