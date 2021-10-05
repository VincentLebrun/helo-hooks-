import React from 'react'

export const Header = () => {
    return (
        <header className="App-header">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} className="App-logo" alt="logo" />
            <span className="App-name">Mon Marché</span>
        </header>
    )
}
