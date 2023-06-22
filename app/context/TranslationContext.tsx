import { createContext } from "react";

const translations: any = {
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
};

const TranslationContext = createContext(translations);

export default TranslationContext;
