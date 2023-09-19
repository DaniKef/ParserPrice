const url = "https://platform.spotonchain.ai/token?name=SPELL";

// Текст, который вы хотите найти на странице
const targetText = "Spell";

// Функция для проверки страницы на наличие целевого текста
function checkPageForText() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка при запросе: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const pageText = doc.documentElement.textContent;

      if (pageText.includes(targetText)) {
        console.log(`Информация появилась на странице ${url}!`);
      } else {
        // Повторно проверяем через 60 секунд (или другой интервал)
        setTimeout(checkPageForText, 10000);
      }
    })
    .catch((error) => {
      console.error(`Произошла ошибка: ${error}`);
      // Повторно проверяем через 60 секунд (или другой интервал)
      setTimeout(checkPageForText, 10000);
    });
}

// Запускаем первую проверку
checkPageForText();
