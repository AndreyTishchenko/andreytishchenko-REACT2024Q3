import React from 'react'

export default class Header extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                <div>
                    <h2>STAPI</h2>
                </div>
                <div>Logo</div>
                <form>
                    <input></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </>
        )
    }
}
