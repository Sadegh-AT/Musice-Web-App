async function addTrack(container) {
  const res = await fetch("http://localhost:3000/music", { method: "GET" });
  const musics = await res.json();
  console.log(musics);
  for (let index = 0; index < musics.length; index++) {
    let elementHtml = `<tbody  data-src="${
      musics[index].musicPath
    }" onclick="selectMusic(this)"
      class="mb-4 flex w-full cursor-pointer dark:text-[#0C0C0C] dark:hover:bg-[#d4d4d4] dark:border-[#D2D2D2] justify-between rounded-lg border-2 border-[#404040] p-2 text-white opacity-80 transition-all hover:bg-[#3e3e3e]">
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
    container.insertAdjacentHTML("beforeend", elementHtml);
  }
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
