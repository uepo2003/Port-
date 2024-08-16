import Header from "@editorjs/header";

class CustomHeader extends Header {
  render() {
    this.wrapper = document.createElement(this.config.defaultLevel || "h2");
    this.wrapper.classList.add("ce-header");
    this.wrapper.contentEditable = true;
    this.wrapper.innerHTML = this.data.text || "";

    switch (this.config.defaultLevel) {
      case "h1":
        this.wrapper.setAttribute("data-placeholder", "ヘディング1");
        break;
      case "h2":
        this.wrapper.setAttribute("data-placeholder", "ヘディング2");
        break;
      case "h3":
        this.wrapper.setAttribute("data-placeholder", "ヘディング3");
        break;
    }

    this.wrapper.dataset.placeholder =
      this.wrapper.getAttribute("data-placeholder");
    return this.wrapper;
  }
}

export default CustomHeader;
