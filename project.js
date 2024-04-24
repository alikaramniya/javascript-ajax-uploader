const files = document.getElementById("files");
const progressArea = document.getElementById("progress-area");

files.addEventListener("change", function () {
  let listFiles = files.files;

  for (let i = 0; i < listFiles.length; i++) {
    let formData = new FormData();

    formData.append(`file${i}`, listFiles[i]);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "file.php");

    const block = createProgressBarTag(listFiles[i]);

    xhr.upload.addEventListener("progress", function (e) {
      let div = block.querySelector(".progress-bar div");
      let span = block.querySelector(".progress-bar span");

      if (e.lengthComputable) {
        let percent = ((e.loaded / e.total) * 100).toFixed(1);

        div.style.width = percent + '%';
        span.innerHTML = percent + '%';
      }
    });

    xhr.send(formData);
  }
});

function createProgressBarTag(file) {
  let html = `
        <label>file: ${file.name}</label>
        <div class="progress-bar">
            <div style="width: 0%"></div>
            <span>0%</span>
        </div>
    `;

  const block = document.createElement("div");
  block.class = "progress-block";

  block.innerHTML = html;

  progressArea.appendChild(block);

  return block;
}
