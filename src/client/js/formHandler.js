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
          document.getElementById(
            'results'
          ).innerHTML = `<p> polarity:  ${data.polarity}</p>
                <img id="image" src="../images/positive.png" alt=" ${data.polarity}"/>
          `;
        } else if (data.polarity === 'neutral') {
          document.getElementById(
            'results'
          ).innerHTML = `<p> polarity:  ${data.polarity}</p>
                <img id="image" src='../images/natural.png' alt=" ${data.polarity}"/>
          `;
        } else if (data.polarity === 'negative') {
          document.getElementById(
            'results'
          ).innerHTML = `<p> polarity:  ${data.polarity}</p>
                <img id="image" src='../images/negative.png' alt=" ${data.polarity}"/>
          `;
        }
      });
  } else {
    document.getElementById('results').innerHTML =
      'please input vaild url like :"http://www.____.com"';
  }
}

export { handleSubmit };
