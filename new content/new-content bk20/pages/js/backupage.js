offline = document.getElementById("offline")
setInterval(() => {
    offline.style.visibility = (navigator.onLine === false) ? "visible" : "hidden";
}, 500);
function menu() {
    document.getElementById("menu").className = "show"
    document.getElementById("menu").style.width = "80px";
    document.getElementById("menu").style.margin = "5px 0";
    document.getElementById("menu-ico").style.visibility = "hidden";
    }
function closemenu() {
    document.getElementById("menu").style.width = "0";
    document.getElementById("menu").style.margin = "0";
    document.getElementById("menu").className = "hide";
    document.getElementById("menu-ico").style.visibility = "visible";
}
function link(link, where) {
    window.open(link,where);
}
//on blur
window.addEventListener('blur',() =>{
    document.getElementById("title").innerHTML = "YouTube";
    document.getElementById("page-ico").href = "https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
});
window.addEventListener('focus',() =>{
    document.getElementById("title").innerHTML = "backup page";
    document.getElementById("page-ico").href = "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f5ff.png"
})
document.addEventListener("DOMContentLoaded", ()=> {
    //move between pages
    const back = document.getElementById('back');
    const foward = document.getElementById('foward');
    let pages = 1;
    back.onclick = () => {
        pages++
        const pagn = document.getElementById('pagn');
        move();
    }
    foward.onclick = () =>{
        if(pages > 1) {
            pages--
            const pagn = document.getElementById('pagn');
            move()
        }
    }
    function move() {
        bkontent.innerText = scbkontent[pages];
        console.clear();
        console.log(pages);
        pagn.innerText = "página "+pages;
        if(savedpag.includes(pages)) {
            bkadd.innerText = "bookmark_added";
        } else {
            bkadd.innerText = "bookmark_add";
        }
    }
    //bookmark
    const bkadd = document.getElementById('bk+');
    let savedpag = [];
    bkadd.onclick = () =>{
        if(savedpag.includes(pages)) {
            bkadd.innerText = "bookmark_add";
            let index = savedpag.indexOf(pages);
            console.clear();
            if (index !== -1) {
            savedpag.splice(index, 1);
                console.log(`${pages} removido da savedpag.`);
            } else {
                console.log(`${pages} não encontrado na savedpag.`);
            }
            console.log(savedpag);
        } else {
            bkadd.innerText = "bookmark_added";
            savedpag.push(pages);
            console.log(savedpag);
        }
    }
    let scbkontent = {
        1:"page 1",
        2:"page 2"
    };
    const edit = document.getElementById('editbtn');
    const bkontent = document.getElementById('bkontent');
    edit.onclick = () =>{
        if(edit.innerText == 'edit') {
            edit.innerText = 'edit_off';
            bkontent.contentEditable = true;
            bkontent.focus();
        } else {
            if(bkontent.innerText !== scbkontent[pages]) {
                scbkontent[pages] = bkontent.innerText;
            }
            edit.innerText = 'edit';
            bkontent.contentEditable = false;
        }
    }
    /*corrigir bug (multiplos cliques)-> bkontent.addEventListener('blur',()=>{
        edit.click();
    })*/
    const previmgbtn = document.getElementsByClassName('previmg');
    const imgdisp = document.getElementById('previmg');
    for (let i = 0; i < previmgbtn.length; i++) {
        previmgbtn[i].onclick = () =>{
            const pisrc = previmgbtn[i].src;
            //console.log(previmgbtn[i].src);
            imgdisp.src = pisrc;
        };
    }
})