import React from 'react'

export default function Container(props){

    const data = props.data || "hi";

    return (
        <div className="container">
            {data}
        </div>
    );
}