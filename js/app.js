var $jscomp=$jscomp||{};function mediaDownload(){var t=$("#instagram-photo-video-download-form input[name='mediaUrl']").val();mediaDownloadFormValidate(t)?(t=matchPureMediaUrl(t),$("#instagram-photo-video-download-form input[name='mediaUrl']").val(t),$("#instagram-photo-video-download-submit").attr("disabled",!0),$("#instagram-photo-video-download-container").empty(),$("#instagram-photo-video-download").LoadingOverlay("show"),fpPromise.then(function(t){return t.get()}).then(function(a){$.ajaxSetup({headers:{"visitor-token":btoa(a.visitorId)}}),$.post("/api/instagram/mediaDownload",{mediaUrl:t},function(t){if(t=JSON.parse(t),$("#instagram-photo-video-download").LoadingOverlay("hide"),$("#instagram-photo-video-download-submit").attr("disabled",!1),clearContent(),"1"!==t.code)$("#instagram-photo-video-download-container").html(buildMessage(localizeResultMessage(t)));else{var a="",e=[];$.each(t.result,function(t,o){if("2"===o.type){var n=o.name.split(".")[0];e.push({videoId:n,videoDisplayURL:"/api/common/media/"+o.name})}n={1:'<img class="img-thumbnail img-fluid" src="/api/common/media/'+o.name+'">',2:'<video id="'+n+'" poster="/api/common/media/'+o.poster+'" class="img-thumbnail img-fluid" controls></video>'}[o.type],a+={1:'<div class="col-md-6 mt-4">'+n+'<a href="/api/common/media/'+o.name+'?dl=1" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',2:'<div class="col-md-6 mt-4">'+n+"<button onclick=\"mediaSave('"+o.name+'\')" class="btn material-icons download-button">file_download</button></div>'}[o.type],0==(t+1)%3&&(a+=feedAds)}),1===t.result.length&&(a+=feedAds),2===t.result.length&&(a+=feedAds+feedAds),$("#content-container").html('<div class="row ml-0 mr-0">'+a+"</div>"),$("#instagram-photo-video-download-form input[name='mediaUrl']").val(""),e.forEach(function(t,a){fetch(t.videoDisplayURL,{method:"GET",responseType:"blob"}).then(function(t){return t.blob()}).then(function(a){$("#"+t.videoId).attr("src",URL.createObjectURL(a))})})}})})):clearContent()}function mediaDownloadFormValidate(t){return isEmptyString(t)?($("#instagram-photo-video-download-container").empty(),$("#instagram-photo-video-download-container").html(buildMessage(infoMap[lang][0])),!1):!!RegExp("^https://(|www.)instagram.com/.*$").test(t)||($("#instagram-photo-video-download-container").empty(),$("#instagram-photo-video-download-container").html(buildMessage(infoMap[lang][1])),!1)}function profileDownload(){var t=$("#instagram-profile-photo-download-form input[name='userName']").val();profileDownloadFormValidate(t)?(t=matchUserName(t),$("#instagram-profile-photo-download-form input[name='userName']").val(t),$("#instagram-profile-photo-download-submit").attr("disabled",!0),$("#instagram-profile-photo-download-container").empty(),$("#instagram-profile-photo-download").LoadingOverlay("show"),fpPromise.then(function(t){return t.get()}).then(function(a){$.ajaxSetup({headers:{"visitor-token":btoa(a.visitorId)}}),$.post("/api/instagram/profileDownload",{userName:t},function(t){$("#instagram-profile-photo-download").LoadingOverlay("hide"),$("#instagram-profile-photo-download-submit").attr("disabled",!1),clearContent(),"1"!==t.code?$("#instagram-profile-photo-download-container").html(buildMessage(localizeResultMessage(t))):(t='<div class="col-md-6 mt-4"><img class="img-thumbnail img-fluid" src="/api/common/media/'+(t=t.result).name+'"><a href="/api/common/media/'+t.name+'?dl=1" class="btn material-icons download-button" target="_blank" role="button">file_download</a></div>',$("#content-container").html('<div class="row ml-0 mr-0">'+t+feedAds+"</div>"),$("#instagram-profile-photo-download-form input[name='userName']").val(""))})})):clearContent()}function profileDownloadFormValidate(t){return!isEmptyString(t)||($("#instagram-profile-photo-download-container").empty(),$("#instagram-profile-photo-download-container").html(buildMessage(infoMap[lang][2])),!1)}function mediaSave(t){$("body").LoadingOverlay("show"),fetch("/api/common/media/"+t,{method:"GET"}).then(function(t){return t.blob()}).then(function(a){download(a,t,"application/octet-stream"),$("body").LoadingOverlay("hide")}).catch(function(t){$("body").LoadingOverlay("hide"),alert(t)})}function isEmptyString(t){return!t||""===t||null==t||0===t.trim().length}function localizeResultMessage(t){if(t.code in codeMap)return codeMap[t.code][lang];var a=infoMap.en.indexOf(t.message);return-1===a?t.message:infoMap[lang][a]}function clearContent(){$("#content-container").empty()}function refreshPage(){location.reload()}function buildMessage(t){return'<div class="col-md-12 offset-md-0 mt-2"><div class="alert alert-warning alert-dismissible fade show loading-overlay-container" role="alert">\n\t\t<button type="button" onclick="refreshPage()" class="close" data-dismiss="alert" aria-label="Close">\n\t\t\t<span aria-hidden="true">×</span>\n\t\t</button>\n\t\t<p class="text-left">'+t+"</p>\n\t</div></div>"+feedAdsCenter}function matchPureMediaUrl(t){t=(t=t.replace("instagram.com/tv/","instagram.com/p/")).replace("instagram.com/reel/","instagram.com/p/"),/https:\/\/instagram.com\/(.*?)/.test(t)&&(t=t.replace("instagram.com","www.instagram.com"));var a=/(.*?)(\?|$)/.exec(t);return a&&a[1]?a[1].trim():t}function matchUserName(t){if(t=t.trim(),/https:\/\/.*instagram.com\/(.*?)/.test(t)){var a=/https:\/\/.*instagram.com\/(.*?)(\/|\?|$)/.exec(t);return a&&a[1]?a[1].trim():t}return t}$jscomp.scope={},$jscomp.createTemplateTagFirstArg=function(t){return t.raw=t},$jscomp.createTemplateTagFirstArgWithRaw=function(t,a){return t.raw=a,t},infoMap={en:"Link cannot be blank.;Link is invalid.;Username ID cannot be blank.;Processing... please wait about 1-3 minutes.;File is downloading...;File download terminated abnormally.;File downloaded successfully.;Username ID is invalid.".split(";"),cn:"链接不能为空。 链接无效。 用户名ID不能为空。 正在处理...请等待1-3分钟。 文件正在下载中... 文件下载异常终止。 文件下载成功。 用户名ID无效。".split(" "),hk:"鏈接不能為空。 鏈接無效。 用戶名ID不能為空。 正在處理...請等待1-3分鐘。 文件正在下載中... 文件下載異常終止。 文件下載成功。 用戶名ID無效。".split(" "),jp:"URLを空白にすることはできません。;URLが無効です。;ユーザー名IDを空白にすることはできません。;処理中... 1〜3分ほどお待ちください。;ファイルをダウンロードしています...;ファイルのダウンロードが異常終了しました。;ファイルが正常にダウンロードされました。;ユーザー名IDが無効です。".split(";")},codeMap={0:{en:"Request failed.",cn:"请求失败。",hk:"請求失敗。",jp:"要求が失敗しました。"},408:{en:"Request timed out, please try again later.",cn:"请求超时，请稍后再试。",hk:"請求超時，請稍後再試。",jp:"リクエストがタイムアウトしました。しばらくしてからもう一度お試しください。"},40801:{en:"Processing timed out, please try again.",cn:"处理超时，请再试一次。",hk:"處理超時，請再試一次。",jp:"処理がタイムアウトしました。再試行してください。"},429:{en:"Request too frequent, please try again in a few minutes.",cn:"请求太频繁，请等待几分钟后重试。",hk:"請求太頻繁，請等待幾分鐘後重試。",jp:"リクエストが多すぎます。数分後にもう一度お試しください。"},500:{en:"Service temporarily unavailable.",cn:"服务暂时不可用。",hk:"服務暫時不可用。",jp:"サービスは一時的に利用できません。"},42901:{en:"Operation has reached the limit, please try again in a few hours.",cn:"操作次数已达上限，请等待数小时后重试。",hk:"操作次數已達上限，請等待數小時後重試。",jp:"操作が制限に達しました。数時間後に再試行してください。"},42902:{en:"Requests has reached the limit, please try again later.",cn:"请求次数已达到上限，请稍后重试。",hk:"請求次數已達到上限，請稍後重試。",jp:"リクエストが制限に達しました。しばらくしてからもう一度お試しください。"},10000:{en:"Error downloading url.",cn:"下载链接时出错。",hk:"下載鏈接時出錯。",jp:"URLのダウンロード中にエラーが発生しました。"},10001:{en:"Error downloading file.",cn:"下载文件时出错。",hk:"下載文件時出錯。",jp:"ファイルのダウンロード中にエラーが発生しました。"},40001:{en:"Url is invalid or not supported yet.",cn:"链接无效或尚不支持。",hk:"鏈接無效或尚不支持。",jp:"URLが無効であるか、まだサポートされていません。"},40002:{en:"Username ID does not exist.",cn:"用户名ID不存在。",hk:"用戶名ID不存在。",jp:"ユーザー名IDが存在しません。"},40003:{en:"User has not posted content or account is private.",cn:"用户尚未发布内容或帐户未公开。",hk:"用戶尚未發佈內容或帳戶未公開。",jp:"ユーザーがコンテンツを投稿していないか、アカウントが非公開です。"}},optionMap=["instagram-photo-video-download","instagram-profile-photo-download"],feedAds='<div class="col-md-6 mt-4">\n\t\t\t\t<ins class="adsbygoogle"\n\t\t\t     style="display:block"\n\t\t\t     data-ad-client="ca-pub-6232783881632642"\n\t\t\t     data-ad-slot="2883708977"\n\t\t\t     data-ad-format="rectangle"\n\t\t\t     data-full-width-responsive="false"></ins>\n\t\t\t\t<script>\n\t\t\t     (adsbygoogle = window.adsbygoogle || []).push({});\n\t\t\t\t<\/script>\n\t\t\t</div>',feedAdsCenter='<div class="col-md-12 mt-4">\n\t\t\t\t<ins class="adsbygoogle"\n\t\t\t     style="display:block"\n\t\t\t     data-ad-client="ca-pub-6232783881632642"\n\t\t\t     data-ad-slot="2883708977"\n\t\t\t     data-ad-format="rectangle"\n\t\t\t     data-full-width-responsive="false"></ins>\n\t\t\t\t<script>\n\t\t\t     (adsbygoogle = window.adsbygoogle || []).push({});\n\t\t\t\t<\/script>\n\t\t\t</div>',fpPromise=new Promise(function(t,a){var e=document.createElement("script");e.onload=t,e.onerror=a,e.async=!0,e.src="https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js",document.head.appendChild(e)}).then(function(){return FingerprintJS.load()}),$(document).ready(function(){var t=optionMap.filter(function(t){return-1<window.location.pathname.search(t)})[0];if(t){$(".dropdown-menu a[class*='active']").removeClass("active");var a=$(".dropdown-menu a").filter("[tab-id='"+t+"']").addClass("active");$("#default-option").html(a.html()),$(".tab-content div[class*='active']").removeClass("active").addClass("fade"),$(".tab-content div").filter("[id='"+t+"']").removeClass("fade").addClass("active")}/Edge\/\d./i.test(navigator.userAgent)&&$(".material-icons.download-item-icon").remove(),$("h1").click(function(){$(location).prop("href","/"+lang+"/")}),$(".dropdown-menu a").on("click",function(){var t=$(this).attr("tab-id");optionMap.includes(t)&&($(".dropdown-toggle").html($(this).html()),$(".tab-pane").removeClass("active"),$("#"+t).tab("show"),$(".dropdown-item").removeClass("active"),$("a[tab-id='"+t+"']").addClass("active"))}),$("form input").on("keypress",function(t){return 13!==t.which}),$("#instagram-photo-video-download-submit").on("click",function(t){mediaDownload()}),$("#instagram-profile-photo-download-submit").on("click",function(t){profileDownload()})});