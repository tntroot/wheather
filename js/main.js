let metlList=[];
const select_option=document.getElementById('select_option');


const County=document.getElementById('County');
const weather=document.getElementById('weather');
const CF=document.getElementById('CF');
const chance_of_rain=document.getElementById('chance_of_rain');

const contanier=[County,weather,CF,chance_of_rain];
const weather_new=document.getElementById('weather_new');

function onlong(){
    fetch("https://opendata.cwa.gov.tw/fileapi/v1/opendataapi/F-C0032-005?Authorization=CWB-8F61116C-E1C0-482C-BEED-06AC6294E383&downloadType=WEB&format=JSON")
        .then(res => res.json())
        .then(data => {
            metlList=data.cwaopendata.dataset;
            console.log(metlList);
            const lo_Name=metlList.location;

            Object.keys(lo_Name).forEach((index,item) => {
                select_option.innerHTML +=`<option value="${lo_Name[index].locationName}">${lo_Name[index].locationName}</option>`;         
            });

            weather_content();
    })
}

function weather_content(){
    const lo_Name=metlList.location;
    Object.keys(lo_Name).forEach((index,item) => {
        if(lo_Name[index].locationName===select_option.value){
            contanier[0].innerText=lo_Name[index].locationName;
            contanier[1].innerText=lo_Name[index].weatherElement[0].time[1].parameter.parameterName;
            contanier[2].innerText=lo_Name[index].weatherElement[2].time[1].parameter.parameterName + "-" +lo_Name[index].weatherElement[1].time[1].parameter.parameterName + " °C";
            contanier[3].innerText=`降雨機率: ${lo_Name[index].weatherElement[1].time[1].parameter.parameterName} %`;        
        
            const weather_view=+lo_Name[index].weatherElement[0].time[1].parameter.parameterValue;
        
            weather_icon(weather_view);  

            //console.log(new Date( lo_Name[index].weatherElement[0].time[1].startTime).getHours());
        }
    });
}

function weather_icon(index_icon){
    switch(index_icon){
        case 1 :
            weather_new.className="fa-solid fa-sun";
            break;
        case 2 : case 3:
            weather_new.className="fa-solid fa-cloud-sun";
            break;
        case 4 : case 5 : case 6 : case 7:
            weather_new.className="fa-solid fa-cloud";
            break;
        case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 29:
            weather_new.className="fa-solid fa-cloud-showers-heavy";
            break;
        case 15: case 16: case 17: case 18:
            weather_new.className="fa-solid fa-cloud-bolt";
            break;
        case 19: case 20: case 21: case 22: case 30:
            weather_new.className="fa-solid fa-cloud-sun-rain";
            break;
        case 23: case 42:
            weather_new.className="fa-solid fa-snowflake";
            break;
        case 24: case 25: case 26: case 27: case 28:
            weather_new.className="fa-solid fa-smog";
            break;
        default:
            weather_new.className="fa-solid fa-cloud-rain";
    } 
}



