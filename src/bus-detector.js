document.getElementById('imgupload').addEventListener('change', e => {
    document.getElementById('img').style.display = 'flex';
    const image = document.getElementById('img');
    image.src = URL.createObjectURL(e.target.files[0]);
    image.style.width = '200px';
    image.style.height = '200px';
});

document.getElementById('check-if-truck').addEventListener('click', () => {
    const img = document.getElementById('img');
    if (!document.querySelector(`input[type='file']`).files.length) {
        alert('Morate prvo da uploadujete sliku!');
        return;
    }

    document.querySelector('.loader').style.display = 'block';

    mobilenet.load().then(model => {
        // Classify the image
        model.classify(img).then(predictions => {
            let busDetected = 'Nije ';
            for (const prediction of predictions) {
                console.log(prediction);
                if (prediction.className.toLowerCase().indexOf('truck') !== -1) {
                    busDetected = '';
                    break;
                }
            }
            alert(`${busDetected}detektovan bus`);
        });

        document.querySelector('.loader').style.display = 'none';
    });
});