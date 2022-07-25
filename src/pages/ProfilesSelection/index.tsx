import React, { useEffect, useState } from 'react'
import './style.css' ;
import { findAllService } from '../../services/profilesService' 
import { Link } from 'react-router-dom';

export const ProfileSelection = () => {

  const [profiles,setProfiles]= useState<any[]>([]);

  useEffect(()=>{
    getAllProfiles();
  },[])

  const getAllProfiles = async ()=>{
    const response = await findAllService.allProfiles();
    console.log(response.data)
    setProfiles(response.data)//chamando a funcao que recebe os dados
  }

  return (
    <section>
       <Link to='/login'><img src='../../src/assets/icons/btnvoltar.png' /></Link>

    <div className="container_flex" >
      <div className="profile-box">
        
        {profiles.map((profile,index)=>(
          <div className="profile__name">
            {profile.title}
            <img src={profile.ImageURL}  alt="" className="profile__image"  />
          </div>
        ))}
       </div> 

    </div>
    </section>
  )
}
