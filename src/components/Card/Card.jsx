import React from 'react'
import { Membros } from './StylesCard.jsx'


export default function CardMembros() {

  return (
    <div>
      <h1 className="title">SQUAD ALEATÓRIO DESSA MASSA</h1>
      <Membros>
        <div className="info">
          <h3 className="avatar">a</h3>
          <h2 className="nome">nome</h2>
          <h3 className="cargo">cargo</h3>
          <h3 className="status">status</h3>
        </div>
      </Membros>
    </div>
  );
}