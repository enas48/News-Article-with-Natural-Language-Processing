function handleSubmit(event) {
  event.preventDefault();
  let formUrl = document.getElementById('name').value;

  // check url put into the form field
  if (Client.checkForUrl(formUrl)) {
    fetch('http://localhost:8081/api', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ formUrl })
    })
      .then(res => {
        return res.json();
      })
      .catch(e => {
        document.getElementById('results').innerHTML = 'error ' + e;
        console.log(e);
      })
      //updata ui
      .then(function(data) {
        if (data.polarity === 'positive') {
          document.getElementById('polarity').innerHTML =
            'polarity: ' + data.polarity;
          document.getElementById('image').src = '../images/positive.png';
          document.getElementById('subjectivity').innerHTML =
            'subjectivity: ' + data.subjectivity;
        } else if (data.polarity === 'neutral') {
          document.getElementById('polarity').innerHTML =
            'polarity: ' + data.polarity;
          document.getElementById('image').src = '../images/natural.png';
          document.getElementById('subjectivity').innerHTML =
            'subjectivity: ' + data.subjectivity;
        } else if (data.polarity === 'negative') {
          document.getElementById('polarity').innerHTML =
            'polarity: ' + data.polarity;
          document.getElementById('image').src = '../images/negative.png';
          document.getElementById('subjectivity').innerHTML =
            'subjectivity: ' + data.subjectivity;
        }
      });
  } else {
    document.getElementById('results').innerHTML =
      'please input vaild url like :"http://www.____.com"';
  }
}

export { handleSubmit };
