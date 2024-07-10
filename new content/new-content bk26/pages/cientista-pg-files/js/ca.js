function link(link, where) {
    window.open(link,where);
}
document.addEventListener("DOMContentLoaded", ()=> {
    const newspaper = document.getElementById('newspaper');
    const windowd = document.getElementById('article1');
})
function page(page, item) {
    document.getElementById('welcome').style.display = 'none';
    const pagee = document.getElementById(page);
    //console.log(pagee,":",page);
    const articles = document.querySelectorAll('article');
    articles.forEach((article) => {
        article.style.display = 'none';
    });
    pagee.style.display = 'grid';
}
function video(video) {
    document.getElementById('astv').style.display = "none";
    const elements = document.getElementsByClassName('areavideo');
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
    }
    const abtn = document.getElementsByClassName('abtn');
    for (let i = 0; i < abtn.length; i++) {
        if(abtn[i].style.background == '#01294e') {
            abtn[i].style.background = '#004b90';
        } else {
            abtn[i].style.background = '';
        }
    }
    video.style.background = '#01294e';
    document.getElementById(video.innerText).style.display = "block";
}