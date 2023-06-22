import { NextResponse } from "next/server";

import { translateText } from "@/app/actions/getTranslation";

const translationObject: any = {
  en: {
    general: {
      email: "Email Address",
      language: "Language",
      emptyState: "Select a chat or start a new conversation",
      name: "Name",
    },
    authForm: {
      header: "Sign in to your account",
      passwordFormLabel: "Password",
      selectLanguage: "Select Language",
      signIn: "Sign in",
      login: "Login",
      register: "Register",
      newTo: "New to",
      createAccount: "Create Account",
      alreadyHaveAccount: "Already have an account",
    },
    messages: {
      header: "Messages",
      offline: "Offline",
      messageInputPlaceholder: "Write a message",
      delete: "delete",
      joined: "Joined",
      active: "active",
      deleteConversation: "Delete Conversation",
      confirmDeleteConversation:
        "Are you sure you want to delete this conversation? This action cannot be undone.",
    },
    people: {
      header: "People",
    },
    settings: {
      header: "Profile",
      subHeader: "Edit your public information",
      photo: "Photo",
      change: "Change",
      cancel: "cancel",
      save: "save",
    },
    error: {
      error1: "Invalid Credentials",
      error2: "Something went wrong",
    },
  },
};

const translateObject: any = async (obj: object, lang: string) => {
  const newObj: any = {};
  for (const key in obj) {
    if (
      typeof obj[key as keyof object] === "object" &&
      obj[key as keyof object] !== null &&
      !Array.isArray(obj[key as keyof object])
    ) {
      newObj[key] = await translateObject(obj[key as keyof object], lang);
    }
    if (typeof obj[key as keyof object] === "string") {
      newObj[key] = await translateText(obj[key as keyof object], "en", lang);
      // console.log(obj[key as keyof object]);
    }
  }
  return newObj;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { language } = body;
    // console.log({ language });
    const specificTranslation = translationObject[language];
    // console.log({ specificTranslation });
    if (specificTranslation) return NextResponse.json(specificTranslation);

    const newTransObject = await translateObject(
      translationObject.en,
      language
    );
    console.log({ newTransObject });
    translationObject[language] = newTransObject;
    return NextResponse.json(newTransObject);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
