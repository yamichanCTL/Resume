document.querySelectorAll('section h2').forEach(h2 => {
    h2.addEventListener('click', () => {
        const content = h2.nextElementSibling;
        content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
});