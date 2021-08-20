//Clear Blank Page
export default function clearBlankPage() {
    const elBlankPage = document.querySelector('.blankPage');
    if (elBlankPage) {
        elBlankPage.remove();
    }
}