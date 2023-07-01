// html elemanları seçimi
const nameInput = document.querySelector(".player-name");
const scoreInput = document.querySelector(".player-score");
const toast = document.querySelector('.toast');
const toastNaN = document.querySelector('.toast-NaN');

// oyuncu bilgilerinin kayıt edildiği array
let users = [];

// add butonuna tıklandığında çalışacak fonksiyon  
function addUser() {

  let name = nameInput.value.trim();
  let score = parseInt(scoreInput.value);

  if (name !== '' && !isNaN(score)){
    let user = {
      id: Date.now(), 
      name: name,
      score: score
    };
    // users arrayine isim ve skor bilgisinin gönderimi
    users.push(user);
     // bulunan veri lengthi kadar eleman oluşturup içlerini skorlar büyükten küçüğe gidecek şekilde sıralılıyoruz
    users.sort((a, b) => b.score - a.score);

    // oluşturan kullanıcılar sıralı bir şekilde geliyor
    displayUsers();

    nameInput.value = '';
    scoreInput.value = '';
  }
  // boş girilmesine önlem olarak hata mesajı çıkıyor
  else if(name == '' || scoreInput.value == ''){
    toast.classList.add('visible');
    setTimeout(hideToast, 3000);
  }
  // skor kısmına rakam hariç giriş olması durumunda çıkan hata mesajı
  else{
    toastNaN.classList.add('visible');
    setTimeout(hideToast, 3000);
  }
}

function displayUsers() {
  let usersContainer = document.querySelector(".wrapper");
  usersContainer.innerHTML = '';

  
  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    let userDiv = document.createElement('div');
    userDiv.classList.add('item');

    let nameP = document.createElement('p');
    nameP.textContent = user.name;

    let scoreP = document.createElement('p');
    scoreP.textContent = user.score;

    let increaseButton = document.createElement('span');
    increaseButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
    increaseButton.onclick = createIncreaseHandler(user);

    let decreaseButton = document.createElement('span');
    decreaseButton.innerHTML= '<i class="fa-solid fa-minus"></i>';
    decreaseButton.onclick = createDecreaseHandler(user);

    let deleteButton = document.createElement('span');
    deleteButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    deleteButton.onclick = createDeleteHandler(user);

    // oluşturulan elemanlar bir üst parentlarına append ediliyor
    userDiv.appendChild(nameP);
    userDiv.appendChild(scoreP);
    userDiv.appendChild(deleteButton);
    userDiv.appendChild(increaseButton);
    userDiv.appendChild(decreaseButton);


    usersContainer.appendChild(userDiv);
  }
}

function createIncreaseHandler(user) {
  return function() {
    increaseScore(user);
  };
}

function createDecreaseHandler(user) {
  return function() {
    decreaseScore(user);
  };
}

function createDeleteHandler(user) {
  return function() {
    deleteUser(user);
  };
}

function increaseScore(user) {
  user.score += 5;
  users.sort((a, b) => b.score - a.score); // ekleme işlemi sonrası yeniden sıralanma
  displayUsers();
}

function decreaseScore(user){
  user.score -= 5;
  users.sort((a, b) => b.score - a.score); // çıkarma işlemi sonrası yeniden sıralanma
  displayUsers();
}

function deleteUser(user) {
  let index = users.findIndex(u => u.id === user.id); // findIndex ile id koşulu sağlanması durumunda o object elemanın indexini alıyor
  if (index !== -1) {
    users.splice(index, 1); //splice methodu ile users arrayinden ilgili index'e sahip eleman siliniyor
    displayUsers();
  }
}

function hideToast(){
  // toast bildirimleri için css de yer alan display özelliğinin atanmasını classList.remove kullanarak kaldırılıyor
  toast.classList.remove('visible');
  toastNaN.classList.remove('visible');
}
