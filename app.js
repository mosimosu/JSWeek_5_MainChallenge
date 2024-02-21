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

  let chartData = c3DataGenerator(data); //處理C3資料
  generateChart(chartData); //產生圖表
  showCards(data); //render資料頁面
  updateItemCounts(data); // 更新資料

  // 新增旅遊方案
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

    let chartData = c3DataGenerator(data); //處理C3資料
    generateChart(chartData); //產生圖表
  });

  //查詢旅遊方案
  regionSearch.addEventListener("change", (e) => {
    let area = e.target.value;
    let filter = data.filter((item) => {
      return item.area.includes(area);
    });
    showCards(filter);
    updateItemCounts(filter);
    let chartData = c3DataGenerator(filter); //處理C3資料
    generateChart(chartData); //產生圖表
  });
});

//fn處理成c3需要的格式
function c3DataGenerator(data) {
  //益遜提供
  //計算地區數量
  // let obj = {};

  // data.forEach(function (item) {
  //   if (obj[item.area] == undefined) {
  //     obj[item.area] = 1;
  //   } else {
  //     obj[item.area]++;
  //   }
  // });
  // let areaArr = Object.keys(obj); //將地區名稱從物件中取出來，並組成一個陣列
  // let newData = []; // 存放最終正確格式的資料餵給 c3
  // areaArr.forEach(function (item) {
  //   let arr = [];
  //   arr.push(item);
  //   arr.push(obj[item]);
  //   newData.push(arr);
  // });

  let newData = [];

  data.forEach((item) => {
    let obj = {};
    obj.area = item.area;
    newData.push(obj);
  });

  //平平姊提供
  //產生出一個新的陣列，結果是[高雄, 台北, 台中....]
  let filterData = newData
    .map((item) => item.area)
    .filter((item, index, arr) => arr.indexOf(item) == index);

  //整理出符合C3要用的陣列樣式
  let c3Data = filterData.map((item) => [item, 0]);

  //利用indexOf找出newData陣列是否有重複的內容，只要有就+1
  newData.forEach((item) => {
    c3Data[filterData.indexOf(item.area)][1] += 1;
  });
  return c3Data;
}

//fn生成圖表
function generateChart(ary) {
  const chart = c3.generate({
    bindto: "#chart", // HTML 元素綁定
    data: {
      columns: ary, // 資料存放
      type: "donut", // 圖表種類
      colors: {
        台北: "#26C0C7",
        台中: "#5151D3",
        高雄: "#E68618",
      },
    },
    size: { width: 200, height: 200 },
    donut: {
      title: "套票地區比重",
      width: 10,
      label: { show: false },
      expand: false,
    },
  });
}

//fn顯示卡片
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

//fn更新結果到搜尋資料上
function updateItemCounts(ary) {
  let item = ary.length;
  searchResultText.innerHTML = `本次搜尋共 ${item} 筆資料`;
}
