 let data = "confidential";
 
 class user {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }

    viewdata(){
        console.log("the data =", data);
    }
 }

 let student1= new user("pratik", "abc@email.com");
 let student2= new user("dipin", "dipin@email.com");
