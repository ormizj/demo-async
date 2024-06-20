export default defineEventHandler(async (event) => {
    await new Promise(res => setTimeout(() => {
        res(true);
    }, 3000)).then(() => {
        return 'Server Data'
    });
});