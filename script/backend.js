
//© COPYRIGHT GEORGE EDMONDS 2018

var url;
var articletext = [];
var rawtext;

var source = 'none';


function resetSource() {
  source = 'none';
  articletext = [];
}


function getArticleText() {
  url = document.getElementById("url-input").value;
  var corsproxy = 'https://cors-anywhere.herokuapp.com/';
  $.get(corsproxy + url, getSources);

}


function getSources(rawtext) {

  var spliturl = url.replace(/\//g,'.')
  spliturl = spliturl.split('.').join(' ')

  // if (spliturl.includes('cnn')&&spliturl.includes('edition')) {
  //   source = 'cnn'
  // }

  if (spliturl.includes('bbc')) {
    source = 'bbc'
  }

  if (spliturl.includes('guardian')) {
    source = 'guardian'
  }

  if (spliturl.includes('huffingtonpost')&&spliturl.includes('uk')) {
    source = 'huffingtonpost-uk'
  }

  if (spliturl.includes('telegraph')) {
    source = 'telegraph'
  }

  if (spliturl.includes('dailymail')) {
    source = 'dailymail'
  }

  //IF SOURCE NOT DEFINED

  if (source == 'none') {
    rawtext = $(rawtext).find('p');
    for (var i = 0; i < rawtext.length; i++) {
        articletext.push(rawtext[i].textContent)
    }
    articletext = articletext.join(' ')
  }

  //IF SOURCE IS BBC

  if (source == 'bbc') {
    var banlist = ["twite__title", "twite__copy-text", "twite__new-window", "top-stories-promo-story__summary", "heron__item-summary", "twite__channel-text", "top-stories-promo-story__summary"]
    rawtext = $(rawtext).find('p');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
    console.log(rawtext)
  }

  //IF SOURCE IS GUARDIAN

  if (source == 'guardian') {
    var banlist = ["byline", "content__dateline", "block-time.published-time", "block-time.updated-time"]
    rawtext = $(rawtext).find('p');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
  }

  //IF SOURCE IS HUFFINGTON POST

  if (source == 'huffingtonpost-uk') {
    var banlist = []
    rawtext = $(rawtext).find('p');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
  }

    //IF SOURCE IS CNN

  if (source == 'cnn') {
    var banlist = []
    rawtext = $(rawtext).find('div.zn-body__paragraph');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
  }

  //IF SOURCE IS TELEGRAPH

  if (source == 'telegraph') {
    var banlist = ["byline", "content__dateline", "block-time.published-time", "block-time.updated-time"];
    rawtext = $(rawtext).find('p');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
  }

    //IF SOURCE IS dailymail

  if (source == 'dailymail') {
    var banlist = []
    rawtext = $(rawtext).find('p.mol-para-with-font');
    for (var i = 0; i < rawtext.length; i++) {
      var className = rawtext[i].className
      if ($.inArray(className, banlist) == -1) {
        articletext.push(rawtext[i].textContent)
      }
    }
    articletext = articletext.join(' ')
  }

  console.log(articletext)
  var abstract = sum({ 'corpus': articletext, 'nSentences': 3});
  console.log(abstract)

  abstract = String(abstract.sentences[0].trim() + '. ' + abstract.sentences[1].trim() + '. ' + abstract.sentences[2]).trim() + '.'

  if (abstract!== undefined) {
    document.getElementById("text").innerHTML = abstract
    $("#loading").css("display", "none");
    $("#text-container").css("display", "block");
    $('#text-container').animateCss('fadeInLeft');
  }
}
