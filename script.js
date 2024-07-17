// script.js

document.getElementById('copyButton').addEventListener('click', function() {
    // コード要素を取得
    var codeElement = document.getElementById('code');
    // 一時的なテキストエリアを作成してコードをコピー
    var textArea = document.createElement('textarea');
    textArea.value = codeElement.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // ボタンにコピー完了のメッセージを表示
    var button = document.getElementById('copyButton');
    button.textContent = 'コピー完了';
    
    // 3秒後にボタンのテキストを元に戻す
    setTimeout(function() {
        button.textContent = 'コピー';
    }, 3000);
});
