const User = require("../schema/user.schema");
// user = {"email: "", nickname: "", password: ""}
const createUser = async (user) => {
    // Express <----> DB
    try{
        const user = await User.create(user);
        console.log(user);
    } catch (err) {}
};

const getUser = async (email, password) => {
    const user = await User.findOne({});
}

module.exports = {
    createUser,
}