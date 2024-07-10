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
    constructor(id,name,thumb,guests,bannedWords){
        this.id = id;
        this.name = name;
        this.thumb = thumb;
        this.guests = guests;
        this.guestsLength = guests.length;
        this.bannedWords = bannedWords;
        this.createChat();
        this.createChatConfigs();
        this.createThumb();
    }
    createChat() {
        this.chatElement = document.createElement('div');
        this.chatElement.id = this.id;
        this.chatElement.classList.add('chat','chatMenu');
        //Chat style
        this.chatElement.style.display = 'none';
        document.body.appendChild(this.chatElement);
        //thumb
        this.thumbDiv = document.createElement('div');
        this.thumbDiv.classList.add('thumbDiv');
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
        //video call
        this.call = document.createElement('span');
        this.call.classList.add('material-symbols-outlined','btn');
        this.call.innerText = 'videocam';
        this.call.style.margin= '0 0 0 auto';
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
        this.groupThumbBtn.innerHTML = `
        <img src="${this.thumb}">
        <h3>${this.name}</h3>`;
        this.groupThumbBtn.onclick = ()=>{
            const elementos = document.querySelectorAll('.chat, .chatConfigs');
            elementos.forEach(elemento => {
                elemento.style.display = 'none';
            });
            this.chatElement.style.display = 'block';
            this.chatElementConfigs.style.display = 'none';
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
            this.chatElement.style.display = 'block';
        }
        this.chatElementConfigs.appendChild(this.back);
    }
    createGuestList(){
        this.guestList = document.createElement('div');
        this.guestList.classList.add('guestList');
        this.guestList.innerHTML = '<h3>guests</h3>';
        //guests names
        for(let i = 0; i<this.guestsLength; i++){
            this.guestList.innerHTML = this.guestList.innerHTML+`<a class='guestInList'><img src='${this.guests[i].img}'>${this.guests[i].nome} ${this.guests[i].sobrenome}<p class='removeGuest' onclick='alert("a")'>x</p></a>`;
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
        //rename group
        this.rename = document.createElement('textarea');
        this.rename.classList.add('renameGroup');
        this.rename.placeholder = 'rename';
        this.rename.value = this.name;
        this.rename.addEventListener("keydown", (event) =>{
            if (event.key === "Enter") {
                event.preventDefault();
                this.name = this.rename.value;
                this.thumbName.innerText = this.name;
                this.groupThumbBtn.lastChild.innerText = this.name;
            }
        });
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
        this.banWordList.classList.add('banWordList')
        this.chatElementConfigs.appendChild(this.banWordList);
    }
}
const chat1 = new chat('0','1° chat','https://static.wikia.nocookie.net/character-stats-and-profiles/images/b/b3/Gigachad.ab28dd28.png/revision/latest?cb=20230109100617',[Ricardo,Lucas,Zeulo],null)

let gn = 0;
const chats = [];
function createNewGroup() {
    gn++;
    const newChat = new chat(gn,`grupo${gn}`,'https://static.wikia.nocookie.net/character-stats-and-profiles/images/b/b3/Gigachad.ab28dd28.png/revision/latest?cb=20230109100617',[],null)
    chats.push(newChat);
}