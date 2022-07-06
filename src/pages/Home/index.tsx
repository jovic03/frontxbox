import Header from '../../components/Header/index';
import "./style.css";
import Card from '../../components/Card/index';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Characters{
  identity:string;
  image:string;
  name:string;
  reality:string;
  id:string;
  userName:string;
  avatar:string;
  userId:string;
  
}

interface User{
  avatar:string;
  email:string;
  name:string;
  _id:string;
}

const Home = () => {

  const [characters,setCharacters] = useState<Characters[]>([])

  useEffect(()=>{
    getAllCharacters();
  },[]);

  const getAllCharacters = async ()=>{
    /*const chamadaApi = fetch('https://sheet2api.com/v1/M18qpSHnRQS5/characters')
    chamadaApi.then((response) =>response.json())
      .then(data => console.log(data))
      .catch(err =>console.log('erro',err))*/

      /*const chamadaApi = await fetch('https://sheet2api.com/v1/M18qpSHnRQS5/characters')
      const data = await chamadaApi.json();
      console.log(data);*/

      /*try{
      const result = await axios('https://sheet2api.com/v1/M18qpSHnRQS5/characters')
      console.log(result.data)
      } catch(err:any){
        alert(err.message)
      }*/

      try{
        const result = await axios.post('https://api.rawg.io/api/platforms?key=4bed99f215f345d8b04748edee691caf',
        {   
          identity:'Peter',
          image:'url_image',
          name:'Pedro',
          reality:'Terra',
          id:'123',
          userName:'Jao',
          avatar:'url_avatr',
          userId:'id',
        }
        );
        console.log(result.data);
        } catch(err:any){
          alert(err.message)
        }



    } 

  return (
    <main>
      <Header/>
      <section className='list-cards'>
        <div className='card-container'>
          <Card/>
          <Card/>
          <Card/>
          <Card/>         
        </div>
        <button className='btn-view-more'>Ver mais</button>
      </section>
    </main>
  )
}

export default Home