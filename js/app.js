var $jscomp=$jscomp||{};function toOptionUrl(a){a="/"+lang+"/?ot="+a,window.history&&window.history.replaceState?window.history.replaceState(null,null,a):window.location.href=a}function plainDownload(){var a=$("#plain-download-form input[name='postUrl']").val();plainDownloadFormValidate(a)&&(a=matchPurePostUrl(a),$("#plain-download-form input[name='postUrl']").val(a),$("#plain_download_submit").attr("disabled",!0),$("#plain-download-container").empty(),$("#plain-download-container").LoadingOverlay("show"),$.post("/plainDownload",{postUrl:a},function(a){if($("#plain-download-container").LoadingOverlay("hide"),$("#plain_download_submit").attr("disabled",!1),"1"!=a.code)$("#plain-download-container").html(buildMessage(localizeResultMessage(a)));else{var o="",e=[];$.each(a.result,function(a,n){if("2"==n.mediaType){var t=n.mediaName.split(".")[0];e.push({videoId:t,videoDisplayURL:"/mediaDisplay/"+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=2&eht="+n.urlExpireHashTime})}t={1:'<img class="img-thumbnail img-fluid" src="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'">',2:'<video id="'+t+'" class="img-thumbnail img-fluid" controls poster="/mediaDisplay/'+n.shortPosterName+"?mhu="+n.posterHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'"></video>'}[n.mediaType],o+={1:'<div class="col-md-12 offset-md-0 mt-2">'+t+'<a href="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',2:'<div class="col-md-12 offset-md-0 mt-2">'+t+"<button onclick=\"downloadVideo('"+n.shortMediaName+"', '"+n.mediaHashUrl+'\')" class="btn material-icons download-button">file_download</button></div>'}[n.mediaType]}),$("#plain-download-container").html(o),$("#plain-download-container").append(feedAds),$("#plain-download-form input[name='postUrl']").val(""),e.forEach(function(a,o){fetch(a.videoDisplayURL,{method:"GET",responseType:"blob"}).then(function(a){return a.blob()}).then(function(o){$("#"+a.videoId).attr("src",URL.createObjectURL(o))})})}}))}function plainDownloadFormValidate(a){return isEmptyString(a)?($("#plain-download-container").empty(),$("#plain-download-container").html(buildMessage(infoMap[lang][0])),!1):!!/^https:\/\/(|www.)instagram.com\/.*$/.test(a)||($("#plain-download-container").empty(),$("#plain-download-container").html(buildMessage(infoMap[lang][1])),!1)}function batchDownload(){var a=$("#batch-download-form input[name='userName']").val();batchDownloadFormValidate(a)&&(a=matchUserName(a),$("#batch-download-form input[name='userName']").val(a),$("#batch_download_submit").attr("disabled",!0),$("#batch-download-container").empty(),$("#batch-download-container").html(buildMessage(infoMap[lang][5])),$(".loading-overlay-container").LoadingOverlay("show"),$.post("/batchDownload",{userName:a},function(a){$(".loading-overlay-container").LoadingOverlay("hide"),$("#batch_download_submit").attr("disabled",!1),"1"!=a.code?$("#batch-download-container").html(buildMessage(localizeResultMessage(a))):($("#batch-download-container").html(buildMessage('<span class="text-info font-weight-bold">'+a.result.downloadName+'<button class="btn material-icons" onclick="batchDownloadZip(\''+a.result.downloadName+"', '"+a.result.fileID+'\')" role="button">cloud_download</button></span>')),$("#batch-download-form input[name='userName']").val(""))}))}function batchDownloadZip(a,o){$(".loading-overlay-container").LoadingOverlay("show"),$.fileDownload("/zipDownload",{httpMethod:"GET",data:{downloadName:a,fileID:o},prepareCallback:function(a){$("#batch-download-container").html(buildMessage(infoMap[lang][6]))},abortCallback:function(a){$("#batch-download-container").html(buildMessage(infoMap[lang][7])),$(".loading-overlay-container").LoadingOverlay("hide")},successCallback:function(a){$("#batch-download-container").html(buildMessage(infoMap[lang][8])),$(".loading-overlay-container").LoadingOverlay("hide")},failCallback:function(a,o){var e=$.parseJSON($(a).text());$("#batch-download-container").html(buildMessage(e.message)),$(".loading-overlay-container").LoadingOverlay("hide")}})}function batchDownloadFormValidate(a){return!isEmptyString(a)||($("#batch-download-container").empty(),$("#batch-download-container").html(buildMessage(infoMap[lang][2])),!1)}function storyDownload(){var a=$("#story-download-form input[name='userName']").val();storyDownloadFormValidate(a)&&(a=matchUserName(a),$("#story-download-form input[name='userName']").val(a),$("#story_download_submit").attr("disabled",!0),$("#story-download-container").empty(),$("#story-download-container").LoadingOverlay("show"),$.post("/storyDownload",{userName:a},function(a){if($("#story-download-container").LoadingOverlay("hide"),$("#story_download_submit").attr("disabled",!1),"1"!=a.code)$("#story-download-container").html(buildMessage(localizeResultMessage(a)));else{var o="",e=[];$.each(a.result,function(a,n){if("2"==n.mediaType){var t=n.mediaName.split(".")[0];e.push({videoId:t,videoDisplayURL:"/mediaDisplay/"+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=2&eht="+n.urlExpireHashTime})}var l=new Date(1e3*n.storyExpireTime).Format("yyyy-MM-dd HH:mm:ss");t={1:'<img class="img-thumbnail img-fluid" src="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'">',2:'<video id="'+t+'" class="img-thumbnail img-fluid" controls poster="/mediaDisplay/'+n.shortPosterName+"?mhu="+n.posterHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'"></video>'}[n.mediaType],o+={1:'<div class="col-md-12 offset-md-0 mt-2">'+t+'<span class="expire-info text-black font-weight-bold"><span class="material-icons inline-block" style="vertical-align: middle;">schedule</span>'+l+'</span><a href="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'" class="btn text-black material-icons download-button" target="_blank" role="button">file_download</a></div>',2:'<div class="col-md-12 offset-md-0 mt-2">'+t+'<span class="expire-info text-black font-weight-bold"><span class="material-icons inline-block" style="vertical-align: middle;">schedule</span>'+l+"</span><button onclick=\"downloadVideo('"+n.shortMediaName+"', '"+n.mediaHashUrl+'\')" class="btn text-black material-icons download-button">file_download</button></div>'}[n.mediaType]}),$("#story-download-container").html(o),$("#story-download-container").append(feedAds),$("#story-download-form input[name='userName']").val(""),e.forEach(function(a,o){fetch(a.videoDisplayURL,{method:"GET",responseType:"blob"}).then(function(a){return a.blob()}).then(function(o){$("#"+a.videoId).attr("src",URL.createObjectURL(o))})})}}))}function storyDownloadFormValidate(a){return!isEmptyString(a)||($("#story-download-container").empty(),$("#story-download-container").html(buildMessage(infoMap[lang][2])),!1)}function highlightDownload(){var a=$("#highlight-download-form input[name='highlightUrl']").val();highlightDownloadFormValidate(a)&&($("#highlight_download_submit").attr("disabled",!0),$("#highlight-download-container").empty(),$("#highlight-download-container").LoadingOverlay("show"),$.post("/highlightDownload",{highlightUrl:a},function(a){if($("#highlight-download-container").LoadingOverlay("hide"),$("#highlight_download_submit").attr("disabled",!1),"1"!=a.code)$("#highlight-download-container").html(buildMessage(localizeResultMessage(a)));else{var o="",e=[];$.each(a.result,function(a,n){if("2"===n.mediaType){var t=n.mediaName.split(".")[0];e.push({videoId:t,videoDisplayURL:"/mediaDisplay/"+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=2&eht="+n.urlExpireHashTime})}t={1:'<img class="img-thumbnail img-fluid" src="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'">',2:'<video id="'+t+'" class="img-thumbnail img-fluid" controls poster="/mediaDisplay/'+n.shortPosterName+"?mhu="+n.posterHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'"></video>'}[n.mediaType],o+={1:'<div class="col-md-12 offset-md-0 mt-2">'+t+'<a href="/mediaDisplay/'+n.shortMediaName+"?mhu="+n.mediaHashUrl+"&mt=1&eht="+n.urlExpireHashTime+'" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',2:'<div class="col-md-12 offset-md-0 mt-2">'+t+"<button onclick=\"downloadVideo('"+n.shortMediaName+"', '"+n.mediaHashUrl+'\')" class="btn material-icons download-button">file_download</button></div>'}[n.mediaType]}),$("#highlight-download-container").html(o),$("#highlight-download-container").append(feedAds),$("#highlight-download-form input[name='highlightUrl']").val(""),e.forEach(function(a,o){fetch(a.videoDisplayURL,{method:"GET",responseType:"blob"}).then(function(a){return a.blob()}).then(function(o){$("#"+a.videoId).attr("src",URL.createObjectURL(o))})})}}))}function highlightDownloadFormValidate(a){if(isEmptyString(a))return $("#highlight-download-container").empty(),$("#highlight-download-container").html(buildMessage(infoMap[lang][10])),!1;return!(!/^https:\/\/www.instagram.com\/stories\/highlights\/.*$/.test(a)&&!/^https:\/\/www.instagram.com\/s\/.*?story_media_id=.*$/.test(a))||($("#highlight-download-container").empty(),$("#highlight-download-container").html(buildMessage(infoMap[lang][11])),!1)}function profileDownload(){var a=$("#profile-download-form input[name='userName']").val();profileDownloadFormValidate(a)&&(a=matchUserName(a),$("#profile-download-form input[name='userName']").val(a),$("#profile_download_submit").attr("disabled",!0),$("#profile-download-container").empty(),$("#profile-download-container").LoadingOverlay("show"),$.post("/profileDownload",{userName:a},function(a){$("#profile-download-container").LoadingOverlay("hide"),$("#profile_download_submit").attr("disabled",!1),"1"!==a.code?$("#profile-download-container").html(buildMessage(localizeResultMessage(a))):(a='<div class="col-md-12 offset-md-0 mt-2"><img class="img-thumbnail img-fluid" src="/mediaDisplay/'+(a=a.result).shortMediaName+"?mhu="+a.mediaHashUrl+"&mt=1&eht="+a.urlExpireHashTime+'"><a href="/mediaDisplay/'+a.shortMediaName+"?mhu="+a.mediaHashUrl+"&mt=1&eht="+a.urlExpireHashTime+'" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',$("#profile-download-container").html(a),$("#profile-download-container").append(feedAds),$("#profile-download-form input[name='userName']").val(""))}))}function profileDownloadFormValidate(a){return!isEmptyString(a)||($("#profile-download-container").empty(),$("#profile-download-container").html(buildMessage(infoMap[lang][2])),!1)}function followersDownload(){var a=$("#followers-download-form input[name='userName']").val(),o=$("#followers-download-form input[name='redeemCode']").val();followersDownloadFormValidate(a,o)&&(a=matchUserName(a),$("#followers-download-form input[name='userName']").val(a),$("#followers_download_submit").attr("disabled",!0),$("#followers-download-container").empty(),$("#followers-download-container").html(buildMessage(infoMap[lang][5])),$(".loading-overlay-container").LoadingOverlay("show"),$.post("/followersDownload",{userName:a,redeemCode:o},function(a){$(".loading-overlay-container").LoadingOverlay("hide"),$("#followers_download_submit").attr("disabled",!1),"1"!=a.code?$("#followers-download-container").html(buildMessage(localizeResultMessage(a))):($("#followers-download-container").html(buildMessage('<span class="text-info font-weight-bold">'+a.result.downloadName+'<button class="btn material-icons" onclick="followersDownloadText(\''+a.result.downloadName+"', '"+a.result.downloadKey+'\')" role="button">cloud_download</button></span>')),$("#followers-download-form input[name='userName']").val(""),$("#followers-download-form input[name='redeemCode']").val(""))}))}function followersDownloadText(a,o){$(".loading-overlay-container").LoadingOverlay("show"),$.fileDownload("/textDownload",{httpMethod:"GET",data:{downloadName:a,downloadKey:o},prepareCallback:function(a){$("#followers-download-container").html(buildMessage(infoMap[lang][6]))},abortCallback:function(a){$("#followers-download-container").html(buildMessage(infoMap[lang][7])),$(".loading-overlay-container").LoadingOverlay("hide")},successCallback:function(a){$("#followers-download-container").html(buildMessage(infoMap[lang][8])),$(".loading-overlay-container").LoadingOverlay("hide")},failCallback:function(a,o){var e=$.parseJSON($(a).text());$("#followers-download-container").html(buildMessage(localizeResultMessage(e))),$(".loading-overlay-container").LoadingOverlay("hide")}})}function followersDownloadFormValidate(a,o){return isEmptyString(a)?($("#followers-download-container").empty(),$("#followers-download-container").html(buildMessage(infoMap[lang][2])),!1):!isEmptyString(o)||($("#followers-download-container").empty(),$("#followers-download-container").html(buildMessage(infoMap[lang][12])),!1)}function batchDownloadPro(){var a=$("#batch-download-pro-form input[name='userName']").val(),o=$("#batch-download-pro-form input[name='redeemCode']").val();batchDownloadProFormValidate(a,o)&&(a=matchUserName(a),$("#batch-download-pro-form input[name='userName']").val(a),$("#batch_download_pro_submit").attr("disabled",!0),$("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][5])),$(".loading-overlay-container").LoadingOverlay("show"),$.post("/batchDownloadPro",{userName:a,redeemCode:o},function(a){$(".loading-overlay-container").LoadingOverlay("hide"),$("#batch_download_pro_submit").attr("disabled",!1),"1"!=a.code?$("#batch-download-pro-container").html(buildMessage(localizeResultMessage(a))):($("#batch-download-pro-container").html(buildMessage('<span class="text-info font-weight-bold">'+a.result.downloadName+'<button class="btn material-icons" onclick="batchDownloadProZip(\''+a.result.downloadName+"', '"+a.result.fileID+'\')" role="button">cloud_download</button></span>')),$("#batch-download-pro-form input[name='userName']").val(""),$("#batch-download-pro-form input[name='redeemCode']").val(""))}))}function batchDownloadProZip(a,o){$(".loading-overlay-container").LoadingOverlay("show"),$.fileDownload("/zipDownload",{httpMethod:"GET",data:{downloadName:a,fileID:o},prepareCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][6]))},abortCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][7])),$(".loading-overlay-container").LoadingOverlay("hide")},successCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][8])),$(".loading-overlay-container").LoadingOverlay("hide")},failCallback:function(a,o){var e=$.parseJSON($(a).text());$("#batch-download-pro-container").html(buildMessage(e.message)),$(".loading-overlay-container").LoadingOverlay("hide")}})}function batchDownloadProFormValidate(a,o){return isEmptyString(a)?($("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][2])),!1):!isEmptyString(o)||($("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][12])),!1)}function downloadVideo(a,o){$("body").LoadingOverlay("show"),fetch("/videoDownload",{headers:{"content-type":"application/json"},method:"POST",body:JSON.stringify({downloadName:a,mediaHashUrl:o})}).then(function(a){return a.blob()}).then(function(o){var e=window.navigator.userAgent;(e.match(/iPad/i)||e.match(/iPhone/i))&&$("#videoDownloadPromptModal").modal("show"),download(o,a,"application/octet-stream"),$("body").LoadingOverlay("hide")})["catch"](function(a){$("body").LoadingOverlay("hide"),alert(a)})}function isEmptyString(a){return!a||""===a||null==a||0===a.trim().length}function localizeResultMessage(a){if(a.code in codeMap)return codeMap[a.code][lang];var o=infoMap.en.indexOf(a.message);return-1===o?a.message:infoMap[lang][o]}function buildMessage(a){return'<div class="col-md-12 offset-md-0 mt-2"><div class="alert alert-warning alert-dismissible fade show loading-overlay-container" role="alert">\n\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n\t\t\t<span aria-hidden="true">×</span>\n\t\t</button>\n\t\t<p class="text-left">'+a+"</p>\n\t</div></div>"}function matchPurePostUrl(a){/https:\/\/instagram.com\/(.*?)/.test(a)&&(a=a.replace("instagram.com","www.instagram.com"));var o=/(.*?)(\?|$)/.exec(a);return o&&o[1]?o[1].trim():a}function matchUserName(a){if(a=a.trim(),/https:\/\/.*instagram.com\/stories\/(.*?)/.test(a)){var o=/https:\/\/.*instagram.com\/stories\/(.*?)(\/|\?|$)/.exec(a);return o&&o[1]?o[1].trim():a}return/https:\/\/.*instagram.com\/(.*?)/.test(a)&&(o=/https:\/\/.*instagram.com\/(.*?)(\/|\?|$)/.exec(a))&&o[1]?o[1].trim():a}$jscomp.scope={},$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a},$jscomp.createTemplateTagFirstArgWithRaw=function(a,o){return a.raw=o,a},infoMap={en:"Post url cannot be blank.;Post url is invalid.;Username ID cannot be blank.;Please select download mode.;User cookie cannot be blank;Processing... please wait about 1-3 minutes.;File is downloading...;File download terminated abnormally.;File downloaded successfully.;Username ID is invalid.;Story highlights url cannot be blank.;Story highlights url is invalid.;Redeem code cannot be blank.".split(";"),cn:"帖子链接不能为空。 帖子链接无效。 用户名ID不能为空。 请选择下载模式。 用户cookie不能为空。 正在处理...请等待1-3分钟。 文件正在下载中... 文件下载异常终止。 文件下载成功。 用户名ID无效。 快拍精选链接不能为空。 快拍精选链接无效。 兑换码不能为空。".split(" "),hk:"貼文鏈接不能為空。 貼文鏈接無效。 用戶名ID不能為空。 請選擇下載模式。 用戶cookie不能為空。 正在處理...請等待1-3分鐘。 文件正在下載中... 文件下載異常終止。 文件下載成功。 用戶名ID無效。 限時動態精選鏈接不能為空。 限時動態精選鏈接無效。 兌換碼不能為空。".split(" "),jp:"投稿のURLを空白にすることはできません。;投稿URLが無効です。;ユーザー名IDを空白にすることはできません。;ダウンロードモードを選択してください。;ユーザーCookieを空白にすることはできません;処理中... 1〜3分ほどお待ちください。;ファイルをダウンロードしています...;ファイルのダウンロードが異常終了しました。;ファイルが正常にダウンロードされました。;ユーザー名IDが無効です。;ストーリーのハイライトURLを空白にすることはできません。;ストーリーのハイライトURLが無効です。;引き換えコードを空白にすることはできません。".split(";")},codeMap={408:{en:"Request timed out, please try again.",cn:"请求超时，再试一次。",hk:"請求超時，再試一次。",jp:"リクエストがタイムアウトしました。もう一度お試しください。"},429:{en:"Request too frequent, please try again in a few minutes.",cn:"请求太频繁，请等待几分钟后重试。",hk:"請求太頻繁，請等待幾分鐘後重試。",jp:"リクエストが多すぎます。数分後にもう一度お試しください。"},42901:{en:"Operation has reached the limit, please try again in a few hours.",cn:"操作次数已达上限，请等待数小时后重试。",hk:"操作次數已達上限，請等待數小時後重試。",jp:"操作が制限に達しました。数時間後に再試行してください。"},42902:{en:"This Feature is temporarily unavailable, please try again later.",cn:"该功能暂不可用，请稍后重试。",hk:"該功能暫不可用，請稍後重試。",jp:"この機能は一時的に利用できません。しばらくしてからもう一度お試しください。"},10000:{en:"Error downloading url.",cn:"下载链接时出错。",hk:"下載鏈接時出錯。",jp:"URLのダウンロード中にエラーが発生しました。"},10001:{en:"Error downloading file.",cn:"下载文件时出错。",hk:"下載文件時出錯。",jp:"ファイルのダウンロード中にエラーが発生しました。"},10002:{en:"Error generating zip.",cn:"生成压缩包时出错。",hk:"生成壓縮包時出錯。",jp:"zipの生成中にエラーが発生しました。"},40001:{en:"Url is invalid or not supported yet.",cn:"链接无效或尚不支持。",hk:"鏈接無效或尚不支持。",jp:"URLが無効であるか、まだサポートされていません。"},40002:{en:"Username ID does not exist.",cn:"用户名ID不存在。",hk:"用戶名ID不存在。",jp:"ユーザー名IDが存在しません。"},40003:{en:"User has not posted content or account is private.",cn:"用户尚未发布内容或帐户未公开。",hk:"用戶尚未發佈內容或帳戶未公開。",jp:"ユーザーがコンテンツを投稿していないか、アカウントが非公開です。"},40004:{en:"Invalid username ID or cookie.",cn:"用户名ID或Cookie无效。",hk:"用戶名ID或Cookie無效。",jp:"ユーザー名IDまたはCookieが無効です。"},40006:{en:"User has not posted Instagram Story or has expired.",cn:"用户尚未发布快拍(Instagram Story)或已过期。",hk:"用戶尚未發布限時動態(Instagram Story)或已過期。",jp:"ユーザーがInstagramストーリーを投稿していないか、有効期限が切れています。"},40008:{en:"Story highlights does not exist.",cn:"快拍精选内容不存在。",hk:"限時動態精選內容不存在。",jp:"ストーリーのハイライトは存在しません。"},40009:{en:"Redeem code is invalid.",cn:"兑换码无效。",hk:"兌換碼無效。",jp:"無効な引き換えコード"}},optionMap=["plain-download","batch-download","story-download","highlight-download","profile-download"],titleMap={"plain-download":{en:"Insta Downloader - Instagram Posts Downloader",cn:"Insta Downloader - Instagram帖子下载",hk:"Insta Downloader - Instagram貼文下載",jp:"Insta Downloader - Instagram投稿ダウンローダー"},"batch-download":{en:"Insta Downloader - Instagram Bulk Downloader",cn:"Insta Downloader - Instagram批量下载",hk:"Insta Downloader - Instagram批量下載",jp:"Insta Downloader - Instagramバルクダウンローダー"},"story-download":{en:"Insta Downloader - Instagram Story Downloader",cn:"Insta Downloader - Instagram快拍下载",hk:"Insta Downloader - Instagram限時動態下載",jp:"Insta Downloader - Instagramストーリーダウンローダー"},"highlight-download":{en:"Insta Downloader - Instagram Highlights Downloader",cn:"Insta Downloader - Instagram快拍精选下载",hk:"Insta Downloader - Instagram限時動態精選下載",jp:"Insta Downloader - Instagramハイライトダウンローダー"},"profile-download":{en:"Insta Downloader - Instagram Profile Downloader",cn:"Insta Downloader - Instagram用户头像下载",hk:"Insta Downloader - Instagram個人資料頭像下載",jp:"Insta Downloader - Instagramプロフィールダウンローダー"}},feedAds='<div class="col-md-12 offset-md-0 mt-2">\n\t\t\t\t<ins class="adsbygoogle"\n\t\t\t     style="display:block"\n\t\t\t     data-ad-client="ca-pub-6232783881632642"\n\t\t\t     data-ad-slot="2883708977"\n\t\t\t     data-ad-format="rectangle"\n\t\t\t     data-full-width-responsive="false"></ins>\n\t\t\t\t<script>\n\t\t\t     (adsbygoogle = window.adsbygoogle || []).push({});\n\t\t\t\t<\/script>\n\t\t\t</div>',$(document).ready(function(){var a,o=$("#container-content").prop("outerHTML"),e=new URLSearchParams(new URL(window.location.href).search);e.has("ot")&&-1<$.inArray(a=e.get("ot"),optionMap)&&($(".dropdown-menu a[class*='active']").removeClass("active"),e=$(".dropdown-menu a").filter("[tab-id='"+a+"']").addClass("active"),$("#default-option").html(e.html()),$("title").html(titleMap[a][lang]),$(".tab-content div[class*='active']").removeClass("active").addClass("fade"),$(".tab-content div").filter("[id='"+a+"']").removeClass("fade").addClass("active"),a="#"+a+"-container",o&&$("#container-content").detach().appendTo(a)),/Edge\/\d./i.test(navigator.userAgent)&&$(".material-icons.download-item-icon").remove(),$("h1").click(function(){$(location).prop("href","https://instaer.app/"+lang)}),$(".dropdown-menu a").on("click",function(){$(".dropdown-toggle").html($(this).html());var a=$(this).attr("tab-id");$(".tab-pane").removeClass("active"),$("#"+a).tab("show"),$(".dropdown-item").removeClass("active"),$("a[tab-id='"+a+"']").addClass("active"),$("title").html(titleMap[a][lang]),a="#"+a+"-container",o&&($(a).empty(),$(o).appendTo(a))}),$("form input").on("keypress",function(a){return 13!==a.which}),$("#plain_download_submit").on("click",function(a){plainDownload()}),$("#batch_download_submit").on("click",function(a){batchDownload()}),$("#story_download_submit").on("click",function(a){storyDownload()}),$("#highlight_download_submit").on("click",function(a){highlightDownload()}),$("#profile_download_submit").on("click",function(a){profileDownload()}),$("#followers_download_submit").on("click",function(a){followersDownload()}),$("#batch_download_pro_submit").on("click",function(a){batchDownloadPro()})}),Date.prototype.Format=function(a){var o={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"H+":0==this.getHours()%12?12:this.getHours()%12,"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var e in/(y+)/.test(a)&&(a=a.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),o)new RegExp("("+e+")").test(a)&&(a=a.replace(RegExp.$1,1===RegExp.$1.length?o[e]:("00"+o[e]).substr((""+o[e]).length)));return a};