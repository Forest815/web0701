// clipboard copy
(function () { // 即時実行関数（グローバル汚染対策）
  let i = 0; // for文用変数の定義
  let el = {}; // 配列・変数用（巻き上げ防止の為、冒頭にて宣言）

  document.addEventListener('DOMContentLoaded', function () {
    // 各セレクタの指定
    el.clipboardButton = document.querySelectorAll('.js-clipboard-button'); // クリップボードコピーボタンのセレクタを指定
    el.clipboardText = document.querySelectorAll('.js-clipboard-text'); // クリップボードにコピーしたいテキストのセレクタを指定
    el.clipboardChangeText = document.querySelectorAll('.js-clipboard-text-change'); // クリップボードコピーボタンテキストの切り替えのセレクタを指定

    // コピー完了時の各種指定
    el.textChangeFlag = true; // コピー完了テキストに書き換えるかを指定（書き換える：true、書き換えない：false）
    el.textChangeClass = 'is-text-change'; // コピー完了テキスト変更時のclass指定
    el.completionText = 'クリップボードにコピーしました'; // コピー完了時のテキストを指定
    el.textReturnToInitialFlag = true; // コピー完了後テキストを一定時間後に書き換え前の状態に戻すか指定（戻す：true、戻さない：false）
    el.textChangeDelay = 3000; // 書き換え前のテキストに戻すまでの間隔（遅延）を指定（ms）

    // クリップボードコピーボタンのイベント処理
    for (i = 0; i < el.clipboardButton.length; ++i) {
      el.clipboardButton[i].addEventListener('click', {
        // 引数と関数をオブジェクトにして渡す
        targetIndex: i, // 現在の該当要素が何番目かの情報を指定
        textChangeFlag: el.textChangeFlag, // コピー完了後テキストに書き換えを指定
        textReturnToInitialFlag: el.textReturnToInitialFlag, // 一定時間後に書き換え前の状態に戻すか指定
        handleEvent: el.clipBoardCopyFnc // 実行する関数を指定
      });
    }
  }, false);

  // クリップボードコピー用関数
  el.clipBoardCopyFnc = function () {
    // 現在こちらの関数が処理実行途中かを判定
    if (el.activeFlag === true) {
      return; // 処理途中の場合はここ以降の処理を中断
    }

    el.activeFlag = true; // 処理を実行判定フラグを実行中に設定
    el.targetIndex = this.targetIndex; // 現在の該当要素が何番目かの情報を変数に格納
    el.clipboardTarget = el.clipboardText[el.targetIndex].textContent; // コピー対象のテキストを取得
    el.currentChangeText = el.clipboardChangeText[el.targetIndex].textContent; // コピー完了後テキストに書き換え前のテキストを取得

    // クリップボードに該当テキストをコピー
    if (navigator.clipboard == undefined) {
      window.clipboardData.setData('Text', el.clipboardTarget); // IE
    } else {
      navigator.clipboard.writeText(el.clipboardTarget); // IE以外
    }

    // コピー完了後テキストに書き換えフラグが「書き換える：true」か判定
    if (this.textChangeFlag) {
      el.clipboardChangeText[el.targetIndex].classList.add(el.textChangeClass); // コピー完了テキスト変更時のclassを付与
      el.clipboardChangeText[el.targetIndex].textContent = el.completionText; // コピー完了後テキストに書き換え
    }

    // 各種フラグが「書き換える：true」および「戻す：true」か判定
    if (this.textChangeFlag && this.textReturnToInitialFlag) {
      setTimeout(function () {
        el.clipboardChangeText[el.targetIndex].classList.remove(el.textChangeClass); // コピー完了テキスト変更時のclassを削除
        el.clipboardChangeText[el.targetIndex].textContent = el.currentChangeText; // コピー完了後テキストに書き換え
        el.activeFlag = false; // 処理を実行判定フラグを初期値に設定
      }, el.textChangeDelay);
    } else {
      setTimeout(function () {
        el.activeFlag = false; // 処理を実行判定フラグを初期値に設定
      }, el.textChangeDelay);
    }
  }
}());
