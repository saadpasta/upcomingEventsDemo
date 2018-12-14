const updateUser = (user) => {
    return {
        type: "UPDATE_USER",
        user
    }
}

const removrUser = (user) => {
    return {
        type: "REMOVE_USER",
    }
}

export {
    updateUser,
    removrUser
}