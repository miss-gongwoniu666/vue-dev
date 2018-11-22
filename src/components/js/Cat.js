class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(`the cat's name is${this.name}, age is ${this.age}`);
    }
}
let cat = new Animal('miki', 33);
cat.sayName();
class Dolf extends Animal {
    constructor(name, age, what) {
        super(name, age);
        this.what = what;
    }
    sayName() {
        console.log(`the dolg's name is${this.name}, age is ${this.age}, to ${what}水`);
    }
}
let dos = new Dolf('dos', 2, 'drink');
dos.sayName();