const messages = {"math_timeout": `Acabou o tempo! ${reference.one} and ${reference.two}`}

module.exports = (ind, reference) => {
    return messages[ind]
}

// msg ("math_timeout", {one: "a", two: "b"})
