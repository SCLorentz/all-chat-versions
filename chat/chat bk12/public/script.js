const socket = io();
socket.on('helloUser', (message) => {
    console.log(message);
});
//import './node_modules/material-icons/iconfont/material-icons.css'
window.addEventListener("keydown", function (e) {
    switch (e.ctrlKey && e.key) {
        case 's':
            e.preventDefault();
            document.getElementById('settings').click();
            break;
        case 'g':
            e.preventDefault();
            document.getElementById('add').click();
            break;
        case 'h': //futuramente transformar em pesquisa por mensagens global, ou seja, proucura em todas as conversas
            e.preventDefault();
            document.getElementById('pesquisar').focus();
            break;
    }
});
const chats = [];
document.addEventListener("DOMContentLoaded", () => {
    const configBtn = document.getElementById('settings');
    const settings = document.getElementById("settingsMenu");
    function rotateButton(deg) {
        return function () {
            configBtn.style.transform = `rotate(${deg})`;
        }
    }
    configBtn.addEventListener('mouseover', rotateButton('10deg'));
    configBtn.addEventListener('mouseleave', rotateButton('0deg'));
    configBtn.addEventListener('click', () => {
        settings.style.display = 'flex';
        requestAnimationFrame(() => settings.style.top = '0%');
    });
    document.getElementById('closeSettings').addEventListener('click', () => {
        settings.style.top = '100%';
        setTimeout(() => settings.style.display = 'none', 1000);
    });
    //
    fetch('/enviar-dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(dados =>{
        dados.forEach(dado => {
            chats.push(new chat(dado.id, dado.name, '/img/newGroupImg.svg', dado.guests, [user],false));
        })
    })
    .catch(error => console.error('Erro ao enviar os dados:', error));
});
class Obj {
    constructor(elementType, customClass, father, innerText) {
        this.customClass = customClass;
        this.father = father;
        this.elementType = elementType;
        this.text = innerText;
        //
        this._element = document.createElement(this.elementType);
        this._element.classList.add(...this.customClass);
        this.father.appendChild(this._element);
        if (innerText) this._element.innerText = this._element.placeholder = this.text;
        return this._element;
    }
}
//usar o modulo "material-icons@latest" para chamar os icons
//remover essa classe, obter informações do aluno atravez de um banco de dados. Uma classe tão pequena como essa usa muita memoria, pouco otimizado.
const alunos = []; // Banco de dados de alunos
for (let i = 0; i < 8; i++) {
    const aluno = {
        nome: 'nome' + i,
        sobrenome: 'sobrenome' + i,
        img: 'img/user.svg',
        email: 'nome.sobrenome@colegiodante.org.br',
    };
    alunos.push(aluno);
}
// Agora 'alunos' contém os objetos representando os alunos
console.log(alunos);

const userName = decodeURIComponent(window.location.hash.slice(1)).split(" ")
const user = {nome: userName[0],sobrenome: userName[1],img: 'img/user.svg',email: `${userName[0]}.${userName[1]}@colegiodante.org.br`}

class chat {
    constructor(id, name, thumb, guests, adm, gen = false) {
        this.gen = gen;
        this.id = id;
        this.name = name;
        this.thumb = thumb;
        this.guests = guests;
        this.bannedWords = null;
        this.getBannedWords();
        this.adm = adm;
        this.createChat();
        this.createChatConfigs();
        this.createThumb();
        this.createMsg();
        this.msgs = [];
        if (this.gen) {
            const dataToSend = {id:this.id, name: this.name, thumb: this.thumb, guests: this.guests, adm: this.adm };
            fetch('/salvar-dados', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            })
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Erro ao enviar dados:', error));
        }
    }
    async getBannedWords() {
        try {
            const response = await fetch('banned_words.json');
            const data = await response.json();
            this.bannedWords = data;
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    createChat() {
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat', 'chatMenu');
        document.body.appendChild(this.chatElement);
        this.chatElement.addEventListener('contextmenu', e => e.preventDefault());
        //thumb
        this.thumbDiv = document.createElement('div');
        this.thumbDiv.classList.add('thumbDiv');
        this.chatElement.appendChild(this.thumbDiv);
        //thumbPicture
        this.thumbPicture = new Obj('img', ['thumbPicture'], this.thumbDiv);
        this.thumbPicture.src = this.thumb;
        this.thumbDiv.innerHTML += this.name;
        //pesquisar
        this.searchBtn = new Obj('span', ['btn', 'searchOnGroupBtn', 'material-symbols-outlined'], this.thumbDiv, 'search');
        this.searchInput = new Obj('input', ['searchOnGroupInput'], this.searchBtn, 'pesquisar...');
        //search action
        this.searchBtn.onclick = () => {
            this.searchInput.style.width = this.thumbDiv.offsetWidth / 6 + 'px';
            this.searchInput.focus();
            document.onclick = () =>
                this.searchInput.style.width = (
                    document.activeElement !== this.searchInput && this.searchInput.value == ''
                ) ? null : this.thumbDiv.offsetWidth / 5 + 'px';
        }
        this.searchInput.addEventListener('keydown', e => {
            if (e.key == 'Enter') {
                e.preventDefault();
                this.msgs.forEach(msg => {
                    if (msg.content) {
                        //verificar se o input !== '' && conteudo da mensagem ~=(70%) input
                        msg.getMessage.style.display = (
                            [...msg.content].filter((char, index) => char == this.searchInput.value.charAt(index)).length / msg.content.length < 0.7 && this.searchInput.value !== ''
                        ) ? 'none' : 'block';
                    }
                })
            }
        })
        //video call
        this.call = new Obj('a', ['btn', 'videoCam', 'material-symbols-outlined'], this.thumbDiv, 'videocam');
        this.call.onclick = () => {
            console.warn('não finalizado!')
        }
        this.imageOpened = new Obj('div', ['imageOpened'], this.chatElement);
        new Obj('span', ['btn', 'material-symbols-outlined'], this.imageOpened, 'close');
    }
    createChatConfigs() {
        this.openConfig = new Obj('span', ['btn', 'groupInfo', 'material-symbols-outlined'], this.thumbDiv, "more_vert");
        this.chatConfig = new Obj('div', ['chatConfigs', 'chatMenu'], document.body);
        this.back = new Obj('span', ['btn', 'material-symbols-outlined', 'back'], this.chatConfig, 'arrow_back_ios')
        this.back.onclick = () => config(false, this);
        this.openConfig.onclick = () => config(true, this);
        function config(view, e) {
            e.chatConfig.style.display = (view) ? 'grid' : 'none';
            e.chatElement.style.display = (view) ? 'none' : 'grid';
        }
        this.editGroup();
        this.createGuestList();
    }
    createThumb() {
        const contatosMenu = document.getElementById('contatos');
        this.groupThumbBtn = new Obj('button', ['groupThumbBtn'], contatosMenu);
        this.groupThumbBtn.tabIndex = 0;
        //
        this.thumbBtnImg = new Image();
        this.thumbBtnImg.src = this.thumb;
        this.thumbBtnImg.alt = this.id + ' picture';
        this.groupThumbBtn.appendChild(this.thumbBtnImg);
        this.groupThumbBtn.innerHTML += this.name;
        //
        this.groupThumbBtn.onclick = () => {
            document.querySelectorAll('.chat, .chatConfigs, .picMenu, .newGuestMenu').forEach(e => e.style.display = 'none');
            this.chatElement.style.display = 'grid';
            //thumb
            document.querySelectorAll('.groupThumbBtn').forEach(e => e.style.background = '');
            this.groupThumbBtn.style.background = '#0000002b';
        }
        contatosMenu.scrollTop = contatosMenu.scrollHeight;
    }
    guestListFunction() {
        document.querySelectorAll('.guestInList, .addGuest').forEach(e => {
            if (e.parentNode == this.guestList) e.parentNode.removeChild(e)
        })
        this.addGuest = new Obj('span', ['btn', 'material-symbols-outlined', 'addGuest'], this.guestList, 'person_add');
        this.addGuest.onclick = () => this.newGuestMenu.style.display = 'flex';
        this.guests.forEach(guest => {
            const guestInList = new Obj('div', ['guestInList'], this.guestList, guest.nome + ' ' + guest.sobrenome);
            guestInList.addEventListener('contextmenu', e => {
                e.preventDefault();
                guestInfoMenu.style.display = 'flex';
                guestInList.addEventListener('mouseleave', () => {
                    guestInfoMenu.style.display = 'none';
                });
            });
            const guestInfoMenu = new Obj('div', ['guestInfoMenu'], guestInList);
            new Obj('img', [], new Obj('a', [], guestInfoMenu, `${guest.nome} ${guest.sobrenome}`)).src = guest.img;
            //email
            this.guestEmail = new Obj('p', [], guestInfoMenu, guest.email);
            this.guestEmail.title = 'copy';
            this.guestEmail.onclick = () => {
                try {
                    navigator.clipboard.writeText(guest.email);
                } catch (err) {
                    console.error('Erro ao copiar texto: ', err);
                }
            }
            const guestInListImg = new Obj('img', [], guestInList);
            guestInListImg.src = guest.img;
            //remove guest
            const removeGuest = new Obj('p', ['removeGuest'], guestInfoMenu, "x");
            removeGuest.onclick = () => {
                if (user == guest && confirm('deseja sair do grupo?')) {
                    guestInList.parentNode.removeChild(guestInList);
                    removeGuestFunc(guest, this)
                } else if (user != guest && confirm('deseja remover ' + guest.nome + ' do grupo?')) {
                    guestInList.parentNode.removeChild(guestInList);
                    removeGuestFunc(guest, this)
                }
            }
            function removeGuestFunc(g, c) {
                c.guests.splice(c.guests.indexOf(g), 1); //preciso adicionar o usuario removido para "add guests"
                if (c.adm.indexOf(g) != -1) {
                    c.adm.splice(c.adm.indexOf(g), 1);
                }
            }
            const toAdm = new Obj('p', ['tornarAdm'], guestInfoMenu);
            toAdm.innerText = (this.adm.includes(guest)) ? 'remove adm' : 'add adm';
            toAdm.onclick = () => {
                if (this.adm.includes(user)) {
                    if (this.adm.includes(guest)) this.adm.splice(this.adm.indexOf(guest), 1);
                    else this.adm.push(guest);
                    toAdm.innerText = (this.adm.includes(guest)) ? 'remove adm' : 'add adm';
                }
            }
        })
    }
    createGuestList() {
        this.guestList = new Obj('div', ['guestList'], this.chatConfig)
        this.guestList.innerHTML = '<h3 id="titleGuests">guests</h3>';
        this.guestListFunction()
        //guestList add btn
        this.newGuestMenu = new Obj('div', ['newGuestMenu'], this.chatConfig);
        this.closeNewGuestMenu = new Obj('span', ['btn', 'closeBtn', 'material-symbols-outlined'], this.newGuestMenu, 'close');

        this.closeNewGuestMenu.onclick = () => {
            this.newGuestMenu.style.display = 'none';
        }
        this.addNewGuestTitle = new Obj('h2', [], this.newGuestMenu, 'add guests');
        //add
        this.guestsToAdd = new Obj('div', ['guestsToAdd'], this.newGuestMenu);
        alunos.forEach(aluno => {
            if (!this.guests.includes(aluno)) {
                const add = new Obj('span', ['btn'], this.guestsToAdd, `${aluno.nome} ${aluno.sobrenome}`);
                const img = new Obj('img', ['addUserImg'], add);
                img.src = aluno.img;
                add.onclick = () => {
                    this.guests.push(aluno);
                    add.parentNode.removeChild(add);
                    this.guestListFunction() //corrigir bugs
                    fetch('/enviar-dados', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then(response => response.json())
                    .then(dados =>{
                        const objetoEncontrado = dados.find(objeto => objeto.id === this.id);
                        if (objetoEncontrado) {
                            fetch('/add-guest', {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({id: this.id, guest: aluno}),
                            })
                            .then(response => response.text())
                            .then(message => console.log(message))
                            .catch(error => console.error('Erro ao enviar dados:', error));
                        } else {
                            console.error("Objeto não encontrado com o ID fornecido.");
                        }
                    })
                    .catch(error => console.error('Erro ao enviar os dados:', error));
                }
            }
        })
    }
    editGroup() {
        //edit group img
        this.img = new Image();
        this.img.classList.add('GroupImg');
        this.img.src = this.thumb;
        this.chatConfig.appendChild(this.img);
        //
        this.imgInput = document.createElement('input');
        this.imgInput.type = 'file';
        this.imgInput.accept = "image/svg+xml";
        this.imgInput.style.display = 'none';
        this.chatConfig.appendChild(this.imgInput);
        //this.picMenuOff.element.addEventListener('click',()=> this.picMenuOff.element.style.display = "none");
        this.picMenu = new Obj('div', ['picMenu'], this.chatConfig);
        this.buttonConfigs = [
            { name: 'picMenuUpload', ico: 'upload' },
            { name: 'picMenuCam', ico: 'photo_camera' },
            { name: 'picMenuNew', ico: 'add' },
            { name: 'picMenuEdit', ico: 'edit' },
            { name: 'picMenuDel', ico: 'delete' }
        ];
        this.buttonConfigs.forEach(btn => {
            this[btn.name] = new Obj('button', ['btn', 'picMenuBtn', 'material-symbols-outlined'], this.picMenu, btn.ico);
            this[btn.name].tabIndex = "0";
        });
        this.img.addEventListener('click', () => {
            this.picMenu.style.display = "flex";
            this.picMenu.style.top = `calc(50% - ${this.picMenu.offsetHeight / 2}px)`;
            this.picMenu.style.left = `calc(50% - ${this.picMenu.offsetWidth / 2}px)`;
            //comando para fechar o menu
        });
        //foto
        this.capture = new Obj('video', ['picMenuVidCap'], this.picMenu);
        this.capture.autoplay = true;
        this.CaptureBtn = new Obj('button', ['vidCapBtn', 'picMenuVidCap', 'btn', 'material-symbols-outlined'], this.picMenu, "add_a_photo");
        this.CaptureBtn.tabIndex = "0";
        this.picMenuCanvas = new Obj('canvas', ['picMenuCanvas'], this.picMenu);
        this.picMenuCanvas.height = "300";
        this.picMenuCanvas.width = "400";
        this.picMenuCam.addEventListener('click', () => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        Array.from(document.getElementsByClassName('picMenuVidCap')).forEach(e => e.style.display = "flex");
                        this.capture.srcObject = stream;
                        Array.from(document.getElementsByClassName('picMenuBtn')).forEach(e => e.style.display = "none");
                        this.picMenu.style.top = `calc(50% - ${this.picMenu.offsetHeight / 2}px)`;
                        this.picMenu.style.left = `calc(50% - ${this.picMenu.offsetWidth / 2}px)`;
                    })
                    .catch(error => console.error("Erro ao acessar a câmera: ", error));
            }
            this.CaptureBtn.addEventListener('click', () => {
                this.picMenuCanvas.getContext('2d').drawImage(this.capture, 0, 0, 400, 300);
                this.picMenuCanvas.style.display = 'flex';
                this.capture.style.display = "none";
                this.CaptureBtn.innerText = "replay";
                //
                this.thumb = this.picMenuCanvas.toDataURL('image/png');
                this.img.src = this.thumb;
                this.groupThumbBtn.firstChild.src = this.thumb;
                this.thumbDiv.firstChild.src = this.thumb;
            })
        });
        //Dos arquivos
        this.picMenuUpload.onclick = () => this.imgInput.click();
        this.imgInput.addEventListener('change', e => {
            if (e.target.files[0].type.startsWith('image/svg+xml')) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    const imageDataURL = reader.result;
                    this.thumb = imageDataURL;
                    //transformar em uma div para incorporar o svg diretamente na pagina, copiar conteudo do arquivo e colar dentro da div
                    this.img.src = this.thumb;
                    this.groupThumbBtn.firstChild.src = this.thumb;
                    this.thumbDiv.firstChild.src = this.thumb;
                    this.picMenu.style.display = "none";
                }
            } else alert(selectedFile.name + ' não é uma imagem suportada!');
        })
        //rename group
        this.rename = new Obj('textarea', ['renameGroup'], this.chatConfig, 'rename');
        this.rename.spellcheck = false;
        this.rename.value = this.name;
        this.rename.addEventListener("paste", e => {
            const clipboardData = e.clipboardData || window.Clipboard;
            if (clipboardData.getData("text").length + this.rename.value.length > 17) {
                e.preventDefault();
                alert('texto muito grande, você só tem mais ' + (17 - this.rename.value.length) + ' caracteres até o limite');
            }
        });
        this.rename.addEventListener("keydown", e => {
            if (this.rename.value.length > 16 && e.key !== "Backspace" && e.key !== 13 && e.key !== 37 && e.key !== 39 && e.key !== 9 && e.key !== 116 && this.rename.selectionStart == this.rename.selectionEnd) {
                e.preventDefault();
            }
            if (e.key == "Enter") {
                e.preventDefault();
                if (this.rename.value.replace(/^\W+/, '') !== '') this.renameGroup();
            }
        });
        this.rename.onblur = () => {
            if (this.rename.value.replace(/^\W+/, '') !== '') this.renameGroup();
            else this.rename.value = this.name;
        }
        this.rename.addEventListener('drop', e => e.preventDefault());
        this.desc = new Obj('input', ['groupDesc'], this.chatConfig, 'description')
        //del group
        this.delete = new Obj('span', ['deleteGroup', 'btn', 'material-symbols-outlined'], this.chatConfig, 'delete');
        this.delete.title = 'burn everything';
        this.delete.onclick = () => {
            if (confirm("deseja apagar este grupo?")) {
                this.chatElement.parentNode.removeChild(this.chatElement);
                this.chatConfig.parentNode.removeChild(this.chatConfig);
                this.groupThumbBtn.parentNode.removeChild(this.groupThumbBtn);
                chats.splice(this.id - 1, 1);
            }
        }
    }
    renameGroup() {
        this.thumbDiv.childNodes[1].nodeValue = this.groupThumbBtn.lastChild.nodeValue = this.name = this.rename.value;
        this.rename.value = this.rename.value.replace(/^\W+/, '');
        //
        fetch('/enviar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(dados =>{
            const objetoEncontrado = dados.find(objeto => objeto.id === this.id);
            if (objetoEncontrado) {
                fetch('/modificar-nome', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id: this.id, novoNome: this.rename.value}),
                })
                .then(response => response.text())
                .then(message => console.log(message))
                .catch(error => console.error('Erro ao enviar dados:', error));
            } else {
                console.error("Objeto não encontrado com o ID fornecido.");
            }
        })
        .catch(error => console.error('Erro ao enviar os dados:', error));
    }
    createMsg() {
        this.msgArea = new Obj('div', ['msgArea'], this.chatElement);
        //scroll to the bottom
        this.scrollToTheBottom = new Obj('span', ['scrollToTheBottom', 'material-symbols-outlined'], this.msgArea, 'arrow_drop_down');
        this.msgArea.onscroll = () => this.scrollToTheBottom.style.display = (this.msgArea.scrollTop < this.msgArea.scrollHeight - 800) ? "block" : "none";
        this.scrollToTheBottom.onclick = () => this.msgArea.scrollTop = this.msgArea.scrollHeight;
        //msgBallon
        this.msgBalloon = new Obj('textarea', ['msgBalloon'], this.chatElement);
        this.msgBalloon.placeholder = 'vontade de falar...';
        //
        this.msgBalloon.addEventListener('drop', e => {
            e.preventDefault();
            //this.msgBalloon.style.height = '200px';
            //this.msgBalloon.style.top = `calc(100% - 225px)`;
            for (const dataFile of e.dataTransfer.files) {
                this.msgs.push(new msg(this.msgBalloon.value, dataFile, new Date(), user, this));
            }
        });
        let keys = {};
        this.msgBalloon.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (keys['Enter'] && !keys['Shift']) {
                e.preventDefault();
                if (this.msgBalloon.value.replace(/^\s+/, "").replace(/[\u200E\s⠀ㅤ]/g, "") !== '') {
                    this.msgs.push(new msg(this.msgBalloon.value, null, new Date(), user, this));
                }
            }
        });
        this.msgBalloon.addEventListener('keyup', e => keys[e.key] = false);
        this.msgBalloon.addEventListener('paste', e => {
            for (const item of e.clipboardData.items) {
                if (item.type.indexOf('image/') !== -1) {
                    this.msgs.push(new msg(this.msgBalloon.value, item.getAsFile(), new Date(), user, this));
                }
            }
        });
    }
}
//criar chat
const groupCreator = document.getElementById('newGroupCreator');
const nameInput = document.getElementById('nameInput');
document.getElementById('add').onclick = () => {
    groupCreator.style.display = 'grid';
    groupCreator.style.left = `calc(50% - ${groupCreator.offsetWidth / 2}px)`;
    //
    nameInput.addEventListener("keydown", e => {
        if (nameInput.value.length > 16 && e.key !== "Backspace" && e.key !== 13 && e.key !== 37 && e.key !== 39 && e.key !== 9 && e.key !== 116 && nameInput.selectionStart == nameInput.selectionEnd) {
            e.preventDefault();
        }
    });
    nameInput.addEventListener("paste", e => {
        const clipboardData = e.clipboardData || window.Clipboard;
        if (clipboardData.getData("text").length + nameInput.value.length > 17) {
            e.preventDefault();
            alert('texto muito grande, você só tem mais ' + (17 - nameInput.value.length) + ' caracteres até o limite');
        }
    });
    nameInput.addEventListener('drop', e => e.preventDefault());
};
document.getElementById('createChatBtn').onclick = () => {
    if (nameInput.value.replace(/^\W+/, '') != '' && nameInput.value.length < 16) {
        let dado;  // Declare a variável fora do bloco .then()
        fetch('/enviar-dados', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(dados => {
            if (dados.length > 0) {
                dado = dados[dados.length - 1];
            }
        })
        .catch(error => console.error('Erro ao enviar os dados:', error))
        .finally(() => {
            if (dado) {
                chats.push(new chat(dado.id + 1, nameInput.value, '/img/newGroupImg.svg', [user,alunos[1]], [user], true));
                groupCreator.style.display = '';
                nameInput.value = '';
            }
        });
    }
}
class msg {
    constructor(content, file, time, owner, chat) {
        this.content = content.replace(/^\s+/, "").replace(/\u200E\s/g, "").replace(/\n/g, '<br>');
        this.file = file;
        this.time = time.getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');
        this.owner = owner;
        this.chat = chat;
        this.msgsLength = this.chat.msgs.length;
        this.createMsg();
        //scroll
        this.chat.msgArea.scrollTop = this.chat.msgArea.scrollHeight;
    }
    get getMessage() {
        return this.msg
    }
    createMsg() {
        this.chat.msgBalloon.value = '';
        this.msg = document.createElement('div');
        this.msg.classList.add('msg', 'sended');
        this.msg.translate = 'yes';
        //owner
        this.msgOwner = new Obj('p', ['msgOwner'], this.msg, `${this.owner.nome} ${this.owner.sobrenome}`);
        //filePlaceHolder
        this.filePlaceHolder = document.createElement('div');
        this.filePlaceHolder.style.padding = '5px 0';
        this.msg.appendChild(this.filePlaceHolder);
        //file
        if (this.file) {
            if (this.file.type == "text/html") {
                const htmlReader = new FileReader();
                htmlReader.readAsText(this.file);
                htmlReader.onload = e => {
                    this.htmlFileElement = new Obj('a', ['htmlFileBtn'], this.filePlaceHolder, this.file.name);
                    this.htmlFileElement.href = URL.createObjectURL(new Blob([e.target.result], { type: 'text/html' }));
                    this.htmlFileElement.target = '_blank';
                }
            } else if (this.file.type.startsWith('text/') || this.file.name.slice(-3) == '.md' || this.file.name.slice(-4) == '.jem') {
                const textReader = new FileReader();
                textReader.readAsText(this.file);
                textReader.onload = e => {
                    this.textFileElement = document.createElement('div');
                    this.textFileElement.innerHTML = e.target.result.replace(/\n/g, '<br>');
                    this.textFileElement.style.lineBreak = 'anywhere';
                    this.filePlaceHolder.appendChild(this.textFileElement);
                }
            } else if (this.file.type == "" || this.file.type.startsWith('application/')) { return } else {
                const reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = e => {
                    if (this.file.type.startsWith('image/')) {
                        this.msgImg = new Image();
                        this.msgImg.src = e.target.result;
                        this.filePlaceHolder.appendChild(this.msgImg);
                        this.msgImg.onclick = () => {
                            this.chat.imageOpened.style.backgroundImage = `url('${e.target.result}')`;
                            this.chat.imageOpened.style.display = 'flex';
                            this.chat.imageOpened.firstChild.onclick = () => this.chat.imageOpened.style.display = 'none';
                        }
                        //
                        this.filePlaceHolder.appendChild(document.createElement('div'));
                        this.filePlaceHolder.lastChild.classList.add('audioContextMenu');
                        this.filePlaceHolder.lastChild.innerText = this.file.name;
                        this.msgImg.addEventListener('contextmenu', () => {
                            this.filePlaceHolder.lastChild.style.display = 'flex';
                            this.filePlaceHolder.lastChild.style.top = `calc(50% - ${this.filePlaceHolder.lastChild.offsetHeight / 2}px)`
                        })
                    } else if (this.file.type.startsWith('video/')) {
                        this.msgVideo = new Obj('video', [], this.filePlaceHolder);
                        this.msgVideo.src = e.target.result;
                        this.msgVideo.load();
                        this.msgVideo.controls = true;
                    } else if (this.file.type.startsWith('audio/')) {
                        this.msgAudio = document.createElement('audio');
                        this.msgAudio.style.display = 'none';
                        //source
                        this.msgAudio.src = e.target.result;
                        this.msgAudio.load();
                        //audio display
                        this.audioDisplay = document.createElement('div');
                        this.audioDisplay.classList.add('audioDisplay');
                        this.audioDisplay.oncontextmenu = e => {
                            e.preventDefault();
                            this.audioContextMenu.style.display = 'flex';
                            this.audioContextMenu.addEventListener('mouseleave', () =>
                                this.audioContextMenu.style.display = 'none'
                            );
                        }
                        this.filePlaceHolder.appendChild(this.audioDisplay);
                        //audio Context Menu
                        this.audioContextMenu = document.createElement('div');
                        this.audioContextMenu.classList.add('audioContextMenu');
                        this.audioContextMenu.style.display = 'none';
                        this.audioDisplay.appendChild(this.audioContextMenu);
                        //download
                        this.audioDownload = new Obj('a', ['btn', 'material-symbols-outlined'], this.audioContextMenu, 'download');
                        this.audioDownload.href = this.msgAudio.src;
                        this.audioDownload.download = this.file.name;
                        this.audioDownload.onclick = () => {
                            this.audioDownload.innerText = 'download_done';
                            setTimeout(() => this.audioDownload.innerText = 'download', 3000);//modificar para quando o download for concluido (progress-stream node.js)
                        }
                        //loop
                        this.audioloop = new Obj('span', ['btn', 'material-symbols-outlined'], this.audioContextMenu, 'repeat_one');
                        //play/pause
                        this.audioPlayBtn = new Obj('span', ['btn', 'audioPlayBtn', 'material-symbols-outlined'], this.audioDisplay, 'play_arrow');
                        this.audioPlayBtn.onclick = () => {
                            switch (this.audioPlayBtn.innerText) {
                                case 'play_arrow':
                                    this.msgAudio.play();
                                    this.audioPlayBtn.innerText = 'pause';
                                    break;
                                case 'play_disabled':
                                    console.warn('erro ao reproduzir o audio!');
                                    break;
                                default:
                                    this.msgAudio.pause();
                                    this.audioPlayBtn.innerText = 'play_arrow';
                            }
                        };
                        //timeline
                        this.audioTimeline = new Obj('input', ['audioTimeline'], this.audioDisplay);
                        this.audioTimeline.type = 'range';
                        this.msgAudio.addEventListener('loadedmetadata', () => this.audioTimeline.max = this.msgAudio.duration * 100);
                        this.updateTime = false;
                        this.msgAudio.addEventListener('timeupdate', () => {
                            this.audioTimeline.onmousedown = () => this.updateTime = true;
                            if (this.updateTime) {
                                this.msgAudio.currentTime = this.audioTimeline.value / 100;
                                this.updateTime = false;
                            } else {
                                this.audioTimeline.value = this.msgAudio.currentTime * 100;
                            }
                        })
                        this.msgAudio.addEventListener('ended', () => {
                            setTimeout(() => {
                                this.audioTimeline.value = '0';
                                this.audioPlayBtn.innerText = 'play_arrow';
                            }, 100)
                        })
                        this.filePlaceHolder.appendChild(this.msgAudio);
                    }
                }
            }
        }
        //emails
        const emails = this.content.match(/\b[A-Za-z0-9._%+-ãçõ]+@[A-Za-z0-9.-ã]+\.[A-Za-z]{2,}\b/g);
        if (emails) {
            emails.forEach(
                email => this.content = this.content.replace(email, `<a href="mailto:${email}" title="enviar email" target="_blank">${email}</a>`)
            );
        }
        //links
        const links = this.content.match(/https?:\/\/\S+/gi);
        if (links) links.forEach(link => this.content = this.content.replace(link, link.link(link)));
        //data:img
        const getImg64 = this.content.match(/data:image\/\w+;base64,([\w+/=]+)/);
        if (getImg64) {
            const img64Innert = new Image();
            img64Innert.src = `data:image/png;base64,${getImg64[1]}`;
            this.content = this.content.replace(getImg64[1], img64Innert.outerHTML);
        }
        //text decorations
        const formatRules = [
            { regex: /(\*)(.*?)(\*)/g, tag: 'strong' },
            { regex: /(\%)(.*?)(\%)/g, tag: 'i' },
            { regex: /(\--)(.*?)(\--)/g, tag: 'a', style: 'text-decoration: line-through 2px;' }
        ];
        for (const rule of formatRules) {
            this.content = this.content.replace(rule.regex, (match, p1, p2, p3) => {
                let leadingSpace = p2.startsWith(' ') ? '&nbsp;' : '';
                let trailingSpace = p2.endsWith(' ') ? '&nbsp;' : '';
                p2 = p2.trim().replace(/\s+/g, ' '); // Substitui múltiplos espaços por um único espaço
                return `<${rule.tag} ${rule.style ? `style='${rule.style}'` : ''}>${leadingSpace}${p2}${trailingSpace}</${rule.tag}>`;
            });
        }
        //bad words
        let bannedWordsRegex = new RegExp(this.chat.bannedWords.join("|"), "gi");
        this.content = sinonimos(binaryToText(this.content)).replace(bannedWordsRegex, matchedWord => '*'.repeat(matchedWord.length));
        //Text Content
        this.msgTextContent = new Obj('a', ['msgTextContent'], this.msg);
        this.msgTextContent.innerHTML = this.content;
        this.msgDate = new Obj('p', ['msgDate'], this.msg, this.time);
        this.chat.msgArea.appendChild(this.msg);
    }
}
let ldpalavrões = {
    'A': new Set(["λ", "Ꜳ", "ɋ", "∀", "Α", "α", "Δ", "∆", "Λ", "λ", "Ἃ", "Ἇ", "ά", "ᾰ", "Ᾰ", "Ά", "₳", "𝔞", "𝕒", "𝖆", "𝚊", "𝒶", "𝓪", "𝓪", "ᗩ", "ᴀ", "ᥲ", "ᵃ", "ɐ", "𝐚", "𝒂", "𝖺", "𝗮", "𝘢", "𝙖", "a̲", "a̳", "a̶", "a̷", "a͎", "a̾", "ⓐ", "🄰", "🅐", "🅰"]),
    'B': new Set(["฿", "₿", "Β", "β", "ᙠ"]),
    'C': new Set(["ɔ", "©", "℃", "Ⅽ", "ↅ", "Ↄ", "ⅽ", "⊑", "⊂", "⊏", "⊐", "⊉", "⊆", "⊇", "⊊", "⊋", "∁", "ↄ", "Ↄ", "⊈", "⋤", "⋥", "ς", "₡", "¢", "₠"]),
    'D': new Set(["Ⅾ", "Đ", "Ð", "đ", "₫"]),
    'E': new Set(["é", "£", "Ɛ", "∃", "∄", "∈", "∋", "Ě", "Ĕ", "⋻", "⋸", "⋵", "⋲", "⋳", "⋶", "⋹", "⋿", "Ε", "ε", "Ἓ", "Ἕ", "ὲ", "έ", "Έ", "έ", "Σ", "϶", "ϵ", "ξ", "₠", "€"]),
    'F': new Set(["℉", "₣", "ℱ", "Ꞙ", "ꝼ", "ⅎ", "ꜰ", "ꟻ"]),
    'G': new Set(["Ĝ", "Ğ", "Ģ", "ℊ", "ǥ", "ģ", "ĝ", "ğ", "₲", "Ḡ", "Ǧ", "ǧ"]),
    'H': new Set(["Ħ", "ħ", "ɧ", "ɦ", "Η", "ⱨ"]),
    'I': new Set(["ⅾ", "¡", "Ι", "ι", "ⅰ", "Ⅰ", "∣"]),
    'J': new Set(["ȷ", "ʝ", "ɉ", "ʲ", "ʆ ", "ʄ"]),
    'K': new Set(["ĸ", "Κ", "κ", "₭", "Ⲕ"]),
    'L': new Set(["|", "Ⅼ", "∟"]),
    'M': new Set(["Ⅿ", "ⅿ", "ɱ", "Σ", "Μ", "ℳ", "₥", "Ṃ", "Ṁ"]),
    'N': new Set(["Ν", "₦", "η"]),
    'O': new Set(["ʘ", "◯", "⊘", "⊙", "⊖", "⊜", "⊛", "⊕", "⨀", "⨁", "Ø", "Ο", "ο", "ϴ", "Ὸ", "Ό", "ὁ", "Ὁ", "Φ", "σ", "φ", "ὄ", "Ὄ", "Ὂ", "ὂ"]),
    'P': new Set(["℗", "₱", "₽", "Ρ", "ρ"]),
    'Q': new Set(["ℚ", "Ɋ", "ʠ"]),
    'R': new Set(["Π", "π", "®"]),
    'S': new Set(["§", "₷", "$"]),
    'T': new Set(["⊥", "⊤", "⊢", "⊣", "Τ", "τ"]),
    'U': new Set(["⋃", "⋂", "⊔", "⊍", "⊌", "⊎", "⨃", "⨄", "υ", "Ω", "ύ", "Ὧ", "ᾩ", "ᾭ", "Ὣ", "μ"]),
    'V': new Set(["ν", "ν", "ѵ", "Ѵ", "∨", "√", "ⱱ", "ṿ"]),
    'W': new Set(["₩", "ὣ", "ῳ"]),
    'X': new Set(["Ⅹ", "⨉", "Χ"]),
    'Y': new Set(["γ", "Ψ", "Ὑ", "Υ"]),
    'Z': new Set(["Ζ", "₴"]),
    ' ': new Set(["⠀", "ㅤ", "￿"]),
    '2': new Set(['ƻ'])
};
function sinonimos(synonyms) {
    return synonyms.split('').map(synonym => {
        let lowerCaseSynonym = synonym.toLowerCase();
        for (let letter in ldpalavrões) {
            if (ldpalavrões[letter].has(lowerCaseSynonym)) return letter;
        }
        return synonym; // retorna o sinônimo original se não for encontrado
    }).join('');
};
function binaryToText(str) {
    if (/^(?=.*(\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d))[01\s]*$/.test(str)) {
        return str.split(' ').map((bin) => {
            return String.fromCharCode(parseInt(bin, 2));
        }).join('');
    } else return str
};