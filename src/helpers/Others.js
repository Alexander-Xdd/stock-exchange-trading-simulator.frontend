export function numDisable (number, raz) {
    const temp = number.toString()
    const n = temp.slice(0, raz)
    return (n)
}

export  function perc (unit, nano, diff) {
    const unit_str = unit.toString()
    const nano_str = nano.toString()
    const price_str = unit_str + '.' + nano_str
    const price = parseFloat(price_str)

    const pr = (diff * 100) / price
    const a = numDisable(Math.abs(pr), 5)
    if (diff < 0) {
        const temp = a.toString()
        return ('-' + temp)
    }
    else if (diff > 0) {
        const temp = a.toString()
        return ('+' + temp)
    } else {
        const temp = a.toString()
        return (temp)
    }
}