/*import React from "react"

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <img src={imgSrc} alt="No notes" className="w-60" />

            <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
                {message}
            </p>
        </div>
    )
}

export default EmptyCard*/

import React from "react"

const EmptyCard = ({ imgSrc, message }) => {
    return (
        <div className="flex flex-col items-center justify-center py-10 mt-10 animate-fadeIn">
            <img
                src={imgSrc}
                alt="No notes"
                className="max-w-[250px] sm:max-w-[300px] opacity-80 transition-opacity duration-300 hover:opacity-100"
            />

            <p className="w-4/5 sm:w-2/3 text-center text-lg sm:text-xl font-medium text-slate-600 leading-7 mt-6">
                {message}
            </p>
        </div>
    )
}

export default EmptyCard
