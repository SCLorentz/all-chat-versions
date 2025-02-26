class msg {
    constructor(content,file,time,owner,chat){
        this.content = content.replace(/^\s+/, "").replace(/\u200E\s/g, "");
        this.file = file;
        this.time = time.getHours().toString().padStart(2, '0')+":"+new Date().getMinutes().toString().padStart(2, '0');
        this.owner = owner;
        this.chat = chat;
        this.msgsLength = this.chat.msgs.length;
        this.createMsg();
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
            this.msgOwner.innerText = `${this.owner.nome} ${this.owner.sobrenome}`;
            this.msg.appendChild(this.msgOwner);
            //filePlaceHolder
            this.filePlaceHolder = document.createElement('div');
            this.filePlaceHolder.style.padding = '5px 0';
            this.msg.appendChild(this.filePlaceHolder);
            //file
            if(this.file) {
                if(this.file.type == "text/html") {
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
                } else if(this.file.type.startsWith('text/') || this.file.name.slice(-3) == '.md' || this.file.name.slice(-4) == '.jem') {
                    const textReader = new FileReader();
                    textReader.readAsText(this.file);
                    textReader.onload = (e) => {
                        this.textFileElement = document.createElement('div');
                        this.textFileElement.innerHTML = e.target.result.replace(/\n/g, '<br>');
                        this.textFileElement.style.lineBreak = 'anywhere';
                        this.filePlaceHolder.appendChild(this.textFileElement);
                    }
                } else if(this.file.type == "" || this.file.type.startsWith('application/')) {return} else {
                    const reader = new FileReader();
                    reader.readAsDataURL(this.file);
                    reader.onload = (e) => {
                        if(this.file.type.startsWith('image/')) {
                            this.msgImg = new Image();
                            this.msgImg.src = e.target.result;
                            this.filePlaceHolder.appendChild(this.msgImg);
                            this.msgImg.onclick = () => {
                                console.warn('incompleto')
                            }
                            //
                            this.filePlaceHolder.appendChild(document.createElement('div'));
                            this.filePlaceHolder.lastChild.classList.add('audioContextMenu');
                            this.filePlaceHolder.lastChild.innerText = this.file.name;
                            this.msgImg.addEventListener('contextmenu',()=>{
                                this.filePlaceHolder.lastChild.style.display = 'flex';
                                this.filePlaceHolder.lastChild.style.top = `calc(50% - ${this.filePlaceHolder.lastChild.offsetHeight/2}px)`
                            })
                        } else if(this.file.type.startsWith('video/')) {
                            this.msgVideo = document.createElement('video');
                            this.msgVideo.src = e.target.result;
                            this.msgVideo.load();
                            this.msgVideo.controls = true;
                            this.filePlaceHolder.appendChild(this.msgVideo);
                        } else if(this.file.type.startsWith('audio/')) {
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
                                this.audioContextMenu.addEventListener('mouseleave',()=> {
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
                            this.audioDownload = new googleIcon('download',['btn'],this.audioContextMenu)
                            this.audioDownload.ico.href = this.msgAudio.src;
                            this.audioDownload.ico.download = this.file.name;
                            this.audioDownload.ico.onclick = () => {
                                this.audioDownload.ico.innerText = 'download_done';
                                setTimeout(()=>{
                                    this.audioDownload.ico.innerText = 'download';
                                },3000)
                            }
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
                            this.audioTimeline.classList.add('audioTimeline');
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
                const emailsEncontrados = texto.match(/\b[A-Za-z0-9._%+-ãçõ]+@[A-Za-z0-9.-ã]+\.[A-Za-z]{2,}\b/g);
                return emailsEncontrados;
            }
            const emails = detectarEmail(this.content);
            if (emails) {
                emails.forEach(email =>{
                    const amails = `<a href="mailto:${email}" title="enviar email" target="_blank">${email}</a>`;
                    const subamails = this.content.replace(email, amails);
                    this.content = subamails;
                });
            }
            //links
            const links = this.content.match(/https?:\/\/\S+/gi);
            if (links) {
                links.forEach(link => {
                    const alinks = link.link(link);
                    const subalinks = this.content.replace(link, alinks);
                    this.content = subalinks;
                });
            }
            //data:img
            const regexLinkBase64 = /data:image\/\w+;base64,([\w+/=]+)/;
            const getImg64 = this.content.match(regexLinkBase64);
            if (getImg64) {
                const img64Innert = new Image();
                img64Innert.src = `data:image/png;base64,${getImg64[1]}`;
                this.content = this.content.replace(getImg64[1], img64Innert.outerHTML);
            }
            //text decorations
            const formatRules = [
                { regex: /\*.*?\*/g, tag: 'strong' },
                { regex: /\%.*?\%/g, tag: 'i' },
                { regex: /\--.*?\--/g, tag: 'a', style: 'text-decoration: line-through 2px;' }
            ];
            for (const rule of formatRules) {
                const matches = this.content.match(rule.regex);
                if (matches) {
                  for (const match of matches) {
                    const content = match.substring(rule.tag === 'a' ? 2 : 1, match.length - (rule.tag === 'a' ? 2 : 1));
                    this.content = this.content.replace(match, `<${rule.tag} ${rule.style ? `style='${rule.style}'` : ''}>${content}</${rule.tag}>`);
                  }
                }
            }              
            //Text Content
            this.msgTextContent = document.createElement('a');
            this.msgTextContent.classList.add('msgTextContent');
            this.msgTextContent.innerHTML = this.content;
            this.msg.appendChild(this.msgTextContent);
        this.msgDate = document.createElement('p');
        this.msgDate.classList.add('msgDate');
        this.msgDate.innerText = this.time;
        this.msg.appendChild(this.msgDate);
        this.chat.msgArea.appendChild(this.msg);
    }
}