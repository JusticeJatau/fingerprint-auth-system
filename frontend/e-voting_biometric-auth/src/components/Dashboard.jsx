import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const [name, setName] = useState("User");
    const username = new URLSearchParams();
    useEffect(()=>{
        setName(username)
    })

    return (
        <>
            <h1>Hi {username}</h1>
        </>
    )
}

export default Dashboard
