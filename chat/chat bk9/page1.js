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
document.addEventListener("DOMContentLoaded", () => {
    const configBtn = document.getElementById('settings');
    const settings = document.getElementById("settingsMenu");
    function rotateButton(deg) {
        return function() {
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
})
class Element {
    constructor(elementType, customClass, father) {
        this.customClass = customClass;
        this.father = father;
        this.elementType = elementType;
        this.build();
    }
    build() {
        this._element = document.createElement(this.elementType);
        this._element.classList.add(...this.customClass);
        this.father.appendChild(this._element);
    }
    get element() {
        return this._element;
    }
}
//remover e usar `new Element()` e o modulo "material-icons@latest"
class googleIcon {
    constructor(iconType, classes, apply) {
        this.iconType = iconType;
        this.classes = classes;
        this.apply = apply;
        this.build();
    }
    build() {
        this.element = document.createElement('span');
        this.element.classList.add('material-symbols-outlined', ...this.classes)
        this.element.innerText = this.iconType;
        this.apply.appendChild(this.element)
    }
    get ico() {
        return this.element;
    }
}
let off = null;
//classes
class Aluno {
    constructor(nome, sobrenome, img, email, serie, Chamada, turma, ensino) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.img = img;
        this.email = email;
        this.serie = serie;
        this.Chamada = Chamada;
        this.turma = turma;
        this.local = serie + turma;
        this.ensino = ensino;
    }
}
const Zeulo = new Aluno('Leonardo', 'Nogueira', 'img/user.svg', 'leonardo.rennó@colegiodante.org.br', '8°', '13', 'A', 'E. Fund.2');
const alunos = []
for (let i = 0; i < 4; i++) { //get in database
    alunos.push(new Aluno('name' + i, 'sobrenome', 'img/user.svg', 'nome.sobrenome@colegiodante.org.br', 'ano', 'n°', 'turma', 'ensino'))
}
class chat {
    constructor(id, name, thumb, guests, bannedWords, adm) {
        this.id = id;
        this.name = name;
        this.thumb = thumb;
        this.guests = guests;
        this.bannedWords = bannedWords;
        this.onBannedWordsLoaded = () => { };
        this.getBannedWords();
        this.adm = adm;
        this.createChat();
        this.createChatConfigs();
        this.createThumb();
        this.createMsg();
        this.msgs = [];
    }
    async getBannedWords() {
        try {
            const response = await fetch('banned_words.json');
            const data = await response.json();
            this.bannedWords = data;
            this.onBannedWordsLoaded(); // Acione o evento quando os dados forem carregados
        } catch (error) {
            console.error('Erro:', error);
        }
    }
    createChat() {
        //banidas por padrão
        this.onBannedWordsLoaded = () => console.log(this.bannedWords);
        //
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat', 'chatMenu');
        document.body.appendChild(this.chatElement);
        this.chatElement.addEventListener('contextmenu',e => e.preventDefault());
        //thumb
        this.thumbDiv = document.createElement('div');
        this.thumbDiv.classList.add('thumbDiv');
        this.chatElement.appendChild(this.thumbDiv);
        //thumbPicture
        this.thumbPicture = new Image();
        this.thumbPicture.src = this.thumb;
        this.thumbPicture.classList.add('thumbPicture');
        this.thumbDiv.appendChild(this.thumbPicture);
        this.thumbDiv.innerHTML += this.name;
        //pesquisar
        this.searchOnGroupBtn = new googleIcon('search', ['btn', 'searchOnGroupBtn'], this.thumbDiv);
        //Pesquisar input
        this.searchOnGroupInput = new Element('input', ['searchOnGroupInput'], this.searchOnGroupBtn.ico);
        this.searchOnGroupInput.element.placeholder = 'pesquisar...';
        //search action
        this.searchOnGroupBtn.ico.onclick = () => {
            this.searchOnGroupInput.element.style.width = this.thumbDiv.offsetWidth / 6 + 'px';
            this.searchOnGroupInput.element.focus();
            document.onclick = () =>
                this.searchOnGroupInput.element.style.width = (
                    document.activeElement !== this.searchOnGroupInput.element && this.searchOnGroupInput.element.value == ''
                ) ? null : this.thumbDiv.offsetWidth / 5 + 'px';
        }
        this.searchOnGroupInput.element.addEventListener('keydown', e => {
            if (e.key == 'Enter') {
                e.preventDefault();
                this.msgs.forEach(msg => {
                    if (msg.content) {
                        //verificar se o input !== '' && conteudo da mensagem ~=(70%) input
                        msg.getMessage.style.display = (
                            [...msg.content].filter((char, index) => char == this.searchOnGroupInput.element.value.charAt(index)).length / msg.content.length < 0.7 && this.searchOnGroupInput.element.value !== ''
                        ) ? 'none' : 'block';
                    }
                })
            }
        })
        //video call
        this.call = new googleIcon('videocam', ['btn','videoCam'], this.thumbDiv);
        this.call.ico.onclick = () => {
            console.warn('não finalizado!')
        }
        this.imageOpened = new Element('div', ['imageOpened'], this.chatElement);
        new googleIcon('close', ['btn'], this.imageOpened.element);
    }
    createChatConfigs() {
        this.chatConfigBtn = new googleIcon('more_vert', ['btn','groupInfo'], this.thumbDiv)
        // Adicionar o elemento ao corpo do documento
        this.chatConfigBtn.ico.onclick = () => {
            this.chatElementConfigs.style.display = 'grid';
            this.chatElement.style.display = 'none';
        }
        //
        this.chatElementConfigs = document.createElement('div');
        this.chatElementConfigs.classList.add('chatConfigs', 'chatMenu');
        document.body.appendChild(this.chatElementConfigs);
        //back BTN
        this.createConfigsBackBtn();
        //rename & img thumb
        this.editGroup();
        //guestList
        this.createGuestList();
        //banned words
        this.createBanWordList();
    }
    createThumb() {
        const contatosMenu = document.getElementById('contatos');
        this.groupThumbBtn = new Element('button', ['groupThumbBtn'], contatosMenu);
        this.groupThumbBtn.element.tabIndex = 0;
        //
        this.groupThumbBtnImg = new Image();
        this.groupThumbBtnImg.src = this.thumb;
        this.groupThumbBtnImg.alt = this.id + ' picture';
        this.groupThumbBtn.element.appendChild(this.groupThumbBtnImg);
        this.groupThumbBtn.element.innerHTML += this.name;
        //
        this.groupThumbBtn.element.onclick = () => {
            document.querySelectorAll('.chat, .chatConfigs').forEach(elemento => elemento.style.display = 'none');
            this.chatElement.style.display = 'grid';
            //thumb
            document.querySelectorAll('.groupThumbBtn').forEach(thumbE => thumbE.style.background = '');
            this.groupThumbBtn.element.style.background = '#0000002b';
        }
        contatosMenu.scrollTop = contatosMenu.scrollHeight;
    }
    createConfigsBackBtn() {
        this.back = new googleIcon('arrow_back_ios', ['btn'], this.chatElementConfigs)
        this.back.ico.style.position = 'absolute';
        this.back.ico.style.padding = '15px';
        this.back.ico.onclick = () => {
            this.chatElementConfigs.style.display = 'none';
            this.chatElement.style.display = 'grid';
        }
    }
    guestListFunction() {
        this.guests.forEach(guest => {
            const guestInList = new Element('div', ['guestInList'], this.guestList.element);
            guestInList.element.innerText = guest.nome + ' ' + guest.sobrenome;
            guestInList.element.addEventListener('contextmenu', e => {
                e.preventDefault();
                guestInfoMenu.element.style.display = 'flex';
                guestInfoMenu.element.addEventListener('mouseleave', () => {
                    guestInfoMenu.element.style.display = 'none';
                });
            });
            const guestInfoMenu = new Element('div', ['guestInfoMenu'], guestInList.element);
            const guestInfoMenu1Topic = document.createElement('a');
            guestInfoMenu.element.appendChild(guestInfoMenu1Topic);

            const guestInfoMenuImg = new Image();
            guestInfoMenuImg.src = guest.img;
            guestInfoMenu1Topic.appendChild(guestInfoMenuImg);

            const guestInfoMenuName = document.createElement('p');
            guestInfoMenuName.innerText = `${guest.nome} ${guest.sobrenome}`;
            guestInfoMenu1Topic.appendChild(guestInfoMenuName);
            //email
            const guestInfoMenuEmail = document.createElement('p');
            guestInfoMenuEmail.innerText = guest.email;
            guestInfoMenuEmail.title = 'clique para copiar';
            guestInfoMenuEmail.onclick = () => {
                try {
                    navigator.clipboard.writeText(guest.email);
                } catch (err) {
                    console.error('Erro ao copiar texto: ', err);
                }
            }
            guestInfoMenu.element.appendChild(guestInfoMenuEmail);

            const guestInListImg = new Image();
            guestInListImg.src = guest.img;
            guestInList.element.appendChild(guestInListImg);
            //remove guest
            const removeGuest = new Element('p', ['removeGuest'], guestInfoMenu);
            removeGuest.element.innerText = 'x';
            removeGuest.element.title = 'remover';
            removeGuest.element.onclick = () => {
                console.warn('remover usuario')
            }
            const guestInfoMenuAdm = new Element('p', ['tornarAdm'], guestInfoMenu);
            guestInfoMenuAdm.element.innerText = (this.adm.includes(guest)) ? 'remove adm' : 'add adm';
            guestInfoMenuAdm.element.onclick = () => {
                console.warn('tornar adm')
            }
        })
    }
    createGuestList() {
        this.guestList = new Element('div', ['guestList'], this.chatElementConfigs)
        this.guestList.element.innerHTML = '<h3>guests</h3>';
        this.guestListFunction()
        //guestList add btn
        this.addGuest = new googleIcon('person_add', ['guestInList', 'btn'], this.guestList.element)
        this.addGuest.ico.onclick = () => {
            this.newGuestMenu.element.style.display = 'flex';
        }
        this.addGuestMenu();
    }
    addGuestMenu() {
        this.newGuestMenu = new Element('div', ['newGuestMenu'], this.chatElementConfigs)
        //closeNewGuestMenu
        this.closeNewGuestMenu = new googleIcon('close', ['btn', 'closeBtn'], this.newGuestMenu.element);
        this.closeNewGuestMenu.ico.onclick = () => {
            this.newGuestMenu.element.style.display = 'none';
        }
        this.addNewGuestTitle = new Element('h2', [], this.newGuestMenu.element);
        this.addNewGuestTitle.element.innerText = 'add guests';
        //add
        this.guestsToAdd = new Element('div', ['guestsToAdd'], this.newGuestMenu.element);
        alunos.forEach(aluno => {
            const add = new googleIcon('add', ['btn'], this.guestsToAdd.element);
            add.ico.innerHTML += `<a style='font-family: "Roboto";'>${aluno.nome}</a>`;
            add.ico.onclick = () => {
                this.guests.push(aluno)
                this.guestListFunction() //corrigir bugs
            }
        })
    }
    editGroup() {
        //edit group img
        this.img = new Image();
        this.img.classList.add('GroupImg');
        this.img.src = this.thumb;
        this.chatElementConfigs.appendChild(this.img);
        //
        this.imgInput = document.createElement('input');
        this.imgInput.type = 'file';
        this.imgInput.accept = "image/*";
        this.imgInput.style.display = 'none';
        this.chatElementConfigs.appendChild(this.imgInput);
        //click event
        this.img.onclick = () => this.imgInput.click();
        this.imgInput.addEventListener('change', e => {
            if (e.target.files[0].type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    const imageDataURL = reader.result;
                    this.thumb = imageDataURL;
                    this.img.src = this.thumb;
                    this.groupThumbBtnImg.src = this.thumb;
                    this.thumbPicture.src = this.thumb;
                    fetch(imageDataURL)
                        .then(response => response.blob())
                        .then(blob => createImageBitmap(blob))
                        .then(imageBitmap => {
                            const width = imageBitmap.width;
                            const height = imageBitmap.height;
                            this.img.style.imageRendering = (width <= 256 && height <= 256) ? "pixelated" : "unset";
                            this.groupThumbBtnImg.style.imageRendering = (width <= 256 && height <= 256) ? "pixelated" : "unset";
                            this.thumbPicture.style.imageRendering = (width <= 256 && height <= 256) ? "pixelated" : "unset";
                        });
                }
            } else {
                alert(selectedFile.name + ' não é uma imagem suportada!');
            }
        })
        //rename group
        this.rename = new Element('textarea', ['renameGroup'], this.chatElementConfigs)
        this.rename.element.spellcheck = false;
        this.rename.element.placeholder = 'rename';
        this.rename.element.value = this.name;
        this.rename.element.addEventListener("paste", e => {
            const clipboardData = e.clipboardData || window.Clipboard;
            if (clipboardData.getData("text").length + this.rename.element.value.length > 17) {
                e.preventDefault();
                alert('texto muito grande, você só tem mais ' + (17 - this.rename.element.value.length) + ' caracteres até o limite');
            }
        });
        this.rename.element.addEventListener("keydown", e => {
            if (this.rename.element.value.length > 16 && e.key !== "Backspace" && e.key !== 13 && e.key !== 37 && e.key !== 39 && e.key !== 9 && e.key !== 116 && this.rename.selectionStart == this.rename.selectionEnd) {
                e.preventDefault();
            }
            if (e.key == "Enter") {
                e.preventDefault();
                if (this.rename.element.value.replace(/^\W+/, '') !== '') {
                    this.renameGroup();
                }
            }
        });
        this.rename.element.onblur = () => {
            if (this.rename.element.value.replace(/^\W+/, '') !== '') {
                this.renameGroup();
            } else {
                this.rename.element.value = this.name;
            }
        }
        //del group
        this.delete = new googleIcon('delete', ['deleteGroup', 'btn'], this.chatElementConfigs);
        this.delete.ico.title = 'burn every thing';
        this.delete.ico.onclick = () => {
            if (confirm("deseja apagar este grupo?")) {
                this.chatElement.parentNode.removeChild(this.chatElement);
                this.chatElementConfigs.parentNode.removeChild(this.chatElementConfigs);
                this.groupThumbBtn.element.parentNode.removeChild(this.groupThumbBtn.element);
                chats.splice(this.id - 1, 1);
                if (!document.getElementById('contatos').hasChildNodes()) {
                    off = new googleIcon('public_off', [], document.getElementById('contatos'))
                }
            }
        }
    }
    renameGroup() {
        this.thumbDiv.childNodes[1].nodeValue = this.groupThumbBtn.element.lastChild.nodeValue = this.name = this.rename.element.value;
        this.rename.element.value = this.rename.element.value.replace(/^\W+/, '');
    }
    createBanWordList() {
        this.banWordList = new Element('textarea', ['banWordList'], this.chatElementConfigs)
        this.banWordList.element.placeholder = 'bad words';
        this.banWordList.element.addEventListener('input', () => this.banWordList.element.value = this.banWordList.element.value.replace(/[ ,.;]/g, this.banWordList.element.value.replace(/ /g, "") !== "" ? "\n" : ""))
    }
    createMsg() {
        this.msgArea = new Element('div', ['msgArea'], this.chatElement);
        //scroll to the bottom
        this.scrollToTheBottom = new googleIcon('arrow_drop_down', ['scrollToTheBottom'], this.msgArea.element);
        this.msgArea.element.onscroll = () => this.scrollToTheBottom.ico.style.display = (this.msgArea.element.scrollTop < this.msgArea.element.scrollHeight - 800) ? "block" : "none";
        this.scrollToTheBottom.ico.onclick = () => this.msgArea.element.scrollTop = this.msgArea.element.scrollHeight;
        //msgBallon
        this.msgBalloon = new Element('textarea', ['msgBalloon'], this.chatElement);
        this.msgBalloon.element.placeholder = 'vontade de falar...';
        //
        this.msgBalloon.element.addEventListener('drop', e => {
            e.preventDefault();
            //this.msgBalloon.element.style.height = '200px';
            //this.msgBalloon.element.style.top = `calc(100% - 225px)`;
            for (const dataFile of e.dataTransfer.files) {
                this.msgs.push(new msg(this.msgBalloon.element.value, dataFile, new Date(), Zeulo, this));
            }
        });
        let keys = {};
        this.msgBalloon.element.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (keys['Enter'] && !keys['Shift']) {
                e.preventDefault();
                if (this.msgBalloon.element.value.replace(/^\s+/, "").replace(/[\u200E\s⠀ㅤ]/g, "") !== '') {
                    this.msgs.push(new msg(this.msgBalloon.element.value, null, new Date(), Zeulo, this));
                }
            }
        });
        this.msgBalloon.element.addEventListener('keyup', e => keys[e.key] = false);
        this.msgBalloon.element.addEventListener('paste', e => {
            for (const item of e.clipboardData.items) {
                if (item.type.indexOf('image/') !== -1) {
                    this.msgs.push(new msg(this.msgBalloon.element.value, item.getAsFile(), new Date(), Zeulo, this));
                }
            }
        });
    }
}
//criar chat
const chats = [];
document.getElementById('add').onclick = () => {
    chats.push(new chat(chats.length + 1, `chat ${chats.length + 1}`, 'img/newGroupImg.svg', [], null, null));
    if (off !== null) {
        off.ico.parentNode.removeChild(off.ico);
        off = null
    }
};
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
        this.chat.msgArea.element.scrollTop = this.chat.msgArea.element.scrollHeight;
    }
    get getMessage() {
        return this.msg
    }
    createMsg() {
        this.chat.msgBalloon.element.value = '';
        this.msg = document.createElement('div');
        this.msg.classList.add('msg','sended');
        this.msg.translate = 'yes';
        //owner
        this.msgOwner = document.createElement('p');
        this.msgOwner.classList.add('msgOwner');
        this.msgOwner.innerText = `${this.owner.nome} ${this.owner.sobrenome}`;
        this.msg.appendChild(this.msgOwner);
        //filePlaceHolder
        this.filePlaceHolder = document.createElement('div');
        this.filePlaceHolder.style.padding = '5px 0';
        this.msg.appendChild(this.filePlaceHolder);
        //file
        if (this.file) {
            if (this.file.type == "text/html") {
                const htmlReader = new FileReader();
                htmlReader.readAsText(this.file);
                htmlReader.onload = (e) => {
                    const blob = new Blob([e.target.result], { type: 'text/html' });
                    const url = URL.createObjectURL(blob);
                    this.htmlFileElement = document.createElement('a');
                    this.htmlFileElement.innerHTML = this.file.name;
                    this.htmlFileElement.href = url;
                    this.htmlFileElement.target = '_blank';
                    this.htmlFileElement.classList.add('htmlFileBtn');
                    this.filePlaceHolder.appendChild(this.htmlFileElement);
                }
            } else if (this.file.type.startsWith('text/') || this.file.name.slice(-3) == '.md' || this.file.name.slice(-4) == '.jem') {
                const textReader = new FileReader();
                textReader.readAsText(this.file);
                textReader.onload = (e) => {
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
                            this.chat.imageOpened.element.style.backgroundImage = `url('${e.target.result}')`;
                            this.chat.imageOpened.element.style.display = 'flex';
                            this.chat.imageOpened.element.firstChild.onclick = () => this.chat.imageOpened.element.style.display = 'none';
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
                        this.msgVideo = document.createElement('video');
                        this.msgVideo.src = e.target.result;
                        this.msgVideo.load();
                        this.msgVideo.controls = true;
                        this.filePlaceHolder.appendChild(this.msgVideo);
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
                            this.audioContextMenu.addEventListener('mouseleave', () => {
                                this.audioContextMenu.style.display = 'none';
                            });
                        }
                        this.filePlaceHolder.appendChild(this.audioDisplay);
                        //audio Context Menu
                        this.audioContextMenu = document.createElement('div');
                        this.audioContextMenu.classList.add('audioContextMenu');
                        this.audioContextMenu.style.display = 'none';
                        this.audioDisplay.appendChild(this.audioContextMenu);
                        //download
                        this.audioDownload = new googleIcon('download', ['btn'], this.audioContextMenu);
                        this.audioDownload.ico.href = this.msgAudio.src;
                        this.audioDownload.ico.download = this.file.name;
                        this.audioDownload.ico.onclick = () => {
                            this.audioDownload.ico.innerText = 'download_done';
                            setTimeout(() => {
                                this.audioDownload.ico.innerText = 'download';
                            }, 3000)
                        }
                        //loop
                        this.audioloop = new googleIcon('repeat_one', ['btn'], this.audioContextMenu)
                        //play/pause
                        this.audioPlayBtn = new googleIcon('play_arrow', ['btn', 'audioPlayBtn'], this.audioDisplay)
                        this.audioPlayBtn.ico.onclick = () => {
                            if (this.audioPlayBtn.ico.innerText == 'play_arrow') {
                                this.msgAudio.play();
                                this.audioPlayBtn.ico.innerText = 'pause';
                            } else {
                                this.msgAudio.pause();
                                this.audioPlayBtn.ico.innerText = 'play_arrow';
                            }
                        }
                        //timeline
                        this.audioTimeline = document.createElement('input');
                        this.audioTimeline.classList.add('audioTimeline');
                        this.audioTimeline.type = 'range';
                        this.audioTimeline.min = '1';
                        this.audioTimeline.value = '1';
                        this.msgAudio.addEventListener('loadedmetadata', () => {
                            this.audioTimeline.max = this.msgAudio.duration * 100;
                        })
                        this.updateTime = false;
                        this.msgAudio.addEventListener('timeupdate', () => {
                            this.audioTimeline.onclick = () => {
                                this.updateTime = true;
                            };
                            if (this.updateTime) {
                                this.msgAudio.currentTime = this.audioTimeline.value / 100;
                                this.updateTime = false;
                                //async
                            } else {
                                this.audioTimeline.value = this.msgAudio.currentTime * 100;
                            }
                        })
                        this.msgAudio.addEventListener('ended', () => {
                            setTimeout(() => {
                                this.audioTimeline.value = '1';
                                this.audioPlayBtn.innerText = 'play_arrow';
                            }, 100)
                        })
                        this.audioDisplay.appendChild(this.audioTimeline);
                        //
                        this.msgAudio.controls = true;
                        this.filePlaceHolder.appendChild(this.msgAudio);
                    }
                }
            }
        }
        //emails
        function detectarEmail(texto) {
            const emailsEncontrados = texto.match(/\b[A-Za-z0-9._%+-ãçõ]+@[A-Za-z0-9.-ã]+\.[A-Za-z]{2,}\b/g);
            return emailsEncontrados;
        }
        const emails = detectarEmail(this.content);
        if (emails) {
            emails.forEach(email => {
                const amails = `<a href="mailto:${email}" title="enviar email" target="_blank">${email}</a>`;
                const subamails = this.content.replace(email, amails);
                this.content = subamails;
            });
        }
        //links
        const links = this.content.match(/https?:\/\/\S+/gi);
        if (links) {
            links.forEach(link => this.content = this.content.replace(link, link.link(link)));
        }
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
                console.log(`"${p1}","${p2}","${p3}" --> ${match}`)
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
        this.msgTextContent = document.createElement('a');
        this.msgTextContent.classList.add('msgTextContent');
        this.msgTextContent.innerHTML = this.content;
        this.msg.appendChild(this.msgTextContent);
        this.msgDate = document.createElement('p');
        this.msgDate.classList.add('msgDate');
        this.msgDate.innerText = this.time;
        this.msg.appendChild(this.msgDate);
        this.chat.msgArea.element.appendChild(this.msg);
    }
}
let ldpalavrões = {
    'A': new Set(["λ", "Ꜳ", "ɋ", "@", "∀", "Α", "α", "Δ", "∆", "Λ", "λ", "Ἃ", "Ἇ", "ά", "ᾰ", "Ᾰ", "Ά", "₳", "𝔞", "𝕒", "𝖆", "𝚊", "𝒶", "𝓪", "𝓪", "ᗩ", "ᴀ", "ᥲ", "ᵃ", "ɐ", "𝐚", "𝒂", "𝖺", "𝗮", "𝘢", "𝙖", "a̲", "a̳", "a̶", "a̷", "a͎", "a̾", "ⓐ", "🄰", "🅐", "🅰"]),
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
    '1': new Set([]),
    '2': new Set(['ƻ'])
};
function sinonimos(synonyms) {
    return synonyms.split('').map(synonym => {
        let lowerCaseSynonym = synonym.toLowerCase();
        for (let letter in ldpalavrões) {
            if (ldpalavrões[letter].has(lowerCaseSynonym)) {
                return letter;
            }
        }
        return synonym; // retorna o sinônimo original se não for encontrado
    }).join('');
};
//Ρπὂǥπάℳ!₦ǥ
function binaryToText(str) {
    if (/^(?=.*(\d.*\d.*\d.*\d.*\d.*\d.*\d.*\d))[01\s]*$/.test(str)) {
        return str.split(' ').map(function (bin) {
            return String.fromCharCode(parseInt(bin, 2));
        }).join('');
    } else {
        return str
    }
};
/*corrigir:
/n --> pula uma linha, e quando colado no nome do grupo faz com que este bug

ao criar um novo chat, antes de carregar a imagem dos chats já existentes (tela de configurações), a imagem aparece com as propriedades de altura e largura como "0"

ao usar o atalho ctrl+"+" e ctrl+"-", a imagem do grupo (tela de configurações), o elemento aumenta de tamando, ocupando mais do que o espaço disponivel na pagina

algumas letras são substituidas por outras no envio de mensagens, exemplo: "Ç" --> "C" || "é" --> "E"

ao usar "**" em uma mensagem, uma mensagem sem conteudo é enviada
*/