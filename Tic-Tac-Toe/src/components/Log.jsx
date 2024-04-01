export default function Log({ turns }){
    return (
        <ol id="log">
            {turns.map((turn, index) => (
              <li key={`${turn.square.row}${turn.square.col}`}>
                Turn {turns.length-index}:     {turn.player} selected {turn.square.row+1},{turn.square.col+1} (row,col)
              </li>
            ))}  
        </ol>
    );
}