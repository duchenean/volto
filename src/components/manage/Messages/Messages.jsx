/**
 * Messages component.
 * @module components/manage/Messages/Messages
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Message, Segment } from 'semantic-ui-react';
import { map } from 'lodash';

import { removeMessage } from '../../../actions';

@connect(
  state => ({
    messages: state.messages.messages,
  }),
  dispatch => bindActionCreators({ removeMessage }, dispatch),
)
/**
 * Messages container class.
 * @class Messages
 * @extends Component
 */
export default class Messages extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to remove message
     */
    removeMessage: PropTypes.func.isRequired,
    /**
     * List of messages
     */
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Title of the message
         */
        title: PropTypes.string,
        /**
         * Body of the message
         */
        body: PropTypes.string,
        /**
         * Level of the message
         */
        level: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Messages
   */
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.messages.length > this.props.messages.length) {
      window.setTimeout(() => {
        if (this.props.messages.length > 0) {
          this.props.removeMessage(-1);
        }
      }, 6000);
    }
  }

  /**
   * On dismiss
   * @method onDismiss
   * @param {Object} event Event object
   * @param {number} value Index of message
   */
  onDismiss(event, { value }) {
    this.props.removeMessage(value);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment basic className="messages">
        {map(this.props.messages, (message, index) => (
          <Message
            key={message.id}
            value={index}
            onDismiss={this.onDismiss}
            error={message.level === 'error'}
            success={message.level === 'success'}
            warning={message.level === 'warning'}
            info={message.level === 'info'}
            header={message.title}
            content={message.body}
          />
        ))}
      </Segment>
    );
  }
}
