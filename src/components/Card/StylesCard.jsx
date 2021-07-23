import styled from 'styled-components';

export const Membros = styled.div`

    background-color: #D6D6D6;
    margin-top: 2px;
    width: 250px;
    height: 250px;
    margin-bottom: 40px;
    margin-top: 0.3rem;
    padding-top: 0.2px;
    padding-bottom: 5px;
    border-radius: 3px;

    h1{
      text-align: center;
    }

    .info{
    display: block;
    text-align: center;
    align-items: center;
    justify-content: center;
    max-width:250px;
    height: 260px;

      .avatar{
      margin-top: 1.5rem;
      align-items: center;
      justify-content: center;
      background-color: #094B89;
      clip-path: circle();
      padding: 1.5rem;

      }

      .nome{
        text-align: center;
      }

      .cargo{
        text-align: center;
      }

      .status{
        text-align: center;
      }
    }
`;