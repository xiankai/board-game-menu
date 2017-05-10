import React from 'react';

const Label = ({
    children,
    type,
}) => {
    let backgroundColor = '#777';
    switch (type) {
        case 'primary': backgroundColor = '#337ab7';
            break;
        case 'success': backgroundColor = '#5cb85c';
            break;
        case 'info': backgroundColor = '#5bc0de';
            break;
        case 'warning': backgroundColor = '#f0ad4e';
            break;
        case 'danger': backgroundColor = '#d9534f';
            break;
    }

    return (
        <span
style={{
            display: 'inline',
            padding: '.2em .6em .3em',
            fontSize: '75%',
            fontWeight: 700,
            lineHeight: 1,
            color: '#fff',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            verticalAlign: 'baseline',
            borderRadius: '.25em',
            margin: 5,
            backgroundColor,
        }}>
            { children }
        </span>
    );
};

export default Label;
