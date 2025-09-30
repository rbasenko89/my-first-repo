const user = {
    //element 1 - user name details
    name: 'Ramella',
    age: 36,
    isActive: true,
    // element 2 inside of element 1
    address: {
        city: 'Krakow',
        street: 'Street1`',
        number: 14
    },
    // array
    skills: ['QA', 'Automation', 'Leadership', 'JavaScript'],

    showInfo: function () {
        console.log("Ім'я:", this.name);
        console.log('Вік:', this.age);
        console.log('Місто:', this.address.city);
        console.log('Навички:', this.skills.join(', '));
    }
};

user.showInfo();
