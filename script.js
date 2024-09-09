function toggleReadMore() {
    var dots = document.querySelector('.dots');
    var moreText = document.querySelector('.more-text');
    var btnText = document.getElementById('read-more-btn');

    if (dots.style.display === 'none') {
        dots.style.display = 'inline';
        btnText.textContent = 'Lire plus';
        moreText.style.display = 'none';
    } else {
        dots.style.display = 'none';
        btnText.textContent = 'Lire moins';
        moreText.style.display = 'inline';
    }
}
