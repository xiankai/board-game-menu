import React from 'react';

import { connect } from 'react-redux';
import { description, resetDescription } from '../../common/board/actions';

class Description extends React.Component {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        customDescription: React.PropTypes.string,
        description: React.PropTypes.string,
    };

    constructor() {
        super();

        this.state = {
            editable: false,
        };
    }

    handleDescriptionChange = e => {
        const { dispatch, id } = this.props;
        // clearTimeout(this.state.debounced);
        // this.state.debounced = setTimeout(() => {
        dispatch(description(id, e.target.value));
        // }, 2000);
    };

    editDescription = () => {
        this.setState({ editable: true }, () => this.refs.desc.focus());
    };

    saveDescription = () => this.setState({ editable: false });

    render() {
        const {
            description,
            customDescription,
            succint,
        } = this.props;

        const actualDescription = customDescription || description;
        const parsed = actualDescription.split(/\n+/);
        const actualBlurb = parsed[0].length >= 140 ? parsed[0] : parsed[1];

        return (
            <div>
                <p style={{
                    display: this.state.editable ? 'block' : 'none',
                }}>
                    <textarea
                        ref="desc"
                        style={{
                            width: '100%',
                            fontFamily: 'monospace',
                            fontSize: 14,
                        }}
                        rows="20"
                        value={actualBlurb}
                        onChange={this.handleDescriptionChange}
                        onBlur={this.saveDescription}
                    />
                </p>
                <p style={{
                    whiteSpace: 'pre-wrap',
                    display: this.state.editable ? 'none' : '-webkit-box',
                    fontSize: 15,
                    lineHeight: 1.2,
                    height: 15 * 1.2 * 3,
                    ...succint ? {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                    } : {},
                }}
                    onClick={this.editDescription}
                >
                    { actualBlurb }
                </p>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({ customDescription: state.board.description[props.id] }),
)(Description);
