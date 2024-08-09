const mic = document.querySelector(".btn");
const speechWrapper = document.querySelector(".speech-wrapper");
const statusVoice = speechWrapper.querySelector(".status");
const statusAction = speechWrapper.querySelector(".status-action");
// console.log(statusVoice);
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || false;
if(SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    //return immediately data
    // recognition.continuous = false;

    const standardString= (content, mark) => {
        let res = "";
        const arr = content.split("/\s+/");
        if(arr.length < 2) {
            return content;
        }
        arr.forEach(value => {
            res+=value+ mark;
        });
        return res.slice(0, res.length-mark.length);
    }

    
    const handleVoice = (text) => {

    let check = true;
        switch (true) {
            case text === 'zing':
                window.open("https://zingmp3.vn/");
                break;
            case text === 'youtube': 
                window.open("https://www.youtube.com/");
                break;
            case text === 'google': 
                window.open("https://google.com.vn");
                break;
            case text ==='google drive':
                window.open("https://drive.google.com/drive/my-drive");
                break;
            case text ==='google maps':
                window.open("https://www.google.com/maps");
                break;
            case text ==='facebook':
                window.open("https://facebook.com");
                break;
            case text.includes("video") === true:
                const contentVideo = text.slice(text.indexOf("video")+5).trim();
                if(contentVideo === "") {
                window.open("https://www.youtube.com/");
                } else {
                    const res = standardString(contentVideo, '+');
                    window.open(`https://www.youtube.com/results?search_query=${res}`);
                }
                break;
            case text.includes("tới") === true || text.includes("đường"):
                if(text.indexOf("tới") >= 0) {
                    const content = text.slice(text.indexOf("tới")+3).trim();
                    const res = standardString(content, "%20");
                    window.open(`https://www.google.com/maps/search/${res}`);
                } else if(text.indexOf("đường") >= 0) {
                    const content = text.slice(text.indexOf("đường")+5).trim();
                    const res = standardString(content, "%20");
                    window.open(`https://www.google.com/maps/search/${res}`);
                }
                break;
            case text.includes("hát") === true:
                const content = text.slice(text.indexOf("hát")+3).trim();
                const res = standardString(content, "%20");
                window.open(`https://zingmp3.vn/tim-kiem/tat-ca?q=${res}`);
                break;
            default:
                const resGg = standardString(text, '+');
                if(resGg !== 'youtube') {
                    window.open(`https://www.google.com.vn/search?q=${resGg}`);
                    console.log(resGg);
                }
                break;
        }

            statusAction.textContent = `Đã thực hiện xong`;

    }

    mic.addEventListener("click", (e) => {
        e.preventDefault();
        mic.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        statusVoice.textContent = "Hãy nói điều bạn muốn";
        statusVoice.style.color = "red";
        statusAction.style.display = "none";
        recognition.start();
    });

    recognition.addEventListener("speechend", () => {
        recognition.stop();
    });

    recognition.addEventListener("error", (err) => {
        // console.log('lỗi');
        console.log(err);
        statusVoice.textContent = `Tôi chưa nghe được điều bạn nói, xin hãy thử lại`;
        mic.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
    });


    recognition.addEventListener("result", (e) => {
        // console.log(e);
        // console.log("result", e);
        const res = e.results[0][0].transcript;
        const text = res.toLowerCase().replaceAll(/[.,!?$%#&-+<>]/g, "");
        // console.log(text);
        statusAction.innerHTML = `<p>Đang thực hiện: <span>${text}</span></p>`;
        statusAction.style.display = "block";
        setTimeout(()=> {
            handleVoice(text);
        }, 1000);
        mic.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        statusVoice.textContent = "Đã nói xong. Hy vọng kết quả như ý bạn muốn";
        statusVoice.style.color = "green";
    });
}


//Guide
const toggle = speechWrapper.querySelector(".toggle");
const guideSearch = speechWrapper.querySelector(".guide-search ");
const guideBlock = speechWrapper.querySelector(".guide-block ");
const btnGuide = speechWrapper.querySelector(".btn-guide");

toggle.addEventListener("click", () => {
    // guideBlock.style.display = "none";
    guideBlock.style.translate = "-100% 0";
});

btnGuide.addEventListener("click", () => {
    // guideSearch.style.translate = "0 0";
    // toggle.style.translate = "0 0";
    guideBlock.style.translate = "0 0";
})



