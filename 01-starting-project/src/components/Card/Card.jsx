import "./Card.css" 

export default function Card({name,children}) {
    return (
    <article>
        <h2>{name}</h2>
        {children}
    </article>
    );
  }