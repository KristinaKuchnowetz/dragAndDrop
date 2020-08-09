const generateID = () => {
    let id
    let date = new Date();
    id = date.getMilliseconds();
    return id
}

export default generateID