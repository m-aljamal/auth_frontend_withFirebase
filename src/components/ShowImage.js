import React from 'react'

const ShowImage = ({id, name, className}) => {
    return (
        <img 
        src={`http://localhost:5000/api/products/product/photo/${id}`}
        alt={name}
        className={className}
        />
    )
}

export default ShowImage
