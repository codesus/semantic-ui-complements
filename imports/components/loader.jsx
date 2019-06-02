import React from 'react';
import { Dimmer, Loader as SemanticLoader, Image, Segment } from 'semantic-ui-react';


const Loader = (props)=>{

  return (
    <div>
      <Segment>
        <Dimmer active inverted>
          <SemanticLoader size='massive'>Loading</SemanticLoader>
        </Dimmer>
  
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      </Segment>
    </div>
  )
};


export { Loader };



