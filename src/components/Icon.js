import React, { Component } from 'react';

class Icon extends Component {
  render() {
    return(
      <div>
        {this.props.role === 'frontend' &&
         <img
             width={64}
             height={64}
             src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
             role="presentation"/>
        }
         {this.props.role === 'backend' &&
          <img
              width={64}
              height={64}
              src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
              role="presentation"/>
         }
          {this.props.role === 'design' &&
           <img
               width={64}
               height={64}
               src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
               role="presentation"/>
          }
           {this.props.role === 'research' &&
            <img
                width={64}
                height={64}
                src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
                role="presentation"/>
           }
            {this.props.role === 'outreach' &&
             <img
                 width={64}
                 height={64}
                 src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
                 role="presentation"/>
            }
             {this.props.role === 'media' &&
              <img
                  width={64}
                  height={64}
                  src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/light-bulb-icon.png"
                  role="presentation"/>
             }


      </div>
    );
  }
}

Icon.propTypes = {
  role: React.PropTypes.string
};

export default Icon;
