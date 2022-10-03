import { NotificationProps, showNotification } from '@mantine/notifications';

type TITLE = 'Info' | 'Done' | 'Error' | 'Critical';

const OtherProps = (TITLE: TITLE): Omit<NotificationProps, 'message'> => {
  switch (TITLE) {
    case 'Done':
      return { color: 'teal' };

    case 'Info':
      return { color: 'grape' };

    case 'Error':
      return { color: 'orange' };

    case 'Critical':
      return { color: 'red' };

    default:
      return {};
  }
};

const CallNoti = (TITLE: TITLE, MSG: string) => {
  const OtherPropss = OtherProps(TITLE);
  showNotification({
    title: TITLE,
    message: MSG,
    autoClose: 5000,
    ...OtherPropss,
  });
};

export default CallNoti;
