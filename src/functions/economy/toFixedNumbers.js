module.exports =  (client) => {
    client.toFixedNumbers = async (number, places = 2) => {
        const offset = Number(`1e${places}`)
        return Math.floor(number * offset) / offset;
    }
}