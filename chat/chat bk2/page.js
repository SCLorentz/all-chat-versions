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
const Zeulo = new aluno('Leonardo','Nogueira','https://w0.peakpx.com/wallpaper/505/93/HD-wallpaper-giga-chad-em-2022-piadas-com-fotos-fotos-de-animais-engracados-fotos-de-personagens-gigachad.jpg','leonardo.rennó@colegiodante.org.br','8°','13','A','E. Fund.2');
const Lucas = new aluno('Lucas','Blanes','https://i.pinimg.com/236x/4c/c8/3d/4cc83df6f85e10552d13592838ce6d74.jpg','lucas.blanes@colegiodante.org.br','5°','18','F', 'E. Fund.1');
const Ricardo = new aluno('Ricardo','Eloy','https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg','ricardo.eloy@colegiodante.org.br','2°','2','G','E. Medio');
const Alice = new aluno('Alice','Opressora','https://img.quizur.com/f/img6388abc1049428.67358930.jpg?lastEdited=1669901254','ricardo.eloy@colegiodante.org.br','1°','8','G','E. Medio');

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
        this.thumbPicture = document.createElement('img');
        this.thumbPicture.src = this.thumb;
        this.thumbPicture.classList.add('thumbPicture');
        this.thumbDiv.appendChild(this.thumbPicture);
        //thumbName
        this.thumbName = document.createElement('h2');
        this.thumbName.style.margin= '0 10px';
        this.thumbName.innerText = this.name;
        this.thumbDiv.appendChild(this.thumbName);
        //pesquisar
        this.searchOnGroup = document.createElement('textarea');
        this.searchOnGroup.placeholder = 'pesquisar no grupo'
        this.searchOnGroup.classList.add('searchOnGroup');
        this.searchOnGroup.style.margin= '0 10px 0 auto';
        this.searchOnGroup.addEventListener('keydown',(event)=>{
            if(event.key === "Enter") {
                event.preventDefault();
                for(let i = 0; i<this.msgs.length;i++) {
                    if(this.msgs[i].content) {
                        console.log(this.msgs[i].content.length-1)
                        console.log(this.msgs[i]);
                        if(this.msgs[i].content.length < this.searchOnGroup.value.length) {
                            break;
                        }
                        for(let j = 0;j<this.msgs[i].content.length;j++) {
                            if(this.msgs[i].content.charAt(j) !== this.searchOnGroup.value.charAt(j)) {
                                console.log('fim da similiaridade');
                                console.log((j/this.msgs[i].content.length)*100+"%");
                                break;
                            }
                            if(j === this.msgs[i].content.length-1) {
                                //this.msgArea.scrollTop = this.msgs[i].offsetTop/this.msgArea.scrollTop;
                                //console.log(this.msgs[i].offsetTop/this.msgArea.scrollTop)
                                break;
                            }
                            console.log(this.msgs[i].content.charAt(j));
                            console.log(j);
                        }
                    }
                }
            }
        })
        this.thumbDiv.appendChild(this.searchOnGroup);
        //video call
        this.call = document.createElement('span');
        this.call.classList.add('material-symbols-outlined','btn');
        this.call.innerText = 'videocam';
        this.thumbDiv.appendChild(this.call);
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
        document.getElementById('salvos').appendChild(this.groupThumbBtn);
    }
    createConfigsBtn(){
        this.chatConfigBtn = document.createElement("span");
        this.chatConfigBtn.classList.add("material-symbols-outlined",'btn');
        this.chatConfigBtn.innerText = 'more_vert';
        //ChatConfigsBtn style
        this.chatConfigBtn.style.color = 'white';
        this.chatConfigBtn.style.borderRadius = '0.5rem';
        // Adicionar o elemento ao corpo do documento
        this.thumbDiv.appendChild(this.chatConfigBtn);
        this.chatConfigBtn.onclick = () => {
            this.chatElementConfigs.style.display = 'grid';
            this.chatElement.style.display = 'none';
        }
    }
    createConfigsBackBtn(){
        this.back = document.createElement('span');
        this.back.classList.add("material-symbols-outlined",'btn');
        this.back.innerText = 'arrow_back_ios';
        this.back.style.position= 'absolute';
        this.back.onclick = ()=>{
            this.chatElementConfigs.style.display = 'none';
            this.chatElement.style.display = 'grid';
        }
        this.chatElementConfigs.appendChild(this.back);
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
        this.guestList.appendChild(this.addGuest);
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
        this.imgInput.addEventListener('change',()=>{
            const selectedFile = event.target.files[0];
            if (selectedFile) {
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
            }
        })
        //rename group
        this.rename = document.createElement('textarea');
        this.rename.classList.add('renameGroup');
        this.rename.spellcheck = false;
        this.rename.placeholder = 'rename';
        this.rename.value = this.name;
        this.rename.addEventListener("paste", (event) => {
            const clipboardData = event.clipboardData || window.clipboardData;
            if(clipboardData.getData("text").length + this.rename.value.length > 17) {
                event.preventDefault();
                alert('texto muito grande, você só tem mais '+(17-this.rename.value.length)+' caracteres até o limite');
            }
        });
        this.rename.addEventListener("keydown", (e) =>{
            if (this.rename.value.length > 16 && e.key !== "Backspace" && e.keyCode !== 13 && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 9 && e.keyCode !== 116 && this.rename.selectionStart == this.rename.selectionEnd) {
                e.preventDefault();
            }
            if (e.key === "Enter") {
                e.preventDefault();
                if(this.rename.value.replace(/^\W+/, '') !== '') {
                    this.name = this.rename.value;
                    this.thumbName.innerText = this.name;
                    this.groupThumbBtn.lastChild.innerText = this.name;
                    this.rename.value = this.rename.value.replace(/^\W+/, '');
                }
            }
        });
        this.rename.onblur = () => {
            if(this.rename.value.replace(/^\W+/, '') !== '') {
                this.name = this.rename.value;
                this.thumbName.innerText = this.name;
                this.groupThumbBtn.lastChild.innerText = this.name;
                this.rename.value = this.rename.value.replace(/^\W+/, '');
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
        //
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
                    const newMsg = new msg(this.msgBalloon.value,null,new Date(),Zeulo,this);
                    this.msgs.push(newMsg);
                    this.msgArea.scrollTop = this.msgArea.scrollHeight;
                }
            }
        })
        this.chatElement.appendChild(this.msgBalloon);
        const newMsg = new msg('this is a very long long message just for a few tests in my web page',null,new Date(),Lucas,this);
    }
}
class msg {
    constructor(content,file,time,owner,chat){
        this.content = content.replace(/^\s+/, "").replace(/\u200E\s/g, "");
        this.file = file;
        this.time = time.getHours().toString().padStart(2, '0')+":"+new Date().getMinutes().toString().padStart(2, '0');
        this.owner = owner;
        this.chat = chat;
        this.createMsg();
    }
    createMsg(){
        this.chat.msgBalloon.value = '';
        this.msg = document.createElement('div');
        this.msg.classList.add('msg');
            //owner
            this.msgOwner = document.createElement('p');
            this.msgOwner.classList.add('msgOwner');
            this.msgOwner.innerText = this.owner.nome+' '+this.owner.sobrenome;
            this.msg.appendChild(this.msgOwner);
            //file
            if(this.file) {
                //commons
                const reader = new FileReader();
                reader.readAsDataURL(this.file);
                reader.onload = (e) => {
                    if(this.file.type.startsWith('image/')) {
                        this.msgImg = new Image();
                        this.msgImg.src = e.target.result;
                        this.msgImg.style.width = '100%';
                        this.msgImg.style.borderRadius = '0.5rem';
                        this.msg.appendChild(this.msgImg);
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
                        this.msg.appendChild(this.msgVideo);
                    } else if(this.file.type.startsWith('audio/')) {
                        this.msgAudio = document.createElement('audio');
                        this.msgAudioSource = document.createElement('source');
                        this.msgAudioSource.src = e.target.result;
                        this.msgAudio.load();
                        this.msgAudio.appendChild(this.msgAudioSource);
                        //
                        this.msgAudio.controls = true;
                        this.msg.appendChild(this.msgAudio);
                    }
                }
            }
            //emails
            function detectarEmail(texto) {
                const padrao = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
                const emailsEncontrados = texto.match(padrao);
                return emailsEncontrados;
            }
            const emails = detectarEmail(this.content);
            if (emails) {
                emails.forEach((email) =>{
                    const amails = `<a href="mailto:${email}" title="enviar email: ${email}" target="_blank">${email}</a>`;
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
            //Text Content
            this.msgTextContent = document.createElement('a');
            this.msgTextContent.classList.add('msgTextContent');
            this.msgTextContent.innerHTML = this.content;
            this.msg.appendChild(this.msgTextContent);
            //Date
            this.msgDate = document.createElement('p');
            this.msgDate.classList.add('msgDate');
            this.msgDate.innerText = this.time;
            this.msg.appendChild(this.msgDate);
        this.chat.msgArea.appendChild(this.msg);
    }
}
//criar chat
const chat1 = new chat('-1','1° chat','img/headmaster.svg',[Ricardo,Lucas,Zeulo,Alice],null,[Zeulo]);
let gn = 0;
const chats = [];
function createNew() {
    gn++;
    const newChat = new chat(gn,`grupo${gn}`,'https://static.wikia.nocookie.net/character-stats-and-profiles/images/b/b3/Gigachad.ab28dd28.png/revision/latest?cb=20230109100617',[],null,null)
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