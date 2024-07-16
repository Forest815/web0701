document.getElementById('copyButton').addEventListener('click', function() {
    var codeElement = document.getElementById('code');
    var textArea = document.createElement('textarea');
    textArea.value = codeElement.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    var button = document.getElementById('copyButton');
    button.textContent = 'コピー完了';
    
    setTimeout(function() {
        button.textContent = 'コピー';
    }, 3000);
});
