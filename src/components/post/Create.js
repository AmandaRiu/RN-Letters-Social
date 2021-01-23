import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Filter from 'bad-words';

const filter = new Filter();

class CreatePost extends Component {
    static propTypes = {

    };

    constructor( props ) {
        super( props );
        this.state = {
            content: '',
            valid: false,
        };
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handlePostChange = this.handlePostChange.bind( this );
    }

    handlePostChange( e ) {
        const content = filter.clean( e.target.value );
        this.setState( () => {
            return {
                content,
                valid: content.length <= 280,
            };
        } );
    }

    handleSubmit() {
        console.log( this.state );
        if ( !this.state.valid ) {
            return;
        }
        const newPost = {
            content: this.state.content,
        };
        this.props.onSubmit( newPost );
    }

    render() {
        return (
            <div className="create-post">
                <textarea
                    value={ this.state.content }
                    onChange={ this.handlePostChange }
                    placeholder="What's on your mind?"
                />
                <button onClick={ this.handleSubmit }>Post</button>
            </div>
        );
    }
}

export default CreatePost;