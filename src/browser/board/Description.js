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
        } = this.props;

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
                        value={customDescription || description}
                        onChange={this.handleDescriptionChange}
                        onBlur={this.saveDescription}
                    />
                </p>
                <p style={{
                    whiteSpace: 'pre-wrap',
                    display: this.state.editable ? 'none' : 'block',
                }}
                    onClick={this.editDescription}
                >
                    { customDescription || description }
                </p>
            </div>
        );
    }
}

export default connect(
    (state, props) => ({ customDescription: state.board.description[props.id] }),
)(Description);
