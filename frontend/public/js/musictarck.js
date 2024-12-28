const musicTable = document.querySelector("#music-table");

async function addTrack() {
  const res = await fetch("http://localhost:3000/music", { method: "GET" });
  const musics = await res.json();

  for (let index = 0; index < musics.length; index++) {
    let elementHtml = `<tbody data-id="${musics[index]._id}"  data-src="${
      musics[index].musicPath
    }" onclick="selectMusic(this)"
      class="msuicTrack animate__animated animate__fadeIn mb-4 flex w-full cursor-pointer dark:text-[#0C0C0C] dark:hover:bg-[#d4d4d4] dark:border-[#D2D2D2] justify-between rounded-lg border-2 border-[#404040] p-2 text-white opacity-80 transition-all hover:bg-[#3e3e3e]">
      <tr class="flex space-x-7">
          <td>1</td>
          <td>${index + 1}</td>
          <td class="musicName">${musics[index].title}</td>
      </tr>
      <tr class="flex space-x-8">
          <td>3:45</td>
          <td>${formatFileSize(musics[index].size)}</td>
          <td>${formatFileSize(musics[index].size)}</td>
          <td data-id="${
            musics[index]._id
          }" class="delBtn"><i class="fa-solid fa-trash"></i></td>
      </tr>
  </tbody>`;

    musicTable.insertAdjacentHTML("beforeend", elementHtml);
  }
  await deleteFunc();
}

async function deleteFunc() {
  const deleteBtn = document.querySelectorAll(".delBtn");
  deleteBtn.forEach((item) => {
    item.addEventListener("click", async function (e) {
      e.stopPropagation();
      await fetch(`http://localhost:3000/music/delete/${item.dataset.id}`, {
        method: "DELETE",
      }).then((response) => {
        if (response.status === 204) {
          musicTable.innerHTML = `<thead
          class="dark:text-[#2e2e2e] dark:opacity-75 mb-6 flex w-full justify-between border-b-2 border-solid border-[#454545] pb-2 text-white opacity-40">
          <tr class="flex space-x-7">
              <th class="font-light">CD</th>
              <th class="font-light">#</th>
              <th class="font-light">Name</th>
          </tr>
          <tr class="flex space-x-16">
              <th class="font-light">Time</th>
              <th class="font-light">MP3</th>
              <th class="font-light">FLAC</th>
              <th class="font-light">Delete</th>
          </tr>
      </thead>`;
          addTrack();
        }
      });
    });
  });
}
function formatFileSize(fileSizeInBytes) {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + " B";
  } else if (fileSizeInBytes < 1024 * 1024) {
    return (fileSizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  }
}
