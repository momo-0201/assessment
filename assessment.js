'use strict';

const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultArea = document.getElementById('result-area');
const tweetArea = document.getElementById('tweet-area');

assessmentButton.addEventListener('click', showAssessment);
userNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') showAssessment();
});

function showAssessment() {
  const userName = userNameInput.value.trim();
  if (!userName) {
    userNameInput.focus();
    userNameInput.setAttribute('aria-label', '診断したい名前。名前を入力してください');
    return;
  }

  const result = assessment(userName);
  resultArea.replaceChildren();
  tweetArea.replaceChildren();

  const card = document.createElement('article');
  card.className = 'result-card';

  const top = document.createElement('div');
  top.className = 'result-top';
  const sparkle = document.createElement('span');
  sparkle.className = 'result-sparkle';
  sparkle.setAttribute('aria-hidden', 'true');
  sparkle.textContent = '✦';
  const titleGroup = document.createElement('div');
  const kicker = document.createElement('p');
  kicker.className = 'result-kicker';
  kicker.textContent = 'YOUR GOOD POINT';
  const heading = document.createElement('h2');
  heading.className = 'result-heading';
  heading.textContent = '診断結果';
  titleGroup.append(kicker, heading);
  top.append(sparkle, titleGroup);

  const body = document.createElement('div');
  body.className = 'result-body';
  const paragraph = document.createElement('p');
  paragraph.className = 'result-text';
  paragraph.textContent = result;

  const actions = document.createElement('div');
  actions.className = 'result-actions';
  const retryButton = document.createElement('button');
  retryButton.type = 'button';
  retryButton.className = 'retry-button';
  retryButton.textContent = 'もう一度診断する';
  retryButton.addEventListener('click', () => {
    userNameInput.value = '';
    resultArea.replaceChildren();
    tweetArea.replaceChildren();
    userNameInput.focus();
    document.querySelector('.quiz-card').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  const shareLink = document.createElement('a');
  shareLink.className = 'share-link';
  shareLink.target = '_blank';
  shareLink.rel = 'noopener noreferrer';
  shareLink.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(result)}&hashtags=${encodeURIComponent('あなたのいいところ')}`;
  shareLink.textContent = 'Xでシェア';

  actions.append(retryButton, shareLink);
  body.append(paragraph, actions);
  card.append(top, body);
  resultArea.append(card);
}

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/** 名前から診断結果を作ります。 */
function assessment(userName) {
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode += userName.charCodeAt(i);
  }
  const index = sumOfCharCode % answers.length;
  return answers[index].replaceAll('###userName###', userName);
}
