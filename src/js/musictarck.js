class MusicTrack {
  constructor(container, elementHtml, number) {
    this.addTrack(container, elementHtml, number);
  }

  addTrack(container, elementHtml, number) {
    let element = elementHtml;
    for (let index = 0; index < number; index++) {
      container.insertAdjacentHTML("beforeend", element);
    }
  }
}
