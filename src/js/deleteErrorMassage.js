//Remove error message

export default function deleteErrorMessage() {
    const arrorMessage = document.querySelector('.searchQueryIncorrect');
    if (arrorMessage) { arrorMessage.remove() };
}