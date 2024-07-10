function subtokenizeWord(word) {
    return word.split('');
}

function calculateSubtokenFrequency(text) {
    const frequencyMap = new Map();
    const words = text.split(/\s+/);
  
    for (const word of words) {
      const subtokens = subtokenizeWord(word);
      for (const subtoken of subtokens) {
        if (frequencyMap.has(subtoken)) {
           frequencyMap.set(subtoken, frequencyMap.get(subtoken) + 1);
        } else {
           frequencyMap.set(subtoken, 1);
        }
      }
    }
  
    return frequencyMap;
}

function encodeTextWithSubtokens(text, subtokenFrequencyMap) {
    const subtokenToCode = {};
  
    // Ordenar subtokens por frequência
    const subtokens = Array.from(subtokenFrequencyMap.keys()).sort(
      (a, b) => subtokenFrequencyMap.get(a) - subtokenFrequencyMap.get(b)
    );
  
    // Atribuir códigos fictícios
    subtokens.forEach((subtoken, index) => {
      subtokenToCode[subtoken] = index.toString(2);
    });
  
    // Substituir subtokens pelo código
    const encodedText = text
      .split(/\s+/)
      .map((word) => subtokenizeWord(word).map((subtoken) => subtokenToCode[subtoken]).join(' '))
      .join(' ');
  
    return encodedText;
}

const textoExemplo = "Esta é uma frase de exemplo.";
const frequenciaSubtokens = calculateSubtokenFrequency(textoExemplo);
const textoCodificado = encodeTextWithSubtokens(textoExemplo, frequenciaSubtokens);

console.log("Texto Original:", textoExemplo);
console.log("Texto Codificado:", textoCodificado);