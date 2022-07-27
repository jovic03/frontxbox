import React, { useEffect, useState } from 'react'
import './style.css' ;
import { findAllService,findProfileById } from '../../services/profilesService' 
import { Link } from 'react-router-dom';

export const ProfileSelection = () => {

  const [profiles,setProfiles]= useState<any[]>([]);

  useEffect(()=>{
    getAllProfiles();
  },[])

  const getAllProfiles = async ()=>{
    const response = await findAllService.allProfiles();
    // console.log(response.data)
    setProfiles(response.data)//chamando a funcao que recebe os dados
  }

  const getProfileData = async (id:string)=>{
    const response = await findProfileById.findProfileById(id);
    // setProfiles(response.data)//chamando a funcao que recebe os dados
    return console.log(response,'PROFILE AQUI')
  }

  return (
    <section>
       <Link to='/login'><img src='../../src/assets/icons/btnvoltar.png' /></Link>

    <div className="container_flex" >
      
        
        {profiles.map((profile,index)=>(
          <div className="profile-box" key={index}>
            <div className="profile__name" key={index}>
              {profile.title}
              <Link to="/">
                <img src={profile.ImageURL} key={index}  alt="" className="profile__image" 
                onClick={()=>getProfileData (`${profile.id}`)} />
              </Link>
            </div>
          </div> 
        ))}
       

    </div>
    </section>
  )
}
