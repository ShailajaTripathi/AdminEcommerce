import React from 'react';
import { Form } from 'react-bootstrap';

const InputControl = ({
    autoFocus=false,
    className,
    login,
    error,
    label,
    name,
    register,
    textarea,

    type = 'text',
    ...rest
}) => {
    return (
        <Form.Group
            className={
                !className
                    ? 'form-group'
                    : `form-group ${className}`
            }
        >
            <Form.Label className="">{label}</Form.Label>
            <Form.Control
                autoFocus={autoFocus}
                className={textarea ? 'tcontrol' : 'icontrol input-text'}
                type={type}
                {...(register && register(name))}
                {...rest}
            />
            {error && (
                <span className="error-message" style={{ color: 'red' }}>
                    {error}
                </span>
            )}
        </Form.Group>
    );
};

export default InputControl;
