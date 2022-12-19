import React from 'react'
import { Link } from 'react-router-dom'
import style from "./ErrorPage.css"

function ErrorPage() {
    return (

        < >
            <div className='errr'>

                <title>Page Not Found</title>
                <img src="https://i.ibb.co/W6tgcKQ/softcodeon.gif" />
                <h1 class="error-text">Whoops, We can't seem to find the resource you're looking for.</h1>
                <p class="text">Please check that the Web site address is spelled correctly.Or,</p>
                <div class="btn1">
                    <Link to={'/'} class="error" >Go to Homepage</Link>
                </div>
            </div>
        </>

    )
}

export default ErrorPage