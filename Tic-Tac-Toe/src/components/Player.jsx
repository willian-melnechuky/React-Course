import { useState } from 'react';

export default function Player ({initialName, symbol, isActive}){
    const [name, setName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    
    function handleEditClick(EditState) {
        setIsEditing(EditState);
        //setIsEditing(editing => !editing)
      }
    
      function handleChange(event) {
        //console.log(event)
        setName(event.target.value);
      }
      
    let PlayerNameBlock = <span className="player-name">{name}</span>
    let ButtonBlock = <button onClick={() => handleEditClick(true)}>Edit</button>
    
    if (isEditing) {
        PlayerNameBlock = <input className="player-name" required value={name} onChange={handleChange}/> //This is a two way binding
        ButtonBlock = <button onClick={() => handleEditClick(false)}>Save</button>
    }

    
        
    return(
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {PlayerNameBlock}
                <span className="player-symbol">{symbol}</span>
            </span>
            {ButtonBlock}
        </li>
    )
}