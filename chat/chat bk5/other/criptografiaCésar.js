function cifraDeCesar(texto, deslocamento) {
    let textoCriptografado = '';
  
    for (let i = 0; i < texto.length; i++) {
      const char = texto[i];
  
      if (char.match(/[a-z]/i)) {
        // Verifica se o caractere é uma letra do alfabeto
        const codigo = texto.charCodeAt(i);
        let novoCodigo;
  
        if (char.match(/[a-z]/)) {
          // Para letras minúsculas
          novoCodigo = ((codigo - 97 + deslocamento) % 26) + 97;
        } else {
          // Para letras maiúsculas
          novoCodigo = ((codigo - 65 + deslocamento) % 26) + 65;
        }
  
        textoCriptografado += String.fromCharCode(novoCodigo);
      } else {
        // Mantém caracteres que não são letras inalterados
        textoCriptografado += char;
      }
    }
  
    return textoCriptografado;
}

const textoOriginal = "Hello, World!";
const deslocamento = 3;

const textoCriptografado = cifraDeCesar(textoOriginal, deslocamento);

console.log("Texto Original:", textoOriginal);
console.log("Texto Criptografado:", textoCriptografado);
