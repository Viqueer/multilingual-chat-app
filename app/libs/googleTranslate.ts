const { Translate } = require("@google-cloud/translate").v2;

const projectId = process.env.GOOGLE_PROJECT_ID;
const key = process.env.GOOGLE_TRANSLATE_SECRET;

const translateClient = new Translate({ projectId, key });

export default translateClient;
