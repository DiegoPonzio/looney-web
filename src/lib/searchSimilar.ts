function calcularDistanciaLevenshtein(s1: string, s2: string) {
    if (s1.length === 0) return s2.length;
    if (s2.length === 0) return s1.length;

    const matrix = [];

    // Inicializa la matriz
    for (let i = 0; i <= s2.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= s1.length; j++) {
        matrix[0][j] = j;
    }

    // Llena la matriz utilizando la distancia de Levenshtein
    for (let i = 1; i <= s2.length; i++) {
        for (let j = 1; j <= s1.length; j++) {
            const cost = s1[j - 1] === s2[i - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // Eliminación
                matrix[i][j - 1] + 1,      // Inserción
                matrix[i - 1][j - 1] + cost // Reemplazo
            );
        }
    }

    // El valor en la esquina inferior derecha de la matriz es la distancia de Levenshtein
    return matrix[s2.length][s1.length];
}

function encontrarPalabraSimilar(palabraReferencia: string, listaPalabras : string[]) {
    let palabraSimilar = listaPalabras[0];
    let distanciaMinima = calcularDistanciaLevenshtein(palabraReferencia, listaPalabras[0]);

    for (let i = 1; i < listaPalabras.length; i++) {
        const distancia = calcularDistanciaLevenshtein(palabraReferencia, listaPalabras[i]);
        if (distancia < distanciaMinima) {
            palabraSimilar = listaPalabras[i];
            distanciaMinima = distancia;
        }
    }

    return palabraSimilar;
}


export { calcularDistanciaLevenshtein, encontrarPalabraSimilar }