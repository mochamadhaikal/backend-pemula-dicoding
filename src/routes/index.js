const route = [
    {
        method: "GET",
        path: "/",
        handler: (req, h) => {
            return "Hello World";
        },
    },
    {
        method: "POST",
        path: "/add",
        handler: (req, h) => {
            return "Hello POST add";
        },
    },
    {
        method: "*",
        path: "/",
        handler: (req, h) => {
            return "Halaman tidak dapat diakses dengan method tersebut";
        },
    },
    {
        method: "*",
        path: "/add",
        handler: (req, h) => {
            return "Halaman tidak dapat diakses dengan method";
        },
    },
    {
        method: "*",
        path: "/{any*}",
        handler: (req, h) => {
            return "Halaman tidak ditemukan";
        },
    },
    {
        method: "GET",
        path: "/user/{username?}",
        // di path bisa menambahkan ? . contoh {username?} jadi optional
        handler: (req, h) => {
            const { username = "Fulan" } = req.params;
            // dan disini tambahkan default valuenya
            return `Hello ${username}`;
        },
    },
    {
        method: "GET",
        path: "/hello",
        handler: (req, h) => {
            const { name, location = "Jakarta" } = req.query;
            return `Hello, ${name} from ${location}`;
        },
    },
    {
        method: "POST",
        path: "/login",
        handler: (req, h) => {
            const { username, password } = req.payload;
            return `Welcome, ${username}`;
        },
    },
    {
        method: "POST",
        path: "/user",
        handler: (req, h) => {
            return h.response("created").code(201);
        },
    },
];

module.exports = route;
