class UsersService {
    constructor() {
        this.users = [];
        this.colors = [];
    }

    getAllUsers() {
        return this.users;
    }

    getUserById(userId) {
        return this.users.find(user => user.id === userId);
    }

    addUser(user) {
        this.users = [user, ...this.users];
    }

    removeUser(userId) {
        this.users = this.users.filter(user => user.id !== userId);
    }

    getRandomColor(color) {
        const colorValues = ["#7731b8", "#89b68d", "#790f04", "#e2da87", "#71ca14", "#24c1cd", "#289971", "#5035a8", "#c666c2", "#ec0584", "#17c833", "#e10521"];
        color = colorValues;
        this.colors = [color, ...this.colors];
    }
}
module.exports = UsersService;