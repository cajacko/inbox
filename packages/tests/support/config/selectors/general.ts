const general = {
  AddButton: {
    web: '.AddButton',
  },
  AddReminder: {
    Cancel: {
      web: '.AddReminder__Cancel',
    },
    Input: {
      web: '.AddReminder__Input',
    },
    Save: {
      web: '.AddReminder__Save',
    },
    web: '.AddReminder',
  },
  EditReminder: {
    web: '.AddReminder--Edit',
  },
  ErrorBoundary: {
    Button: {
      Text: {
        web: ({ index }: { index: number }) =>
          `.ErrorBoundary__ButtonContainer:nth-child(${index +
            1}) .ErrorBoundary__ButtonText`,
      },
      web: ({ index }: { index: number }) =>
        `.ErrorBoundary__ButtonContainer:nth-child(${index + 1})`,
    },
    Buttons: {
      web: '.ErrorBoundary__Button',
    },
    Code: {
      web: '.ErrorBoundary__Code',
    },
    web: '.ErrorBoundary',
  },
  GoogleAuth: {
    Submit: {
      web: '.GoogleAuth__submit',
    },
  },
  Home: {
    Container: {
      web: '.Home',
    },
  },
  Login: {
    Button: {
      web: '.Login__Button',
    },
    Cancel: {
      web: '.Login__Cancel',
    },
    Container: {
      web: '.Login',
    },
    Error: {
      Text: {
        web: '.Login__ErrorText',
      },
    },
    Loading: {
      web: '.Login__Loading',
    },
    Title: {
      web: '.Login__Title',
    },
    Version: {
      Text: {
        web: '.Login__VersionText',
      },
    },
  },
  Menu: {
    BackgroundButton: {
      web: '.Menu__BackgroundButton',
    },
    Button: {
      web: '.Menu__Button',
    },
    CloseButton: {
      web: '.Menu__CloseButton',
    },
    LogoutButton: {
      web: '.Menu__LogoutButton',
    },
    web: '.Menu',
  },
  ReminderList: {
    Reminder: {
      Button: {
        web: ({ index }: { index: number }) =>
          `.Reminder:nth-child(${index + 1}) .Reminder__Button`,
      },
      Status: {
        Error: {
          web: ({ index }: { index: number }) =>
            `.Reminder:nth-child(${index + 1}) .Reminder__Status--Error`,
        },
        Saved: {
          web: ({ index }: { index: number }) =>
            `.Reminder:nth-child(${index + 1}) .Reminder__Status--Saved`,
        },
        Saving: {
          web: ({ index }: { index: number }) =>
            `.Reminder:nth-child(${index + 1}) .Reminder__Status--Saving`,
        },
      },
      Text: {
        web: ({ index }: { index: number }) =>
          `.Reminder:nth-child(${index + 1}) .Reminder__Text`,
      },
    },
    Reminders: {
      web: '.Reminder',
    },
  },
  SplashScreen: {
    web: '.splashScreen',
  },
};

export default general;
