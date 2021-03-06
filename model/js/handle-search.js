let btnSearch = document.querySelector('.head__search-btn');
btnSearch.onclick = function () {
    let inputKeyword = document.querySelector('.head__search-value');
    let keyWord = removeVietnameseTones(inputKeyword.value);
    
    const ajax_xhr = new XMLHttpRequest();
    ajax_xhr.open("POST", "../model/php/handle-search.php", true);
    ajax_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax_xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let wrapper = document.querySelector('.content_wrapper');
            let pickGenreElement = document.querySelector('.content__pick-genre');
            
            if (pickGenreElement) {
                pickGenreElement.classList.add('hidden');
            }
            wrapper.outerHTML = this.responseText;
            handelPickOptionresult();
            let btnSong = document.querySelector('.search__option-songs');
            btnSong.click();
        }
    }
    let dataSend = `action=search&keyword=${keyWord}`;
    ajax_xhr.send(dataSend);
}

function handelPickOptionresult () {
    let songOptionResult = document.querySelector('.search__option-songs');
    let artistOptionResult = document.querySelector('.search__option-artists');
    let keyWord = document.querySelector('.search__keyword i').innerText;

    songOptionResult.onclick = function () {
        const ajax_xhr = new XMLHttpRequest();
        ajax_xhr.open("POST", "../model/php/handle-search.php", true);
        ajax_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax_xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let wrapResult = document.querySelector('.search__result');
                wrapResult.innerHTML = this.responseText;
                // handelPickOptionresult();
                setTimeout(function () {
                    play.start();
                }, 20);
            }
        }
        let dataSend = `action=get_song_search&keyword=${keyWord}`;
        ajax_xhr.send(dataSend);
    }

    artistOptionResult.onclick = function () {
        const ajax_xhr = new XMLHttpRequest();
        ajax_xhr.open("POST", "../model/php/handle-search.php", true);
        ajax_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax_xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let wrapResult = document.querySelector('.search__result');
                wrapResult.innerHTML = this.responseText;
                handleClickArtistInSearch();
            }
        }
        let dataSend = `action=get_artists_search&keyword=${keyWord}`;
        ajax_xhr.send(dataSend);
    }
}

function handleClickArtistInSearch () {
    let listArtists = document.querySelectorAll('.result__artist');
    Array.from(listArtists);
    listArtists.forEach(function (element, index) {
        element.onclick = function () {
            let idArtist = this.getAttribute('data-id-artist');
            const ajax_xhr = new XMLHttpRequest();
            ajax_xhr.open("POST", "../model/php/handle-search.php", true);
            ajax_xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax_xhr.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let wrapSongArtist = document.querySelector('.search__result');
                    wrapSongArtist.innerHTML = this.responseText;
                    play.start();
                }
            }
            let dataSend = `action=get_song_of_artist_search&id_artist=${idArtist}`;
            ajax_xhr.send(dataSend);
        }
    })
}

function removeVietnameseTones(str) {
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g,"a"); 
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g,"e"); 
    str = str.replace(/??|??|???|???|??/g,"i"); 
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g,"o"); 
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g,"u"); 
    str = str.replace(/???|??|???|???|???/g,"y"); 
    str = str.replace(/??/g,"d");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    str = str.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    str = str.replace(/??|??|???|???|??/g, "I");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    str = str.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    str = str.replace(/???|??|???|???|???/g, "Y");
    str = str.replace(/??/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // M???t v??i b??? encode coi c??c d???u m??, d???u ch??? nh?? m???t k?? t??? ri??ng bi???t n??n th??m hai d??ng n??y
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ?? ?? ?? ?? ??  huy???n, s???c, ng??, h???i, n???ng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ?? ?? ??  ??, ??, ??, ??, ??
    // Remove extra spaces
    // B??? c??c kho???ng tr???ng li???n nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // B??? d???u c??u, k?? t??? ?????c bi???t
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}