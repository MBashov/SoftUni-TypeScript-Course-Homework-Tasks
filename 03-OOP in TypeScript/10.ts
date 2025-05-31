class User {
    private _username!: string;

    constructor(username: string) {
        this.username = username;
    }


    public get username() {
        return this._username;
    }


    public set username(newUsername: string) {
        if (newUsername.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }

        this._username = newUsername;
    }
}

// const user = new User("Martin");
// user.username = "johnDoe";

const user = new User("jo");

// const user = new User("Martin");
// user.username = "Do";
console.log(user.username);
