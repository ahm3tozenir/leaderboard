// html elemanları seçimi
const playerName = document.querySelector('.player-name');
const playerScore = document.querySelector('.player-score');
const btn = document.querySelector('.add-btn');
const wrapper = document.querySelector('.wrapper');
const toast = document.querySelector('.toast');
const nantoast = document.querySelector('.toast-NaN');

// oyuncu bilgilerinin kayıt edildiği arrayler birisi object olarak tüm verilerin tutumu için, incArr sayıların artması ve azalması durumunda yeniden sıralanması için
let playerData = [];
let incArr = [];
btn.addEventListener('click',add);

// add butonuna tıklandığında çalışacak fonksiyon
function add(){
    // input verilerin alınması
    let score = Number(playerScore.value); 
    let name = playerName.value;
    
    // boş girilmesine önlem olarak hata mesajı çıkıyor
    if(name.trim() == '' || playerScore.value.trim() == ''){
        toast.classList.add('visible');
        setTimeout(hideToast, 3000);
    }
    // skor kısmına rakam hariç giriş olması durumunda çıkan hata mesajı
    else if(isNaN(score)){
        nantoast.classList.add('visible');
        setTimeout(hideToast, 3000);
    }
    else{
        playerData.push({'name': name, 'score': score}); // playerData arrayine isim ve skor bilgisinin gönderimi
        incArr.push(score); // ekleme ve çıkarma için bu arreye de skorları gönderiyoruz
        incArr.sort(function(a, b){return b - a}); // incArr için büyükten küçüğe puana göre sıralanma
    
        wrapper.innerHTML=''; // her eklemede önceki kullanıcı isimleri tekrar tekrar yazılmasına önlem amaçlı oyuncuların ve skorların yer aldığı div boşaltılıyor
        let sorted = playerData.sort(function(a, b){return b.score - a.score}); // sıralanmış playerData arrayi
        
        // bulunan veri lengthi kadar eleman oluşturup içlerini skorlar büyükten küçüğe gidecek şekilde sıralılıyoruz
        for(let i=0; i<playerData.length; i++){
            let p = document.createElement('p');
            let ps = document.createElement('p');
            let div = document.createElement('div');
            div.style.display='flex';
            div.classList.add('item');

            const span = document.createElement('span');
            const span2 = document.createElement('span');
            const span3 = document.createElement('span');
            span.innerHTML=`<i class="fa-regular fa-trash-can"></i>`;
            span2.innerHTML=`<i class="fa-solid fa-plus"></i> 5`;
            span3.innerHTML=`<i class="fa-solid fa-minus"></i> 5`;
            p.textContent =`${sorted[i].name}`;
            ps.textContent =`${sorted[i].score}`;
            // oluşturulan elemanlar bir üst parentlarına append ediliyor
            div.append(p);
            div.append(ps);
            div.append(span);
            div.append(span2);
            div.append(span3);
            wrapper.append(div);
            // span içerikleri için eventlistener atandı
            span.addEventListener('click',del);
            span2.addEventListener('click',increase);
            span3.addEventListener('click',decrease);
        }
        // her add buttonuna basım sonrası inputların içerisi boşaltılıyor
        playerName.value = '';
        playerScore.value = '';
    }

}

function del(){
    let find = Number(this.previousSibling.textContent); // p elamanın içerisinde yer alan sayıyı buluyor
    let findIndex = incArr.indexOf(find); //p elemanı içerisine yer alan sayıya göre index numarası buluyor
    this.parentElement.style.display='none'; 
    // display none olan eleman playerData ve incArr den de splice methodu ile siliniyor
    playerData.splice(findIndex,1); 
    incArr.splice(findIndex,1);
}


function increase(){
    let find = Number(this.previousSibling.previousSibling.textContent); // p elamanın içerisinde yer alan sayıyı buluyor
    let findIndex = incArr.indexOf(find); //p elemanı içerisine yer alan sayıya göre index numarası buluyor
    playerData[findIndex].score += 5; // o indexe ait elemanın değerini 5 büyütüyor
    this.previousSibling.previousSibling.textContent = `${incArr[findIndex] += 5}`; // p elemanı içerisine yazılacak yeni skor değerini güncelliyor
    incArr.sort(function(a, b){return b - a}); // her artım sonrası tekrardan sıralama yapılıyor
    wrapper.innerHTML=''; // alt alta aynı bilgilerin yığını oluşmaması için tüm oyuncu listesini kapsayan divin içerisi boşaltıldı
    let sorted = playerData.sort(function(a, b){return b.score - a.score}); // playerData arrayinin sıralayıp bir değişkene atadık. Oluşturulan text kısmında kullanıldığı için
    // for döngüsü add fonksiyonun for döngüsü ile aynı
    for(let i=0; i<playerData.length; i++){
        let p = document.createElement('p');
        let ps = document.createElement('p');
        let div = document.createElement('div');
        div.style.display='flex';
        div.classList.add('item');

        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        span.innerHTML=`<i class="fa-regular fa-trash-can"></i>`;
        span2.innerHTML=`<i class="fa-solid fa-plus"></i> 5`;
        span3.innerHTML=`<i class="fa-solid fa-minus"></i> 5`;
        p.textContent =`${sorted[i].name}`;
        ps.textContent =`${sorted[i].score}`;
        div.append(p);
        div.append(ps);
        div.append(span);
        div.append(span2);
        div.append(span3);
        wrapper.append(div)
        span.addEventListener('click',del);
        span2.addEventListener('click',increase);
        span3.addEventListener('click',decrease);
    }
}



function decrease(){
    let find = Number(this.previousSibling.previousSibling.previousSibling.textContent); // p elamanın içerisinde yer alan sayıyı buluyor
    let findIndex = incArr.indexOf(find); //p elemanı içerisine yer alan sayıya göre index numarası buluyor

    playerData[findIndex].score -= 5;  // o indexe ait elemanın değerini 5 küçültüyor
    this.previousSibling.previousSibling.previousSibling.textContent = `${incArr[findIndex] -= 5}`;  // p elemanı içerisine yazılacak yeni skor değerini güncelliyor
    incArr.sort(function(a, b){return b - a}); // her azaltım sonrası tekrardan sıralama yapılıyor
    // burdan sonraki kısım add fonksiyonu ile aynı
    wrapper.innerHTML='';
    let sorted = playerData.sort(function(a, b){return b.score - a.score});
    for(let i=0; i<playerData.length; i++){
        let p = document.createElement('p');
        let ps = document.createElement('p');
        let div = document.createElement('div');
        div.style.display='flex';
        div.classList.add('item');

        const span = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
        span.innerHTML=`<i class="fa-regular fa-trash-can"></i>`;
        span2.innerHTML=`<i class="fa-solid fa-plus"></i> 5`;
        span3.innerHTML=`<i class="fa-solid fa-minus"></i> 5`;
        p.textContent =`${sorted[i].name}`;
        ps.textContent =`${sorted[i].score}`;
        div.append(p);
        div.append(ps);
        div.append(span);
        div.append(span2);
        div.append(span3);
        wrapper.append(div)
        span.addEventListener('click',del);
        span2.addEventListener('click',increase);
        span3.addEventListener('click',decrease);
    }
}


function hideToast(){
    // toast bildirimleri için css de yer alan display özelliğinin atanmasını classList.remove kullanarak kaldırılıyor
    toast.classList.remove('visible');
    nantoast.classList.remove('visible');
}
