document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', function() {
        var codeElement = button.parentElement.querySelector('pre code');
        var textArea = document.createElement('textarea');
        textArea.value = codeElement.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        button.textContent = 'コピー完了';
        
        setTimeout(function() {
            button.textContent = 'コピー';
        }, 3000);
    });
});
