import React, { Component } from 'react';

class Logo extends Component {
  render() {
    return (
      <div>
        {this.props.type === 'idea' &&
        <img
             width={64}
             height={64}
             src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
             role="presentation"
        />
        }
        {this.props.type === 'prototype' &&
        <img
             width={64}
             height={64}
             src="http://aboxofpixels.com/images/img-icon-prototype.png"
             role="presentation"
        />
        }
        {this.props.type === 'startup' &&
        <img
             width={64}
             height={64}
             src="https://indiapartners.org/wp-content/themes/startup/templates/startup-framework/build-wp/common-files/icons/rocket-big-grey-bg@2x.png"
             role="presentation"
        />
        }
      </div>
    );
  }
}

Logo.propTypes = {
  type: React.PropTypes.string
};

export default Logo;
