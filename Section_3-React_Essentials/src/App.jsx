import { useState } from 'react' //a react hooks - needed to change states

import { CORE_CONCEPTS } from './data.js'
import { EXAMPLES } from './data.js'
import Header from './components/Header/Header.jsx'
import CoreConcept from './components/CoreConcepts/CoreConcept.jsx';
import Card from './components/Card/Card.jsx';
import TabButton from './components/TabButton/TabButton.jsx';


function App() {
  const [ selectedTopic, setSelectedTopic ] = useState(); // const [ x, y ] this is array destructuring
 
  function handleSelect(selectedButton) {
    //selected button 
    setSelectedTopic(selectedButton) ;
}
  let tabContent = <p>Please select a topic</p>
  
  if(selectedTopic) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }
  return (
    <div>
      <Header/>
      <main>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
          <ul>
            {CORE_CONCEPTS.map((conceptItem) => (<CoreConcept key ={conceptItem.title}{...conceptItem}/>))}
            {/* <CoreConcept 
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
            <CoreConcept {...CORE_CONCEPTS[1]}/>
            <CoreConcept {...CORE_CONCEPTS[2]}/>
            <CoreConcept {...CORE_CONCEPTS[3]}/> */}
          </ul>
        </section>
        <section id="examples">
          <h2>Examples</h2>
          <menu>
            <TabButton 
              isSelected = {selectedTopic === 'components'} 
              onSelect = {() => handleSelect('components')}
              >Components
            </TabButton>
            <TabButton 
              isSelected = {selectedTopic === 'jsx'} 
              onSelect = {() => handleSelect('jsx')}
              >JSX
            </TabButton>
            <TabButton 
              isSelected = {selectedTopic === 'props'} 
              onSelect = {() => handleSelect('props')}
              >Props
            </TabButton>
            <TabButton 
              isSelected = {selectedTopic === 'state'} 
              onSelect = {() => handleSelect('state')}
              >State
            </TabButton>
          </menu>
          {/* {!selectedTopic ? 
            <p>Please select a topic</p> 
            :(
              <div id="tab-content">
                  <h3>{EXAMPLES[selectedTopic].title}</h3>
                  <p>{EXAMPLES[selectedTopic].description}</p>
                  <pre>{EXAMPLES[selectedTopic].code}</pre>
                </div>
              )
          } */}
          {/* <!-- ? means ==! undefined - meaning the value is not undefined--> */}
        {tabContent}
        </section>
        <h2>Time to get started!</h2>
        
      </main>
    </div>
  );
}

export default App;
