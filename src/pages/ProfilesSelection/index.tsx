import React, { useEffect, useState } from 'react'
import './style.css' ;
import { findAllService } from '../../services/profilesService' 

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
      <div>
        <span>INSERIR BOTAO DE VOLTAR</span>
        <div className="links"></div>
    </div>
    <div className="container_flex" >
        
        {profiles.map((profile,index)=>(
          <div className="quadrado">
            {profile.title}
            <img src={profile.ImageURL}  alt="" />
          </div>
        )
        )}

    </div>
    </section>
  )
}
