import { useState } from "react";
import axios from "axios";

import storage from "../storage";

import usuarioService from '../services/usuario-api'

import { DropzoneDialogBase } from 'material-ui-dropzone';

// import api from '../services/api';

import './anyStyle.css';

const Home = () => {
    const [imagem, setImagem] = useState(null);
    // const [openUpload, setOpenUpload] = useState(false);
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState('');

    const cadastrarUsuario = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // caso esteja usando dropzonedialogbase
        // const imageFile = imagem[0].file;

        const usuario = JSON.stringify({
            "nome": nome,
            "username": username,
            "senha": senha
        });

        const blob = new Blob([usuario], {
            type: 'application/json'
        })

        console.log(imagem)

        // quando nenhum arquivo é selecionado
        // erro 400
        // verificar o que o post envia quando select files == null
        formData.append('file', imagem);

        formData.append('usuario', blob);        

        usuarioService.cadastrar(formData)
            .then((resposta) => {
                console.log(resposta);
                alert("Usuário cadastrado!");
                // window.open("/login", "_self");
            })
            .catch((erro) => {
                alert("Erro! Verifique o console.");
                console.error(erro);
            });
    };

    return (
        <form>

            <div>
                <label htmlFor="file">Attach an image</label>
                <input
                    id="file"
                    type="file"
                    onChange={(e) => setImagem(e.target.files[0])}
                />

                {/* <button onClick={() => setOpenUpload(true)}>Open me</button> */}

                {/* <DropzoneDialogBase
                    dialogTitle="Inserir imagem"
                    acceptedFiles={["image/*"]}
                    fileObjects={imagem}
                    cancelButtonText={"Cancelar"}
                    submitButtonText={"Enviar"}
                    maxFileSize={5000000}
                    open={true}
                    onAdd={(arquivo) => {
                        console.log("onAdd", arquivo);
                        setImagem([].concat(imagem, arquivo));
                    }}
                    onDelete={(deleteFileObj) => {
                        console.log("onDelete", deleteFileObj);
                    }}
                    onClose={() => setOpenUpload(false)}
                    onSave={() => {
                        console.log("onSave", imagem);
                        cadastrarUsuario();
                        setOpenUpload(false);
                    }}
                    showPreviews={true}
                    showFileNamesInPreview={true}
                /> */}

            </div>

            <div>
                <label htmlFor="nome">Nome: </label>
                <input
                    id="nome"
                    placeholder="Lucas Cruz"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="username">Username: </label>
                <input
                    id="username"
                    placeholder="lucas"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="senha">Senha: </label>
                <input
                    id="senha"
                    placeholder="******"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="status">Status: </label>
                <input
                    id="status"
                    placeholder="ex.: Almoçando"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
            </div>

            <button onClick={cadastrarUsuario}>Criar usuário</button>
        </form>
    );
};

export default Home;
