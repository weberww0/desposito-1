module.exports = (ind, reference) => {
    const messages = {
        "math_congrats": "> 🥸 Tabuada!\n> Acerte o máximo possível e ganhe absolutamente nada.\n\nParabéns você acertou! Mas quanto é **${reference.one}x${reference.two}**?",
        "math_first": "> 🥸 Tabuada!\n> Acerte o máximo possível e ganhe absolutamente nada.\n\nQuanto é: **${reference.one}x${reference.two}**?",
        "math_fail": ":exploding_head: Woops! Você acertou **${reference}** vezes, boa sorte na próxima.",
        "math_timeout": ":clock1230: O tempo acabou! Você acertou **${reference}** vezes, boa sorte na próxima."
    }
    return messages[ind]
}

// msg ("math_timeout", {one: "a", two: "b"})
