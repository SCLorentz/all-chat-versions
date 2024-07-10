//load
//console.log(navigator.permissions);
document.addEventListener("DOMContentLoaded", () =>{
    const msgEnv = document.getElementById('msg-env');
    if (navigator.platform.match(/Win/i)) {
        msgEnv.style.display = 'none';
    }
    const hash = window.location.hash;
    // Remover o caractere "#" do hash
    const numerosString = hash.slice(1);
    // Dividir a string em um array de números
    const numeros = numerosString.split('-').map(Number);
    if(numeros.some(num => num != 0)) {
        console.log("abrir grupo, id:",numeros);
    } else {
        console.log("nenhum grupo msgballoon abrir");
    }
    console.warn("conteudo inacabado, servidor necessario");
    //ram
    if ('deviceMemory' in navigator) {
        const ramAmount = navigator.deviceMemory;
        console.log('Quantidade de RAM:', ramAmount + 'GB');
        document.getElementById("ram-display").innerText = ramAmount + 'GB';
    } else {
        console.log('Não é possível determinar a quantidade de RAM disponível.');
    }
    //tema windows 
    //console.log(window);
    const themePD = document.getElementById('get-theme-title');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themePD.innerText = 'escuro (P.D.)';
        themePD.style.background = 'black';
        themePD.style.color = 'white';
        //console.log('windows: Tema escuro');
    } else {
        //console.log('windows: Tema claro');
        themePD.innerText = 'claro (P.D.)';
        themePD.style.background = 'white';
        themePD.style.color = 'black';
    }
    //internet
    if ('connection' in navigator) {
        // (possíveis valores: 'slow-2g', '2g', '3g', '4g', ou 'unknown')
        if (navigator.connection.effectiveType === '4g' && navigator.connection.downlink > 5) {
            document.getElementById('internet-display').innerText = '4G';
        } else if (navigator.connection.effectiveType === '3g' && navigator.connection.downlink > 2) {
            document.getElementById('internet-display').innerText = '3G';
        } else {
            document.getElementById('internet-display').innerText = 'não identificado';
        }
    } else {
        console.log('A API de rede não é suportada em seu navegador');
    }
    //battery
    setInterval(function() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function(battery) {
                document.getElementById('battery-display').innerText = battery.level*100+'%';
                if(battery.charging == true) {
                    document.getElementById('battery-ico-display').innerText = 'battery_charging_full';
                } else {
                    document.getElementById('battery-ico-display').innerText = 'battery_full';
                }
            });
        } else {
            console.warn('A API Battery Status não é suportada neste navegador.');
        }
    },1000)
});
function bOrWList(e) {
    if(e.innerText === 'whitelist') {
        e.innerText = 'blacklist'
        e.style.background = 'black'
        e.style.color = 'white'
    } else {
        e.innerText = 'whitelist'
        e.style.background = 'white'
        e.style.color = 'black'
    }
}
//menu texto
function showContextMenu(event) {
    console.warn('menu removido para correção de bugs - em breve será readicionado')
}
//rick astley
let rickA = new Audio("sound/rick-astley-rickrolls-you.mp3");

offline = document.getElementById("offline")
setInterval(function() {
    offline.style.visibility = (navigator.onLine === false) ? "visible" : "hidden";
    d = new Date();
}, 500);
//
let d = new Date();
function configsmover(cfgbtn) {
    if(cfgbtn.style.rotate == "0deg" && document.getElementById("configuraçõesp").style.display == 'none') {
        cfgbtn.style.rotate = "10deg";
    }
    cfgbtn.addEventListener('mouseleave', function() {
        if(cfgbtn.style.rotate == "10deg" && document.getElementById("configuraçõesp").style.display == 'none') {
            cfgbtn.style.rotate = "0deg";
        }
    })
}
function openconfigs(cfgbtn) {
    cfgbtn.style.cursor = 'auto';
    const configscl = document.getElementById('configscl');
    cfgbtn.style.rotate = "360deg";
    const cfgpage = document.getElementById("configuraçõesp");
    cfgpage.style.display = 'grid';
    cfgpage.style.top === '0' ? '100%' : '';
    setTimeout(() => {
        cfgpage.style.top = '0';
    },100)
    configscl.onclick = function() {
        cfgbtn.style.rotate = "0deg";
        cfgpage.style.top = '100%';
        setTimeout(function() {
            cfgpage.style.display = (cfgpage.style.top === '100%') ? 'none' : 'grid';
            cfgbtn.style.cursor = 'pointer';
        },1000)
    }
}
function reportool(rpt, event) {
    const x = event.clientX + 10;
    const y = event.clientY;
    const rptt = document.getElementById('reportooltip');
    rptt.style.display = "flex";
    rptt.style.left = x + 'px';
    rptt.style.top = (y - rptt.offsetHeight) + "px";
    rpt.addEventListener('mouseleave', () => {
        rptt.style.display = "none";
    })
}
function reportEvent() {
    alert('not completed')
}
//thumb img// modifica o titulo do elemento msgballoon a sua localização
setInterval(thumb, 1000);
function thumb() {
    var x = document.getElementsByClassName("thumb-img");
    for (var i = 0; i < x.length; i++) {
        x[i].title = x[i].src;
    }
}
//detecta o uso do enter
const textarea = document.getElementById("ur-msg");
// Verifica se a tecla pressionada foi "Enter"
textarea.addEventListener("keydown", function(event) {
if (event.key === "Enter") {
    event.preventDefault();
    send();
}
});
//obter comando anterior/voltar
let lastcommand = null;
let comandoatual = "";
    textarea.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" && lastcommand !== "" && textarea.value != lastcommand ) {
            comandoatual = textarea.value;
            textarea.value = lastcommand;
            event.preventDefault();
        }
    });
    textarea.addEventListener("keydown", function(event) {
        if (event.key === "ArrowDown") {
            textarea.value = comandoatual;
            event.preventDefault();
        }
    });
    //ur-msg
    const color = document.getElementById("color");
    //muda a cor do texto
    color.addEventListener('input', () => {
        const selection = window.getSelection().toString();
        const colorvalue = color.value;
        document.getElementById("ur-msg").style.color = colorvalue;
    });
function closeImgballoon() {
    const balloon = document.getElementById('balloon');
    balloon.style = '';
    textarea.style = ''
    imgEditor.innerHTML = '';
}
//class msg {constructor(type,color,background,time){}}
//envia a mensagem
function send() {
    document.getElementById("filedownloadimg").style.display = "none";
    const textenvspace = textarea.value.replace(/^\s+/, "").replace(/\u200E\s/g, "");
    if (textarea.value !== "" && textenvspace !== "") {
        closeImgballoon();
        //data
        const div = document.createElement("div");
        div.className = "send";
        const msgballoon = document.createElement("a");
        const datemsg = document.createElement("p");
        const moreinf = document.createElement('span');
        //
        const textenv = textarea.value.trim();
        const textenvspace = textenv.replace(/^\s+/, "").replace(/\u200E\s/g, "");
        const handlers = {
        "//": function(text) {
            msgballoon.innerHTML = text;
            const textoComBody = textenvspace.substring(2);
            // Remover o conteúdo do body
            const semBody = textoComBody.replace(/<body[^>]*>((.|[\n\r])*)<\/body>/gm, "$1");
            // Remover o conteúdo do head
            const semHead = semBody.replace(/<head.*?>.*?<\/head>/gs, "");
            // Remover estilos CSS
            const semCSS = semHead.replace(/<style.*?>.*?<\/style>/gs, "");
            // Remover scripts
            const semJS = semCSS.replace(/<script.*?>.*?<\/script>/gs, "");
            //
            msgballoon.innerHTML = semJS;
            lastcommand = textenvspace;
        },
        "++": function(text) {
            msgballoon.textContent = text;
            msgballoon.style.fontSize = "x-large";
            msgballoon.innerHTML = textenvspace.substring(2);
        },
        "--": function(text) {
                msgballoon.textContent = text;
                msgballoon.style.fontSize = "smaller";
                msgballoon.innerHTML = textenvspace.substring(2);
        },
        "**": function(text) {
                msgballoon.style.background = "black";
                clone.style.color = "black";
                msgballoon.innerHTML = textenvspace.substring(2);
        },
        default: function(text) {
            msgballoon.textContent = text;
            msgballoon.style.fontSize = "large";
        }
        };
        //clone
        const node = document.getElementById("copy").lastChild;
        const clone = node.cloneNode(true);
        clone.style.color = "#fc852e";
        clone.style.boxshadow= "4px 4px 6px #00000057";
        div.appendChild(clone);
        //
        const prefix = textarea.value.substring(0, 2);
        const handler = handlers[prefix] || handlers["default"];
        handler(textenvspace.substring(0));
        if(textarea.value =="page://createGroup()") {
            const cgs = document.getElementById('createGroupSettings');
            cgs.style.display = 'grid';
            cgs.style.left = `calc(50% - ${cgs.offsetWidth/2}px)`;
            cgs.style.top = `calc(50% - ${cgs.offsetHeight/2}px)`
            const cGSEnd = document.getElementById('cGSEnd');
            cGSEnd.onclick = () => {
                cgs.style.display = 'none'
            }
        }
        const links = textarea.value.match(/https?:\/\/\S+/gi);
        if (links) {
            console.log("link detectado:",links);
            links.forEach(function(link) {
                const alinks = `<a href="${link}" title="acessar: ${link}" target="_blank">${link}</a>`;
                const subalinks = msgballoon.innerHTML.replace(link, alinks);
                msgballoon.innerHTML = subalinks;
            });
        }
        /*codigo para youtube preview --> 
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
        /*
        //data:img
        /*const regexLinkBase64 = /data:image\/\w+;base64,([\w+/=]+)/;
        const match = textarea.value.match(regexLinkBase64);
        if (match) {
        const base64Image = match[1];
        console.log('Link base64 detectado:',"data:image/png;base64,",base64Image);
        } else {
        console.log('Link inválido ou não é base64.');
        }*/
        //email
        function detectarEmail(texto) {
            const padrao = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
            const emailsEncontrados = texto.match(padrao);
            return emailsEncontrados;
        }
        // Exemplo de uso:
        const emails = detectarEmail(textarea.value);
        if (emails) {
            emails.forEach(function(email) {
                const amails = `<a href="mailto:${email}" title="enviar email msgballoon: ${email}" target="_blank">${email}</a>`;
                const subamails = msgballoon.innerHTML.replace(email, amails);
                msgballoon.innerHTML = subamails;
            });
            console.log(emails);
        }
        div.appendChild(msgballoon);
        msgballoon.style.position = "relative";
        //detectar grupo no qual a mensagem sera enviada
        const elementosmsgbox = document.querySelectorAll('.msgbox');
        let elementoEncontrado = false;
        for (let i = 0; i < elementosmsgbox.length; i++) {
            let elementmsgbox = elementosmsgbox[i];
            if (elementmsgbox.style.display === "flex") {
                //console.log("Elemento com display:flex encontrado: ", elementmsgbox);
                elementmsgbox.appendChild(div);
                //scroll to the bottom
                elementmsgbox.scrollTop = elementmsgbox.scrollHeight;
                elementoEncontrado = true;
            }
        }
        if(elementoEncontrado) {
            //
            moreinf.className = 'material-symbols-outlined';
            moreinf.textContent = 'more_horiz'
            msgballoon.appendChild(moreinf);
            moreinf.id = 'moreinf';
            //
            msgballoon.style.color = document.getElementById("color").value;
            datemsg.textContent = d.getHours().toString().padStart(2, '0')+":"+d.getMinutes().toString().padStart(2, '0');
            datemsg.style.fontSize = "small";
            //
            msgballoon.appendChild(datemsg);
            document.getElementById("ur-msg").value = "";
            document.getElementById("ur-msg").style.color = "white";
            //msgballoon.href = imgPreview.src;
            if (textarea.style.display == "none") {
                textarea.style.display = "block";//textarea.value
                imgPreview.src = "";
                imgPreview.style.display = "none";
                document.getElementById("audioPreview").style.display = "none";
                document.getElementById('videoPreview').style.display = 'none';
                //document.getElementById("sourcePreview").src = ""; <-- corrigir bug de audio
            }
            moreinf.style.left = `calc(${msgballoon.offsetWidth}px - ${moreinf.offsetWidth}px)`;
            moreinf.style.bottom = `calc(${msgballoon.offsetHeight}px - ${moreinf.offsetHeight}px)`
            //
            document.getElementById("color").value="#ffffff";
            div.style.position = "relative";
            //div.id = "recived";
            div.style.left = div.id === "recived" ? div.offsetWidth + 5 + "px" : "-" + div.offsetWidth + "px";
            div.style.transition = "all 0.3s cubic-bezier(0.8, 0.26, 0.07, 0.72) 0s";
            setTimeout(left0, 100);
            function left0() {
                div.style.left = "0";
            }
        }
        }
}
let gn = 0;
let idelement;
function createagroup() {
    // incrementa o valor de gn
    gn++;
    // cria o grupo icon
    const group = document.createElement("a");
    document.getElementById("cont").appendChild(group);
    group.className = gn;
    group.href = "#"+group.className;
    group.id = "groupico";
    group.setAttribute("translate", "no");
    //anim.
    group.style.position = "relative";
    group.style.left = "-"+group.offsetWidth + "px";
    group.style.transition = "all 0.3s cubic-bezier(0.8, 0.26, 0.07, 0.72) 0s";
    setTimeout(left0, 100);
    function left0() {
        group.style.left = "0";
    }
    group.onclick = function () {
        //group.style.background = "#a5561d"; //<-- selected group
        function toggleElementVisibility(classNames, activeClassName) {
            // Esconde todos os elementos com as classes passadas
            classNames.forEach(function(className) {
                var elements = document.getElementsByClassName(className);
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = "none";
                }
            });
            // Exibe o elemento com a classe passada como ativa
            document.getElementById(activeClassName).style.display = "flex";
            groupconfigsA.style.display = "flex";
            document.getElementById("msg").style.padding = "15px 15px 0 15px";
        }
        toggleElementVisibility(["msgbox", "msgboxconfigs"], this.className);
    }
    // cria o grupo chat
    const msgelement = document.createElement("div");
    //cria o group chat configs
    const msgelementconfigs = document.createElement("div");
    //groupconfigs
    const groupconfigsA = document.createElement("a");
    msgelement.appendChild(groupconfigsA);
    //chamada
    const videocall = document.createElement("span");
    videocall.className = "material-symbols-outlined";
    videocall.setAttribute('translate', 'no');
    videocall.innerHTML = "videocam";
    videocall.style.position = "fixed";
    videocall.style.right = "40px";
    videocall.style.cursor = "pointer";
    videocall.style.userSelect = "none";
    videocall.title = "meeting";
    groupconfigsA.appendChild(videocall);
    videocall.onclick = function() {
        window.open("pages/meeting.html","_self");
    }
    //
    const groupconfigs = document.createElement("span");
    const gcs = groupconfigs.style
    groupconfigsA.style.margin = "0 0 0 auto";
    groupconfigsA.style.height = "0";
    groupconfigsA.appendChild(groupconfigs);
    groupconfigs.className = "material-symbols-outlined";
    groupconfigs.innerHTML = "more_vert";
    groupconfigs.title = "configurações";
    gcs.position = "fixed";
    gcs.right = "10px";
    gcs.cursor = "pointer";
    gcs.userSelect = "none";
    gcs.background = "#9b511b";
    gcs.borderRadius = "0.5rem";
    groupconfigs.onclick=function() {
        //console.log(msgelement.id);
        const configsid = msgelement.id;
        //console.log(configsid);
        const configsclass = "msgboxconfigs";
        const element = document.querySelector(`[id="${configsid}"].${configsclass}`);
        if (element) {
            element.style.display = "flex";
        }
        //msgelement.style.display = "none";
        document.getElementById("msg").style.padding = "0";
        groupconfigsA.style.display = "none";
        var elements1 = document.getElementsByClassName("send");
        for (var element1 of elements1) {
            element1.style.display = "none";
        }
    }
    msgelement.className = "msgbox";
    msgelement.id = gn;
    msgelement.style.borderRadius = "0.5rem";
    msgelement.style.height = "calc(100% - 5px)";
    msgelement.style.flexDirection = "column";
    msgelement.style.overflow = "auto";
    msgelement.style.display = "none";
    document.getElementById("msg").appendChild(msgelement);
    msgelementconfigs.className = "msgboxconfigs";
    msgelementconfigs.id = gn;
    msgelementconfigs.style.height = "calc(100% - 5px)";
    msgelementconfigs.style.overflow = "auto";
    msgelementconfigs.style.display = "none";
    msgelementconfigs.style.flexWrap = "wrap";
    msgelementconfigs.style.alignContent = "flex-start";
    document.getElementById("msg").appendChild(msgelementconfigs);
    const mecab = document.createElement("span");
    mecab.innerHTML = "arrow_back_ios";
    mecab.className = "material-symbols-outlined";
    mecab.id = "mecab";
    mecab.style.userSelect = "none";
    mecab.style.cursor = "pointer";
    mecab.onclick = function () {
        const configsid = msgelement.id;
        const configsclass = "msgboxconfigs";
        const element = document.querySelector(`[id="${configsid}"].${configsclass}`);
        if(element) {
            element.style.display = "none";
            document.getElementById("msg").style.padding = "15px 15px 0px";
        }
        groupconfigsA.style.display = "flex";
        var elements1 = document.getElementsByClassName("send");
        for (var element1 of elements1) {
            element1.style.display = "flex";
        }
    }
    msgelementconfigs.appendChild(mecab);
    const meci = document.createElement("a");
    // get the image from the group
    const mecimga = document.createElement("div");
    mecimga.className = "mecimga";
    mecimga.style.display = "flex";
    mecimga.style.justifyContent= "center";
    mecimga.style.alignItems = "center";
    mecimga.style.width = "50%";
    const mecimgain = document.createElement("input");
    mecimgain.type = "file";
    mecimgain.accept = "image/*"
    mecimgain.style.display = "none";
    msgelementconfigs.appendChild(mecimgain);
    mecimga.onclick = function() {
        mecimgain.click();
        mecimgain.addEventListener("change", function(event) {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = function() {
                const imageDataURL = reader.result;
                mecimg.src = imageDataURL;
                groupimg.src = imageDataURL;
                fetch(imageDataURL)
                    .then(response => response.blob())
                    .then(blob => createImageBitmap(blob))
                    .then(imageBitmap => {
                        const width = imageBitmap.width;
                        const height = imageBitmap.height;
                        mecimg.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                        groupimg.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                    });
            };
            }
        });
    }
    //edit img
    const mecimgedit = document.createElement("span");
    mecimgedit.className = "material-symbols-outlined";
    mecimgedit.textContent = "edit";
    mecimgedit.setAttribute('translate', 'no');
    mecimgedit.style.position = "fixed";
    mecimga.appendChild(mecimgedit);
    const mecimg = document.createElement("img");
    mecimg.src = "img/newgroup.webp";
    mecimg.style.width = "100%";
    mecimga.appendChild(mecimg);
    //info
    const infomenu = document.createElement("div");
    infomenu.className = "infomenu";
    //infomenu.innerText = "configurações";
    infomenu.style.display = "flex";
    infomenu.style.flexDirection = "column";
    infomenu.style.padding = "5px";
    const mecinfo  = document.createElement("h1");
    mecinfo.textContent = "group "+gn;
    mecinfo.id = "mecinfo";
    mecinfo.title = "edit group name";
    mecinfo.style.margin= "0 0 10px 0";
    const popupalert = document.getElementById("popup-alert");
    //<span class="material-symbols-outlined">sleep</span>
    let mis = mecinfo.textContent;
    mecinfo.onclick = function() {
        mecinfo.contentEditable = true;
        mecinfo.focus();
        const selecao = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(mecinfo);
        selecao.removeAllRanges();
        selecao.addRange(range);
        mecinfo.onblur = function() {
            if(mecinfo.innerText !== "") {
                rename();
                mecinfo.contentEditable = false;
            } else {
                mecinfo.innerText = groupname.textContent;
            }
        }
        mecinfo.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                if(mecinfo.innerText !== "") {
                    mecinfo.contentEditable = false;
                    rename();
                }
            }
        });
    //edit-btn limite de caracteres
    const maxLength = 20;
    let isMaxLengthExceeded = false;
    mecinfo.addEventListener("keyup", function() {
        isMaxLengthExceeded = (this.innerText.length > maxLength) ? true : false;
    });
    document.addEventListener("keydown", function(event) {
    if (isMaxLengthExceeded && event.key !== "Backspace") {
        event.preventDefault();
    }
    });
    function rename() {
        const delexced = mecinfo.innerText.substring(0, maxLength);
        const valor = delexced.replace(/^\W+/, '');
        if (mis !== valor && valor !== "") {
            popupalert.style.position = "relative";
            popupalert.style.transition = "none";
            popupalert.style.display = "flex";
            popupalert.style.top = "-"+popupalert.offsetWidth + "px";
            setTimeout(top0, 100);
            function top0() {
                popupalert.style.transition = "all 0.3s cubic-bezier(0.8, 0.26, 0.07, 0.72) 0s";
                popupalert.style.top = "0";
                setTimeout(function() {
                    popupalert.style.top = "-"+popupalert.offsetWidth + "px";
                    setTimeout(function() {
                        popupalert.style.display = "none";
                    },300)
                }, 1000);
            }
            popupalert.innerHTML = "grupo renomeado!";
            //console.log(valor);
            mis = valor;
            groupname.textContent = valor;
            if(groupname.offsetWidth+groupimg.offsetWidth > group.offsetWidth-20) {
                groupname.innerText = valor.slice(0, valor.length - 3)+"...";
            }

            mecinfo.innerText = valor;
            document.documentElement.scrollTop = 0;
            //console.log("nome do grupo modificado msgballoon:"+mecinfo.innerText);
        } else {
            if(valor === "") {
                mecinfo.textContent = groupname.textContent;
            }
            mecinfo.focus();
        }
    }
    }
    msgelementconfigs.appendChild(mecimga);
    msgelementconfigs.appendChild(infomenu);
    infomenu.appendChild(mecinfo);
    //meci --> msg elements configs id
    meci.innerHTML = "config id: "+msgelementconfigs.id;
    infomenu.appendChild(meci);
    //msgelement.appendChild("btnbottom");
    //msg banidas
    const gEWordsBlackList = document.createElement('textarea');
    gEWordsBlackList.placeholder = 'bad words';
    gEWordsBlackList.type = 'text';
    gEWordsBlackList.style.resize= "none";
    gEWordsBlackList.style.height = '100px';
    gEWordsBlackList.addEventListener('input', () => {
        gEWordsBlackList.value = gEWordsBlackList.value.replace(/ /g, gEWordsBlackList.value.replace(/ /g, "") !== "" ? "\n" : "");
    })
    infomenu.appendChild(gEWordsBlackList);
    //group title id
    const grouptitle = document.createElement("a");
    grouptitle.textContent = "group id: "+ msgelement.id;
    msgelement.appendChild(grouptitle);
    grouptitle.style.marginBottom= "10px";
    // cria a imagem
    const groupimg = document.createElement("img");
    groupimg.src = "img/newgroup.webp";
    groupimg.className = "thumb-img";
    groupimg.style.objectFit = "cover";
    group.appendChild(groupimg);
    // cria o nome do grupo
    const groupname = document.createElement("a");
    groupname.textContent = "new group " + gn;
    groupname.style.cursor = "pointer";
    groupname.style.outline = "0";
    groupname.style.textDecoration = "none";
    groupname.style.color = "white";
    groupname.style.width = "100%"
    group.appendChild(groupname);
    //groupname.spellcheck = false; <-- sublinhar frases erradas
    //create del-btn
    const spandelbtn = document.createElement("span")
    const delbtn = document.createElement("a");
    spandelbtn.textContent = "delete";
    spandelbtn.className = "material-symbols-outlined";
    spandelbtn.setAttribute('translate', 'no');
    delbtn.className = group.className;
    delbtn.style.userSelect = "none";
    delbtn.title = "burn everything";
    msgelementconfigs.appendChild(delbtn);
    delbtn.appendChild(spandelbtn);
    delbtn.style.cursor = "pointer";
    delbtn.style.margin = "0 0 0 auto";
    delbtn.style.height = "fit-content";
    delbtn.onclick = function() {
        if (confirm("deseja apagar este grupo?") == true) {
            //anim.
            group.style.transition = "all 0.3s cubic-bezier(0.8, 0.26, 0.07, 0.72) 0s";
            group.style.position = "relative";
            group.style.left = "-"+group.offsetWidth + "px";
            setTimeout(del, 300);
            idelement1 = this.className;
            function del() {
                location.hash = "";
                group.remove();
                document.getElementById(idelement1).remove();
                const configsid = idelement1;
                const configsclass = "msgboxconfigs";
                const element = document.querySelector(`[id="${configsid}"].${configsclass}`);
                document.getElementById("msg").style.padding = "15px 15px 0px";
                if (element) {
                    element.remove();
                }
            }
        }
    }
}
function addperson() {
    const usercont = document.createElement("a")
    document.getElementById("cont").appendChild(usercont);
    //usercont.className = gn;
    usercont.id = "contpico";
    usercont.setAttribute("translate", "no");
    // cria a imagem
    const contimg = document.createElement("img");
    contimg.src = "img/user.png";
    contimg.className = "thumb-img";
    usercont.appendChild(contimg);
    // cria o nome do contato
    const contname = document.createElement("a");
    //contname.textContent = "new cont." + gn;
    contname.textContent = "new cont.";
    contname.style.cursor = "pointer";
    contname.style.outline = "0";
    contname.style.textDecoration = "none";
    contname.style.color = "white";
    usercont.appendChild(contname);
}
// adiciona o evento de arrastar e soltar na div textarea
textarea.ondragover = function (e) {
    e.preventDefault();
    this.classList.add("dragover");
    textarea.style.background = "#a34f1273";
};
textarea.ondragleave = function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
    textarea.style.background = "none";
    textarea.style.background = "transparent";
};
function imgMenu(event, element) {
    event.preventDefault()
    const x = event.clientX;
    const y = event.clientY;
    const imgMenu = document.getElementById('imgMenu');
    imgMenu.style.display = 'flex';
    imgMenu.style.left = x + 'px';
    imgMenu.style.top = y + 'px';
    const imageDownload = document.getElementById('imageDownload');
    const name = document.getElementById('imageName');
    name.innerText = element.firstElementChild.dataset.info;
    imageDownload.href = element.firstElementChild.src;
    imageDownload.download = element.firstElementChild.dataset.info;
    //incompleto (no lugar errado) --> element.firstElementChild.style.imageRendering = imgPrev.style.imageRendering
    element.addEventListener('mouseover', () => mouseSobreObjeto = true);
    element.addEventListener('mouseout', () => mouseSobreObjeto = false);
    imgMenu.addEventListener('mouseover', () => mouseSobreObjetoT = true);
    imgMenu.addEventListener('mouseout', () => mouseSobreObjetoT = false);
    const hideMenu = () => {
    setTimeout(() => {
        if (!mouseSobreObjeto && !mouseSobreObjetoT) {
        imgMenu.style.display = 'none';
        }
    }, 1500);
    };
    imgMenu.addEventListener('mouseleave', hideMenu);
    element.addEventListener('mouseleave', hideMenu);

    document.addEventListener('click',()=>{
        imgMenu.style.display = 'none'
    })
    const elementosmsgbox = document.querySelectorAll('.msgbox');
    for (let i = 0; i < elementosmsgbox.length; i++) {
        let elementmsgbox = elementosmsgbox[i];
        if (elementmsgbox.style.display === "flex") {
            document.getElementById(i).addEventListener('scroll',()=>{
                imgMenu.style.display = 'none'
            })
        }
    }
}
function imgOpen(element) {
    console.log(element.firstElementChild.src)
}
textarea.addEventListener("drop", function (e) {
    e.preventDefault();
    textarea.style.background = "";
    this.classList.remove("dragover");
    console.log(e.dataTransfer.files.length);
    for (let i = 0; i < e.dataTransfer.files.length; i++) {
        const file = e.dataTransfer.files[i];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            const fileType = reader.result.split(';')[0].split('/')[1];
            console.log('Tipo de arquivo: ' + fileType);
        };
            if (file.type.startsWith('image/')) {
                previewImage(file);
                const imgElement = document.createElement("img");
                imgElement.src = URL.createObjectURL(file);
                //toDataURL() <-- create canvas URLs
                imgElement.dataset.info = file.name;
                imgElement.style.maxWidth= '300px';
                imgElement.style.minWidth= '250px';
                imgElement.draggable = false;
                if(textarea.value == '') {
                    textarea.value = "//" + `<a onclick='imgOpen(this)' oncontextmenu='imgMenu(event, this)' style='user-select:none;cursor:pointer;max-width: 300px;'>${imgElement.outerHTML}</a>`;
                } else {
                    textarea.value = textarea.value+`<a onclick='imgOpen(this)' oncontextmenu='imgMenu(event, this)' style='user-select:none;cursor:pointer;'>${imgElement.outerHTML}</a>`;
                }
            } else if (file.type.startsWith('audio/')) {
                previewAudio(file);
            }else if(file.type.startsWith('video/')){
                previewVideo(file)
            } else if (file.type === "text/html") {
                previewHTMLFile(file);
            }else if (file.type.startsWith('text/') || file.name.slice(-3) == '.md' || file.name.slice(-4) == '.jem') {
                if(file.type !== "text/html") {
                    previewTextFile(file);
                }
            } else if (file.type === 'application/json') {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const jsonContent = e.target.result;
                    try {
                        const jsonData = JSON.parse(jsonContent);
                        //console.log(jsonData);
                        textarea.value = JSON.stringify(jsonData);
                    } catch (error) {
                        console.error('Erro ao ler o arquivo JSON:', error);
                    }
                };
                reader.readAsText(file);
                textarea.style.display = 'block';
            }else if(file.type === 'application/x-zip-compressed') {
                previewZipFile(file);
            } else {
                handleOtherFile(file);
            }
    }
        // file.type === 'video/webm' <-- webm = video
    function previewImage(file) {
        const msg = document.getElementById('msg');
        const imgEditor = document.getElementById('imgEditor');
        imgEditor.style.display = 'flex';

        //msg.style.gridTemplateRows = '0fr 1fr';
        
        const balloon = document.getElementById('balloon');
        balloon.style.gridTemplateColumns = '1fr';
        balloon.style.gridTemplateRows = "85% 15%";
        balloon.style.padding = '0';
        balloon.style.position = 'absolute';
        balloon.style.top = 'calc(100% - 500px)'
        balloon.style.height = '500px';
        balloon.style.width = `calc(${msg.offsetWidth}px - 30px)`;

        textarea.style.gridArea = '2 / 1 / 3 / 2';
        textarea.style.background = '#0000003F';
        textarea.style.borderTop = '2px #152423 solid'

        color.style.display = 'none';

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            const imgPreview = document.createElement('canvas');
            imgEditor.appendChild(imgPreview);
            imgPreview.id = "imgPreview";

            var image = new Image();
            image.src = e.target.result;
            
            var context2d = imgPreview.getContext('2d');

            image.onload = function () {
                imgPreview.width = image.width;
                imgPreview.height = image.height;
                // Desenhe a imagem no canvas
                context2d.drawImage(image, 0, 0,image.width,image.height,0,0,imgPreview.width,imgPreview.height);
            };

            imgPreview.style.display = "block";
            //imgPreview.alt = file.name; <-- add this in the image sending
            
            fetch(e.target.result)
                .then(response => response.blob())
                .then(blob => createImageBitmap(blob))
                .then(imageBitmap => {
                    const width = imageBitmap.width;
                    const height = imageBitmap.height;
                    imgPreview.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                });
        };
    }
    //
    function previewAudio(file) {
        const audio = document.getElementById('audioPreview');
        const source = document.getElementById('audioPreviewS')
        audio.style.display = 'block'
        source.src = URL.createObjectURL(file);
        source.type = file.type
        audio.load()
        textarea.value = "//" + audio.outerHTML;
    }
    function previewVideo(file) {
        const video = document.getElementById('videoPreview');
        const source = document.getElementById('videoPreviewS')
        video.style.display = 'block'
        source.src = URL.createObjectURL(file);
        source.type = file.type
        video.load()
        textarea.value = "//" + video.outerHTML;
    }
    function previewTextFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result.replace(/\n/g, '<br>');
            if(textarea.value == '') {
                const clips = document.createElement('img')
                clips.src = 'img/clip-svgrepo-com.svg';
                clips.style.width = '40px';
                clips.style.position = 'absolute';
                clips.style.top = '-8px';
                textarea.value = `//<div style='background: #152423;position: relative;padding: 5px;border-radius: 0.5rem;'>${clips.outerHTML}<br><br><a title='download' style='color:white;background: #223937;padding: 0 5px;border-radius: 0.3rem;' href='${URL.createObjectURL(file)}' download="${file.name}">${file.name}<\a><br><a>"${content}"<\a><\div>`;
            } else {
                const textareaValue = textarea.value;
                if(textarea.value.substring(0,2) == '//') {
                    textarea.value = textareaValue + `<br><div style='background: #152423;position: relative;padding: 5px;border-radius: 0.5rem;'><a title='download' style='color:white;background: #223937;padding: 0 5px;border-radius: 0.3rem;' href='${URL.createObjectURL(file)}' download="${file.name}">${file.name}<\a><br><a>"${content}"<\a><\div>`;
                } else {
                    textarea.value = '//'+ textareaValue + `<br><div style='background: #152423;position: relative;padding: 5px;border-radius: 0.5rem;'><a title='download' style='color:white;background: #223937;padding: 0 5px;border-radius: 0.3rem;' href='${URL.createObjectURL(file)}' download="${file.name}">${file.name}<\a><br><a>"${content}"<\a><\div>`;
                }
            }
        };
        reader.readAsText(file);
        textarea.style.display = "block";
    }
    function previewHTMLFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            const previewLink = document.createElement('a');
            /*const tmpElement = document.createElement('div')
            tmpElement.innerHTML = e.target.result;
            const favicon = tmpElement.querySelector('link[rel="icon"]');
            const faviconURL = favicon.href;
            console.log(faviconURL)
            obter o favicon da pagina (incompleto)
            */
            const blob = new Blob([content], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            if(textarea.value == '') {
                textarea.value = `//<div style='display: flex;flex-direction: column;'><a class='htmlTitle' href="${url}" download='${file.name}' style='color:white' title='download'>${file.name}</a><iframe src='${url}' height="300" width="500" class='htmlFrme'></iframe><a href='${url}' target="_blank"><span id='htmlFullSize' class="material-symbols-outlined">open_in_new</span></a></div>`;
            } else {
                const textareaValue = textarea.value;
                if(textarea.value.substring(0,2) == '//') {
                    textarea.value = textareaValue+`<br><div style='display: flex;flex-direction: column;'><a class='htmlTitle' href="${url}" download='${file.name}' style='color:white' title='download'>${file.name}</a><iframe src='${url}' height="200" width="300" class='htmlFrme'></iframe><a href='${url}' target="_blank"><span id='htmlFullSize' class="material-symbols-outlined">open_in_new</span></a></div>`;
                } else {
                    textarea.value = "//"+textareaValue+`<br><div style='display: flex;flex-direction: column;'><a class='htmlTitle' href="${url}" download='${file.name}' style='color:white' title='download'>${file.name}</a><iframe src='${url}' height="200" width="300" class='htmlFrme'></iframe><a href='${url}' target="_blank"><span id='htmlFullSize' class="material-symbols-outlined">open_in_new</span></a></div>`;
                }
            }
        };
        reader.readAsText(file);
        textarea.style.display = 'block';
      }
    function previewZipFile(file) {
        // Crie uma instância do objeto JSZip
        var zip = new JSZip();
        // Carregue o arquivo .zip
        JSZip.loadAsync(file) // 'file' é o objeto File do arquivo .zip
        .then(function (zip) {
            // Acesso aos arquivos no .zip
            zip.forEach(function (relativePath, file) {
            // Verifique se é um arquivo (não uma pasta)
            if (!file.dir) {
                var fileName = file.name;
                // Leia o conteúdo do arquivo
                file.async("text").then(function (content) {
                // Faça algo com o conteúdo do arquivo
                console.log("Arquivo:", fileName);
                console.log("Conteúdo:", content);
                });
            }
            });
        }).catch(function (error) {
            console.log("Erro ao ler o arquivo .zip:", error);
        });
        handleOtherFile(file);
    }
    function handleOtherFile(file) {
        textarea.style.display = 'block';
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        downloadLink.innerText = file.name;
        downloadLink.style.color = "white";
        downloadLink.style.background = '#223937';
        downloadLink.style.padding = '0 5px';
        downloadLink.style.borderRadius= '0.3rem';
        downloadLink.title = 'download';
        downloadLink.style.margin = '0px 5px 0 0';
        //document.getElementById("filedownloadimg").style.display = "block";
        if(textarea.value == '') {
            const clips = document.createElement('img')
            clips.src = 'img/clip-svgrepo-com.svg';
            clips.style.width = '40px';
            clips.style.position = 'absolute';
            clips.style.top = '-8px';
            textarea.value = `//${downloadLink.outerHTML}`;
        } else {
            const textareaValue = textarea.value;
            if(textarea.value.substring(0,2) == '//') {
                textarea.value = textareaValue+`${downloadLink.outerHTML}`;
            } else {
                textarea.value = '//'+textareaValue+`${downloadLink.outerHTML}`;
            }
        }
    }
    
});
//detector de palavrões
let ldpalavrões = {
    A: {
        synonyms: ["A", "a", "λ","Ꜳ", "ɋ", "@", "∀", "Α", "α", "Δ", "∆", "Λ", "λ", "Ἃ", "Ἇ", "ά", "ᾰ", "Ᾰ", "Ά", "₳"],
        value: "A"
      },
      B: {
        synonyms: ["B", "b", "฿", "₿", "Β", "β"],
        value: "B"
      },
      C: {
        synonyms: ["C", "c", "ç", "©", "℃", "Ⅽ", "ↅ", "Ↄ", "ⅽ", "⊑", "⊂", "⊏", "⊐", "⊉", "⊆", "⊇", "⊊", "⊋", "∁", "ↄ", "Ↄ", "⊈", "⋤", "⋥", "ς", "₡", "¢", "₠"],
        value: "C"
      },
      D:{
        synonyms: ["D","d","Ⅾ","Đ","Ð","đ","₫"],
        value: "D"
      },
      E:{
        synonyms: ["E","e","é","£","3","Ɛ","∃","∄","∈","∋","Ě","Ĕ","&","⋻","⋸","⋵","⋲","⋳","⋶","⋹","⋿","Ε","ε","Ἓ","Ἕ","ὲ","έ","Έ","έ","Σ","϶","ϵ","ξ","₠","€"],
        value: "E"
      },
      F:{
        synonyms: ["F","f","℉","₣","ℱ","Ꞙ","ꝼ","ⅎ","ꜰ","ꟻ"],
        value: "F"
      },
      G:{
        synonyms: ["G","g","Ĝ","Ğ","Ģ","ℊ","ǥ","ģ","ĝ","ğ","₲","Ḡ","Ǧ","ǧ"],
        value: "G"
      },
      H:{
        synonyms: ["H","h","Ħ","ħ","ɧ","ɦ","Η","ⱨ"],
        value: "H"
      },
      I:{
        synonyms: ["I","i","!","1","|","ⅾ","¡","Ι","ι","ⅰ","ⅼ","Ⅰ","∣"],
        value: "I"
      },
      J:{
        synonyms: ["J","j","ȷ","ʝ","ɉ","ʲ","ʆ ","ʄ"],
        value: "J"
      },
      K:{
        synonyms: ["k","ĸ","Κ","κ","₭","Ⲕ"],
        value: "K"
      },
      L:{
        synonyms: ["l","1","|","Ⅼ","∟"],
        value: "L"
      },
      M:{
        synonyms: ["m","Ⅿ","ⅿ","ɱ","Σ","Μ","ℳ","₥","Ṃ","Ṁ"],
        value: "M"
      },
      N:{
        synonyms: ["n","Ν","₦","η"],
        value: "N"
      },
      O:{
        synonyms: ["O","ʘ","o","0","◯","⊘","⊙","⊖","⊜","⊛","⊕","⨀","⨁","Ø","Ο","ο","ϴ","Ὸ","Ό","ὁ","Ὁ","Φ","σ","φ","ὄ","Ὄ","Ὂ","ὂ"],
        value: "O"
      },
      P:{
        synonyms: ["P","p","℗","₱","₽","Ρ","ρ"],
        value: "P"
      },
      Q:{
        synonyms: ["Q","ℚ","Ɋ","q","ʠ"],
        value: "Q"
      },
      R:{
        synonyms: ["R","r","Π","π","®"],
        value: "R"
      },
      S:{
        synonyms: ["S","s","§","₷","₴","$","Γ"],
        value: "S"
      },
      T:{
        synonyms: ["T","t","⊥","⊤","⊢","⊣","Τ","τ","7"],
        value: "T"
      },
      U:{
        synonyms: ["U","u","⋃","⋂","⊔","⊍","⊌","⊎","⨃","⨄","υ","Ω","ύ","Ὧ","ᾩ","ᾭ","Ὣ","μ"],
        value: "U"
      },
      V:{
        synonyms: ["V","v","ν","ν","ѵ","Ѵ","∨","√","ⱱ","ṿ"],
        value: "V"
      },
      W:{
        synonyms: ["W","w","₩","ὣ","ῳ"],
        value: "W"
      },
      X:{
        synonyms: ["X","x","Ⅹ","⨉","Χ"],
        value: "X"
      },
      Y:{
        synonyms: ["Y","y","γ","Ψ","Ὑ","Υ"],
        value: "Y"
      },
      Z:{
        synonyms: ["Z","z","Ζ","₴"],
        value: "Z"
      },
}

let wordsblk = {
    
}
function intext() {
    let word = '';
    let palavrõesl = '';
    let pd = '';
    for (let i = 0; i < textarea.value.length; i++) {
        word = textarea.value.charAt(i)
        let encontrado = false;
        for (let chave in ldpalavrões) {
            if (ldpalavrões[chave].synonyms.includes(word)) {
                //console.log(word);
                encontrado = true;
                pd = pd+(ldpalavrões[chave].value);
                break;
            }
        }
        if (!encontrado) {
            console.log('n');
        } else {
            if(pd == "ME") {
                console.log('me encontrado')
            }
        }
    }
    console.log(pd);
}