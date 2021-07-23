import React from 'react'
import { Membros } from './StylesCard.jsx'
import user from '../../assets/user.svg'


export default function CardMembros(props) {

  // const {id, nome, cargo, status} = props.cards; 

  return (
    <div className="cards">
      <h1 className="title">Squad aleatório</h1>
      <Membros >
        <div className="info">
          <h3 className="avatar"><img className="user" src={user} /></h3>
          <h2 className="nome">nome</h2>
          <h3 className="cargo">cargo</h3>
          <h3 className="status">status</h3>
        </div>
      </Membros>
    </div>
  );
}