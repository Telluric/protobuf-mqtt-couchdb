module.exports = (d) => {
    return {...d, _id:`${Date.now()}`}
}
