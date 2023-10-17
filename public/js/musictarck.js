class MusicTrack {
  constructor(container, musicName) {
    this.addTrack(container, musicName);
  }

  addTrack(container, musicName) {
    for (let index = 0; index < musicName.length; index++) {
      let elementHtml = `<tbody onclick="selectMusic(this)"
                        class="mb-4 flex w-full cursor-pointer dark:text-[#0C0C0C] dark:hover:bg-[#d4d4d4] dark:border-[#D2D2D2] justify-between rounded-lg border-2 border-[#404040] p-2 text-white opacity-80 transition-all hover:bg-[#3e3e3e]">
                        <tr class="flex space-x-7">
                            <td>1</td>
                            <td>${index + 1}</td>
                            <td class="musicName">${musicName[index]}</td>
                        </tr>
                        <tr class="flex space-x-8">
                            <td>3:45</td>
                            <td>6.66 MB</td>
                            <td>17.92 MB</td>
                        </tr>
                    </tbody>`;
      container.insertAdjacentHTML("beforeend", elementHtml);
    }
  }
}
