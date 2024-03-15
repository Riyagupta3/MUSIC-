const music = document.querySelector('audio')  //tag is selected
const play = document.getElementById('play')
const img = document.querySelector("img");
const artist = document.getElementById('artist');
const title = document.getElementById('title');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let progress = document.getElementById('progress');
let total_current = document.getElementById("current_meter");
let total_duration = document.getElementById("duration")
const progress_div=document.getElementById("progress_div");
const songs = [
    {
        name: "1.mp3",
        title: "Bekhayali (बेख्याली) ",
        artist: " Song by Sachet Tandons",
        img: "1.jpeg"
    },
    {
        name: "2.mp3",
        title: "Kar Har Maidaan Fateh (कर हर मैदान फतेह) ",
        artist: "  Song by Shreya Ghoshal and Sukhwinder Singh",
        img: "2.jpeg"
    },
    {
        name: "3.mp3",
        title: "Unstoppable",
        artist: "Song by Sia",
        img: "3.jpeg"
    },
]
let isplaying = false;
//play
const playmusic = () => {

    isplaying = true;
    music.play();
    play.classList.replace("fa-play", 'fa-pause')

    img.classList.add("anime");

};
//pause
const pausemusic = () => {
    music.pause();
    isplaying = false;
    play.classList.replace("fa-pause", 'fa-play')

    img.classList.remove("anime");

}
play.addEventListener('click', () => {
    if (isplaying) {
        pausemusic();

    }
    else {
        playmusic();
    }
})
// change music data
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name;
    img.src = "images/" + songs.img;
};

//to call array
songindex = 0;
const nextsong=()=>{

    
    songindex = (songindex + 1) % songs.length;  //to change indexcontinusely
    loadSong(songs[songindex]);
    playmusic();
}


const prevsong = () => {
    songindex = (songindex - 1 + songs.length) % songs.length;  //to change indexcontinusely
    loadSong(songs[songindex]);    playmusic();
}


// progressbar
music.addEventListener('timeupdate', (e => {
    // console.log(e)
    const { currentTime, duration } = e.srcElement;
    console.log(currentTime, duration)
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;
    // music duration update
    //convert to min 

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);
    console.log(min_duration, sec_duration)
    let tot_duration = `${min_duration}:${sec_duration}`;
    console.log("total durn is", tot_duration)
    if (duration) {
        total_duration.textContent = `${tot_duration}`;
    }
    let min_current = Math.floor(currentTime / 60);
    let sec_current = Math.floor(currentTime % 60);
    console.log(min_current, sec_current)
   
    if (sec_current < 10) {
        sec_current = `0${sec_current}`;
    }
    let tot_currentTime = `${min_current}:${sec_current}`;
   
        total_current.textContent = `${tot_currentTime}`;
    }

));
// progress on click function
progress_div.addEventListener('click',(e)=>{
    console.log(e);
    const { duration }=music;//obj destructuring 
    //  const duration=music.duration   same as above output
     let move_progress=(e.offsetX/e.srcElement.clientWidth)*duration;
     console.log(move_progress,"hjs")
     music.currentTime=move_progress;
  

    
})

// if music ends aoutumatically calls nextsong
music.addEventListener('ended',nextsong);


next.addEventListener('click', nextsong);
prev.addEventListener('click', prevsong);


