import { ToastController } from '@ionic/angular';
const toastController = new ToastController();

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export async function presentToast(message: string, duration: number = 3000) {
  const toast = toastController.create({
    message,
    duration,
    position: 'bottom'
  });

  (await toast).present();
}
