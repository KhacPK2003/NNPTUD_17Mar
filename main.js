let keyScore1 = "Toan";
let keyScore2 = "Tin";
let Student = function(id,name,age,score1,score2){
    this.id = id;
    this.name = name;
    this.age = age;
    this.scores={
        [keyScore1]: score1,
        [keyScore2]: score2
    }
    this.getInfo = function(){
        return id;
    }
}
let student1 = new Student(1,"Tung",16,9,9);
let student2 = new Student(1,"Toan",17,2,2);
let student3 = new Student(1,"Tien",18,2,9);
let student4 = new Student(1,"Tuan",19,3,4);