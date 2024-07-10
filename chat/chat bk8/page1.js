window.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        openSettings()
    }
});
//ICO e BTN
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

let callSounds = [
    new Audio('sound/call/Error.wav'),
    new Audio('sound/call/connected.mp3')
]
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
        this.adm = adm;
        this.createChat();
        this.createChatConfigs();
        this.createThumb();
        this.createMsg();
        this.msgs = [];
    }
    createChat() {
        //banidas por padrão
        this.bannedWords = ['MERDA','BUCETA','CU','FDP','PORRA','CARALHO','CACETE','CACETA','PUTA','NAZISTA','NAZI','HITLER','NIGGER','CRIOLO','SE MATA','TE COME']
        //
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat', 'chatMenu');
        document.body.appendChild(this.chatElement);
        this.chatElement.oncontextmenu = e => e.preventDefault();
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
            this.searchOnGroupInput.element.style.width = this.thumbDiv.offsetWidth / 5 + 'px';
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
        this.call = new googleIcon('videocam', ['btn'], this.thumbDiv)
        this.call.ico.onclick = () => {
            console.warn('não finalizado!')
        }
        this.imageOpened = new Element('div',['imageOpened'],this.chatElement);
        new googleIcon('close',['btn'],this.imageOpened.element);
    }
    createChatConfigs() {
        this.chatConfigBtn = new googleIcon('more_vert', ['btn'], this.thumbDiv)
        //ChatConfigsBtn style
        this.chatConfigBtn.ico.style.color = 'white';
        this.chatConfigBtn.ico.style.borderRadius = '0.5rem';
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
            this.groupThumbBtn.element.style.background = '#00000059';
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
        this.img.onclick = () => {
            this.imgInput.click();
        }
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
            for (const dataFile of e.dataTransfer.files) {
                this.msgs.push(new msg(this.msgBalloon.element.value, dataFile, new Date(), Zeulo, this));
            }
        });
        let keys = {};
        this.msgBalloon.element.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (keys['Enter'] && !keys['Shift']) {
                e.preventDefault();
                if (this.msgBalloon.element.value.replace(/^\s+/, "").replace(/\u200E\s/g, "") !== '') {
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
document.getElementById('settings').addEventListener('click', () => openSettings());
function openSettings() {
    const settings = document.getElementById('settingsMenu');
    settings.style.top = '0%';
    document.getElementById('closeSettings').onclick = () => settings.style.top = '100%';
} 
/*corrigir:
/n --> pula uma linha, e quando colado no nome do grupo faz com que este bug

ao criar um novo chat, antes de carregar a imagem dos chats já existentes (tela de configurações), a imagem aparece com as propriedades de altura e largura como "0"

ao usar o atalho ctrl+"+" e ctrl+"-", a imagem do grupo (tela de configurações), o elemento aumenta de tamando, ocupando mais do que o espaço disponivel na pagina

algumas letras são substituidas por outras no envio de mensagens, exemplo: "Ç" --> "C" || "é" --> "E"
*/