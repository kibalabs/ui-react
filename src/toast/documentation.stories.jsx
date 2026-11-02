import { Toast, useToastManager } from '.';
import { Button } from '../index';


function DefaultTemplate() {
  const toastManager = useToastManager();
  const onShowToastClicked = () => {
    toastManager.showTextToast('👋 Hello world');
  };
  return <Button text='Show Toast' onClicked={onShowToastClicked} />;
}

function CustomToastTemplate() {
  const toastManager = useToastManager();
  const onShowToastClicked = () => {
    toastManager.showToast(
      <img
        style={{
          height: '3em',
          width: '3em',
        }}
        alt='cool'
        src='https://www.kibalabs.com/_bh20211208082922411123/assets/_generated/favicon-1024.png'
      />,
    );
  };
  return <Button text='Show Toast' onClicked={onShowToastClicked} />;
}

export default {
  component: Toast,
  title: 'Extras/Toast',
};

export const Default = {
  render: () => <DefaultTemplate />,
  name: 'Default',
};

export const CustomToast = {
  render: () => <CustomToastTemplate />,
  name: 'Custom Toast',
};
