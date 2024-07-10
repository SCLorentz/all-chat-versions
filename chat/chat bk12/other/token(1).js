function simplificaTexto(texto) {
    let resultado = '';
    let i = 0;
    while (i < texto.length) {
        let padrao = texto.substring(i, i + 2);
        let count = 1;
        while (texto.substring(i, i + padrao.length) === texto.substring(i + padrao.length, i + 2 * padrao.length)) {
            i += padrao.length;
            count++;
        }
        if (count >= 4) {
            resultado += "§"+ count + texto.substring(i, i + padrao.length) + '§';
        } else {
            resultado += texto.substring(i, i + padrao.length);
        }
        i += padrao.length;
    }
    return resultado.trim();
}
//tokens
function tokenizarFrase(frase, tokens) {
    // Substituindo os tokens na frase
    var fraseTokenizada = frase;
    for (var [token, valor] of tokens) {
        var re = new RegExp(token, 'g');
        fraseTokenizada = fraseTokenizada.replace(re, valor);
    }
    return fraseTokenizada;
}
// Testando a função
var frase = "2 😴😴😴😴JP: é uma roupa q faz vc sentir as coisas do jogo JP: se eu tomo um tiro eu sinto E vc morre ??? JP: nn Eu sei kwkwkakqkka Camila Braba : Ata kkk JP: eu já testei JP: e é muito realista Que toppp Camila Braba : Vc já tomou um tiro? JP: nn Camila Braba : Ué kk JP: mas dá para pensar como é a sensação Camila Braba : Legal JP: vc nn precisa ter tomado uma facada para saber como é tomar uma facada JP: a mesma coisa com uma bala JP: tambem da para sentir a sensação do sangue escorrendo, de cura, explosão e etc Camila Braba : Mano Mano muito legal Amei Camila Braba : Kkk gnt tem alguma coisa pra terça? JP: Aula normal JP: Mas se vc tiver segunda chamada tem de mat e inglês 𝕷𝖆𝖚𝖗𝖆💌: Acho que nn 𝕷𝖆𝖚𝖗𝖆💌: Tem q ver na agenda JP: Eu vi Leonardo F. Andreozzi: Alguém tem os dias da recuperação ? Moisas Gomesplay: 30/11 à 06/12 a rec é só prova? ou tem mais coisa 𝕷𝖆𝖚𝖗𝖆💌: So prova Minotauro: Tenta ver os pontos acumulados, se vc passar neles a média praticamente não vale nada Minotauro: Se vc passar nos pontos acumulados e não na média a escola disponibiliza eu reforço para tirar sua nota vermelha do boletim Minotauro: Mas não é obrigatório bgdaaa Outra coisa que dia é a recuperação????? De italiano isso em branco sao as aulas??? Ou nn tem aula so a prova mesmo Opressora: Eu e o fred tensos pra festa do atleta qria ter ido 🥹🥹 𝕷𝖆𝖚𝖗𝖆💌: Qria tbbbb😭 Gente me passa a foto da 2 chamada pls Opressora: Bahia na Z4 Pudim: Tá com jogo a menos Minotauro: KKKKKK PARA O BAHIA??? Minotauro: E ainda lá no Itaquera Frencio: Só estou esperando Ricardo Eloy falar Minotauro: Mesma coisa kakaka Zacsofone 🎷: Tô sem acreditar pqp kkk Zacsofone 🎷: Nunca mais falo do bahia😴😴 Minotauro: Isso não posso prometer Zacsofone 🎷: É... Opressora: @~Portella❤️ @Valentina H. Azevedo Opressora: É o Corinthians meu Opressora: Era óbvio que o Bahia ia solar Minotauro: Aham kkkkk Minotauro: Mano eu esperava 2x0 para o Corinthians kk Opressora: O Corinthians só perde Opressora: Eu não Minotauro: Mas a tropa do Ricardo me surpreendeu Opressora: Tá maluco Minotauro: Mano mas era dentro de casa Minotauro: Tinha tudo para o Corinthians ganhar Opressora: O Corinthians outro dia perdeu pro Flamengo na Neo Química Arena Minotauro: Blz para o FLAMENGO kakakaka Minotauro: Bahia é time super decadente, mas o Corinthians superou Opressora: O Corinthians empatou com o Galo, América e Santos em casa Minotauro: Blz Minotauro: Mas mano era o Bahia Minotauro: Independente se é melhor ou pior que esses aí Opressora: É Valentina H. Azevedo: clbc Valentina H. Azevedo: paro Minotauro: Kkkkkk tenho uma coisa a falar Vão a merda Pudim: Pse Pudim: Geral treme contra o esquadrão de aço Opressora: Gnt amanhã tem estendido? Camila Braba : Sim G Opressora: Af Opressora: Att obg Ruan 🫶 Também Te amo Opressora: Meu Deus Frencio: ata amo essa sala diva que vou sentir saudades Oi gnt E vai curintiaaaaaaaaaaaaaaa Camila Braba : Eeeeee Camila Braba : ❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️ gente acho que eu esqueci meu chrome na escola algm sabe se tem problema? Minotauro: Puts Minotauro: Onde vc esqueceu? 𝕷𝖆𝖚𝖗𝖆💌: Tem 𝕷𝖆𝖚𝖗𝖆💌: Pq o ti n vai pegar 𝕷𝖆𝖚𝖗𝖆💌: Vai ficar lá perdida o 𝕷𝖆𝖚𝖗𝖆💌: Mentira eu n sei mas acho que eles n pegam nn, mas algm guarda É isso??? acho q em emabaixo da mesa é oq eu te falei eu preciso tirar 6,4 obvio que faz vc precisa recuperar obv que nao Zacsofone 🎷: N é isso n, eu precisava tirar 8.8, tirei 7 na prova, mas na recuperação preciso tirar 6.9, n sei fazer a conta, mas manda uma mensagem uma mensagem pra laura(diretora)q ela calcula pra vc vc mandou msgm p ela por Onde???? Zacsofone 🎷: No moodle nao to achando Esse???? Opressora: Vai na barra lateral do moodle Opressora: Lá vai ter um negócio pra vc falar com a orientação Onde tem isso Onde hein Opressora: É uma seta azul que fica do lado Ue o meu nn tem Opressora: Entra em algum bloco de alguma matéria ACHEI GENIA MTO OBGFA Opressora: Dnd Laura ou valentina Ou qualquer pessoa que saiba italiano Me ensina pfvr😭 Para para Melissa ela tirou 10 Kakak gnt na rec tem q ir de uniforme né? Camila Braba : Ss Minotauro: Acho que ss Opressora: Sem or Zacsofone 🎷: O @Vivem R. Leão , q videos são esses? E pq eles tão no grupo da sala? Kkk Vivem R. Leão: Pq eu queria mostrar como o Alek sabe cozinhar Vivem R. Leão: Pow 𝕷𝖆𝖚𝖗𝖆💌: KAKKAKAAK Opressora: A @~Mel C N M tinha razão ? gente Alguém pode me mandar fto da prova de história Por favor";
var tokens = new Map([
    ["bat", ""],
    ["ele", ""],
    ["com", ""],
    ["que", ""],
    ["ar", ""],
    ["er", ""],
    ["ão", ""],
    ["õe", ""],
    ["ou ", ""],
    ["vc", ""],
    ["eu", ""],
    ["do", ""],
    ["an", ""],
    ["ma", ""],
    ["um", ""],
    [", ", ""],
    ["ha", ""],
    ["a ", ""],
    ["su", ""],
    ["va", ""],
    ["de", ""],
    ["di", ""],
    ["em", ""],
    ["as", ""],
    ["in", ""],
    ["mu", ""],
    ["re", ""],
    ["or", ""],
    ["s ", ""],
    ["e ", ""],
    ["o ", ""],
    [" A", ""],
    ["ch",""],
    ["nn",""],
    [": ",""],
    ["\\. ",""],
    ["q ",""]
]);
var incoerencias = [
    "1😴😴😴😴",
    "💌: Acho que nn 𝕷𝖆𝖚𝖗𝖆💌"
]
var salvar = tokenizarFrase(frase, tokens)
console.log(frase);
console.log("===================================2")
console.log(salvar);
console.log((1 - (salvar.length / frase.length)) * 100 + "%");
console.log(frase.length - salvar.length);
console.log("===================================3")
console.log(simplificaTexto(salvar));
console.log(frase.length - simplificaTexto(salvar).length);
console.log((1 - (simplificaTexto(salvar).length / frase.length)) * 100 + "%");