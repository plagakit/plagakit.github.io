console.log("Hello world!");

// Coin-spinning icon
let curIcon = false;
const icon = document.querySelector('.profile-icon img');
const iconImg1 = "media/icon.png";
const iconImg2 = "media/icon_but_real.jpg";
icon.addEventListener('click', e => {
    icon.src = curIcon ? iconImg1 : iconImg2;
    curIcon = !curIcon;
});
