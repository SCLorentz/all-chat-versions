//load
document.addEventListener("DOMContentLoaded", function() {
    const hash = window.location.hash;
    // Remover o caractere "#" do hash
    const numerosString = hash.slice(1);
    // Dividir a string em um array de números
    const numeros = numerosString.split('-').map(Number);
    if(numeros.some(num => num != 0)) {
        console.log("abrir grupo, id:",numeros);
    } else {
        console.log("nenhum grupo para abrir");
    }
    console.warn("conteudo inacabado, servidor necessario");
});
//tema windows
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('windows: Tema escuro');
} else {
    console.log('windows: Tema claro');
}
//rick astley
let rickA = new Audio("sound/rick-astley-rickrolls-you.mp3");
//navegador
const userAgent = navigator.userAgent;
console.log(userAgent);
if (userAgent.match(/(Chrome|Chromium)\//i)) {
    console.log("hello google :)");
}
//headmaster
function headmaster(event) {
    document.getElementById("title").innerHTML = "404";
    document.body.remove();
    const body = document.createElement("body");
    document.querySelector("html").appendChild(body);
    const headmasterpage = document.createElement("h1");
    headmasterpage.innerHTML = "error 404<br>headmaster not found";
    headmasterpage.style.position= "fixed";
    headmasterpage.style.width= "-webkit-fill-available";
    headmasterpage.style.height= "-webkit-fill-available";
    headmasterpage.style.display= "flex";
    headmasterpage.style.justifyContent= "center";
    headmasterpage.style.alignItems= "center";
    headmasterpage.style.textAlign= "center";
    headmasterpage.style.fontSize= "50px";
    headmasterpage.style.color = "white";
    headmasterpage.style.textShadow = "4px 4px black";
    headmasterpage.style.userSelect = "none";
    document.body.appendChild(headmasterpage);
}
//has change
window.addEventListener("hashchange", function() {
    if (window.location.hash === "#headmaster") {
        headmaster();
    }
});
//load
document.addEventListener("DOMContentLoaded", function(){
    if (window.location.hash === "#headmaster") {
        headmaster();
    }
}
);
offline = document.getElementById("offline")
setInterval(function() {
    offline.style.visibility = (navigator.onLine === false) ? "visible" : "hidden";
}, 500);
//
const d = new Date();
const hrs = d.getHours();
if (hrs>22 && hrs<24) {
    document.getElementById("titlev").innerHTML = "a mimir";
    document.getElementById("page-ico").href = "https://cdn-icons-png.flaticon.com/512/472/472529.png";
}
//menu texto
function showContextMenu(event) {
    event.preventDefault();
    // Obter as coordenadas do clique do botão direito
    const x = event.clientX;
    const y = event.clientY;
    // Obter o elemento de menu personalizado
    const customContextMenu = document.getElementById('customContextMenu');
    //obter palavra selecionada
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    // Posicionar o elemento de menu personalizado no local do clique do botão direito
    customContextMenu.style.display = 'block';
    customContextMenu.style.left = x + 'px';
    customContextMenu.style.top = (y - customContextMenu.offsetHeight) + "px";
}
// Ocultar o menu personalizado quando clicado em qualquer lugar da página
document.addEventListener('click', function() {
    const customContextMenu = document.getElementById('customContextMenu');
    customContextMenu.style.display = 'none';
});
//thumb img// modifica o titulo do elemento para a sua localização
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
    // Insira o comando a ser executado aqui
    send();
}
});
//obter comando anterior/voltar
let lastcommand = "";
let comandoatual = "";
    textarea.addEventListener("keydown", function(event) {
        if (event.key === "ArrowUp" && lastcommand !== "") {
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
    const urmsg = document.getElementById("ur-msg").value;
    const color = document.getElementById("color");
    //muda a cor do texto
    color.addEventListener('input', () => {
        const selection = window.getSelection().toString();
        const colorvalue = color.value;
        document.getElementById("ur-msg").style.color = colorvalue;
    });
    // Seu elemento de texto
    function negrito() {
        const selection = window.getSelection().toString();
        if (selection !== '') {
            //console.log("text detectado:",selection);
            const formattedText = `<strong>${selection}</strong>`;
            const subaform = document.getElementById("ur-msg").value.replace(selection, formattedText);
            document.getElementById("ur-msg").value = subaform;
        }
    };
    function italic() {
        const selection = window.getSelection().toString();
        if (selection !== '') {
            console.log("text detectado:",selection);
            const formattedText = `<i>${selection}</i>`;
            const subaform = document.getElementById("ur-msg").value.replace(selection, formattedText);
            document.getElementById("ur-msg").value = subaform;
        }
    };
//envia a mensagem
function send() {
    document.getElementById("filedownloadimg").style.display = "none";
    const textenv = document.getElementById("ur-msg").value;
    const textenvspace = textenv.replace(/^\s+/, "").replace(/\u200E\s/g, "");
    if (document.getElementById("ur-msg").value !== "" && textenvspace !== "") {
        //data
        const div = document.createElement("div");
        div.className = "send";
        const para = document.createElement("a");
        const datemsg = document.createElement("p");
        //
        const urmsg = document.getElementById("ur-msg").value;
        const textenv = urmsg.trim();
        const textenvspace = textenv.replace(/^\s+/, "").replace(/\u200E\s/g, "");

        const handlers = {
        "//": function(text) {
            para.innerHTML = text;
            //
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
            para.innerHTML = semJS;
            lastcommand = textenvspace;
        },
        "++": function(text) {
            para.textContent = text;
            para.style.fontSize = "x-large";
            para.innerHTML = textenvspace.substring(2);
        },
        "--": function(text) {
                para.textContent = text;
                para.style.fontSize = "smaller";
                para.innerHTML = textenvspace.substring(2);
        },
        "**": function(text) {
                para.style.background = "black";
                clone.style.color = "black";
                para.innerHTML = textenvspace.substring(2);
        },
        default: function(text) {
            para.textContent = text;
            para.style.fontSize = "large";
        }
        };
        //clone
        const node = document.getElementById("copy").lastChild;
        const clone = node.cloneNode(true);
        clone.style.color = "#fc852e";
        clone.style.boxshadow= "4px 4px 6px #00000057";
        div.appendChild(clone);
        //
        const prefix = urmsg.substring(0, 2);
        const handler = handlers[prefix] || handlers["default"];
        handler(textenvspace.substring(0));
        //
        if(urmsg =="page://snake-game") {
            para.innerHTML = "soon...";
        } else if(urmsg =="page://rickA.play()") {
            rickA.play();
            para.innerHTML = "I love Rick Astley <3";
        }
        const links = urmsg.match(/https?:\/\/\S+/gi);
        if (links) {
            console.log("link detectado:",links);
            links.forEach(function(link) {
                const alinks = `<a href="${link}" title="acessar: ${link}" target="_blank">${link}</a>`;
                const subalinks = para.innerHTML.replace(link, alinks);
                para.innerHTML = subalinks;
            });
        }
        //data:img
        const regexLinkBase64 = /data:image\/\w+;base64,([\w+/=]+)/;
        const match = urmsg.match(regexLinkBase64);
        if (match) {
        const base64Image = match[1];
        console.log('Link base64 detectado:',"data:image/png;base64,",base64Image);
        } else {
        console.log('Link inválido ou não é base64.');
        }
        //email
        function detectarEmail(texto) {
            const padrao = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
            const emailsEncontrados = texto.match(padrao);
            return emailsEncontrados;
        }
        // Exemplo de uso:
        const emails = detectarEmail(urmsg);
        if (emails) {
            emails.forEach(function(email) {
                const amails = `<a href="mailto:${email}" title="enviar email para: ${email}" target="_blank">${email}</a>`;
                const subamails = para.innerHTML.replace(email, amails);
                para.innerHTML = subamails;
            });
        }
        console.log(emails);
        //
        para.style.color = document.getElementById("color").value;
        datemsg.textContent = d.getHours().toString().padStart(2, '0')+":"+d.getMinutes().toString().padStart(2, '0');
        datemsg.style.fontSize = "small";
        //
        div.appendChild(para);
        para.style.position = "relative";
        //detectar grupo no qual a mensagem sera enviada
        const elementosmsgbox = document.querySelectorAll('.msgbox');
        for (let i = 0; i < elementosmsgbox.length; i++) {
            let elementmsgbox = elementosmsgbox[i];
            if (elementmsgbox.style.display === "flex") {
                console.log("Elemento com display:flex encontrado: ", elementmsgbox);
                elementmsgbox.appendChild(div);
                //scroll to the bottom
                elementmsgbox.scrollTop = elementmsgbox.scrollHeight;
            }
        }
        //
        para.appendChild(datemsg);
        document.getElementById("ur-msg").value = "";
        document.getElementById("ur-msg").style.color = "white";
        //para.href = imgPreview.src;
        if (dropzone.style.display == "none") {
            dropzone.style.display = "block";
            imgPreview.src = "";
            imgPreview.style.display = "none";
            document.getElementById("audioPreview").style.display = "none";
            document.getElementById("sourcePreview").src = "";
        }
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
let gn = 1;
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
        //group.style.boxShadow = "60px -2px 0 1px #b15c1f";
    }
    //
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
    msgelement.style.height = "calc(100% - 5px)";
    msgelement.style.flexDirection = "column";
    msgelement.style.overflow = "auto";
    msgelement.style.display = "none";
    document.getElementById("msg").appendChild(msgelement);
    //scroll to the bottom
    /*const btnbottom = document.createElement("a");
    btnbottom.style.height = "90px";
    btnbottom.style.width = "90px";
    btnbottom.style.background = "red";
    msgelement.appendChild(btnbottom);*/
    //
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
                        //console.log('Largura:', width, 'pixels');
                        //console.log('Altura:', height, 'pixels');
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
    const maxLength = 14;
    let isMaxLengthExceeded = false;
    mecinfo.addEventListener("keyup", function() {
    if (this.innerText.length > maxLength) {
        isMaxLengthExceeded = true;
    } else {
        isMaxLengthExceeded = false;
    }
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
            mecinfo.innerText = valor;
            document.documentElement.scrollTop = 0;
            //console.log("nome do grupo modificado para:"+mecinfo.innerText);
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
    groupname.style.maxWidth = "100%";
    groupname.style.minWidth = "90px";
    groupname.style.width = "100%"
    group.appendChild(groupname);
    //groupname.spellcheck = false; <-- sublinhar frases erradas
    //create del-btn
    const spandelbtn = document.createElement("span")
    const delbtn = document.createElement("a");
    spandelbtn.textContent = "delete";
    spandelbtn.className = "material-symbols-outlined";
    delbtn.className = group.className;
    delbtn.style.userSelect = "none";
    delbtn.title = "deletar grupo";
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
// adiciona o evento de arrastar e soltar na div dropzone
const dropzone = document.getElementById("ur-msg");
dropzone.ondragover = function (e) {
    e.preventDefault();
    this.classList.add("dragover");
    dropzone.style.background = "#a34f1273";
};
dropzone.ondragleave = function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
    dropzone.style.background = "transparent";
};
dropzone.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        const fileType = reader.result.split(';')[0].split('/')[1];
        console.log('Tipo de arquivo: ' + fileType);
        handleFile(file, fileType);
    };
    dropzone.style.display = "none";
        if (file.type.startsWith('image/')) {
            previewImage(file);
            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(file);
            dropzone.value = "//" + imgElement.outerHTML;
        } else if (file.type.startsWith('audio/')) {
            previewAudio(file);
        } else if (file.type.startsWith('text/') && file.type !== "text/html") {
            previewTextFile(file);
        } else if (file.type === "text/html") {
            previewHTMLFile(file);
        }else if (file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = function (e) {
                const jsonContent = e.target.result;
                try {
                    const jsonData = JSON.parse(jsonContent);
                    // Faça o processamento necessário com o objeto JSON
                    //console.log(jsonData);
                    dropzone.value = JSON.stringify(jsonData);;
                } catch (error) {
                    console.error('Erro ao ler o arquivo JSON:', error);
                }
            };
            reader.readAsText(file);
            dropzone.style.display = 'block';
        }else if(file.type === 'application/x-zip-compressed') {
            previewZipFile(file);
        } else {
            handleOtherFile(file);
        }
    function previewImage(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            const imgPreview = document.getElementById("imgPreview");
            imgPreview.src = e.target.result;
            imgPreview.style.display = "block";
            fetch(e.target.result)
                .then(response => response.blob())
                .then(blob => createImageBitmap(blob))
                .then(imageBitmap => {
                    const width = imageBitmap.width;
                    const height = imageBitmap.height;
                    //console.log('Largura:', width, 'pixels');
                    //console.log('Altura:', height, 'pixels');
                    imgPreview.style.imageRendering = (width <= 128 && height <= 128) ? "pixelated" : "unset";
                });
        };
    }
    function previewAudio(file) {
        const audio = document.getElementById("audioPreview");
        audio.style.display = "block";
        const source = document.createElement("source");
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        source.id = "sourcePreview";
        audio.appendChild(source);
        audio.controls = "true";
        dropzone.value = "//" + audio.outerHTML;
    }
    function previewTextFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            dropzone.value = content;
        };
        reader.readAsText(file);
        dropzone.style.display = "block";
    }
    function previewHTMLFile(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            dropzone.value = "//" + content;
        };
        reader.readAsText(file);
        dropzone.style.display = "block";
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
                // Obtenha o nome do arquivo
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
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = file.name;
        downloadLink.innerText = file.name;
        downloadLink.style.color = "white";
        dropzone.value = `//${downloadLink.outerHTML}`;
        document.getElementById("filedownloadimg").style.display = "block";
        //dropzone.style.display = "block";
    }
    dropzone.style.background = "transparent";
});