const toDoList = []; //შედგება ობიექტებისაგან
const tittleTodoList = []; //ჩემს მიერ შემოტანილი მასივი, title ებისთვის
const $input = document.getElementsByTagName("input")[0];
const $button = document.getElementsByTagName("button")[0];
const $ul = document.getElementsByTagName("ul")[0];

var id = toDoList.length + 1; // მაისივ პირველ ელემენტს 0 რომ არ მიცეს აიდათ

$button.addEventListener("click", addTodoItem); // ივენლისენერი ბათონს ანიჭებს იმ ფუნქციას რაც უწერია გვერდით

function addTodoItem() {
  //ახალი აითემის დამატებისათვის ფუნქცია

  let newInput = $input.value;

  if (validateInput(newInput)) {
    //
    if (!tittleTodoList.includes($input.value)) {
      //ჩემს მიერ შემოტანილი თაითლების მასივი, რომელიც შეიცავს ინფუთ ვალიუს რომელიც ასევე შედგება თაითლებისაგან
      let newItem = new Object(); // {}   ახალი ითემი შემოტანილია ობიექთად
      newItem.id = id; //ახალი ითემის აიდი
      id++; // ყოველჯერზე ანუ ფუნქციის გამოძახებაზე აიდი იმატებს ერთით
      newItem.title = $input.value; //ახალი ითემის თაითლი უდრის ინფუთ ველიუს რომელიგანაც შევადგინე ჩემს მიერ შემოტანილი თაითლდტუდულისტი
      toDoList.push(newItem); // push ით ხდება ახალი აითემის დამატება თუდულისტში
      tittleTodoList.push(newItem.title); // ფაშით ხდება ახალი თაითლის დამატება, თაითლთუდულისტში
      $input.value = null; //ინფუთ ველიუს ადგილი როცა ცარიელია
      renderTodoList(); //დარენდერებულია თუდულისტი ფუნქციით
      console.log(tittleTodoList); //დალოგილია თაითლთუდულისტი
    } else {
      console.log("its similar element"); //დალოგილია თაითლთუდულისტი მსგავსი აითემის შემთხვევაში
    }
  } else {
    console.log("The input must be filled"); //დალოგილია თუდულისტი ინფუთველიუს სიცარიელის შემთხვევაში
  }
}

function deleteTodoItem(id) {
  //თუდუითემის წაშლის ფუნქცია
  deleteTodoItemFromtoDoList(id);
  renderTodoList();
}

function renderTodoList() {
  $ul.innerHTML = null; //ული როცა ცარიელია

  toDoList.forEach((item) => {
    // გამოყენებულია ფო რიჩ მეთოდი ლი სთვის,

    let li = document.createElement("li"); //ახალი ელემენტის დამატებისათვის, წაშლისათვის, აიდის მინიჭებისათვის
    li.innerHTML = item.title + " ID: " + item.id + " - "; //ლისთვის თაითლის მინიჭებისათვის და აიდის მინიჭებისათვის, ასევე ცარიელი ადგილი
    let delButton = document.createElement("button"); // წაშლის ღილაკი
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", () => {
      //ვაძლევთ ივენთს კლიკისთვის
      deleteTodoItem(item.id); //შლის აითემს და აიდს
    });
    li.appendChild(delButton);
    $ul.appendChild(li);
  });
}

function deleteTodoItemFromtoDoList(id) {
  //ფუნქცია თუდულისტიდან თუდულისტის წაშლის
  let item = toDoList.find((value) => value.id === id); // თუდულისტიდან აიდით იღებს ინდექსს
  toDoList.splice(toDoList.indexOf(item), 1);
}

function validateInput(value) {
  //ვალიუს განსზაღვრა ინფუთ ვალიუსთვის
  if (value !== "") {
    // რასაც გადავცემთ არგუმენტად არ უნდა უდრიდეს ცარიელს
    return true;
  } else {
    return false;
  }
}

renderTodoList();
