var $jscomp=$jscomp||{};function mediaDownload(){var a=$("#media-download-form input[name='mediaUrl']").val();mediaDownloadFormValidate(a)&&(a=matchPureMediaUrl(a),$("#media-download-form input[name='mediaUrl']").val(a),$("#media_download_submit").attr("disabled",!0),$("#media-download-container").empty(),$("#media-download").LoadingOverlay("show"),fpPromise.then(function(a){return a.get()}).then(function(e){$.ajaxSetup({headers:{"visitor-token":btoa(e.visitorId)}}),$.post("/mediaDownload",{mediaUrl:a},function(a){if($("#media-download").LoadingOverlay("hide"),$("#media_download_submit").attr("disabled",!1),"1"!=a.code)$("#media-download-container").html(buildMessage(localizeResultMessage(a)));else{var e="",o=[];$.each(a.result,function(a,n){if("2"===n.type){var t=n.name.split(".")[0];o.push({videoId:t,videoDisplayURL:"/mediaDisplay/"+n.name+"?mu="+n.url+"&mt=2&ea="+n.expireAt})}t={1:'<img class="img-thumbnail img-fluid" src="/mediaDisplay/'+n.name+"?mu="+n.url+"&mt=1&ea="+n.expireAt+'">',2:'<video id="'+t+'" class="img-thumbnail img-fluid" controls></video>'}[n.type],e+={1:'<div class="col-md-6 mt-4">'+t+'<a href="/mediaDisplay/'+n.name+"?mu="+n.url+"&mt=1&ea="+n.expireAt+'" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',2:'<div class="col-md-6 mt-4">'+t+"<button onclick=\"downloadVideo('"+n.name+"', '"+n.url+'\')" class="btn material-icons download-button">file_download</button></div>'}[n.type]}),$("#media-download-container").html(e),$("#media-download-container").append(feedAds),$("#media-download-form input[name='mediaUrl']").val(""),o.forEach(function(a,e){fetch(a.videoDisplayURL,{method:"GET",responseType:"blob"}).then(function(a){return a.blob()}).then(function(e){$("#"+a.videoId).attr("src",URL.createObjectURL(e))})})}})}))}function mediaDownloadFormValidate(a){return isEmptyString(a)?($("#media-download-container").empty(),$("#media-download-container").html(buildMessage(infoMap[lang][0])),!1):!!RegExp("^https://(|www.)instagram.com/.*$").test(a)||($("#media-download-container").empty(),$("#media-download-container").html(buildMessage(infoMap[lang][1])),!1)}function profileDownload(){var a=$("#profile-download-form input[name='userName']").val();profileDownloadFormValidate(a)&&(a=matchUserName(a),$("#profile-download-form input[name='userName']").val(a),$("#profile_download_submit").attr("disabled",!0),$("#profile-download-container").empty(),$("#profile-download").LoadingOverlay("show"),fpPromise.then(function(a){return a.get()}).then(function(e){$.ajaxSetup({headers:{"visitor-token":btoa(e.visitorId)}}),$.post("/profileDownload",{userName:a},function(a){$("#profile-download").LoadingOverlay("hide"),$("#profile_download_submit").attr("disabled",!1),"1"!==a.code?$("#profile-download-container").html(buildMessage(localizeResultMessage(a))):(a='<div class="col-md-6 mt-4"><img class="img-thumbnail img-fluid" src="/mediaDisplay/'+(a=a.result).name+"?mu="+a.url+"&mt=1&ea="+a.expireAt+'"><a href="/mediaDisplay/'+a.name+"?mu="+a.url+"&mt=1&ea="+a.expireAt+'" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',$("#profile-download-container").html(a),$("#profile-download-container").append(feedAds),$("#profile-download-form input[name='userName']").val(""))})}))}function profileDownloadFormValidate(a){return!isEmptyString(a)||($("#profile-download-container").empty(),$("#profile-download-container").html(buildMessage(infoMap[lang][2])),!1)}function batchDownloadPro(){var a=$("#batch-download-pro-form input[name='userName']").val(),e=$("#batch-download-pro-form input[name='redeemCode']").val();batchDownloadProFormValidate(a,e)&&(a=matchUserName(a),$("#batch-download-pro-form input[name='userName']").val(a),$("#batch_download_pro_submit").attr("disabled",!0),$("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][3])),$("#batch-download-pro").LoadingOverlay("show"),$.post("/batchDownloadPro",{userName:a,redeemCode:e},function(a){$("#batch-download-pro").LoadingOverlay("hide"),$("#batch_download_pro_submit").attr("disabled",!1),"1"!=a.code?$("#batch-download-pro-container").html(buildMessage(localizeResultMessage(a))):($("#batch-download-pro-container").html(buildMessage('<span class="text-info font-weight-bold">'+a.result.downloadName+'<button class="btn material-icons" onclick="batchDownloadProZip(\''+a.result.downloadName+"', '"+a.result.fileID+'\')" role="button">cloud_download</button></span>')),$("#batch-download-pro-form input[name='userName']").val(""),$("#batch-download-pro-form input[name='redeemCode']").val(""))}))}function batchDownloadProZip(a,e){$("#batch-download-pro").LoadingOverlay("show"),$.fileDownload("/zipDownload",{httpMethod:"GET",data:{downloadName:a,fileID:e},prepareCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][4]))},abortCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][5])),$("#batch-download-pro").LoadingOverlay("hide")},successCallback:function(a){$("#batch-download-pro-container").html(buildMessage(infoMap[lang][6])),$("#batch-download-pro").LoadingOverlay("hide")},failCallback:function(a,e){var o=$.parseJSON($(a).text());$("#batch-download-pro-container").html(buildMessage(o.message)),$("#batch-download-pro").LoadingOverlay("hide")}})}function batchDownloadProFormValidate(a,e){return isEmptyString(a)?($("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][2])),!1):!isEmptyString(e)||($("#batch-download-pro-container").empty(),$("#batch-download-pro-container").html(buildMessage(infoMap[lang][8])),!1)}function downloadVideo(a,e){$("body").LoadingOverlay("show"),fetch("/videoDownload",{headers:{"content-type":"application/json"},method:"POST",body:JSON.stringify({name:a,url:e})}).then(function(a){return a.blob()}).then(function(e){download(e,a,"application/octet-stream"),$("body").LoadingOverlay("hide")}).catch(function(a){$("body").LoadingOverlay("hide"),alert(a)})}function isEmptyString(a){return!a||""===a||null==a||0===a.trim().length}function localizeResultMessage(a){if(a.code in codeMap)return codeMap[a.code][lang];var e=infoMap.en.indexOf(a.message);return-1===e?a.message:infoMap[lang][e]}function buildMessage(a){return'<div class="col-md-12 offset-md-0 mt-2"><div class="alert alert-warning alert-dismissible fade show loading-overlay-container" role="alert">\n\t\t<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n\t\t\t<span aria-hidden="true">×</span>\n\t\t</button>\n\t\t<p class="text-left">'+a+"</p>\n\t</div></div>"}function matchPureMediaUrl(a){a=(a=a.replace("instagram.com/tv/","instagram.com/p/")).replace("instagram.com/reel/","instagram.com/p/"),/https:\/\/instagram.com\/(.*?)/.test(a)&&(a=a.replace("instagram.com","www.instagram.com"));var e=/(.*?)(\?|$)/.exec(a);return e&&e[1]?e[1].trim():a}function matchUserName(a){if(a=a.trim(),/https:\/\/.*instagram.com\/(.*?)/.test(a)){var e=/https:\/\/.*instagram.com\/(.*?)(\/|\?|$)/.exec(a);return e&&e[1]?e[1].trim():a}return a}$jscomp.scope={},$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a},$jscomp.createTemplateTagFirstArgWithRaw=function(a,e){return a.raw=e,a},infoMap={en:"Link cannot be blank.;Link is invalid.;Username ID cannot be blank.;Processing... please wait about 1-3 minutes.;File is downloading...;File download terminated abnormally.;File downloaded successfully.;Username ID is invalid.;Redeem code cannot be blank.".split(";"),cn:"链接不能为空。 链接无效。 用户名ID不能为空。 正在处理...请等待1-3分钟。 文件正在下载中... 文件下载异常终止。 文件下载成功。 用户名ID无效。 兑换码不能为空。".split(" "),hk:"鏈接不能為空。 鏈接無效。 用戶名ID不能為空。 正在處理...請等待1-3分鐘。 文件正在下載中... 文件下載異常終止。 文件下載成功。 用戶名ID無效。 兌換碼不能為空。".split(" "),jp:"URLを空白にすることはできません。;URLが無効です。;ユーザー名IDを空白にすることはできません。;処理中... 1〜3分ほどお待ちください。;ファイルをダウンロードしています...;ファイルのダウンロードが異常終了しました。;ファイルが正常にダウンロードされました。;ユーザー名IDが無効です。;引き換えコードを空白にすることはできません。".split(";")},codeMap={0:{en:"Request failed.",cn:"请求失败。",hk:"請求失敗。",jp:"要求が失敗しました。"},408:{en:"Request timed out, please try again.",cn:"请求超时，再试一次。",hk:"請求超時，再試一次。",jp:"リクエストがタイムアウトしました。もう一度お試しください。"},429:{en:"Request too frequent, please try again in a few minutes.",cn:"请求太频繁，请等待几分钟后重试。",hk:"請求太頻繁，請等待幾分鐘後重試。",jp:"リクエストが多すぎます。数分後にもう一度お試しください。"},500:{en:"Service temporarily unavailable.",cn:"服务暂时不可用。",hk:"服務暫時不可用。",jp:"サービスは一時的に利用できません。"},42901:{en:"Operation has reached the limit, please try again in a few hours.",cn:"操作次数已达上限，请等待数小时后重试。",hk:"操作次數已達上限，請等待數小時後重試。",jp:"操作が制限に達しました。数時間後に再試行してください。"},42902:{en:"Requests has reached the limit, please try again later.",cn:"请求次数已达到上限，请稍后重试。",hk:"請求次數已達到上限，請稍後重試。",jp:"リクエストが制限に達しました。しばらくしてからもう一度お試しください。"},10000:{en:"Error downloading url.",cn:"下载链接时出错。",hk:"下載鏈接時出錯。",jp:"URLのダウンロード中にエラーが発生しました。"},10001:{en:"Error downloading file.",cn:"下载文件时出错。",hk:"下載文件時出錯。",jp:"ファイルのダウンロード中にエラーが発生しました。"},10002:{en:"Error generating zip.",cn:"生成压缩包时出错。",hk:"生成壓縮包時出錯。",jp:"zipの生成中にエラーが発生しました。"},40001:{en:"Url is invalid or not supported yet.",cn:"链接无效或尚不支持。",hk:"鏈接無效或尚不支持。",jp:"URLが無効であるか、まだサポートされていません。"},40002:{en:"Username ID does not exist.",cn:"用户名ID不存在。",hk:"用戶名ID不存在。",jp:"ユーザー名IDが存在しません。"},40003:{en:"User has not posted content or account is private.",cn:"用户尚未发布内容或帐户未公开。",hk:"用戶尚未發佈內容或帳戶未公開。",jp:"ユーザーがコンテンツを投稿していないか、アカウントが非公開です。"},40005:{en:"Redeem code is invalid.",cn:"兑换码无效。",hk:"兌換碼無效。",jp:"無効な引き換えコード"}},optionMap=["media-download","profile-download"],feedAds='<div class="col-md-6 mt-4">\n\t\t\t\t<ins class="adsbygoogle"\n\t\t\t     style="display:block"\n\t\t\t     data-ad-client="ca-pub-6232783881632642"\n\t\t\t     data-ad-slot="2883708977"\n\t\t\t     data-ad-format="rectangle"\n\t\t\t     data-full-width-responsive="false"></ins>\n\t\t\t\t<script>\n\t\t\t     (adsbygoogle = window.adsbygoogle || []).push({});\n\t\t\t\t<\/script>\n\t\t\t</div>',fpPromise=new Promise(function(a,e){var o=document.createElement("script");o.onload=a,o.onerror=e,o.async=!0,o.src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js",document.head.appendChild(o)}).then(function(){return FingerprintJS.load()}),$(document).ready(function(){var a,e=new URLSearchParams(new URL(window.location.href).search);e.has("ot")&&-1<$.inArray(a=e.get("ot"),optionMap)&&($(".dropdown-menu a[class*='active']").removeClass("active"),e=$(".dropdown-menu a").filter("[tab-id='"+a+"']").addClass("active"),$("#default-option").html(e.html()),$(".tab-content div[class*='active']").removeClass("active").addClass("fade"),$(".tab-content div").filter("[id='"+a+"']").removeClass("fade").addClass("active")),/Edge\/\d./i.test(navigator.userAgent)&&$(".material-icons.download-item-icon").remove(),$("h1").click(function(){$(location).prop("href","/"+lang)}),$(".dropdown-menu a").on("click",function(){$(".dropdown-toggle").html($(this).html());var a=$(this).attr("tab-id");$(".tab-pane").removeClass("active"),$("#"+a).tab("show"),$(".dropdown-item").removeClass("active"),$("a[tab-id='"+a+"']").addClass("active")}),$("form input").on("keypress",function(a){return 13!==a.which}),$("#media_download_submit").on("click",function(a){mediaDownload()}),$("#profile_download_submit").on("click",function(a){profileDownload()})});