// {
//   let data = [
//     {
//       id: 0,
//       name: "肥宅心碎賞櫻3日",
//       imgUrl:
//         "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//       area: "高雄",
//       description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//       group: 87,
//       price: 1400,
//       rate: 10,
//     },
//     {
//       id: 1,
//       name: "貓空纜車雙程票",
//       imgUrl:
//         "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       area: "台北",
//       description:
//         "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//       group: 99,
//       price: 240,
//       rate: 2,
//     },
//     {
//       id: 2,
//       name: "台中谷關溫泉會1日",
//       imgUrl:
//         "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//       area: "台中",
//       description:
//         "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//       group: 20,
//       price: 1765,
//       rate: 7,
//     },
//   ];
// }

//表單區;
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const addTicketBtn = document.querySelector(".addTicket-btn");

const ticketCardArea = document.querySelector(".ticketCard-area");
const regionSearch = document.querySelector(".regionSearch");
const searchResultText = document.querySelector("#searchResult-text");

let url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelAPI-lv1.json";

axios.get(url).then((res) => {
  let data = res.data;

  showCards(data);
  updateItemCounts(data);
  addTicketBtn.addEventListener("click", (e) => {
    let newTicket = {};
    newTicket.id = data.length + 1;
    newTicket.name = e.target.parentNode[0].value;
    newTicket.imgUrl = e.target.parentNode[1].value;
    newTicket.area = e.target.parentNode[2].value;
    newTicket.price = e.target.parentNode[3].value;
    newTicket.group = e.target.parentNode[4].value;
    newTicket.rate = e.target.parentNode[5].value;
    newTicket.description = e.target.parentNode[6].value;
    if (
      newTicket.name == "" ||
      newTicket.area == "" ||
      newTicket.price == "" ||
      newTicket.group == "" ||
      newTicket.rate == "" ||
      newTicket.description == ""
    ) {
      return alert("請完成所有必填欄位");
    }
    data.push(newTicket);
    showCards(data);
    updateItemCounts(data);
    alert("新增成功");
  });

  regionSearch.addEventListener("change", (e) => {
    let area = e.target.value;
    let filter = data.filter((item) => {
      return item.area.includes(area);
    });
    showCards(filter);
    updateItemCounts(filter);
  });
});

function showCards(ary) {
  let str = "";
  ary.forEach((item) => {
    str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img
                  src="${item.imgUrl}"
                  alt=""
                />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">
                  ${item.description}
                </p>
              </div>
              <div class="ticketCard-info">
                <p class="ticketCard-num">
                  <span><i class="fas fa-exclamation-circle"></i></span>
                  剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                </p>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
  });
  ticketCardArea.innerHTML = str;
}
function updateItemCounts(ary) {
  let item = ary.length;
  searchResultText.innerHTML = `本次搜尋共 ${item} 筆資料`;
}
