const { Translate } = require("@google-cloud/translate").v2;

const projectId = process.env.GOOGLE_PROJECT_ID;
const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const translateClient = new Translate({ projectId, keyFilename });


export default translateClient;