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

    // ドロップ時の実際の処理
    $('.menu li').on('drop', function(event, ui) {
        // ページの遷移を防止
        // (これが無いとドラッグファイルの内容が表示される)
        event.preventDefault();

        // ドロップ先の要素を取得
        var dropImg = $(this).find('img');
        var dropImgSrc = dropImg.attr('src');
        var dropImgClass = dropImg.attr('class');
        var dropImgId = dropImg.attr('userId');
        var dropOrder = dropImg.attr('order');

        // ドラッグ元の要素を取得
        var dragImgClass = event.dataTransfer.getData('text/plain');
        var dragImg = $('img.' + dragImgClass);

        var dragImgSrc = dragImg.attr('src');
        var dragImgClass = dragImg.attr('class');
        var dragImgId = dragImg.attr('userId');
        var dragOrder = dragImg.attr('order');

        // ドラッグ元の画像をドロップ先のURLへ更新
        dragImg.attr('src', dropImgSrc);
        dragImg.attr('class', dropImgClass);
        dragImg.attr('userId', dropImgId);

        // ドロップ先の画像をドラッグ元のURLへ更新
        dropImg.attr('src', dragImgSrc);
        dropImg.attr('class', dragImgClass);
        dropImg.attr('userId', dragImgId);

        // モデルの値も更新
        var answerUsers = $.parseJSON($('.answer-users').val());

        var dragUser = answerUsers[dragOrder];
        var dropUser = answerUsers[dropOrder];

        answerUsers[dragOrder] = dropUser;
        answerUsers[dropOrder] = dragUser;

        $('.answer-users').val($.stringify(answerUsers));
    })
})

