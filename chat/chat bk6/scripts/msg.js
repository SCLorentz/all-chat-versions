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
    get getMessage() {
        return this.msg
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
                            this.audioPlayBtn.ico.onclick = () => {
                                if(this.audioPlayBtn.ico.innerText == 'play_arrow') {
                                    this.msgAudio.play();
                                    this.audioPlayBtn.ico.innerText = 'pause';
                                } else {
                                    this.msgAudio.pause();
                                    this.audioPlayBtn.ico.innerText = 'play_arrow';
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