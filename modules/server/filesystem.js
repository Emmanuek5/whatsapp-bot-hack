exports.file = (file) => {

    const data = fs.readFileSync(file)
    const appdata = JSON.parse(data)


    return appdata
}
