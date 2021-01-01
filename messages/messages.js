module.exports = (ind, reference) => {
    const messages = {"math_timeout": `Acabou o tempo! ${reference.one} and ${reference.two}`}
    return messages[ind]
}

// msg ("math_timeout", {one: "a", two: "b"})
