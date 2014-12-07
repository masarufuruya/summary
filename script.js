$(function() {
    // FileAPI有効化(これでdataTransferが利用できるようになる)
    jQuery.event.props.push('dataTransfer');

    // objectをJSONへ変換
    jQuery.extend({
        stringify : function stringify(obj) {
            var t = typeof (obj);
            if (t != "object" || obj === null) {
                // simple data type
                if (t == "string") obj = '"' + obj + '"';
                return String(obj);
            } else {
                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor == Array);

                for (n in obj) {
                    v = obj[n];
                    t = typeof(v);
                    if (obj.hasOwnProperty(n)) {
                        if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                }
                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        }
    });

    // ドラッグ開始
    $('.menu li').on('dragstart', function(event, ui) {
        // ドラッグした画像URLをセット
        var dragImgClass = $(this).find('img').attr('class');

        // ドラッグした要素のclass名をセット
        event.dataTransfer.setData('text/plain', dragImgClass);
    });
    // ドロップ開始
    $('.menu li').on('dragover', function(event, ui) {
        // ドロップを受け入れる
        event.preventDefault();
    });

    function checkIndex(array, id) {
        $.each(array, function(index, value) {
            console.log(value);
            console.log(value.id);
            console.log(value.name);
            if (value.id == id) {
                return index;
            }
        });
    }

    // ドロップ時の実際の処理
    $('.menu li').on('drop', function(event, ui) {
        // ページの遷移を防止
        // (これが無いとドラッグファイルの内容が表示される)
        event.preventDefault();

        // hiddenの値を取得
        var answerUsers = $.parseJSON($('.answer-users').val());

        // ドロップ先の要素を取得
        var dropImg = $(this).find('img');
        var dropImgSrc = dropImg.attr('src');
        var dropImgClass = dropImg.attr('class');
        var dropImgId = dropImg.attr('userId');

        // ドラッグ元の要素を取得
        var dragImgClass = event.dataTransfer.getData('text/plain');
        var dragImg = $('img.' + dragImgClass)

        var dragImgSrc = dragImg.attr('src');
        var dragImgClass = dragImg.attr('class');
        var dragImgId = dragImg.attr('userId');

        // $.each(answerUsers, function(id, val) {
        //     // ドロップ先のindex取得
        //     var dropIndex = checkIndex(answerUsers, dropImgId);

        //     // ドラッグ元のindex取得
        //     var dragIndex = checkIndex(answerUsers, dragImgId);

        //     // ドロップ先のユーザーを取得
        //     var dropUser = answerUsers[dropImgId];

        //     // ドラッグ元のユーザーを取得
        //     var dragUser = answerUsers[dragImgId];

        //     answerUsers.splice(dragIndex, dropIndex, dropIndex, dragIndex);

        //     // // ドラッグ元のユーザーをドロップ先のユーザーへ更新
        //     // answerUsers[dragImgId] = dropUser;

        //     // // ドロップ先のユーザーをドラッグ元のユーザーへ更新
        //     // answerUsers[dropImgId] = dragUser;
        // });
        $('.answer-users').val($.stringify(answerUsers));

        // ドラッグ元の画像をドロップ先のURLへ更新
        dragImg.attr('src', dropImgSrc);
        dragImg.attr('class', dropImgClass);
        dragImg.attr('userId', dropImgId);

        // ドロップ先の画像をドラッグ元のURLへ更新
        dropImg.attr('src', dragImgSrc);
        dropImg.attr('class', dragImgClass);
        dropImg.attr('userId', dragImgId);
    });
})

