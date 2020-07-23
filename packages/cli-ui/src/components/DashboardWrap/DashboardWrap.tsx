import React from 'react'
import css from './style.module.scss'

function DashboardWrap({ children }: React.PropsWithChildren<React.ReactNode>) {
    return(
        <div className={css.wrapper}>
            {children}
        </div>
    )
}

export default DashboardWrap