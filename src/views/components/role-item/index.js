import React, { Component } from 'react';

class Role extends Component {
  render() {
    return (
      <div>
        {this.props.role === 'frontend' &&
        <img
            width={64}
            height={64}
            src="http://cropfection.com/img/icon-1.png"
            role="presentation"
        />
        }
        {this.props.role === 'backend' &&
        <img
            width={64}
            height={64}
            src="http://getmoai.com/images/icons/custom_cloud.png"
            role="presentation"
        />
        }
        {this.props.role === 'design' &&
        <img
            width={64}
            height={64}
            src="https://s-media-cache-ak0.pinimg.com/564x/72/bb/3d/72bb3df2b724026bc224767f49890230.jpg"
            role="presentation"
        />
        }
        {this.props.role === 'research' &&
        <img
            width={64}
            height={64}
            src="https://s-media-cache-ak0.pinimg.com/236x/b1/83/89/b1838916a66d8da72bcdad4d019ab920.jpg"
            role="presentation"
        />
        }
        {this.props.role === 'outreach' &&
        <img
            width={64}
            height={64}
            src="http://www.nsp360.com/_img/icon-6-lrg.png"
            role="presentation"
        />
        }
        {this.props.role === 'media' &&
        <img
            width={64}
            height={64}
            src="http://www.arenaadyar.com/images/multimediaicon.png"
            role="presentation"
        />
        }
      </div>
    );
  }
}

Role.propTypes = {
  role: React.PropTypes.string
};

export default Role;
