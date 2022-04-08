const x = [
    {name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8]},
    {name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2]},
];

function rainDance(obj) {
    obj.forEach((obj) => {
        const sum = obj["rainfall"].reduce((a, b) => a + b, 0);
        obj["avgRainfall"] = sum / obj["rainfall"].length;
        delete obj["rainfall"];
    });
    return obj;
}

// console.log(rainDance(x))


function decToBin(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x !== 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return bin;
}

// console.log(decToBin(45));
// console.log(decToBin(86));
// console.log(decToBin(3672));

function spoon(x) {
    const arr = x.split(" ");
    let firstC1 = arr[0].charAt(0);
    let secondC1 = arr[1].charAt(0);
    let temp = firstC1;
    firstC1 = secondC1;
    secondC1 = temp;
    let first = firstC1 + arr[0].substring(1);
    let second = secondC1 + arr[1].substring(1);
    return `${first} ${second}`;
}

// console.log(spoon("ansh sachdeva"))
// console.log(spoon("not picking"))
// console.log(spoon("kite flying"))
// console.log(spoon("horse riding"))
// console.log(spoon("horse p"))
// console.log(spoon("h p"))


let users = [
    {
        name: "Rajneesh",
        age: 34,
        address: {local: "22 Alaknanda", city: "Dehradun", state: "UK",},
        orders: [
            {id: 1, name: "GOT Book Series"}
        ],
    },

    {
        name: "Bhavesh",
        age: 37,
        address: {local: "48 DT Row", city: "Hyderabad", state: "AP",},
    },
    {
        name: "Jasbir",
        age: 38,
        address: {local: "196 Lama Bhavan", city: "Gangtok", state: "Sikkim",},
        orders: [
            {id: 1, name: "Chair"},
            {id: 2, name: "PS5"},
        ],
    },
];

function updateUsers(users, userObject, item) {let finalUser = null;let finalUserIndex = -1;users.forEach((oldUser, oldUserIndex) => {if (oldUser.name === userObject.name) {finalUser = oldUser;finalUserIndex = oldUserIndex;}},);if (finalUser === null) {finalUser = userObject;finalUserIndex = -1;}if (!("orders" in finalUser)) {finalUser.orders = [];}let hasAlreadyOrdered = false;finalUser.orders.forEach((order) => {if (order.name === item) {hasAlreadyOrdered = true;}});if(hasAlreadyOrdered){return {msg: "Already ordered!"};} else{finalUser.orders.push({id: Date.now(), name: item});if (finalUserIndex !== -1) {users.push(finalUser);} else {users[finalUserIndex] = finalUser;}return users;}}

console.log(
    JSON.stringify(updateUsers(users, {
        name: "Rajneesh",
        age: 34,
        address: {local: "22 Alaknanda", city: "Dehradun", state: "UK",},
    }, "GOT Book Series")));

// console.log(JSON.stringify(updateUsers(users, {
//     name: "Ravi",
//     age: 24,
//     address: {local: "25 Iroda", city: "Dehradun", state: "UK",},
// })));

console.log(JSON.stringify(updateUsers(users, {
    name: "Ravi",
    age: 24,
    address: {local: "25 Iroda", city: "Dehradun", state: "UK",},
}, "Chair")));

console.log(JSON.stringify(updateUsers(users, {
    name: "Rajneesh",
    age: 34,
    address: {local: "22 Alaknanda", city: "Dehradun", state: "UK",},
}, "Fan")));
