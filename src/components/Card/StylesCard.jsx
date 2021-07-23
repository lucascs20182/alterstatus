import styled from 'styled-components';

export const Membros = styled.div`

    flex: 1;
    background-color: #D6D6D6;
    margin-top: 2px;
    width: 250px;
    height: 250px;
    margin-bottom: 40px;
    margin-top: 0.3rem;
    padding-top: 0.2px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 5px;
    border-radius: 3px;
    align-items: center;
    justify-content: center;
    display: flex;
    box-shadow: 0px 0.5px 0.5px 0.5px rgba(00, 00, 25, 0.3);

    .cards{
      align-items: center;
      justify-content: center;
    }

    .info{
    display: block;
    text-align: center;
    max-width:260px;
    height: 260px;

      .avatar{
      margin-top: 1.5rem;
      align-items: center;
      justify-content: center;
      background-color: #094B89;
      clip-path: circle();
      padding: 0.6rem;

      }
      
      .user{
        width: 50px;
        height: 30px,
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