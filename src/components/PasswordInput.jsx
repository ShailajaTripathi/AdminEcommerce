import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { ReactComponent as EyeIcon } from '../assets/images/eye.svg'
import { ReactComponent as ClosedEyeIcon } from '../assets/images/eye-closed.svg'

const PasswordInput = ({label, name, register, error, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <Form.Group className="input-wrapper">
            <Form.Label className="label-name lcontrol">{label}</Form.Label>
            <InputGroup className="mb-1">
                <Form.Control
                    className="icontrol input-text pwd-input"
                    type={showPassword ? 'text' : 'password'}
                    {...(register && register(name))}
                    {...rest}
                />
                <InputGroup.Text id="basic-addon1">
                    {showPassword ? (
                        <EyeIcon
                            className="eye-icon"
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <ClosedEyeIcon
                            className="eye-icon"
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </InputGroup.Text>
            </InputGroup>
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </Form.Group>
    )
}

export default PasswordInput
