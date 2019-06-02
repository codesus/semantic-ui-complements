import React from 'react';
import {Header, Segment, Button, Icon} from 'semantic-ui-react';

const HeaderComponent  = (props)=>{
  const {
    title = 'Component',
    description = '',
    icon = 'settings',
    buttons
  } = props;
  return (
    <Segment.Group >      
    <Segment clearing>
      <Header as='h2' floated='left' style={{marginBottom:0}}>
            <Icon name={icon} />
            <Header.Content>
              {title}
              <Header.Subheader>{description}</Header.Subheader>
            </Header.Content>
      </Header>
      <div style={{float:"right",marginTop:'0.5em'}}> {buttons}</div>
    </Segment>
  </Segment.Group>
  )
}


export { HeaderComponent };