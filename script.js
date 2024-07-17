document.querySelectorAll('.copyButton').forEach(button => {
    button.addEventListener('click', function() {
        // ボタンの親要素の中のコード要素を取得
        var codeElement = button.previousElementSibling;
        // 一時的なテキストエリアを作成してコードをコピー
        var textArea = document.createElement('textarea');
        textArea.value = codeElement.innerText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // ボタンにコピー完了のメッセージを表示
        button.textContent = 'コピー完了';
        
        // 3秒後にボタンのテキストを元に戻す
        setTimeout(function() {
            button.textContent = 'コピー';
        }, 3000);
    });
});
