document.addEventListener("DOMContentLoaded", () =>{
    const lockScreen = document.createElement('div');
    lockScreen.classList.add('lockScreen');
    document.body.appendChild(lockScreen);
    lockScreen.innerText = 'Login';
    setTimeout(()=>{
        lockScreen.style.top = '0%'
    },10)
    lockScreen.onclick = () => {
        lockScreen.style.top = '100%'
        setTimeout(()=>{
            lockScreen.remove()
        },1000)
    }
})

//sounds
const faildEnterCall = new Audio('sound/callError.wav');

/*class YourSelf {
    constructor(password, name) {
        this.name = name;
    }
}*/

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
    get domElement() {
        return this.element;
    }
}
//console.log(g)
class aluno {
    constructor(nome, sobrenome, img, email, serie, Chamada, turma, ensino) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.img = img;
        this.email = email;
        this.serie = serie;
        this.Chamada = Chamada;
        this.turma = turma;
        this.local = serie+turma;
        this.ensino = ensino;
    }
}
const Zeulo = new aluno('Leonardo','Nogueira','img/AL.svg','leonardo.rennó@colegiodante.org.br','8°','13','A','E. Fund.2');
const Lucas = new aluno('Lucas','Blanes','img/AL.svg','lucas.blanes@colegiodante.org.br','5°','18','F', 'E. Fund.1');
const Ricardo = new aluno('Ricardo','Eloy','img/AL.svg','ricardo.eloy@colegiodante.org.br','2°','2','G','E. Medio');
const Alice = new aluno('Alice','Opressora','img/AL.svg','ricardo.eloy@colegiodante.org.br','1°','8','G','E. Medio');

class chat {
    constructor(id,name,thumb,guests,bannedWords, adm){
        this.id = id;
        this.name = name;
        this.thumb = thumb;
        this.guests = guests;
        this.guestsLength = guests.length;
        this.bannedWords = bannedWords;
        this.adm = adm;
        this.createChat();
        this.createChatConfigs();
        this.createThumb();
        this.createMsg();
        this.msgs = [];
    }
    createChat() {
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat','chatMenu');
        this.chatElement.style.display = 'none';
        document.body.appendChild(this.chatElement);
        //thumb
        this.thumbDiv = document.createElement('div');
        this.thumbDiv.classList.add('thumbDiv');
        this.thumbDiv.oncontextmenu = (event) => {
            event.preventDefault();
        }
        this.chatElement.appendChild(this.thumbDiv);
        //thumbPicture
        this.thumbPicture = new Image();
        this.thumbPicture.src = this.thumb;
        this.thumbPicture.classList.add('thumbPicture');
        this.thumbDiv.appendChild(this.thumbPicture);
        //thumbName
        this.thumbName = document.createElement('h2');
        this.thumbName.style.margin= '0 10px';
        this.thumbName.innerText = this.name;
        this.thumbDiv.appendChild(this.thumbName);
        //pesquisar
        this.searchOnGroupBtn = new googleIcon('search',['btn','searchOnGroupBtn'],this.thumbDiv)
            //Pesquisar input
            this.searchOnGroupInput = document.createElement('textarea');
            this.searchOnGroupInput.classList.add('searchOnGroupInput')
            this.searchOnGroupBtn.domElement.appendChild(this.searchOnGroupInput);
        //search action
        this.searchOnGroupBtn.domElement.onclick = () => {
            this.searchOnGroupInput.style.width = this.thumbDiv.offsetWidth/5+'px';
            this.searchOnGroupInput.focus();
            document.addEventListener('click', () => {
                if(document.activeElement !== this.searchOnGroupInput) {
                    this.searchOnGroupInput.style.width = null;
                }
            })
        }
        /*this.searchOnGroup = document.createElement('textarea');
        this.searchOnGroup.placeholder = 'pesquisar no grupo'
        this.searchOnGroup.classList.add('searchOnGroup');
        this.searchOnGroup.style.margin= '0 10px 0 auto';
        this.searchOnGroup.addEventListener('keydown',(event)=>{
            if(event.key === "Enter") {
                event.preventDefault();
                for(let i = 0; i<this.msgs.length;i++) {
                    if(this.msgs[i].content) {
                        let similiaridadeporLetra = [];
                        for(let j = 0;j<this.msgs[i].content.length;j++) {
                            if(this.msgs[i].content.charAt(j) == this.searchOnGroup.value.charAt(j)) {
                                similiaridadeporLetra.push(this.msgs[i].content.charAt(j))
                            }
                        }
                        console.log(i+"-"+this.msgs[i].content+":",(similiaridadeporLetra.length / this.msgs[i].content.length)*100+"%");
                    }
                }
            }
        })
        this.thumbDiv.appendChild(this.searchOnGroup);*/
        //video call
        this.call = new googleIcon('videocam',['btn'],this.thumbDiv)
        this.call.domElement.onclick = () => {
            console.warn('não finalizado!')
        }
        //BTNs
        this.createConfigsBtn();
    }
    createChatConfigs(){
        this.chatElementConfigs = document.createElement('div');
        //configs Style
        this.chatElementConfigs.classList.add('chatConfigs','chatMenu');
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
    createThumb(){
        this.groupThumbBtn = document.createElement('div');
        this.groupThumbBtn.classList.add('groupThumbBtn');
        //
        this.groupThumbBtnImg = document.createElement('img');
        this.groupThumbBtnImg.src = this.thumb;
        this.groupThumbBtn.appendChild(this.groupThumbBtnImg);
        //
        this.groupThumbBtnTitle = document.createElement('h3');
        this.groupThumbBtnTitle.innerText = this.name;
        this.groupThumbBtn.appendChild(this.groupThumbBtnTitle);
        //
        this.groupThumbBtn.onclick = ()=>{
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
    createConfigsBtn(){
        this.chatConfigBtn = new googleIcon('more_vert',['btn'],this.thumbDiv)
        //ChatConfigsBtn style
        this.chatConfigBtn.domElement.style.color = 'white';
        this.chatConfigBtn.domElement.style.borderRadius = '0.5rem';
        // Adicionar o elemento ao corpo do documento
        this.chatConfigBtn.domElement.onclick = () => {
            this.chatElementConfigs.style.display = 'grid';
            this.chatElement.style.display = 'none';
        }
    }
    createConfigsBackBtn(){
        this.back = new googleIcon('arrow_back_ios',['btn'],this.chatElementConfigs)
        this.back.domElement.style.position= 'absolute';
        this.back.domElement.style.padding = '15px';
        this.back.domElement.onclick = ()=>{
            this.chatElementConfigs.style.display = 'none';
            this.chatElement.style.display = 'grid';
        }
    }
    createGuestList(){
        this.guestList = document.createElement('div');
        this.guestList.classList.add('guestList');
        this.guestList.innerHTML = '<h3>guests</h3>';
        //guests names
        for(let i = 0; i<this.guestsLength; i++){
            //transformar em uma nova classe
            this.guestInList = document.createElement('div');
            this.guestInList.classList.add('guestInList');
            this.guestInList.addEventListener('contextmenu',function(event) {
                event.preventDefault();
                this.firstChild.style.display = 'flex';
                this.firstChild.addEventListener('mouseleave',()=>{
                    this.firstChild.style.display = 'none';
                })
            });
            this.guestList.appendChild(this.guestInList);
            //
            this.guestInfoMenu = document.createElement('div');
            this.guestInfoMenu.classList.add('guestInfoMenu');
            this.guestInfoMenu.style.display = 'none';
            this.guestInList.appendChild(this.guestInfoMenu);
            //
            this.guestInfoMenu1Topic = document.createElement('a');
            this.guestInfoMenu.appendChild(this.guestInfoMenu1Topic);
            //
            this.guestInfoMenuImg = document.createElement('img');
            this.guestInfoMenuImg.src = this.guests[i].img;
            this.guestInfoMenu1Topic.appendChild(this.guestInfoMenuImg);
            //
            this.guestInfoMenuName = document.createElement('p');
            this.guestInfoMenuName.innerText = this.guests[i].nome +' '+this.guests[i].sobrenome;
            this.guestInfoMenu1Topic.appendChild(this.guestInfoMenuName);
            //
            this.guestInfoMenuEmail = document.createElement('p');
            this.guestInfoMenuEmail.innerText = this.guests[i].email;
            this.guestInfoMenu.appendChild(this.guestInfoMenuEmail);
            //tornar ADM
            this.guestInfoMenuAdm = document.createElement('p');
            this.guestInfoMenuAdm.classList.add('tornarAdm');
            this.guestInfoMenu.appendChild(this.guestInfoMenuAdm);
            //
            this.guestInListImg = document.createElement('img');
            this.guestInListImg.src = this.guests[i].img;
            this.guestInList.appendChild(this.guestInListImg);
            //
            this.guestInListName = document.createElement('a');
            this.guestInListName.innerText = this.guests[i].nome +' '+this.guests[i].sobrenome;
            this.guestInList.appendChild(this.guestInListName);
            //remove guest
            this.removeGuest = document.createElement('p');
            this.removeGuest.classList.add('removeGuest');
            this.removeGuest.innerText = 'x';
            this.removeGuest.addEventListener('click',function(){
                console.log(this.parentNode);
            })
            this.guestInList.appendChild(this.removeGuest);
            if (this.adm.includes(this.guests[i])) {
                this.guestInfoMenuAdm.innerText = 'remove adm';
            } else {
                this.guestInfoMenuAdm.innerText = 'add adm';
            }
        }
        this.chatElementConfigs.appendChild(this.guestList);
        //guestList add btn
        this.addGuest = document.createElement('a');
        this.addGuest.classList.add('guestInList','btn');
        this.addGuest.innerHTML = `<span class="material-symbols-outlined">person_add</span>`;
        this.addGuest.style.display = 'flex';
        this.addGuest.style.justifyContent = 'center';
        this.addGuest.onclick = ()=>{
            this.newGuestMenu.style.display = 'flex';
        }
        this.guestList.appendChild(this.addGuest);
        this.addGuestMenu();
    }
    addGuestMenu() {
        //newGuestMenu
        this.newGuestMenu = document.createElement('div');
        this.newGuestMenu.classList.add('newGuestMenu');
        this.newGuestMenu.style.display = 'none';
        this.chatElementConfigs.appendChild(this.newGuestMenu);
        //closeNewGuestMenu
        this.closeNewGuestMenu = new googleIcon('close',['btn'],this.newGuestMenu)
        this.closeNewGuestMenu.domElement.style.position = 'absolute';
        this.closeNewGuestMenu.domElement.style.padding = '10px';
        this.closeNewGuestMenu.domElement.onclick = () => {
            this.newGuestMenu.style.display = 'none';
        }
        this.addNewGuestTitle = document.createElement('h2');
        this.addNewGuestTitle.innerText = 'add guests';
        this.addNewGuestTitle.style.margin = '10px auto';
        this.newGuestMenu.appendChild(this.addNewGuestTitle);
        //whiteList
        //BlackList
        //banned
    }
    editGroup(){
        //edit group img
        this.img = document.createElement('img');
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
        this.imgInput.addEventListener('change',(event)=>{
            const selectedFile = event.target.files[0];
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedFile);
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
                alert(selectedFile.name+' não é uma imagem suportada!');
            }
        })
        window.addEventListener('resize',()=>{
            this.img.style.width = this.rename.offsetWidth+'px';
            this.img.style.height = this.rename.offsetWidth+'px';
        })
        //rename group
        this.rename = document.createElement('textarea');
        this.rename.classList.add('renameGroup');
        this.rename.spellcheck = false;
        this.rename.placeholder = 'rename';
        this.rename.value = this.name;
        this.rename.addEventListener("paste", (e) => {
            const clipboardData = e.clipboardData || window.clipboardData;
            if(clipboardData.getData("text").length + this.rename.value.length > 17) {
                e.preventDefault();
                alert('texto muito grande, você só tem mais '+(17-this.rename.value.length)+' caracteres até o limite');
            }
        });
        this.rename.addEventListener("keydown", (e) =>{
            if (this.rename.value.length > 16 && e.key !== "Backspace" && e.keyCode !== 13 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 9 && e.keyCode !== 116 && this.rename.selectionStart == this.rename.selectionEnd) {
                e.preventDefault();
            }
            if (e.key === "Enter" && this.rename.value.replace(/^\W+/, '') !== '') {
                e.preventDefault();
                this.renameGroup();
            } else if(e.key === "Enter") {
                e.preventDefault();
            }
        });
        this.rename.onblur = () => {
            if(this.rename.value.replace(/^\W+/, '') !== '') {
                this.renameGroup();
            } else {
                this.rename.value = this.name;
            }
        }
        this.chatElementConfigs.appendChild(this.rename);
        //group id
        this.groupId = document.createElement('a');
        this.groupId.innerText = 'id:'+this.id;
        this.groupId.style.position = 'absolute';
        this.groupId.style.top = 'calc(100% - 35px)';
        this.chatElementConfigs.appendChild(this.groupId);
        //del group
        this.delete = document.createElement('span');
        this.delete.classList.add("material-symbols-outlined",'btn','deleteGroup');
        this.delete.innerText = 'delete';
        this.chatElementConfigs.appendChild(this.delete);
        this.delete.onclick = () => {
            if (confirm("deseja apagar este grupo?") == true) {
                //terminar
            }
        }
    }
    renameGroup() {
        this.name = this.rename.value;
        this.thumbName.innerText = this.name;
        this.groupThumbBtn.lastChild.innerText = this.name;
        this.rename.value = this.rename.value.replace(/^\W+/, '');
    }
    createBanWordList(){
        this.banWordList = document.createElement('textarea');
        this.banWordList.placeholder = 'bad words';
        this.banWordList.classList.add('banWordList');
        this.banWordList.addEventListener('input', () => {
            this.banWordList.value = this.banWordList.value.replace(/[ ,.;]/g, this.banWordList.value.replace(/ /g, "") !== "" ? "\n" : "");
        })
        this.chatElementConfigs.appendChild(this.banWordList);
    }
    createMsg(){
        this.msgArea = document.createElement('div');
        this.msgArea.classList.add('msgArea');
        this.chatElement.appendChild(this.msgArea);
        //scroll to the bottom
        this.scrollToTheBottom = document.createElement('span');
        this.scrollToTheBottom.classList.add('scrollToTheBottom','material-symbols-outlined');
        this.scrollToTheBottom.innerText = 'arrow_drop_down';
        this.scrollToTheBottom.style.display = "none";
        this.msgArea.onscroll = () => {
            this.scrollToTheBottom.style.display = (this.msgArea.scrollTop < (this.msgArea.scrollHeight - 800)) ? "block" : "none";
        }
        this.scrollToTheBottom.onclick = () => {
            this.msgArea.scrollTop = this.msgArea.scrollHeight;
        }
        this.msgArea.appendChild(this.scrollToTheBottom);
        //msgBallon
        this.msgBalloon = document.createElement('textarea');
        this.msgBalloon.placeholder = 'vontade de falar...'
        this.msgBalloon.classList.add('msgBalloon');
        //
        this.msgBalloon.addEventListener('drop',(event)=>{
            for (let i = 0; i < event.dataTransfer.files.length; i++) {
                const file = event.dataTransfer.files[i];
                event.preventDefault();
                const newMsg = new msg(this.msgBalloon.value,file,new Date(),Zeulo,this);
                this.msgs.push(newMsg);
            }
        })
        this.msgBalloon.addEventListener('keydown',(event)=>{
            if(event.key === "Enter") {
                event.preventDefault();
                if(this.msgBalloon.value.replace(/^\s+/, "").replace(/\u200E\s/g, "") !== '') {
                    let newMsg = new msg(this.msgBalloon.value,null,new Date(),Zeulo,this);
                    this.msgs.push(newMsg);
                    //console.log(this.msgs.length);
                    this.msgArea.scrollTop = this.msgArea.scrollHeight;
                }
            }
        })
        this.msgBalloon.addEventListener('paste', (event) => {
            const items = event.clipboardData.items;
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
class guest {
    constructor(group,guest){
        this.group = group;
        this.guest = guest;
        this.addGuest()
    }
    addGuest() {
        //[...]
    }
}
class msg {
    constructor(content,file,time,owner,chat){
        this.content = content.replace(/^\s+/, "").replace(/\u200E\s/g, "");
        this.file = file;
        this.time = time.getHours().toString().padStart(2, '0')+":"+new Date().getMinutes().toString().padStart(2, '0');
        this.owner = owner;
        this.chat = chat;
        this.msgsLength = this.chat.msgs.length;
        this.createMsg();
        this.msgDate();
    }
    createMsg(){
        this.chat.msgBalloon.value = '';
        this.msg = document.createElement('div');
        this.msg.classList.add('msg');
        this.msg.translate = 'yes';
            //owner
            this.msgOwner = document.createElement('p');
            this.msgOwner.classList.add('msgOwner');
            this.msgOwner.innerText = this.owner.nome+' '+this.owner.sobrenome;
            this.msg.appendChild(this.msgOwner);
            //filePlaceHolder
            this.filePlaceHolder = document.createElement('div');
            this.filePlaceHolder.style.padding = '5px 0';
            this.msg.appendChild(this.filePlaceHolder);
            //file
            if(this.file) {
                console.log(this.file.type)
                if(this.file.type !== "text/html" && this.file.type.startsWith('text/') || this.file.name.slice(-3) == '.md' || this.file.name.slice(-4) == '.jem') {
                    const textReader = new FileReader();
                    textReader.readAsText(this.file);
                    textReader.onload = (e) => {
                        this.textFileElement = document.createElement('div');
                        this.textFileElement.innerHTML = e.target.result.replace(/\n/g, '<br>');
                        this.textFileElement.style.lineBreak = 'anywhere';
                        this.filePlaceHolder.appendChild(this.textFileElement);
                    }
                } else if(this.file.type == "text/html") {
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
                } else if(this.file.type == "" || this.file.type.startsWith('application/')) {
                    this.error = document.createElement('a');
                    this.error.innerHTML = `[sem suporte a "${this.file.name}"]`;
                    this.error.style.color = '#ffffff47';
                    this.error.style.userSelect = 'none';
                    this.filePlaceHolder.appendChild(this.error);
                } else {
                    const reader = new FileReader();
                    reader.readAsDataURL(this.file);
                    reader.onload = (e) => {
                        if(this.file.type.startsWith('image/')) {
                            this.msgImg = new Image();
                            this.msgImg.src = e.target.result;
                            this.msgImg.style.width = '100%';
                            this.msgImg.style.borderRadius = '0.5rem';
                            this.msgImg.style.background= '#040f0e';
                            this.filePlaceHolder.appendChild(this.msgImg);
                        } else if(this.file.type.startsWith('video/')) {
                            this.msgVideo = document.createElement('video');
                            this.msgVideoSource = document.createElement('source');
                            this.msgVideoSource.src = e.target.result;
                            this.msgVideo.load();
                            this.msgVideo.appendChild(this.msgVideoSource);
                            //
                            this.msgVideo.controls = true;
                            this.msgVideo.style.width = '100%';
                            this.msgVideo.style.borderRadius = '0.5rem';
                            this.filePlaceHolder.appendChild(this.msgVideo);
                        } else if(this.file.type.startsWith('audio/')) {
                            //transformar em classe
                            this.msgAudio = document.createElement('audio');
                            this.msgAudio.style.display = 'none';
                            //source
                            this.msgAudioSource = document.createElement('source');
                            this.msgAudioSource.src = e.target.result;
                            this.msgAudio.load();
                            this.msgAudio.appendChild(this.msgAudioSource);
                            //audio display
                            this.audioDisplay = document.createElement('div');
                            this.audioDisplay.classList.add('audioDisplay');
                            this.audioDisplay.oncontextmenu = (event) => {
                                event.preventDefault();
                                this.audioContextMenu.style.display = 'flex';
                                this.audioContextMenu.style.left = event.clientX-360+'px';
                                this.audioContextMenu.style.top = event.clientY-70+'px';
                                document.addEventListener('click',()=> {
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
                            this.audioDownload = document.createElement('a');
                            this.audioDownload.title = 'download';
                            this.audioDownload.innerText = 'download';
                            this.audioDownload.classList.add('material-symbols-outlined','btn');
                            this.audioDownload.href = this.msgAudioSource.src;
                            this.audioDownload.download = this.file.name;
                            this.audioDownload.onclick = () => {
                                this.audioDownload.innerText = 'download_done';
                                setTimeout(()=>{
                                    this.audioDownload.innerText = 'download';
                                },3000)
                            }
                            this.audioContextMenu.appendChild(this.audioDownload);
                            //loop
                            this.audioloop = new googleIcon('repeat_one',['btn'],this.audioContextMenu)
                            //play/pause
                            this.audioPlayBtn = new googleIcon('play_arrow',['btn','audioPlayBtn'],this.audioDisplay)
                            this.audioPlayBtn.domElement.onclick = () => {
                                if(this.audioPlayBtn.domElement.innerText == 'play_arrow') {
                                    this.msgAudio.play();
                                    this.audioPlayBtn.domElement.innerText = 'pause';
                                } else {
                                    this.msgAudio.pause();
                                    this.audioPlayBtn.domElement.innerText = 'play_arrow';
                                }
                            }
                            //timeline
                            this.audioTimeline = document.createElement('input');
                            this.audioTimeline.classList.add('audioTimeline')
                            this.audioTimeline.type = 'range';
                            this.audioTimeline.min = '1';
                            this.audioTimeline.value = '1';
                            this.msgAudio.addEventListener('loadedmetadata', () => {
                                this.audioTimeline.max = this.msgAudio.duration*100;
                            })
                            this.updateTime = false;
                            this.msgAudio.addEventListener('timeupdate',()=>{
                                this.audioTimeline.onclick = () => {
                                    this.updateTime = true;
                                };
                                if(this.updateTime) {
                                    this.msgAudio.currentTime = this.audioTimeline.value/100;
                                    this.updateTime = false;
                                    //async
                                } else {
                                    this.audioTimeline.value = this.msgAudio.currentTime*100;
                                }
                            })
                            this.msgAudio.addEventListener('ended',()=>{
                                setTimeout(()=>{
                                    this.audioTimeline.value = '1';
                                    this.audioPlayBtn.innerText = 'play_arrow';
                                },100)
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
                const padrao = /\b[A-Za-z0-9._%+-ãçõ]+@[A-Za-z0-9.-ã]+\.[A-Za-z]{2,}\b/g;
                const emailsEncontrados = texto.match(padrao);
                return emailsEncontrados;
            }
            const emails = detectarEmail(this.content);
            if (emails) {
                emails.forEach((email) =>{
                    const amails = `<a href="mailto:${email}" title="enviar email" target="_blank">${email}</a>`;
                    const subamails = this.content.replace(email, amails);
                    this.content = subamails;
                });
            }
            //links
            const links = this.content.match(/https?:\/\/\S+/gi);
            if (links) {
                links.forEach((link) => {
                    const alinks = `<a href="${link}" title="acessar: ${link}" target="_blank">${link}</a>`;
                    const subalinks = this.content.replace(link, alinks);
                    this.content = subalinks;
                });
            }
            //data:img
            const regexLinkBase64 = /data:image\/\w+;base64,([\w+/=]+)/;
            const getImg64 = this.content.match(regexLinkBase64);
            if (getImg64) {
                const img64 = getImg64[1];
                console.log(img64);
                const img64Innert = `<img src="data:image/png;base64,${img64}">`;
                const img64Replace = this.content.replace(img64, img64Innert);
                this.content = img64Replace;
            }
            //bold
            const getBoldText = this.content.match(/\*.*?\*/g)
            if(getBoldText) {
                for(const boldText of getBoldText) {
                    this.content = this.content.replace(boldText,`<strong>${boldText.substring(1, boldText.length - 1)}</strong>`)
                }
            }
            //italic
            const getItalicText = this.content.match(/\%.*?\%/g)
            if(getItalicText) {
                for(const italicText of getItalicText) {
                    this.content = this.content.replace(italicText,`<i>${italicText.substring(1, italicText.length - 1)}</i>`)
                }
            }
            //Line
            const getLineText = this.content.match(/\--.*?\--/g)
            if(getLineText) {
                for(const lineText of getLineText) {
                    this.content = this.content.replace(lineText,`<a style='text-decoration: line-through 2px;'>${lineText.substring(2, lineText.length - 2)}</a>`)
                }
            }
            //Text Content
            this.msgTextContent = document.createElement('a');
            this.msgTextContent.classList.add('msgTextContent');
            this.msgTextContent.innerHTML = this.content;
            this.msg.appendChild(this.msgTextContent);
        this.chat.msgArea.appendChild(this.msg);
    }
    msgDate() {
        this.msgDate = document.createElement('p');
        this.msgDate.classList.add('msgDate');
        this.msgDate.innerText = this.time;
        this.msg.appendChild(this.msgDate);
    }
}
class msgAudio {
    constructor(msg,file){
        this.msg = msg;
        this.file = file;
        this.readFile();
    }
    readFile(){
        //[...]
    }
}
//criar chat
const chat1 = new chat('-1','chat','img/newGroupImg.svg',[Ricardo,Lucas,Zeulo,Alice],null,[Zeulo]);
let gn = 0;
const chats = [];
function createNew() {
    gn++;
    const newChat = new chat(gn,`chat ${gn}`,'img/newGroupImg.svg',[],null,null)
    chats.push(newChat);
}
function openSettings() {
    const settings = document.getElementById('settingsMenu');
    const closeSettings = document.getElementById('closeSettings');
    settings.style.top = '0%';
    closeSettings.addEventListener('click',()=>{
        settings.style.top = '100%';
    })
}

/*corrigir:
"
"
caractere /n --> pula uma linha, e quando colado no nome do grupo faz com que este bugue
*/