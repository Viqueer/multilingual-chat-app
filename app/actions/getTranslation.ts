import translateClient from "../libs/googleTranslate";

async function translateText(
  text: string,
  sourceLanguage: string,
  targetLanguage: string
) {
  const options = {
    from: sourceLanguage,
    to: targetLanguage,
  };
  const [translation] = await translateClient.translate(text, options);
  return translation;
}

async function listLanguages() {
  // Lists available translation language with their names in English (the default).
  const [languages] = await translateClient.getLanguages();

  return languages;
}

export { translateText, listLanguages };
