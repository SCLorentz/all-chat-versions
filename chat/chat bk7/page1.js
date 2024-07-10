window.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      openSettings()
    }
});

var db = openDatabase("Teste", "1.0", "Teste Web SQL Database", 200000);
console.log(db);
if (!db) {
    alert('deu pau!');
}
db.transaction(function (transaction) {
    var sql = "CREATE TABLE IF NOT EXISTS Teste (id TEXT, name TEXT)";
    transaction.executeSql(
        sql,
        [],
        function (_transaction, result) {
            console.log(result);
        },
        function (_transaction, error) {
            console.log(error);
        }
    );
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
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM Teste WHERE id = ?', [this.id], (_, results) => {
                    if (results.rows.length == 0) {
                        db.transaction((transaction) => {
                            var registros = [
                                [this.id, this.name],
                            ];
                            registros.forEach(registro => {
                                transaction.executeSql(
                                    "INSERT INTO Teste (id, name) VALUES (?, ?)",
                                    registro,
                                    (_, error) => {
                                        console.log('Erro na inserção!');
                                        console.log(error);
                                        return true; // para rolar para trás a transação
                                    }
                                );
                            })
                        });
                    }
                }, (_, error) => {
                    console.log('Erro na seleção!');
                    console.log(error);
                    return true; // para rolar para trás a transação
                }
            )
        })
        //
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat', 'chatMenu');
        this.chatElement.style.display = 'none';
        document.body.appendChild(this.chatElement);
        this.chatElement.oncontextmenu = e => {
            e.preventDefault();
        }
        //thumb
        this.thumbDiv = document.createElement('div');
        this.thumbDiv.classList.add('thumbDiv');
        this.chatElement.appendChild(this.thumbDiv);
        //thumbPicture
        this.thumbPicture = new Image();
        this.thumbPicture.src = this.thumb;
        this.thumbPicture.classList.add('thumbPicture');
        this.thumbDiv.appendChild(this.thumbPicture);
        //thumbName
        this.thumbName = document.createElement('h2');
        this.thumbName.style.margin = '0 10px';
        this.thumbName.innerText = this.name;
        this.thumbDiv.appendChild(this.thumbName);
        //pesquisar
        this.searchOnGroupBtn = new googleIcon('search', ['btn', 'searchOnGroupBtn'], this.thumbDiv)
        //Pesquisar input
        this.searchOnGroupInput = document.createElement('input');
        this.searchOnGroupInput.classList.add('searchOnGroupInput');
        this.searchOnGroupInput.placeholder = 'pesquisar...';
        this.searchOnGroupBtn.ico.appendChild(this.searchOnGroupInput);
        //search action
        this.searchOnGroupBtn.ico.onclick = () => {
            this.searchOnGroupInput.style.width = this.thumbDiv.offsetWidth / 5 + 'px';
            this.searchOnGroupInput.focus();
            document.onclick = () => {
                this.searchOnGroupInput.style.width = (
                    document.activeElement !== this.searchOnGroupInput && this.searchOnGroupInput.value == ''
                ) ? null : this.thumbDiv.offsetWidth / 5 + 'px'
            };
        }
        this.searchOnGroupInput.addEventListener('keydown', e => {
            if (e.key == 'Enter') {
                e.preventDefault();
                this.msgs.forEach(msg => {
                    if (msg.content) {
                        //verificar se o input !== '' && conteudo da mensagem ~=(70%) input
                        msg.getMessage.style.display = (
                            [...msg.content].filter((char, index) => char == this.searchOnGroupInput.value.charAt(index)).length / msg.content.length < 0.7 && this.searchOnGroupInput.value !== ''
                        ) ? 'none' : 'block'
                    }
                })
            }
        })
        //video call
        this.call = new googleIcon('videocam', ['btn'], this.thumbDiv)
        this.call.ico.onclick = () => {
            console.warn('não finalizado!')
        }
        //BTNs
        this.createConfigsBtn();
    }
    createChatConfigs() {
        this.chatElementConfigs = document.createElement('div');
        //configs Style
        this.chatElementConfigs.classList.add('chatConfigs', 'chatMenu');
        this.chatElementConfigs.style.display = 'none';
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
        this.groupThumbBtn = document.createElement('button');
        this.groupThumbBtn.tabIndex = 0;
        this.groupThumbBtn.classList.add('groupThumbBtn');
        //
        this.groupThumbBtnImg = new Image();
        this.groupThumbBtnImg.src = this.thumb;
        this.groupThumbBtnImg.alt = this.id + ' picture'
        this.groupThumbBtn.appendChild(this.groupThumbBtnImg);
        //
        this.groupThumbBtnTitle = document.createElement('h3');
        this.groupThumbBtnTitle.innerText = this.name;
        this.groupThumbBtn.appendChild(this.groupThumbBtnTitle);
        //
        this.groupThumbBtn.onclick = () => {
            //chat
            const elementos = document.querySelectorAll('.chat, .chatConfigs');
            elementos.forEach(elemento => {
                elemento.style.display = 'none';
            });
            this.chatElement.style.display = 'grid';
            this.chatElementConfigs.style.display = 'none';
            //thumb
            const thumbEs = document.querySelectorAll('.groupThumbBtn');
            thumbEs.forEach(thumbE => {
                thumbE.style.background = '';
            });
            this.groupThumbBtn.style.background = '#00000059';
        }
        const contatosMenu = document.getElementById('contatos');
        contatosMenu.appendChild(this.groupThumbBtn);
        contatosMenu.scrollTop = contatosMenu.scrollHeight;
    }
    createConfigsBtn() {
        this.chatConfigBtn = new googleIcon('more_vert', ['btn'], this.thumbDiv)
        //ChatConfigsBtn style
        this.chatConfigBtn.ico.style.color = 'white';
        this.chatConfigBtn.ico.style.borderRadius = '0.5rem';
        // Adicionar o elemento ao corpo do documento
        this.chatConfigBtn.ico.onclick = () => {
            this.chatElementConfigs.style.display = 'grid';
            this.chatElement.style.display = 'none';
        }
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
        const createElementWithClass = (tag, className, append) => {
            const element = document.createElement(tag);
            element.classList.add(className);
            append.appendChild(element);
            return element;
        };
        this.guests.forEach(guest => {
            const guestInList = createElementWithClass('div', 'guestInList', this.guestList);
            guestInList.innerText = guest.nome + ' ' + guest.sobrenome;
            guestInList.addEventListener('contextmenu', e => {
                e.preventDefault();
                guestInfoMenu.style.display = 'flex';
                guestInfoMenu.addEventListener('mouseleave', () => {
                    guestInfoMenu.style.display = 'none';
                });
            });
            const guestInfoMenu = createElementWithClass('div', 'guestInfoMenu', guestInList);

            const guestInfoMenu1Topic = document.createElement('a');
            guestInfoMenu.appendChild(guestInfoMenu1Topic);

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
            guestInfoMenu.appendChild(guestInfoMenuEmail);

            const guestInListImg = new Image();
            guestInListImg.src = guest.img;
            guestInList.appendChild(guestInListImg);
            //remove guest
            const removeGuest = createElementWithClass('p', 'removeGuest', guestInfoMenu);
            removeGuest.innerText = 'x';
            removeGuest.title = 'remover';
            removeGuest.onclick = () => {
                console.warn('remover usuario')
            }

            const guestInfoMenuAdm = createElementWithClass('p', 'tornarAdm', guestInfoMenu);
            guestInfoMenuAdm.innerText = (this.adm.includes(guest)) ? 'remove adm' : 'add adm';
            guestInfoMenuAdm.onclick = () => {
                console.warn('tornar adm')
            }
        })
    }
    createGuestList() {
        this.guestList = document.createElement('div');
        this.guestList.classList.add('guestList');
        this.guestList.innerHTML = '<h3>guests</h3>';
        //guests names
        this.guestListFunction()
        this.chatElementConfigs.appendChild(this.guestList);
        //guestList add btn
        this.addGuest = new googleIcon('person_add', ['guestInList', 'btn'], this.guestList)
        this.addGuest.ico.onclick = () => {
            this.newGuestMenu.style.display = 'flex';
        }
        this.addGuestMenu();
    }
    addGuestMenu() {
        //newGuestMenu
        this.newGuestMenu = document.createElement('div');
        this.newGuestMenu.classList.add('newGuestMenu');
        this.newGuestMenu.style.display = 'none';
        this.chatElementConfigs.appendChild(this.newGuestMenu);
        //closeNewGuestMenu
        this.closeNewGuestMenu = new googleIcon('close', ['btn'], this.newGuestMenu)
        this.closeNewGuestMenu.ico.style.position = 'absolute';
        this.closeNewGuestMenu.ico.style.padding = '10px';
        this.closeNewGuestMenu.ico.onclick = () => {
            this.newGuestMenu.style.display = 'none';
        }
        this.addNewGuestTitle = document.createElement('h2');
        this.addNewGuestTitle.innerText = 'add guests';
        this.newGuestMenu.appendChild(this.addNewGuestTitle);

        this.guestsToAdd = document.createElement('div');
        this.guestsToAdd.classList.add('guestsToAdd')
        this.newGuestMenu.appendChild(this.guestsToAdd);
        alunos.forEach(aluno => {
            const add = new googleIcon('add', ['btn'], this.guestsToAdd);
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
        this.imgInput.addEventListener('change', (event) => {
            if (event.target.files[0].type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);
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
                            this.img.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                            this.groupThumbBtnImg.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                            this.thumbPicture.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                        });
                }
            } else {
                alert(selectedFile.name + ' não é uma imagem suportada!');
            }
        })
        //rename group
        this.rename = document.createElement('textarea');
        this.rename.classList.add('renameGroup');
        this.rename.spellcheck = false;
        this.rename.placeholder = 'rename';
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
                if (this.rename.value.replace(/^\W+/, '') !== '') {
                    this.renameGroup();
                }
            }
        });
        this.rename.onblur = () => {
            if (this.rename.value.replace(/^\W+/, '') !== '') {
                this.renameGroup();
            } else {
                this.rename.value = this.name;
            }
        }
        this.chatElementConfigs.appendChild(this.rename);
        //del group
        this.delete = new googleIcon('delete', ['deleteGroup', 'btn'], this.chatElementConfigs);
        this.delete.ico.onclick = () => {
            if (confirm("deseja apagar este grupo?")) {
                this.chatElement.parentNode.removeChild(this.chatElement)
                this.chatElementConfigs.parentNode.removeChild(this.chatElementConfigs)
                this.groupThumbBtn.parentNode.removeChild(this.groupThumbBtn)
                if (!document.getElementById('contatos').hasChildNodes()) {
                    off = new googleIcon('public_off', [], document.getElementById('contatos'))
                }
            }
        }
    }
    renameGroup() {
        this.name = this.rename.value;
        this.thumbName.innerText = this.name;
        this.groupThumbBtn.lastChild.innerText = this.name;
        this.rename.value = this.rename.value.replace(/^\W+/, '');
        /*db.transaction((tx) => {
            tx.executeSql('UPDATE Test SET name = ? WHERE id = ?', [this.rename.value, this.id]);
        });*/
    }
    createBanWordList() {
        this.banWordList = document.createElement('textarea');
        this.banWordList.placeholder = 'bad words';
        this.banWordList.classList.add('banWordList');
        this.banWordList.addEventListener('input', () => {
            this.banWordList.value = this.banWordList.value.replace(/[ ,.;]/g, this.banWordList.value.replace(/ /g, "") !== "" ? "\n" : "");
        })
        this.chatElementConfigs.appendChild(this.banWordList);
    }
    createMsg() {
        this.msgArea = document.createElement('div');
        this.msgArea.classList.add('msgArea');
        this.chatElement.appendChild(this.msgArea);
        //scroll to the bottom
        this.scrollToTheBottom = new googleIcon('arrow_drop_down', ['scrollToTheBottom'], this.msgArea)
        this.scrollToTheBottom.ico.style.display = "none";
        this.msgArea.onscroll = () => {
            this.scrollToTheBottom.ico.style.display = (this.msgArea.scrollTop < (this.msgArea.scrollHeight - 800)) ? "block" : "none";
        }
        this.scrollToTheBottom.ico.onclick = () => {
            this.msgArea.scrollTop = this.msgArea.scrollHeight;
        }
        //msgBallon
        this.msgBalloon = document.createElement('textarea');
        this.msgBalloon.placeholder = 'vontade de falar...'
        this.msgBalloon.classList.add('msgBalloon');
        //
        this.msgBalloon.addEventListener('drop', (event) => {
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
                const file = event.dataTransfer.files[i];
                event.preventDefault();
                const newMsg = new msg(this.msgBalloon.value, file, new Date(), Zeulo, this);
                this.msgs.push(newMsg);
            }
        });
        let keys = {};
        this.msgBalloon.addEventListener('keydown', e => {
            keys[e.key] = true;
            if (keys['Enter'] && !keys['Shift']) {
                e.preventDefault();
                if (this.msgBalloon.value.replace(/^\s+/, "").replace(/\u200E\s/g, "") !== '') {
                    let newMsg = new msg(this.msgBalloon.value.replace(/\n/g, '<br>'), null, new Date(), Zeulo, this);
                    this.msgs.push(newMsg);
                    this.msgArea.scrollTop = this.msgArea.scrollHeight;
                }
            }
        });
        this.msgBalloon.addEventListener('keyup', e => {
            keys[e.key] = false;
        });
        this.msgBalloon.addEventListener('paste', e => {
            const items = e.clipboardData.items;
            for (const item of items) {
                if (item.type.indexOf('image/') !== -1) {
                    const blob = item.getAsFile();
                    const imageUrl = URL.createObjectURL(blob);
                    //incomplete
                    this.msgBalloon.value += imageUrl;
                }
            }
        });
        this.chatElement.appendChild(this.msgBalloon);
    }
}
//criar chat
const chats = [];
function createNew() {
    const getRowCount = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM Teste', [], (_tx, results) => {
                    resolve(results.rows.length);
                }, error => {
                    reject(error);
                });
            });
        });
    };
    getRowCount().then(rowCount => {
        let newChat = new chat(rowCount + 1, `chat ${rowCount + 1}`, 'img/newGroupImg.svg', [], null, null)
        chats.push(newChat);
    }).catch(error => {
        console.error(error);
    });
    if (off !== null) {
        off.ico.parentNode.removeChild(off.ico);
        off = null
    }
}
function getPreGroups() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Teste', [], (_tx, results) => {
                resolve(results.rows)
            }, (_tx, error) => {
                reject(error)
            });
        });
    })
        .then(rows => {
            if (rows && rows.length > 0) {
                return rows
            } else {
                console.log('Nenhum resultado retornado da consulta SQL');
            }
        })
        .catch(error => {
            console.log(error);
        });
}
getPreGroups().then(result => {
    for (let i = 0; i < result.length; i++) {
        new chat(result.item(i).id, result.item(i).name, 'img/newGroupimg.svg', [Zeulo], null, []);
    }
});
function openSettings() {
    const settings = document.getElementById('settingsMenu');
    const closeSettings = document.getElementById('closeSettings');
    settings.style.top = '0%';
    closeSettings.addEventListener('click', () => {
        settings.style.top = '100%';
    })
}
/*db.transaction(function (transaction) {
    var sql = "DELETE FROM Teste WHERE nome = ? AND email = ?";
    var registro = ["João", "joao@example.com"]; // substitua pelos valores que deseja excluir

    transaction.executeSql( sql, registro,
        function (transaction, result) {
            console.log('Exclusão bem-sucedida!');
            console.log(result);
        },
        function (transaction, error) {
            console.log('Erro na exclusão!');
            console.log(error);
        }
    );
});*/
/*corrigir:
"
"
/n --> pula uma linha, e quando colado no nome do grupo faz com que este bug

ao criar um novo chat, antes de carregar a imagem dos chats já existentes (tela de configurações), a imagem aparece com as propriedades de altura e largura como "0"

ao usar o atalho ctrl+"+" e ctrl+"-", a imagem do grupo (tela de configurações), o elemento aumenta de tamando, ocupando mais do que o espaço disponivel na pagina
*/