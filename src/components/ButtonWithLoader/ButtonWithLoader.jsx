import React from 'react'
import { Spinner } from 'react-bootstrap'

const ButtonwithLoader = ({ children, isLoading, cssClass = 'common-btn' }) => {
    return isLoading ? (
        <button className={cssClass} type="button" disabled={isLoading}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </button>
    ) : (
        children
    )
}

export default React.memo(ButtonwithLoader)
