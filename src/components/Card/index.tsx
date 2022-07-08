import './style.css';

interface cardProps {
  jogo: {
    id?: string;
    title :string;
    coverImageUrl:string;
    description:string;
    year:string;
    imdbScore:string;
    trailerYouTubeUrl:string;
    gameplayYouTubeUrl:string;
  
  }
} 


const Card = ({ jogo }: cardProps) => {
  return (
    <div className='card'>
      <img src={jogo.coverImageUrl} className="character-image" alt="Imagem massa do miranha" />
      <div>
        <h2>{jogo.title}</h2>
        <p>{jogo.description}</p>
        <p>{jogo.year}</p>
        <p>{jogo.imdbScore}</p>
        <p>{jogo.trailerYouTubeUrl}</p>
        <p>{jogo.gameplayYouTubeUrl}</p>
        {/* <span className='user-card'>By: {jogo.genero}</span> */}
      </div>
    </div>
  )
}

export default Card